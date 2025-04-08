// ***********************************************************************************************************************
// JavaScript における "thenable" オブジェクトについて
// ***********************************************************************************************************************

// **非同期の中で非同期が呼ばれたら？**********************************************************************

// const task1 = new Promise((r) => {
// 	const task2 = new Promise((r2) => {
// 		setTimeout(() => {
// 			console.log('task2のsetTimeoutが完了');
// 			r2('task2が完了！');
// 		}, 1000);
// 	});
// 	r(task2);
// });

// task1.then((v) => console.log('task1の完了', v));

// resolveメソッドに非同期処理を渡すと渡した非同期処理の完了を待ってから元の非同期の処理が完了する。
// 実はこれ、resolveに渡された値がpromiseだから変換仕様としているのではなくて、
// thenというプロパティを持ったオブジェクトだから変換されている
// →　これをthenableオブジェクトという。

//
//

// **thenable オブジェクトとは？**********************************************************************

// * `then()` メソッドを持つオブジェクトのことです。
// * Promise と同様に、非同期処理の結果を扱うために使用できます。
// * Promise 以外のオブジェクトでも、`then()` メソッドを実装することで、Promise のように扱うことができます。

// **thenable オブジェクトの役割**

// * Promise と互換性のある非同期処理を実装するために使用されます。
// * サードパーティライブラリなどで、独自の非同期処理の仕組みを提供するために利用されます。
// * `await`キーワードでPromiseオブジェクト以外でも値を取り出すことができます。

// **thenable オブジェクトの例**

const thenable = {
	then(resolve, reject) {
		setTimeout(() => {
			console.log('thenableオブジェクトのsetTimeoutが完了');
			resolve('thenable result');
		}, 1000);
	},
};

const task = new Promise((r) => {
	r(thenable);
});

task.then((v) => console.log('taskの完了', v));

//
//

// **thenable オブジェクトの注意点********************************************************************

// * thenable オブジェクトは、必ずしも Promise と完全に互換性があるわけではありません。
// * `then()` メソッドの挙動が Promise と異なる場合があるため、注意が必要です。

// **まとめ**

// * thenable オブジェクトは、`then()` メソッドを持つオブジェクトであり、Promise と同様に非同期処理の結果を扱うために使用されます。
// * Promise と互換性のある非同期処理を実装したり、サードパーティライブラリで独自の非同期処理の仕組みを提供したりするために利用されます。
// * `await`キーワードを使用することでPromiseオブジェクトと同様に非同期処理の結果をあつかうことができます。

// 参考資料

// * Promise チェーン - 現代の JavaScript チュートリアル: [https://ja.javascript.info/promise-chaining](https://ja.javascript.info/promise-chaining)
// * Promise.prototype.then の仕様挙動｜イベントループとプロミスチェーンで学ぶJavaScriptの非同期処理 - Zenn:[https://zenn.dev/estra/books/js-async-promise-chain-event-loop/viewer/m-epasync-promise-prototype-then](https://zenn.dev/estra/books/js-async-promise-chain-event-loop/viewer/m-epasync-promise-prototype-then)
// * await は Promise 以外のオブジェクトでも値を取り出せる - azukiazusa.dev:[https://azukiazusa.dev/blog/await-is-not-only-for-promise/](https://azukiazusa.dev/blog/await-is-not-only-for-promise/)
