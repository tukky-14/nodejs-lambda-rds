import pkg from 'pg';
const { Client } = pkg;

// グローバルスコープでクライアントを定義
let client;

// Lambdaハンドラ関数
export const handler = async (event) => {
    // 既存のクライアントがない場合は新たに作成
    if (!client) {
        client = new Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: 5432,
        });
    }

    try {
        // 接続が閉じている場合は再接続
        if (client._connected === false) {
            await client.connect();
        }

        // サンプルクエリの実行
        const res = await client.query('SELECT NOW()');

        // クエリ結果のログ出力と返却
        console.log(res.rows[0]);
        return res.rows[0];
    } catch (err) {
        // エラーのログ出力とスロー
        console.error('データベース接続エラー', err);
        throw err;
    }
    // 注意: Lambda 実行コンテキストが終了するまで接続は開いたままになる
    // Lambda 関数の実行が終了しても接続が閉じないように、client.end()の呼び出しはしない
};
