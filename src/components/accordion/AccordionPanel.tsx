/** @jsxImportSource @emotion/react */
import React, {useContext, useRef, useEffect} from 'react'
import { Context } from "./ItemContext";
import * as styles from "../../styles/AccordionStyle";


const AccordionPanel: React.FC = (props) => {

  const context = useContext(Context)
  const paneleElement = useRef(null)


  
  useEffect(() => {
    //パネルのDOMを取得
    context.setItemState( itemState =>({
      ...itemState,
      panelDOM: paneleElement
    }));
  }, []);


  return (
    <div ref={paneleElement} className="AccordionPanel" css={context.panelStyles.panel}  {...context.panelAttributes}>
      {props.children}
    </div>
  );
}

export default AccordionPanel;