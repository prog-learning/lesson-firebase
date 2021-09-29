# Lesson Firebase

Go で Firebase を使ってみる

## 1. SDK のインストール

package を管理するための初期設定

```sh
go mod init withGolang
```

SDK のインストール

```sh
go get firebase.google.com/go
```

## 2. `serviceAccount.json`の作成

[IAM と管理/サービス アカウント](https://console.cloud.google.com/iam-admin/serviceaccounts?hl=ja)
GCP で作成した JSON ファイルを使用

## 3. コードの記述

実行

```sh
go run main.go
```

ルール無視で書き込みが可能！

## 参考
