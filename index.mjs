const pg = require('pg');
const AWS = require('aws-sdk');

exports.handler = async (event) => {
    const signer = new AWS.RDS.Signer({
        region: 'ap-northeast-1', // RDSプロキシを作ったRegionに合わせる
        hostname: process.env.HOST, // 後々環境変数で設定する
        port: 5432,
        username: 'master', // 前回の記事で作成したSecretのusername
    });

    const token = signer.getAuthToken({
        username: 'master',
    });

    const dbConfig = {
        user: 'master',
        password: token,
        port: 5432,
        database: 'dev', // データベース作成時に指定したもの
        host: process.env.HOST,
        ssl: true,
    };

    const client = new pg.Client(dbConfig);

    client.connect();

    const res = await client.query('SELECT NOW();');

    await client.end();

    const response = {
        statusCode: 200,
        body: JSON.stringify(res.rows[0]),
    };
    return response;
};
