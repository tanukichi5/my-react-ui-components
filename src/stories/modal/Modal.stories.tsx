import React, { useState } from 'react';
// import {withDocs} from 'storybook-readme'
import { ComponentStory, ComponentMeta } from '@storybook/react';
// import Sample from '../../components/sample'
import Modal from '../../components/modal/Modal'
// import README from './README.md'

import { css, keyframes } from '@emotion/react'

export default {
  title: 'MODAL',//サイドバーに表示する名前 /スラッシュで区切ることで改装構造にできる
  component: Modal,//コンポーネントを指定
  //初期値
  args: {
    // id: "modal-1",
    // portalTarget: 'body',
    // siteContent: '#root',
    // clickOutsideClose: true,
    // backFixed: true,
    
    // domHide:true,
  },
  //propsのGUIでのコントロール方法
  argTypes: {
    cssAnimationType: {
      control: {
        type: 'select', 
        options: [
          "transition", 
          "animation",
        ] 
      }
    },
    expanded: {
      table: {
        disable: true
      },
      control: {
        disable: true
      }
    },
    modalDOM: {
      table: {
        disable: true
      },
      control: {
        disable: true
      }
    },
    tabindex: {
      table: {
        disable: true
      },
      control: {
        disable: true
      }
    },
    sethogeState: {
      table: {
        disable: true
      },
      control: {
        disable: true
      }
    },
    'aria-hidden': {
      table: {
        disable: true
      },
      control: {
        disable: true
      }
    },
    modalSource: {
      table: {
        disable: true
      },
      control: {
        disable: true
      }
    },

  },
  parameters: {
    // notes: { README },
    docs: {
      extractComponentDescription: ((_:any, { notes }:any) => notes?.README)
    }
  },
} as ComponentMeta<typeof Modal>;

/**
 * 
 * ComponentMeta
 * 
 * For the common case where a component's stories are simple components that receives args as props
 * コンポーネントのストーリーが、引数をプロップとして受け取るシンプルなコンポーネントである場合、一般的にはexport default { ... } as ComponentMeta<typeof Button>;
 * 
 */


//ストーリーのテンプレートを作成
const Template: ComponentStory<typeof Modal> = (args) => {
  const [hogeState, sethogeState] = useState({
    // portalTarget: '#root',
    id: "modal-1",
    siteContent: '#root',
    expanded: false,
    // cssAnimationType: 'transition',
    // backFixed: false,
    // domHide: false,
    // clickOutsideClose: true,
    // cssAnimationType: "transition",
    // customStyles: customStyles,
  });
  function modalToggle() {
    sethogeState({
      ...hogeState,
      expanded: !hogeState.expanded
    })
  }
  return (
    <>
      <button onClick={modalToggle}>モーダル</button>
      <Modal {...args} {...hogeState} setRootState={sethogeState}>
        <div className="aaaa">
          <p>モーダル</p>
          <button onClick={modalToggle}>閉じる</button>
          <button onClick={modalToggle}>閉じる</button>
          <button onClick={modalToggle}>閉じる</button>
        </div>
      </Modal>
    </>
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
export const ModalComponent = Template.bind({})
ModalComponent.args = {
  id: "modal-1",
  portalTarget: 'body',
  siteContent: '#root',
  clickOutsideClose: true,
  backFixed: true,
  
  domHide:true,
  cssAnimationType: "animation"
  // content : pokemon_1
};


const customStyles = {
  container: css`
    height: 100%;
    left: 0;
    overflow: hidden;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    opacity: 0;
    visibility: hidden;
    /* transition: all .6s; */
    &[aria-hidden="true"] {
      opacity: 0;
      visibility: hidden;
    }
    &[aria-hidden="false"] {
      opacity: 1;
      visibility: visible;
    }
  `,
  overlay: css`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #ffd3d3;
    opacity: 0.8;
    z-index: 1;
  `,
}

export const ModalComponent_customStyle = Template.bind({})
ModalComponent_customStyle.args = {
  id: "modal-1",
  portalTarget: 'body',
  siteContent: '#root',
  clickOutsideClose: true,
  backFixed: true,
  // domHide:false,
  cssAnimationType: "transition",
  customStyles: customStyles,
};

