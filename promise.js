// ***********************************************************************************************************************
// PromiseのECMAScriptへの導入
// ***********************************************************************************************************************

// Promiseは、ECMAScript 2015（ES6）で正式にJavaScriptの標準仕様として導入されました。
// それ以前は、コールバック関数を用いた非同期処理が主流でしたが、
// 複雑な非同期処理を行う際に「コールバック地獄」と呼ばれるコードの可読性や保守性が著しく低下する問題がありました。

// Promiseは、そのような問題を解決するために、非同期処理の結果をオブジェクトとして表現し、
// その結果を後から取得したり、エラー処理を簡潔に記述したりするための仕組みを提供します。

//
//
//
//
//
//
//
//

// ***********************************************************************************************************************
// **Promiseの主な特徴**
// ***********************************************************************************************************************

// * **非同期処理の結果を表すオブジェクト:**
//     * Promiseは、非同期処理が完了したか、または失敗したかという結果を保持するオブジェクトです。
//     * これにより、非同期処理の結果を後から取得したり、エラーハンドリングを効率的に行うことができます。
// * **状態管理:**
//     * Promiseオブジェクトは、「保留 (pending)」、「成功 (fulfilled)」、「失敗 (rejected)」の3つの状態を持ちます。
//     * これにより、非同期処理の進行状況を把握し、状態に応じた処理を記述できます。
// * **メソッドチェーン:**
//     * `.then()`や`.catch()`などのメソッドをチェーン状に繋げることで、複数の非同期処理を順次実行したり、エラーハンドリングをまとめて記述したりできます。
// * **コールバック地獄の解消:**
//     * 従来のコールバック関数によるネストの深いコード（コールバック地獄）を回避し、可読性の高いコードを記述できます。

//
//
//
//
//
//
//
//

// ***********************************************************************************************************************
// **Promiseの基本的な使い方**
// ***********************************************************************************************************************

// 1.  **Promiseオブジェクトの生成:**
//     * `new Promise()`コンストラクタを使用して、Promiseオブジェクトを生成します。
//     * コンストラクタには、`resolve`と`reject`の2つの引数を持つコールバック関数を渡します。

// 第一引数にコールバック関数を渡さないとエラーになる。
// const task = new Promise();

// promiseに渡したコールバックは同期処理として即時実行される。
// インスタンス化された瞬間
// const task = new Promise((resolve, reject) => {
// 	console.log('promiseだよ');
// });

//
//

// 2.  **非同期処理の実行と結果の処理:**
//     * 非同期処理が成功した場合、`resolve()`関数を呼び出し、成功時の結果を渡します。
//     * 非同期処理が失敗した場合、`reject()`関数を呼び出し、エラーオブジェクトを渡します。

// const task = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		// resolve('resolve!!');
// 		reject('reject!!');
// 	}, 1000);
// });

//
//

// 3.  **結果の取得とエラーハンドリング:**
//     * `.then()`メソッドを使用して、成功時の結果を取得し、後続の処理を記述します。
//     * `.catch()`メソッドを使用して、エラーが発生した場合の処理を記述します。

// 1秒後にresolveで非同期処理が解決されてthenが実行される。
// task.then((v) => console.log('thenだよ', v));

// rejectが呼ばれた時はcatchで受け取れる。
// task.catch((v) => console.log('catchだよ', v));

//
//
//
//
//
//
//
//

// ***********************************************************************************************************************
// **Promiseの利点**
// ***********************************************************************************************************************

// * **コードの可読性向上:**
//     * 非同期処理のフローを直感的に記述できるため、コードが読みやすくなります。

// * **エラーハンドリングの効率化:**
//     * 複数の非同期処理のエラーをまとめて処理できるため、エラーハンドリングが容易になります。

// * **非同期処理の組み合わせ:**
//     * `Promise.all()`や`Promise.race()`などのメソッドを使用して、複数の非同期処理を組み合わせた複雑な処理を記述できます。

// **Promiseは、JavaScriptにおける非同期処理を扱う上で非常に強力なツールであり、現代のWebアプリケーション開発において欠かせない技術です。**

//
//
//
//
//
//
//
//

// ***********************************************************************************************************************
// **Promiseの深掘り**
// ***********************************************************************************************************************

// PromiseはJavaScriptにおける非同期処理を扱うためのオブジェクトであり、その動作はECMAScriptの仕様によって厳密に定義されています。
// https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-promise-objects

// mdnがわかりやすい！
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise

//
//

// *** Promiseの状態遷移① **********************************************************************

// Promiseオブジェクトは、以下の3つの状態を持ちます。

