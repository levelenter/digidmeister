# ネットワークサンプル導入手順

## 事前準備
  nodejsとnpmをインストール
 - 動作確認環境 
   - npm 6.14.8 
   - node v12.19.0

<br>

## 依存パッケージのダウンロード
  プロジェクトルートフォルダで`npm install`と入力して実行

<br>

## サーバーの起動

  プロジェクトルートフォルダで`npm run start`を実行  
  
  この起動スクリプトは`package.json`に記述されたscriptを実行します  

<br>

## 動作確認

ブラウザを2つ立ち上げてlocalhost:8080でアクセスしてください。

簡易なアバターがお互いを認識できるはずです。

<br>

## 参考資料: networked-aframe のドキュメント

https://github.com/networked-aframe/networked-aframe


## WebRTCの付加情報
1. a-scene要素の networked-scene　属性に ```adapter: webrtc```に変更 ```audio:true```を追加
2. avatorのテンプレートにnetworked-audio-source属性を追加

signalingはlocalhost:8080にWebScocketで接続

STUNは、Googleのstunを使う
stun:stun1.l.google.com:19302
stun:stun2.l.google.com:19302
stun:stun3.l.google.com:19302
stun:stun4.l.google.com:19302