// ***********************************************************************************************************************
// JS非同期処理の概要
// ***********************************************************************************************************************

// 非同期処理は、プログラムの実行を一時停止せずに、時間のかかる処理（ネットワークリクエスト、ファイル読み込みなど）をバックグラウンドで実行する仕組みです。
// これにより、ユーザーインターフェースがフリーズすることなく、スムーズな操作性を維持できます。

// ***********************************************************************************************************************
// 非同期処理の重要性
// ***********************************************************************************************************************

// ユーザー体験の向上: 時間のかかる処理を待たずに、他の操作を続けられるため、ストレスのない快適なWebサイトやアプリケーションを提供できます。
// パフォーマンスの向上: 複数の処理を並行して実行することで、プログラム全体の処理時間を短縮できます。
// リソースの有効活用: CPUやネットワークなどのリソースを効率的に利用できます。

// ***********************************************************************************************************************
// 非同期処理の主な方法
// ***********************************************************************************************************************

// JavaScriptにおける非同期処理には、主に以下の方法があります。

// コールバック関数: 非同期処理が完了したときに実行される関数を引数として渡します。
//      例：setTimeout()、addEventListener()

// Promise: 非同期処理の結果（成功または失敗）を表現するオブジェクトです。
//      例: then()、catch()、finally()などのメソッドを使って、結果に応じた処理を記述します。

// async/await: Promiseをより簡潔に記述するための構文です。
//      例: async関数内でawaitキーワードを使うことで、非同期処理の完了を待機し、同期処理のように記述できます。

// ***********************************************************************************************************************
// 非同期処理の例
// ***********************************************************************************************************************

// 例：Promiseを使った非同期処理
function fetchData(url) {
	return new Promise((resolve, reject) => {
		fetch('data.json')
			.then((response) => response.json())
			.then((data) => resolve(data))
			.catch((error) => reject(error));
	});
}

fetchData()
	.then((data) => console.log('sample1', data))
	.catch((error) => console.error(error));

// 例：async/awaitを使った非同期処理
async function fetchDataAsync() {
	try {
		const response = await fetch('data.json');
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}

fetchDataAsync().then((data) => console.log('sample2', data));

// ***********************************************************************************************************************
// 非同期処理の注意点
// ***********************************************************************************************************************

// コールバック地獄: コールバック関数を多用すると、コードが複雑になり、可読性が低下する可能性があります。
// エラー処理: 非同期処理では、エラーが発生する可能性があるため、適切なエラー処理が必要です。
// イベントループ: JavaScriptの非同期処理は、イベントループと呼ばれる仕組みで管理されています。イベントループの理解は、非同期処理を効果的に扱う上で重要です。

// ***********************************************************************************************************************
// まとめ
// ***********************************************************************************************************************
// JavaScriptの非同期処理は、Webアプリケーション開発において不可欠な技術です。非同期処理を理解し、適切に活用することで、
// より快適で効率的なWebアプリケーションを開発できます。