// ** pending（保留・待機）:
//     * Promiseの初期状態です。非同期処理がまだ完了していない状態を表す。
//     * この状態では、Promiseの結果（成功または失敗）はまだ確定していません。

// ** fulfilled（履行）:
//     * 非同期処理が成功して完了した状態を表す。
//     * この状態になると、Promiseは成功時の結果（値）を保持します。

// ** rejected（拒否）:
//     * 非同期処理が失敗した状態を表します。
//     * この状態になると、Promiseは失敗時の理由（エラーオブジェクト）を保持します。

// これらの状態は、ECMAScriptの仕様において「Promiseの状態」として厳密に定義されており、
// `PromiseState`という内部スロットによって管理されます。(c++で管理？)
// https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-properties-of-promise-instances
// ↓
// import './promise-internal-slot';

//

// const pending = new Promise((resolve, reject) => {});
// console.log('ex1', pending);

// const fulfilled = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		resolve('resolve!!');
// 	}, 1000);
// });
// console.log('ex2', fulfilled);

// const rejected = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		reject('reject!!');
// 	}, 1000);
// });
// console.log('ex3', rejected);

//

// Promiseは、`pending`状態から始まり、`fulfilled`または`rejected`状態に遷移します。
// `fulfilled`または`rejected`状態に一度遷移すると、それ以降の状態遷移は発生しない。

// setTimeout(() => {
// 	console.log('ex4', fulfilled);
// 	console.log('ex2 === ex4', fulfilled === fulfilled);
// }, 1300);

// const fulfilled2 = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		resolve('fulfilledになるのでrejectを呼び出してもrejectedにはならない');
// 		reject('reject!!!');
// 	}, 1000);
// });
// console.log('ex5', fulfilled2);

//
//

// --------------------------------------------- tips ---------------------------------------------
// reject外でthrowされたら？

// const unexpected = new Promise((resolve, reject) => {
// 	throw new Error('例外エラー発生');
// });
// console.log('ex6', unexpected);

// // 内部的には以下のように暗黙的に処理されている。
// const unexpected2 = new Promise((resolve, reject) => {
// 	try {
// 		throw new Error('例外エラー発生');
// 	} catch (e) {
// 		reject(e);
// 	}
// });
// console.log('ex7', unexpected2);

//
//
//

// *** Promiseの状態遷移② **************************************************************

// JSのPromiseを使った非同期処理では
// `Promise.prototype.then`、`Promise.prototype.catch`、`Promise.prototype.finally`メソッドを使って、
// Promiseの状態遷移に応じて、登録されたコールバック関数を適切なタイミングで実行する。
// finallyに関してはthenとcatchの後に必ず呼ばれる。
// 各メソッドはPromiseStateがfulfilledかrejectedにならないと実行されない。

// pending状態では実行されない！
// const pendingTask = new Promise(() => {});
// pendingTask.then(() =>
// 	console.log('promiseStateがpending状態では実行されない')
// );
// pendingTask.catch(() =>
// 	console.log('promiseStateがpending状態では実行されない')
// );
// pendingTask.finally(() =>
// 	console.log('promiseStateがpending状態では実行されない')
// );

//
//

// **`Promise.prototype.then`メソッド**

// `then`メソッドは、Promiseが`fulfilled`状態になったときに実行されるコールバック関数と、
// `rejected`状態になったときに実行されるコールバック関数を引数として受け取ります。
// * Promiseが`fulfilled`状態になると、`then`メソッドの第1引数に渡されたコールバック関数が、Promiseの結果（値）を引数として実行されます。

// const thenTask = new Promise((resolve) => {
// 	resolve('promiseStateがfulfilledになる');
// });
// thenTask.then((v) => console.log(v));
// thenTask.catch(() => console.log('実行されない'));
// thenTask.finally(() => console.log('最後にfinallyが呼ばれる'));

//
//

// **`Promise.prototype.catch`メソッド**

// `catch`メソッドは、Promiseが`rejected`状態になったときに実行されるコールバック関数を引数として受け取ります。

// const catchTask = new Promise((resolve, reject) => {
// 	reject('promiseStateがrejectedになる');
// });
// catchTask.then((v) => console.log(v));
// catchTask.catch((e) => console.log('catchが実行される', e));
// catchTask.finally(() => console.log('最後にfinallyが呼ばれる'));

// --------------------------------------------- tips ---------------------------------------------
// `then`メソッドの第2引数にはPromiseが`rejected`状態になると実行されるコールバック関数を登録できます。
//  第2引数のコールバック関数は、Promiseの失敗理由（エラーオブジェクト）を引数として実行されます。
// `catch`メソッドは、`then(undefined, onRejected)`と等価です。

