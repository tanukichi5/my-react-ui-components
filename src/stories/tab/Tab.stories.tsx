import React from 'react';
// import {withDocs} from 'storybook-readme'
import { ComponentStory, ComponentMeta } from '@storybook/react';
// import Sample from '../../components/sample'
import Tab from '../../components/tab/Tab'
import TabList from '../../components/tab/TabList';
import TabListItem from '../../components/tab/TabListItem';
import TabContent from '../../components/tab/TabContent';
import TabPanel from '../../components/tab/TabPanel';

import './tab.css';

import README from './README.md'

export default {
  title: 'TAB',//サイドバーに表示する名前 /スラッシュで区切ることで改装構造にできる
  component: Tab,//コンポーネントを指定
  //初期値
  args: {
    expandedPanel: 1,
  },
  //propsのGUIでのコントロール方法
  argTypes: {
    uuid: {
      table: {
        disable: true
      },
      control: {
        disable: true
      }
    }

    // color: {
    //   control: {
    //     type: 'color',
    //   }
    // }
  },
  parameters: {
    notes: { README },
    docs: {
      extractComponentDescription: ((_:any, { notes }:any) => notes?.README)
    }
  },
} as ComponentMeta<typeof Tab>;

/**
 * 
 * ComponentMeta
 * 
 * For the common case where a component's stories are simple components that receives args as props
 * コンポーネントのストーリーが、引数をプロップとして受け取るシンプルなコンポーネントである場合、一般的にはexport default { ... } as ComponentMeta<typeof Button>;
 * 
 */


//ストーリーのテンプレートを作成
const Template: ComponentStory<typeof Tab> = (args) => {
  return (
    <Tab {...args}>
      <TabList>
        <TabListItem />
        <TabListItem />
        <TabListItem />
      </TabList>

      <TabContent>
        <TabPanel>
          パネル1の内容です。
        </TabPanel>
        <TabPanel>
          サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキスト
        </TabPanel>
        <TabPanel>
          ああああああああああああああああ
        </TabPanel>
      </TabContent>
    </Tab>
  )
}

/**
 * 
 * ComponentStory
 * 
 * For the common case where a story is a simple component that receives args as props
 * ストーリーが、引数をプロップとして受け取るシンプルなコンポーネントであるという一般的なケースでは、const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />
 * 
 */


//  const pokemon_1 = [
//   {
//     title: 'フシギダネ',
//     detail: 'うまれたときから せなかに しょくぶつの タネが あって すこしずつ おおきく そだつ。'
//   },
//   {
//     title: 'ヒトカゲ',
//     detail: 'うまれたときから しっぽに ほのおが ともっている。ほのおが きえたとき その いのちは おわって しまう。'
//   },
//   {
//     title: 'ゼニガメ',
//     detail: `<b>ながい</b> くびを こうらのなかに ひっこめるとき いきおいよく みずでっぽうを はっしゃする。<a href="">リンク</a>`
//   }
// ]


//作成したテンプレートをbindして個別のストーリーを作成
export const TabComponent = Template.bind({})
TabComponent.args = {
  // content : pokemon_1
};

// export const AccordionComponent_second = Template.bind({})
// AccordionComponent_second.args = {

// };
