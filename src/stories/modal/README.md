# モーダルコンポーネント

アクセシビリティとユーザビリティを考慮したモーダルコンポーネントです。

- モーダルオープン時にスクリーンリーダーから除外する要素を指定できます
- モーダルオープン時にフォーカスをモーダル内に固定します
- ESCキーでモーダルを閉じることができます



## インポート

モーダルのコンポーネントをインポート

```react
import Modal from './components/Modal';
```



## 基本の使い方

モーダルの基本的な使い方の流れは以下の通りです

- 任意の開くボタンを作成
- stateとボタンのクリックアクションを設定
- モーダルコンポーネントにstateをpropsで渡す

### 1, モーダル開くボタンを作成

まずはモーダルを開くボタンを作成します。

```tsx
import React from "react";

const Sample: React.FC = () => {
  
  return (
    <button>モーダルを開くボタン</button>
  );
}

export default Sample;
```

ここでは普通のbuttonタグを使用していますが、タグは何でもOKです。



### 2, 開くボタンをクリックしたときのアクションを設定

1で定義したボタンにクリックイベントを作成します。

- `useState`でstateを定義します
  - `siteContent ` : サイトの全体を囲っている要素を指定（bodyやhtml以外）※ここで指定した要素はモーダルオープン時にスクリーンリーダーの対象から除外されます
  - `expanded` : モーダルの開閉状態を現します。最初は閉じているので`false`でOK
- `modalToggle`はボタンをクリックしたときに開閉状態を反転します。（モーダルが閉じているなら開く、開いているなら閉じる）

```tsx
import React, { useState } from "react";
//useStateを読み込み↑↑↑↑

const Sample: React.FC = () => {

  //=======追加=========↓↓↓↓
  //モーダルのstate
  const [modalState, setModalState] = useState({
    siteContent: '#root',
    expanded: false,
  });

  //開くボタンをクリックしたときの関数
  const modalToggle = () => {
    setModalState((currentState) => ({
      ...currentState,
      expanded: !modalState.expanded
    }))
  }
  //=======追加=========↑↑↑↑

  return (
    //onClickイベントを追加↓↓↓↓
    <button onClick={modalToggle}>モーダルを開くボタン</button>
  );
}

export default Sample;
```



### 3, モーダル本体を作成

- モーダルをインポートします
- `<Modal>`に**2**で作成したstateをpropsで渡します
  - `{...modalState}` : スプレッド構文で全て渡す
  - `setRootState={setModalState}` : setRootStateという名前のpropsに`setModalState`を渡す

```tsx
import React, { useState } from "react";
import Modal from './components/Modal'; //←モーダルコンポーネントを読み込み

const Sample: React.FC = () => {

  //モーダルのstate
  const [modalState, setModalState] = useState({
    siteContent: '#root',
    expanded: false,
  });

  //開くボタンをクリックしたときの関数
  const modalToggle = () => {
    setModalState((currentState) => ({
      ...currentState,
      expanded: !modalState.expanded
    }))
  }

  return (
    <button onClick={modalToggle}>モーダルを開くボタン</button>

    //=======追加=========↓↓↓↓
    <Modal {...modalState} setRootState={setModalState}>
      //ここにモーダルの内容を好きに記述
      <p>モーダルです</p>
      <button onClick={modalToggle}>モーダルを閉じる</button>
    </Modal>
    //=======追加=========↑↑↑↑
  );
}

export default Sample;
```

#### 閉じるボタンについて

モーダルを閉じるボタンは開くボタンと同じでも大丈夫です。

クリックで`modalToggle`を実行することができればOK！



以上で基本的な使い方は終わりです



## Options

その他propsを渡すことで挙動を変更できます
大半が初期設定で大丈夫です。

| props             | type             | default     | description                                                  |
| ----------------- | ---------------- | ----------- | ------------------------------------------------------------ |
| id                | string           | null        | モーダルに任意のid属性を付与できます。                       |
| portalTarget      | string           | "body"      | モーダルをレンダリングする場所。                             |
| siteContent       | string           | "#root"     | モーダルオープン時にスクリーンリーダーから除外する要素を指定できます。<br />cssセレクターで指定してください。 |
| expanded          | boolean          | false       | モーダル開閉状態を指定します。                               |
| backFixed         | boolean          | true        | モーダルオープン時に背景を固定する。※モーダルの裏がスクロールしないようにする |
| clickOutsideClose | boolean          | true        | モーダルの外側をクリックしたときにモーダルを閉じる。         |
| domHide           | boolean          | true        | モーダルが開いている時以外にソースコードから消す。           |
| cssAnimationType  | string \| null   | "animation" | "animation"もしくは"transition"<br />モーダルに適用するcssに応じて切り替えてください。 |
| customStyles      | SerializedStyles |             | カスタムスタイルを適用できます。                             |
|                   |                  |             |                                                              |

propsの渡し方は「基本の使い方」の2で作成したstateに入れるだけです

```tsx
const [modalState, setModalState] = useState({
  siteContent: '#root',
  expanded: false,
  backFixed: false,
  clickOutsideClose: false
});
```



### customStylesについて

モーダルには以下のスタイルがデフォルトで設定されています。

`customStyles`ではこれを上書きすることができます。

```tsx
import { css, keyframes } from '@emotion/react'

const modalOpen = keyframes`
  0% {
      opacity: 0;
      visibility: visible;
  }
  100% {
      opacity: 1;
      visibility: visible;
  }
`

const modalClose = keyframes`
  0% {
      opacity: 1;
      visibility: visible;
  }
  100% {
      opacity: 0;
      visibility: hidden;
  }
`

//モーダル全体の枠
export const container = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  opacity: 0;
  visibility: hidden;
  z-index: 100;
  animation-duration: .3s;
  animation-timing-function: ease-out;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  &[aria-hidden="true"] {
    animation-name: ${modalClose};
  }
  &[aria-hidden="false"] {
    animation-name: ${modalOpen};
  }
`;


//モーダルのオーバーレイ
export const overlay = css`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.8;
  z-index: -1;
`;

```

`container`のデフォルトスタイルのposition以外でやっていることは`animation`プロパティでフェードイン、フェードアウトです。

`overlay`はposition以外やっていることは色の指定と透明度です。

#### customStylesの使い方

※前提としてemotionのインストールが必須です

```tsx
import { css, keyframes } from '@emotion/react'

const myStyles = {
  container: css`
    //ここにモーダル全体の枠のスタイルを記述
  `,
  overlay: css`
    //ここにモーダルのオーバーレイのスタイルを記述
  `,
}
```

`container`と`overlay`どちらか片方だけでもOK
※カラ状態で渡すとそれで上書きされるので注意してください

作成したカスタムスタイルをstateに渡してください

```tsx
const [modalState, setModalState] = useState({
  siteContent: '#root',
  expanded: false,
  customStyles: myStyles //←追加
});
```



### cssAnimationTypeについて

`customStyles`で`container`のアニメーション設定を変更する場合は以下の対応する設定にしてください。

#### containerをanimation（css）でアニメーションする場合（デフォルト）

`cssAnimationType : "animation"`としてください。

#### containerをtransition（css）でアニメーションする場合

`cssAnimationType : "transition"`としてください。
※cssの仕様上transitionアニメーションは`domHide`オプションが`false`でないとアニメーションしません。

#### cssでアニメーションをしない場合

`cssAnimationType :null `としてください。



