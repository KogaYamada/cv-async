# 犬の写真 API を叩く

## いつも通り React のプロジェクトを作成する

ターミナル

```
npx create-react-app dog-api
```

## 作成できたらフォルダに移動

ターミナル

```
cd dog-api
```

## src フォルダの中身を消して index.js と App.js を作成

src の中身がこんな感じになれば OK

```
src
 ┣ App.js
 ┗ index.js
```

## パッケージのインストール

今回は HTTP リクエストを行うために[axios](https://github.com/axios/axios)を使います。 <br />
↓yarn

```
yarn add axios
```

↓npm

```
npm i axios
```

## ファイルの下準備

index.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

App.js

```javascript
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  // 犬の写真が入る
  const [image, setImage] = useState('');
  // 犬の写真を取得する関数
  const fetchData = () => {
    // ここに通信する処理を書く
  };

  return (
    <>
      <img alt="dog" src={image} />
      <button onClick={fetchData}>取得</button>
    </>
  );
};

export default App;
```

## yarn start or npm start する

ターミナル <br />
↓yarn

```
yarn start
```

↓npm

```
npm start
```

これで http://localhost:3000 にアクセスすると「取得」と書いたボタンと img タグと思われる奴が表示される。

## axios で通信する

今回は[DOG CEO](https://dog.ceo/)のデータを取得する。<br />
これを書いてブラウザでボタンを押すとコンソールに通信した結果が表示される(今回は「通信に成功しました」と表示される) <br />
通信した情報はブラウザの検証ツールの network タブにいろいろ乗ってます。いろいろ探してみてください。
App.js

```javascript
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  // 犬の写真が入る
  const [image, setImage] = useState('');
  // 犬の写真を取得する関数
  const fetchData = () => {
    axios
      .get('https://dog.ceo/api/breeds/image/random') //axiosで指定したURLにGETリクエスト(通信)する
      .then((response) => console.log('通信に成功しました')) // 通信に成功した時の処理
      .catch((error) => console.log('通信に失敗しました')); // 通信に失敗した時の処理
  };

  return (
    <>
      <img alt="dog" src={image} />
      <button onClick={fetchData}>取得</button>
    </>
  );
};

export default App;
```

## 取得したデータを state に保存する

取得したデータの data プロパティは以下のようになってると思います。(多分)

```
{
  message: "写真のURL",
  status: "success"
}
```

犬の写真が欲しいので、それを useState の image に格納します。
これでブラウザのボタンを押す度に犬の写真が取得できます。

```javascript
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  // 犬の写真が入る
  const [image, setImage] = useState('');
  // 犬の写真を取得する関数
  const fetchData = () => {
    axios
      .get('https://dog.ceo/api/breeds/image/random')
      .then((response) => setImage(response.data.message))
      .catch((error) => console.log('通信失敗', error));
  };

  return (
    <>
      <img alt="dog" src={image} />
      <button onClick={fetchData}>取得</button>
    </>
  );
};

export default App;
```

以上で dog api は終わりです。
