# ユーザー API

## 認証

この api を使用するには以下の API キーを headers に含めてリクエストをしてください。

```
apikey : key123
```

間違った API キーを指定、又は API キーを指定しなかった場合は`401`エラーが返されます。

## ユーザーを取得する

### HTTP リクエスト

```
GET http://localhost:8000/user
```

### レスポンス

成功すると、以下の構造のレスポンスの本文を返します。

```javascript
[
  {
    name: String,
    email: String,
    skills: Array,
  },
];
```

## ユーザーを作成する

### HTTP リクエスト

下記の URL に必須項目を body に含めて POST リクエストをしてください。

#### 必須項目

- name : `String`
- email : `String`

#### 他項目

- skills : `Array`

```
POST http://localhost:8000/user
```

### レスポンス

成功すると、以下の構造の作成されたユーザー情報のレスポンスの本文を返します。

```javascript
  {
    name: String,
    email: String,
    skills?: Array,
  }；
```
