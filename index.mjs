import pkg from 'pg';
const { Client } = pkg;

// グローバル変数でクライアントインスタンスを保持
let client;

// データベースへの接続を確立する関数
async function connectToDatabase() {
    if (!client) {
        client = new Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: 5432,
        });

        await client.connect();
    }
    return client;
}

// Lambdaハンドラ関数
export const handler = async (event) => {
    try {
        // データベースに接続（接続済みの場合は再利用）
        const db = await connectToDatabase();

        // サンプルクエリの実行
        const res = await db.query('SELECT NOW()');
        console.log(res);

        // クエリ結果のログ出力と返却
        console.log(res.rows[0]);
        return res.rows[0];
    } catch (err) {
        // エラーのログ出力とスロー
        console.error('データベース接続エラー', err);
        throw err;
    }
    // 注意: データベース接続を閉じない（Lambda 実行コンテキストが保持される）
    // Lambda 関数の実行が終了しても接続が閉じないように、client.end()の呼び出しはしない
};
