import React from 'react';
// import {withDocs} from 'storybook-readme'
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Sample from '../../components/sample'
import README from './README.md'

export default {
  title: 'HOGE/Sample',//サイドバーに表示する名前 /スラッシュで区切ることで改装構造にできる
  component: Sample,//コンポーネントを指定
  //初期値
  args: {
    text: 'hoge hoge',
  },
  //propsのGUIでのコントロール方法
  argTypes: {
    text: {
      control: {
        type: 'select', 
        options: [
          'primary', 
          'error', 
          'success', 
          'dark'
        ] 
      }
    },
    color: {
      control: {
        type: 'color',
      }
    }
  },
  parameters: {
    notes: { README },
    docs: {
      extractComponentDescription: ((_:any, { notes }:any) => notes?.README)
    }
  },
} as ComponentMeta<typeof Sample>;

/**
 * 
 * ComponentMeta
 * 
 * For the common case where a component's stories are simple components that receives args as props
 * コンポーネントのストーリーが、引数をプロップとして受け取るシンプルなコンポーネントである場合、一般的にはexport default { ... } as ComponentMeta<typeof Button>;
 * 
 */


//ストーリーのテンプレートを作成
const Template: ComponentStory<typeof Sample> = (args) => <Sample {...args} />

/**
 * 
 * ComponentStory
 * 
 * For the common case where a story is a simple component that receives args as props
 * ストーリーが、引数をプロップとして受け取るシンプルなコンポーネントであるという一般的なケースでは、const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />
 * 
 */



//作成したテンプレートをbindして個別のストーリーを作成
export const SampleComponent = Template.bind({})
SampleComponent.args = {
  text: 'あああああ',
  color: "#f00"
};

export const SampleComponent_second = Template.bind({})
SampleComponent_second.args = {

};
