class MyPromise {
	constructor(executor) {
		this.promiseState = 'pending';
		this.promiseResult = undefined;
		this.PromiseFulfillReactions = [];
		this.PromiseRejectReactions = [];
		this.PromiseFinallyReactions = []; // finally のコールバック関数リストを追加

		const resolve = (value) => {
			if (value instanceof Promise) {
				/**
				 * 本当は此処でresolveにpromiseが渡された時の動作を書きたいところ
				 * 内部的には引数で渡されたpromiseの解決を待って外がのpromiseが解決される
				 */
			} else {
				if (this.promiseState === 'pending') {
					this.promiseState = 'fulfilled';
					this.promiseResult = value;
					this.runReactions(true);
				}
			}
		};

		const reject = (reason) => {
			if (this.promiseState === 'pending') {
				this.promiseState = 'rejected';
				this.promiseResult = reason;
				this.runReactions(false);
			}
		};

		try {
			executor(resolve, reject);
		} catch (error) {
			reject(error);
		}
	}

	then(onFulfilled, onRejected) {
		return new MyPromise((resolve, reject) => {
			const handleFulfilled = (value) => {
				try {
					if (typeof onFulfilled === 'function') {
						resolve(onFulfilled(value));
					} else {
						resolve(value);
					}
				} catch (error) {
					reject(error);
				}
			};

			const handleRejected = (reason) => {
				try {
					if (typeof onRejected === 'function') {
						resolve(onRejected(reason));
					} else {
						reject(reason);
					}
				} catch (error) {
					reject(error);
				}
			};

			if (this.promiseState === 'fulfilled') {
				handleFulfilled(this.promiseResult);
			} else if (this.promiseState === 'rejected') {
				handleRejected(this.promiseResult);
			} else {
				// 両方にコールバックを登録するのはfinallyを呼ぶため
				// 例えばthenの後のcatchの後にfinallyを書くとすると
				// ここでthenで呼ばれたかfinallyで呼ばれたかによって振り分けをすると
				// finallyが呼ばれなくなる
				this.PromiseFulfillReactions.push(handleFulfilled);

				// なので以下のように振り分けると
				// task.then(~).catch(~).finally(~) というようなチェーンが繋がらなくなる
				// if (typeof onFulfilled === 'function') {
				//   this.PromiseFulfillReactions.push(handleFulfilled);
				// } else {
				//   this.PromiseRejectReactions.push(handleRejected);
				// }
			}
		});
	}

	catch(onRejected) {
		return this.then(undefined, onRejected);
	}

	finally(onFinally) {
		return this.then(
			(value) => {
				try {
					if (typeof onFinally === 'function') {
						onFinally();
					}
					return value;
				} catch (error) {
					throw error;
				}
			},
			(reason) => {
				try {
					if (typeof onFinally === 'function') {
						onFinally();
					}
					throw reason;
				} catch (error) {
					throw error;
				}
			}
		);
	}

	runReactions(isResolve) {
		if (isResolve) {
			this.PromiseFulfillReactions.forEach((cb) => {
				if (this.promiseState === 'fulfilled') {
					cb(this.promiseResult);
				}
			});
		} else {
			this.PromiseRejectReactions.forEach((cb) => {
				if (this.promiseState === 'rejected') {
					cb(this.promiseResult);
				}
			});
		}
		this.PromiseFinallyReactions.forEach((cb) => cb());
	}
}

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

const promiseTask = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('成功！');
		// reject('失敗');
	}, 1000);
});
console.log('本物のpromise', promiseTask);

promiseTask
	.then((result) => {
		console.log('本物のpromiseが解決された', 'then1', result);
		return '次の成功';
	})
	.then((result) => {
		console.log('本物のpromiseが解決された', 'then2', result);
	})
	.catch((error) => {
		console.error('本物のpromiseが失敗した', error);
	})
	.finally(() => {
		console.log('本物のpromiseのクリーンアップ', 'finally1');
	});

// promiseTask.then((result) => {
// 	console.log('大元のpromiseに登録したcb', 'cb1', result);
// 	return '次の成功';
// });
// promiseTask.then((result) => {
// 	console.log('大元のpromiseに登録したcb', 'cb2', result);
// 	return '次の成功';
// });

//
//
//
//
//
//
//

const myPromise = new MyPromise((resolve, reject) => {
	setTimeout(() => {
		resolve('成功！');
		// reject('失敗');
	}, 1000);
});

console.log('偽物のpromise', myPromise);

myPromise
	.then((result) => {
		console.log('偽物のpromiseが解決された', 'then1', result);
		return '次の成功';
	})
	.then((result) => {
		console.log('偽物のpromiseが解決された', 'then1', result);
	})
	.catch((error) => {
		console.error('偽物のpromiseが失敗した', error);
	})
	.finally(() => {
		console.log('偽物のpromiseのクリーンアップ', 'finally1');
	});

myPromise.finally(() => {
	console.log('偽物のpromiseのクリーンアップ', 'finally2');
});

// 大元のpromiseから呼び出したthenとチェーンで呼び出した時のthenの挙動の違い

// myPromise.then((result) => {
// 	console.log('大元のpromiseに登録したcb', 'cb1', result);
// 	return '次の成功';
// });
// myPromise.then((result) => {
// 	console.log('大元のpromiseに登録したcb', 'cb2', result);
// 	return '次の成功';
// });
