/** @jsxImportSource @emotion/react */
import React, {useState, useEffect, useCallback, useRef} from "react";
import ModalPortal from './ModalPortal'
// import ModalDelay from './ModalDelay'
// import useEffectCustom from "./helpers/useEffectCustom";
import { attachEvent } from './helpers/attachEvent'
import { backFixed } from './helpers/backFixed'
import { retainFocus } from './helpers/retainFocus'

// import { css, keyframes } from '@emotion/react'
import * as styles from "./ModalStyle";
import './modal.css';
export interface InjectedModalState {
  id: string;
  portalTarget?: string;
  siteContent?: string;
  setRootState?:any;
  expanded: boolean;
  backFixed?: boolean;
  clickOutsideClose?: boolean;
  modalDOM?: React.RefObject<HTMLInputElement> | null,
  "aria-hidden"?: boolean,
  tabindex?: number,
  domHide?: boolean,
  cssAnimationType?: string | null,
  modalSourceHide?: boolean,
  customStyles?: any
}



const Modal: React.FC<InjectedModalState> = (props) => {

  const modalElement = useRef(null)

  const [modalState, setModalState] = useState({
    id:props.id,
    portalTarget: !(props.portalTarget === undefined) ? props.portalTarget : "body",
    siteContent: !(props.siteContent === undefined) ? props.siteContent : "#root",
    expanded: props.expanded,
    backFixed: !(props.backFixed === undefined) ? props.backFixed : true,
    clickOutsideClose: !(props.clickOutsideClose === undefined) ? props.clickOutsideClose : true,
    "aria-hidden": !props.expanded,
    tabindex: -1,
    cssAnimationType: !(props.cssAnimationType === undefined) ? props.cssAnimationType : "animation",
    customStyles: !(props.customStyles === undefined) ? props.customStyles : {},
    domHide: !(props.domHide === undefined) ? props.domHide : true,
    modalSourceHide: true,
    modalDOM: modalElement,
  });

  //モーダル枠のスタイル設定
  const modalStyle_container = !(modalState.customStyles.container === undefined)
  ? modalState.customStyles.container
  : styles.container

  //モーダルオーバーレイのスタイル設定
  const modalStyle_overlay = !(modalState.customStyles.overlay === undefined)
  ? modalState.customStyles.overlay
  : styles.overlay


  //propsが変更された場合
  useEffect(() => {

    setModalState((currentState) => ({
      ...currentState,
      expanded: props.expanded,
      modalDOM: modalElement,
      clickOutsideClose: props.clickOutsideClose!,
      backFixed: props.backFixed!,
      domHide: props.domHide!,
      "aria-hidden": !props.expanded,
    }))

    // console.log(modalState.modalDOM.current)
    
  }, [
    props.id,
    props.expanded,
    props.clickOutsideClose,
    props.backFixed,
    props.domHide,
  ]);
  


  //modalStateが変更された場合
  useEffect(() => {

    console.log(!(modalState.cssAnimationType === null))

    //親要素のstateを変更
    props.setRootState({
      expanded: modalState.expanded
    })

    const siteContent:Element = document.querySelector(modalState.siteContent) as Element

    if(modalState.expanded) {
      //モーダル開いた時
      console.log("開いた")

      //tabやescキーでのイベントを付与
      if(!(handleOnKeydown === undefined)) {
        handleOnKeydown.addEvent()
      }

      //モーダルの外側をクリックで閉じるイベントを付与
      if(modalState.clickOutsideClose && !(handleOnClickOutSide === undefined)) {
        handleOnClickOutSide.addEvent()
      }

      //"transition"や"animation"終了時にDOMを非表示にするイベントを削除
      // if(!(domHideEvent === undefined))
      //   domHideEvent.removeEvent()

      //サイトのメイン部分をスクリーンリーダーなどから除外する
      siteContent.setAttribute('aria-hidden', "true") 

      setModalState((currentState) => ({
        ...currentState,
        modalSourceHide: false,
      }))
      
    } else {
      //モーダルが閉じた時
      console.log("閉じた")

      //tabやescキーでのイベントを削除
      if(!(handleOnKeydown === undefined)) {
        handleOnKeydown.removeEvent()
      }

      //モーダルの外側をクリックで閉じるイベントを削除
      if(modalState.clickOutsideClose && !(handleOnClickOutSide === undefined)) {
        handleOnClickOutSide.removeEvent()
      }

      //"transition"や"animation"終了時にDOMを非表示にするイベントを付与
      if(!(domHideEvent === undefined) && !(modalState.cssAnimationType === null)) {
        domHideEvent.addEvent()
      } 

      //サイトのメイン部分をスクリーンリーダーなどを有効にする
      siteContent.removeAttribute('aria-hidden')
    }
    
    //背景固定
    if(modalState.backFixed) backFixed(modalState.expanded)
    
  }, [modalState.expanded]);


  //Escキー : モーダル閉じる, Tabキー : モーダル内フォーカス移動
  const onKeydown = useCallback((event) => {
    // Escキー
    if (event.keyCode === 27) {
      console.log("Esc Key is pressed!");
      closeModal()
    }
    // Tabキー
    if (event.keyCode === 9) {
      console.log("Tab Key is pressed!");
      retainFocus(event, modalState.modalDOM.current)
    }
  }, []);

  const handleOnKeydown = attachEvent(
    document,
    "keydown",
    onKeydown
  );
  //------------------------------

  //モーダルの外側クリックで閉じる
  const clickOutsideClose = useCallback((event) => {
    //idの内側かつ.modal-contentの外側
    if (event.target.closest(`#${modalState.id}`) && !event.target.closest(`.modal-content`)) {
      closeModal()
    }
  }, []);

  const handleOnClickOutSide = attachEvent(
    document,
    "click",
    clickOutsideClose
  );
  //------------------------------


  //cssアニメーション終了時にモーダルのDOMを非表示
  const animationEndDomHide = useCallback((event) => {
    console.log("アニメーション終了")

    setModalState((currentState) => ({
      ...currentState,
      expanded: false,
      modalSourceHide: true,
    }))

    //"transition"や"animation"終了時にDOMを非表示にするイベントを削除
    if(!(domHideEvent === undefined) && !(modalState.cssAnimationType === null)) {
      domHideEvent.removeEvent()
    }

  }, [modalState.expanded]);

  const cssAnimationType = (v:string) => {
    let type;
    switch (v) {
      case "transition":
        type = "transitionend";
        break;
      case "animation":
        type = "animationend";
        break;
      default:
        type = "";
    }
    return type;
  };

  const domHideEvent = attachEvent(
    modalState.modalDOM.current,
    cssAnimationType(modalState.cssAnimationType!),
    animationEndDomHide
  );
  //------------------------------



  //閉じる
  const closeModal = useCallback(() => {
    setModalState((currentState) => ({
      ...currentState,
      expanded: false,
      modalSourceHide: props.cssAnimationType === null,
    }))
  }, []);


  if (modalState.domHide && modalState.modalSourceHide) return null

  return (
    <ModalPortal portalTarget={modalState.portalTarget}>
      <div id={modalState.id} css={modalStyle_container} className={`modal`} tabIndex={modalState.tabindex} aria-hidden={modalState['aria-hidden']} ref={modalElement}>
        <div className="modal-content">
          {props.children}
        </div>
        <div className="modal-overlay" css={modalStyle_overlay}></div>
      </div>
    </ModalPortal>
  );


}

export default Modal;