// const thenTask2 = new Promise((resolve, reject) => {
// 	reject('promiseStateがrejectedになる');
// });

// thenTask2.then(
// 	undefined,
// 	// rejectされると第二引数のコールバックが実行される。
// 	// rejectに渡された値が入る
// 	(e) => console.log('thenの第二引数のコールバックが実行される。', e)
// );
// // ↑は以下のcatchと同じ
// // thenの第二引数と同じ意味になる
// // ただし両方設定している時はthenの第二引数が実行されて、その後にcatchが呼ばれる
// thenTask2.catch((e) => console.log('catchが呼ばれる', e));
// thenTask2.finally(() => console.log('最後にfinallyが呼ばれる'));

//
//

// **`Promise.prototype.finally`メソッド**

// * `finally`メソッドは、Promiseが`fulfilled`または`rejected`状態になったときに実行される。
// * `finally`メソッドは、Promiseの状態に関係なく、常に実行されます。
// また値は取らない

// const finallyTask = new Promise((resolve, reject) => {
// 	resolve('promiseStateがfulfilledになる');
// 	// reject('promiseStateがrejectedになる');
// });
// finallyTask.then((v) => console.log('thenが動く', v));
// finallyTask.catch((v) => console.log('catchが動く', v));

// vはundefinedになる
// finallyTask.finally((v) => console.log('最後にfinallyが動く', v));

// --------------------------------------------- tips ---------------------------------------------

// 一度finallyが実行された場合、その後に登録されているfinallyを全て実行する。
// finallyTask.finally((v) => console.log('最後にfinally2.5が動く'));

// finallyの後にthenやcatchが登録された場合、実は動く。
// ただ動作としてはfinallyは常にthenやcatchの後に動く;

// finallyTask.then((v) => console.log('then2が動く'));
// finallyTask.then((v) => console.log('then3が動く'));
// finallyTask.catch((v) => console.log('catch2が動く'));
// finallyTask.catch((v) => console.log('catch3が動く'));
// finallyTask.finally((v) => console.log('最後にfinally2が動く'));

//
//
//

// *** 内部ではこういう動きになっている **************************************************************

// promiseではJavaScript のコードから直接アクセスすることはできませんが、
// 仕様書内で Promise の動作を定義するために5つの内部スロットを管理している。
// 内部スロットは、ECMAScript の仕様上で定義されている、オブジェクトの内部的なプロパティのようなものです。
// https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-properties-of-promise-instances

// **pendingの裏側**
const pendingTask = new Promise(() => {});
// PromiseStateとPromiseResultはブラウザから確認することができる。
// console.log(pendingTask);

// ブラウザからは確認できないが、pending状態の時にはPromiseFulfillReactions と PromiseRejectReactions の
// それぞれ Promise が成功（fulfilled）または失敗（rejected）したときに実行されるべきコールバック関数（リアクション）のリストを保持する内部スロットを持っている。

// PromiseFulfillReactions:
// 　Promise が成功したときに実行されるべき then メソッドの成功時コールバック関数のリスト。

// PromiseRejectReactions:
// 　Promise が失敗したときに実行されるべき then メソッドの失敗時コールバック関数、または catch メソッドのコールバック関数のリスト。

// これらのリストは、then メソッドや catch メソッドが呼び出されたときに、それぞれのコールバック関数が登録される。
// そして、Promise の状態が fulfilled または rejected に遷移したときに、これらのリストに登録されたコールバック関数が順番に実行されます。

// pendingTask.then((v) => console.log('PromiseFulfillReactionsに登録'));
// pendingTask.then((v) => console.log('PromiseFulfillReactionsに登録'));

// pendingTask.catch((v) => console.log('PromiseRejectReactionsに登録'));
// pendingTask.catch((v) => console.log('PromiseRejectReactionsに登録'));

// PromiseIsHandled
// PromiseIsHandled は、Promise の結果が少なくとも一度は処理されたかどうかを示す内部スロットです。

// このスロットは、Promise の結果が処理されたかどうかを追跡するために使用されます。
// 特に、未処理の Promise の拒否（Unhandled Promise Rejection）を検出するために重要です。
// PromiseIsHandled が false のままで Promise が拒否されると、環境によっては警告が表示されることがあります。

//
//

// **`Promise.prototype.finally`メソッドのゆくへ**

// `finally` メソッドは、`PromiseFulfillReactions` や `PromiseRejectReactions` とは異なる方法で管理されます。
// `finally` メソッドは、Promise の状態（成功または失敗）に関係なく、Promise が確定したときに常に実行されるコールバック関数を登録するために使用されます。

