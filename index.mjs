// 'pg'モジュールのインポート
import pkg from 'pg';
const { Client } = pkg;

// PostgreSQLクライアントのインスタンスを作成
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME, // データベース名
    password: process.env.DB_PASSWORD, // データベースパスワード
    port: 5432, // PostgreSQLのデフォルトポート（変更があれば変更する）
});

// Lambdaハンドラ関数
export const handler = async (event) => {
    try {
        // PostgreSQLデータベースに接続
        await client.connect();

        // サンプルクエリの実行（例：現在時刻の取得）
        const res = await client.query('SELECT NOW()');

        // クエリ結果のログ出力と返却
        console.log(res.rows[0]);
        return res.rows[0];
    } catch (err) {
        // エラーのログ出力とスロー
        console.error('データベース接続エラー', err);
        throw err;
    } finally {
        // データベース接続の終了
        await client.end();
    }
};
