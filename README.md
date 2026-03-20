# おてつだいきろくアプリ

6歳の子供がiPadで使えるお手伝い記録アプリです。GitHub Pagesでホスト、GitHub Contents APIでデータを永続化します。

## セットアップ

### 1. リポジトリ準備

GitHub上で新しいリポジトリを作成し、このコードをプッシュします。

### 2. Personal Access Token 発行

1. GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens
2. 「Generate new token」をクリック
3. Repository access: 対象リポジトリのみ選択
4. Permissions → Repository permissions → Contents: Read and write
5. トークンをコピー

### 3. config.js を設定

```bash
cp config.example.js config.js
```

`config.js` を編集して値を設定:

```js
const CONFIG = {
  OWNER: 'あなたのGitHubユーザー名',
  REPO: 'リポジトリ名',
  TOKEN: '発行したトークン',
  DATA_PATH: 'data',
};
```

> `config.js` は `.gitignore` に含まれているため、トークンがリポジトリに公開されることはありません。

### 4. GitHub Pages を有効化

1. リポジトリ → Settings → Pages
2. Source: Deploy from a branch
3. Branch: main, / (root)
4. Save

### 5. ローカルでテスト

```bash
python3 -m http.server 8080
# http://localhost:8080 を開く
```

## ファイル構成

```
├── index.html         カレンダー画面
├── day.html           お手伝い記録画面
├── summary.html       月次集計画面（親用）
├── api.js             GitHub Contents API モジュール
├── config.js          設定ファイル（gitignore対象）
├── config.example.js  設定テンプレート
└── data/              データ保存ディレクトリ
```

## 使い方

1. カレンダーで日付をタップ
2. お手伝いボタンをタップして記録（タップするたびに回数+1）
3. 自動保存されます（1.5秒後）
4. 「まとめをみる」でグラフや集計を確認

## データ形式

`data/YYYY-MM.json`:

```json
{
  "2026-03-21": {
    "dish": 2,
    "clean": 1
  }
}
```