//

// **`finally` メソッドの管理方法**

// `finally` メソッドは、ECMAScript の仕様において、`then` メソッドの特殊なケースとして扱われます。
// 具体的には、`finally` メソッドは内部的に以下のように動作します。

// 1.  **`then` メソッドの利用:**
//     `finally` メソッドは、内部的に `then` メソッドを使用してコールバック関数を登録します。
//     成功時と失敗時の両方のコールバック関数に、同じ `finally` メソッドに渡されたコールバック関数を登録します。

// 2.  **コールバック関数の実行:**
//     Promise が確定（成功または失敗）すると、登録されたコールバック関数が実行されます。
//     `finally` メソッドに渡されたコールバック関数は、Promise の結果（値またはエラー）に関係なく実行されます。

// 3.  **結果の伝播:**
//     `finally` メソッドのコールバック関数は、Promise の結果を変更しません。
//     `finally` メソッドは、元の Promise と同じ結果を持つ新しい Promise を返します。
//     ただし、`finally` メソッドのコールバック関数内でエラーが発生した場合、そのエラーは新しい Promise の結果として伝播します。

// **`finally` メソッドの目的**

// `finally` メソッドは、Promise の状態に関係なく実行する必要があるクリーンアップ処理などに使用されます。例えば、以下のようなケースで `finally` メソッドが役立ちます。

// * リソースの解放（ファイルのクローズ、ネットワーク接続の切断など）
// * ローディング状態の解除
// * ログの記録

//
//

// *** Promiseの状態遷移④ **************************************************************

// thenメソッドの動きの違い
// バグの原因になりやすいpromiseの罠！

// const promiseTask = new Promise((r) => {
// 	setTimeout(() => {
// 		r('成功！');
// 	}, 1000);
// });

// [問題]以下のコードはどう動く？？

// promiseTask
// 	.then((v) => {
// 		console.log('then1', v);
// 		return '次のthenへ';
// 	})
// 	.then((v) => {
// 		console.log('then2', v);
// 		return '次のthenへ';
// 	})
// 	.then((v) => {
// 		console.log('then3', v);
// 		return '次のthenへ';
// 	});

// promiseTask.then((v) => {
// 	console.log('then4', v);
// 	return '次のthenへ';
// });
// promiseTask.then((v) => {
// 	console.log('then5', v);
// 	return '次のthenへ';
// });

// promiseのthenはチェーンメソッドになっていて、内部的にはthenが実行された時にpromiseが返される。
// const promiseTask2 = promiseTask.then((v) => {
// 	console.log('then6', v);
// 	return '次のthenへ';
// });
// const promiseTask3 = promiseTask2.then((v) => {
// 	console.log('then7', v);
// 	return '次のthenへ';
// });
// const promiseTask4 = promiseTask3.then((v) => {
// 	console.log('then8', v);
// 	return '次のthenへ';
// });

// ひとえにthenといっても参照している親のpromiseは別物を指しているということに注意が必要。

//
//

// [promiseマスターへの道]

// const spaghettiPromise = new Promise((r) => {
// 	setTimeout(() => {
// 		r('成功！');
// 	}, 1000);
// });

// spaghettiPromise
// 	.then((v) => {
// 		console.log('then1', v);
// 		return '次のthenへ';
// 	})
// 	.finally(() => console.log('finally1'))
// 	.then((v) => {
// 		console.log('then2', v);
// 		return '次のthenへ';
// 	})
// 	.then((v) => {
// 		console.log('then3', v);
// 		return '次のthenへ';
// 	})
// 	.finally(() => console.log('finally2'));

// spaghettiPromise.then((v) => {
// 	console.log('then4', v);
// 	return '次のthenへ';
// });
// spaghettiPromise.then((v) => {
// 	console.log('then5', v);
// 	return '次のthenへ';
// });
// spaghettiPromise.finally(() => console.log('finally3'));

// const spaghettiPromise2 = spaghettiPromise
// 	.then((v) => {
// 		console.log('then6', v);
// 		return '次のthenへ';
// 	})
// 	.finally(() => console.log('finally4'));

// const spaghettiPromise3 = spaghettiPromise2
// 	.then((v) => {
// 		console.log('then7', v);
// 		return '次のthenへ';
// 	})
// 	.finally(() => console.log('finally5'));

// const spaghettiPromise4 = spaghettiPromise3
// 	.then((v) => {
// 		console.log('then8', v);
// 		return '次のthenへ';
// 	})
// 	.finally(() => console.log('finally6'));

// 答え
// 1, 4, 5, f3, 6, f1, f4, 2, 7, 3, f5, f2, 8, f6
