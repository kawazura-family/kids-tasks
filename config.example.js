// config.js のテンプレート
// このファイルを config.js にコピーして値を設定してください
// cp config.example.js config.js

const CONFIG = {
  OWNER: 'your-github-username',   // GitHubユーザー名
  REPO: 'your-repo-name',          // リポジトリ名
  TOKEN: 'ghp_xxxxxxxxxxxx',       // Personal Access Token (Contents権限)
  DATA_PATH: 'data',               // データ保存ディレクトリ
};

const TASKS = [
  { id: 'dish',      emoji: '🍽️', label: 'おさらあらい' },
  { id: 'laundry',   emoji: '👕', label: 'せんたくもの' },
  { id: 'clean',     emoji: '🧹', label: 'そうじ' },
  { id: 'cook',      emoji: '🍳', label: 'りょうりのおてつだい' },
  { id: 'pet',       emoji: '🐶', label: 'ぺっとのおせわ' },
  { id: 'tidy',      emoji: '🧸', label: 'おかたづけ' },
  { id: 'water',     emoji: '🌱', label: 'みずやり' },
  { id: 'errand',    emoji: '🛒', label: 'おつかい' },
];
