# 英単語帳（中学・高校）

お子さんの家庭学習用の英単語アプリ（単体Web／PWA）。中1〜高校の約1,200語＋熟語。
読み方（カタカナ）・発音・自動再生・4択/スペル問題・AI苦手分析・デイリーゴール・ダークモード。

## 構成
- `index.html` … アプリ本体
- `word-book-data.js` … 単語データ（`window.WORD_DATA`）
- `manifest.json` / `sw.js` / `icon.svg` … PWA（ホーム画面に追加・オフライン対応・自動更新）

## 公開と自動更新の仕組み
GitHub Pages で公開。**内容を更新して `git push` すると Pages が自動で再デプロイ**され、
Service Worker はネットワーク優先のため、**スマホ側は次回オンライン起動で自動的に最新**になる。

## 更新のしかた（メモ）
```
git add -A && git commit -m "更新内容" && git push
```
