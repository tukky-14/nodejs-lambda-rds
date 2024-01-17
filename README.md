### RDS プロキシを使用する接続

-   RDS データベースの作成
-   IAM ロールの作成
    -   Lambda から VPC と RDS にアクセスするためのロール
-   Lambda の作成
    -   RDS と同じ VPC に作成する
-   RDS のコンソール画面から「アクション」 > 「Lambda 関数のセットアップ」を選択
    -   RDS プロキシは選択しない
-   パラメータグループの設定
    -   rds.force_ssl 設定を 0 に設定する
        ※PostgreSQL バージョン 15 以降ではデフォルトで SSL が有効になっているため無効にする

### RDS プロキシを使用した接続

-   [AWS Lambda で PostgreSQL の RDS プロキシを使用する方法 - Node.js](https://qiita.com/tronicboy/items/eb91f57a6ec14418c629)
