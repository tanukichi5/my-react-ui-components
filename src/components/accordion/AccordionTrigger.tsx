/** @jsxImportSource @emotion/react */
import React, { useContext } from 'react'
import { Context } from "./ItemContext";
import { Context as  accordionContext} from "./AccordionContext";


const AccordionTrigger: React.FC = (props) => {
  const itemContext = useContext(Context)
  const rootContext = useContext(accordionContext)

  //アコーディオンが開いているか？
  const itemExpanded = itemContext.itemState['isExpanded']
  
  const toggleAccordion = (e:any) => {

    e.preventDefault();
    
    //アイテムの状態を変更
    itemContext.setItemState( itemState =>({
      ...itemState,
      isExpanded: itemExpanded ? false : true
    }));

    //開いているパネルのindexを保存
    if(rootContext.accordionState['multipleExpanded']) {
      if(!(rootContext.accordionState['expandedPanels'] === undefined)) {
        itemExpanded 
          ? rootContext.accordionState['expandedPanels'].delete(itemContext.itemState['index'])
          : rootContext.accordionState['expandedPanels'].add(itemContext.itemState['index'])
      } else {

      }
      
      rootContext.setAccordionState( accordionState =>({
        ...accordionState,
        expandedPanels: rootContext.accordionState['expandedPanels']
      }));
    } else {
      rootContext.setAccordionState( accordionState =>({
        ...accordionState,
        //自身が開いている場合は閉じる
        expandedPanels: itemExpanded ? new Set() : new Set([itemContext.itemState['index']])
      }));
    }

   };


  return (
    <button
      type="button" onClick={toggleAccordion} {...itemContext.triggerAttributes}>
      {props.children}
      {/* <Icon icon={itemExpanded ? `subtract` : `add` } width={20} height={20} /> */}
    </button>
  );
}

export default AccordionTrigger;