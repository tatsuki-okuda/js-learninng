// JavaScriptにおけるエラー処理は、プログラムの実行中に発生する可能性のあるエラーを検出し、
// 適切に対応するための重要な仕組みです。エラー処理を適切に行うことで、プログラムの安定性を高め、ユーザーエクスペリエンスを向上させることができます。

// ***********************************************************************************************************************
// エラー処理の基本
// ***********************************************************************************************************************

// JavaScriptにおけるエラー処理の基本は、try...catch 文を使用することです。
// try ブロック内にエラーが発生する可能性のあるコードを記述し、catch ブロック内でエラーが発生した場合の処理を記述します。

// ***** 例1 *********************************************************

// function someFunctionThatMayThrowError() {
// 	throw new Error('エラーだよ');
// }

// try {
// 	// エラーが発生する可能性のあるコード
// 	const result = someFunctionThatMayThrowError();
// 	console.log(result);
// } catch (error) {
// 	// エラーが発生した場合の処理
// 	console.error('エラーが発生しました:', error);
// }

// ***** 例2 *********************************************************

// async function someAsync() {
// 	return (
// 		fetch('data.json')
// 			.then((response) => response.json())
// 			.then((data) => {
// 				throw new Error('エラーだよ');
// 			})
// 			// catchを入れている場合はtry...catchと合わせて2回エラーハンドリングを行うことになる。
// 			// .catch((error) => console.error('fetchでエラー！', error))
// 	);
// }

// // // async/awaitのエラー処理: async/awaitを使用する場合、`try...catch` 文を使用してエラーを処理します。
// async function fetchData() {
// 	try {
// 		const response = await someAsync();
// 		const data = await response.json();
// 		console.log('成功！', data);
// 	} catch (error) {
// 		console.error('catchでエラー！', error);
// 	}
// }
// fetchData();

// ***** 例3 *********************************************************

// setTimeoutの中身はtry...catchブロックを抜けてから実行されるのでエラーをキャッチできない
// try {
// 	setTimeout(() => {
// 		throw new Error('エラーだよ');
// 	}, 1000);
// 	console.log('成功！', data);
// } catch (error) {
// 	console.error('catchでエラー！', error);
// }

// ***********************************************************************************************************************
// エラーの種類
// ***********************************************************************************************************************

// JavaScriptには、様々な種類のエラーがあります。代表的なエラーとその例を以下に示します。

// * **SyntaxError:** 文法エラー
// try {
// 	eval('alert("Hello")'); // 閉じ括弧がないためSyntaxError
// } catch (error) {
// 	console.error(error); // SyntaxError: Unexpected end of input
// }

// * **ReferenceError:** 定義されていない変数を参照した場合
// try {
// 	console.log(undefinedVariable);
// } catch (error) {
// 	console.error(error); // ReferenceError: undefinedVariable is not defined
// }

// * **TypeError:** 変数や値が期待される型と異なる場合
// try {
// 	null.property;
// } catch (error) {
// 	console.error(error); // TypeError: Cannot read property 'property' of null
// }

// * **RangeError:** 数値が許容範囲外の場合
// try {
// 	(10).toFixed(-1);
// } catch (error) {
// 	console.error(error); // RangeError: toFixed() digits argument must be between 0 and 20
// }

// * **URIError:** encodeURI() や decodeURI() に不正な引数が渡された場合
// try {
// 	decodeURI('%');
// } catch (error) {
// 	console.error(error); // URIError: URI malformed
// }

// ***********************************************************************************************************************
// エラー処理のベストプラクティス
// ***********************************************************************************************************************

// 具体的なエラーメッセージ: エラーが発生した場合、ユーザーが問題を理解し、解決できるように、具体的なエラーメッセージを表示することが重要です。
// エラーログ: エラーが発生した場合、エラーログを記録することで、問題の特定やデバッグに役立ちます。
// エラーの再スロー: エラーをキャッチした後、必要に応じてエラーを再スローすることで、エラー処理を委譲できます。
// Promiseのエラー処理: Promiseを使用する場合、`catch()` メソッドを使用してエラーを処理します。

// fetch('data.json')
// 	.then((response) => response.json())
// 	.then((data) => console.log('fetch成功！', data))
// 	.catch((error) => console.error('fetchでエラー！', error));

// async/awaitのエラー処理: async/awaitを使用する場合、`try...catch` 文を使用してエラーを処理します。
// async function fetchData() {
// 	try {
// 		const response = await fetch();
// 		const data = await response.json();
// 		console.log('成功！', data);
// 	} catch (error) {
// 		console.error('catchでエラー！', error);
// 	}
// }

// ***********************************************************************************************************************
// エラー処理の重要性
// ***********************************************************************************************************************

// エラー処理は、プログラムの安定性を高め、ユーザーエクスペリエンスを向上させるために不可欠です。エラー処理を適切に行うことで、予期せぬエラーによるプログラムの停止を防ぎ、ユーザーに快適な体験を提供できます。
