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
