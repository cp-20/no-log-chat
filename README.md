# のーろぐちゃっと

![](https://no-log-chat.vercel.app/ogp.png)

のーろぐちゃっとはログが残らないことで、既存のチャットアプリにはあまり見られないリアルタイム性を追及したチャットアプリです

このリポジトリはクライアント側です。[サーバー側はこちら](https://github.com/cp-20/no-log-chat-server)

## アプリ

https://no-log-chat.vercel.app/

## 詳しくは

[Zenn の記事](https://zenn.dev/cp20/articles/no-log-chat-app) にまとめています

## 開発者クイックスタート

必要なもの: [Node.js](https://nodejs.org/ja/), [Yarn](https://yarnpkg.com/)

**1. このリポジトリのクローン**

```
git clone https://github.com/cp-20/no-log-chat
cd no-log-chat
```

**2. 依存関係のインストール**

```
yarn
```

**3. サーバーのセットアップ**

[サーバー側のリポジトリ](https://github.com/cp-20/no-log-chat-server)を手順に従ってセットアップする

**4. サーバーのアドレスを入力**

環境変数`NEXT_PUBLIC_API_SERVER`に 3 でセットアップしたサーバーの URL を入力する。

`.env`というファイルを作成すると自動で読み込んでくれるのでそれでも可

**5. サーバー起動**

- ビルド `yarn build`
- 起動 `yarn start` (要ビルド)
- 開発用サーバー起動 `yarn dev`
