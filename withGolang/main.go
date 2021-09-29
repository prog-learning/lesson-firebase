package main

import (
	"context"
	"log"
	"time"

	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

func main() {
	/* アプリの初期化処理 */
	ctx := context.Background()
	sa := option.WithCredentialsFile("./serviceAccount.json")
	app, err := firebase.NewApp(ctx, nil, sa)
	if err != nil {
		log.Fatalln(err)
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		log.Fatalln(err)
	}
	defer client.Close()

	/* データの追加 */
	_, err = client.Collection("collection_name").Doc("data-set-by-go-language-now").Set(ctx, map[string]interface{}{
		"content": "This is writing by Golang.",
		"name":    "郷 のぶみ",
		"sendAt":  time.Now(),
	})

	if err != nil {
		log.Fatalf("Failed adding alovelace: %v", err)
	}
	/* 切断 */
	defer client.Close()
}
