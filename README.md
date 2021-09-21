# Lesson Firebase

ページの移動を簡単にするために Next.js で構成してますが,create-react-app と react-router でも問題ありません

- Authentication
- Firestore
- Strage
- Hosting

## Cloud Functions

無料プランだとできない
https://firebase.google.com/pricing?hl=ja

```sh
firebase init functions
```

```sh
? What language would you like to use to write Cloud Functions? (Use arrow keys)
❯ JavaScript
  TypeScript
```

成功すると`/functions`ディレクトリが作成される

デプロイ

```sh
firebase deploy --only functions
```
