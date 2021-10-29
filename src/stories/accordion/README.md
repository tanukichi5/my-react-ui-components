# アコーディオンのコンポーネント

## インポート

アコーディオンのコンポーネントをインポート

```react
import { Accordion } from 'xxxxxxxx'
```

### アコーディオンの内容を定義

以下のように配列で内容を定義します

```react
const pokemon_1 = [
  {
    title: 'フシギダネ',
    detail: 'うまれたときから せなかに しょくぶつの タネが あって すこしずつ おおきく そだつ。'
  },
  {
    title: 'ヒトカゲ',
    detail: 'うまれたときから しっぽに ほのおが ともっている。ほのおが きえたとき その いのちは おわって しまう。'
  },
  {
    title: 'ゼニガメ',
    detail: `ながい くびを こうらのなかに ひっこめるとき いきおいよく みずでっぽうを はっしゃする。`
  }
]
```

定義した内容をcontentでpropsを渡す

```react
<Accordion content={pokemon_1} />
```



## Options

その他propsを渡すことで挙動を変更できます

| props                 | type     | default    | description                                |
| --------------------- | -------- | ---------- | ------------------------------------------ |
| defaultExpandedPanels | array    | []         | 最初から開くパネル。パネルのindexを指定。  |
| easing                | string   | "ease-out" | イージング。CSSのプロパティを指定          |
| duration              | string   | ".3s"      | パネルの開閉速度。CSSのプロパティを指定    |
| notTransition         | boolean  | false      | transitionアニメーションを無効にできます。 |
| multipleExpanded      | boolean  | true       | パネルを複数開くかどうか                   |
| onOpen                | function |            | パネルを開いたときのコールバック           |
| onClose               | function |            | パネルを閉じたときのコールバック           |

### 例

```react
<Accordion content={pokemon_1} defaultExpandedPanels={[0,1]} duration={".6s"} onOpen={open} onClose={close}>
```

上記の例は

- 最初から1番と2番のパネルをオープン
- パネル開閉速度を0.6秒
- パネルを開いたときにopen関数を実行
- パネルを閉じたときにclose関数を実行


