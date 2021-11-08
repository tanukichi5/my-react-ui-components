/** @jsxImportSource @emotion/react */
import React, { useState, createContext } from "react";
import { useDebounceFn } from "./helpers/useDebounceFn";
import { attachEvent } from "./helpers/attachEvent";

interface Props {
  defaultExpandedPanels?: number[],
  multipleExpanded?: boolean,
  easing?: string,
  duration?: string,
  notTransition?: boolean,
  onOpen?: (panel: React.RefObject<HTMLInputElement> | null) => void,
  onClose?: (panel: React.RefObject<HTMLInputElement> | null) => void,
}
//accordionStateのインターフェース
export interface InjectedAccordionState {
  expandedPanels?: Set<unknown>;
  defaultExpandedPanels?: number[]
  easing?: string;
  duration?: string;
  notTransition?: boolean;
  multipleExpanded?: boolean | undefined;
  checkWindowResize?: number;
  onOpen?: (panel: React.RefObject<HTMLInputElement> | null) => void;
  onClose?: (panel: React.RefObject<HTMLInputElement> | null) => void;
  customStyles?: any
}

export const Context = createContext(
  {} as {
    accordionState: InjectedAccordionState,
    setAccordionState: React.Dispatch<React.SetStateAction<InjectedAccordionState>>,
  }
);


const Provider: React.FC<Props> = (props) => {

  const [accordionState, setAccordionState] = useState<InjectedAccordionState>({
    expandedPanels: new Set(),
    defaultExpandedPanels: props.defaultExpandedPanels ? props.defaultExpandedPanels : [],
    easing: props.easing ? props.easing : "ease-out",
    duration: props.duration ? props.duration : ".3s",
    notTransition: props.notTransition ? props.notTransition : false,
    multipleExpanded: !(props.multipleExpanded === undefined) ? props.multipleExpanded : true,
    checkWindowResize: window.innerWidth,
    onOpen: props.onOpen ? props.onOpen : () => {},
    onClose:  props.onClose ? props.onClose : () => {},
    customStyles: {
      root: undefined,
      item: undefined,
      trigger: undefined,
      panel: undefined
    }
  });

  //パネルの高さを揃えるリサイズイベント
  const windowResizePanelHeightRecalculation = () => {
    setAccordionState((accordionState) => ({
      ...accordionState,
      checkWindowResize: window.innerWidth,
    }));
  };
  //リサイズイベントを間引く処理
  const [onResizeHandler] = useDebounceFn(
    windowResizePanelHeightRecalculation,
    500
  );
  //リサイズイベントを登録
  const panelHeightRemoveEvent = attachEvent(
    window,
    "resize",
    onResizeHandler.bind(this)
  );
  panelHeightRemoveEvent.addEvent()

  return (
    <Context.Provider
      value={{
        accordionState,
        setAccordionState,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Provider;


