/** @jsxImportSource @emotion/react */
import React, {useContext, useRef, useEffect} from 'react'
import { Context } from "./ItemContext";


const AccordionPanel: React.FC = (props) => {

  const itemContext = useContext(Context)
  const paneleElement = useRef(null)

  useEffect(() => {
    //パネルのDOMを取得
    itemContext.setItemState( itemState =>({
      ...itemState,
      panelDOM: paneleElement
    }));
  }, []);

  return (
    <div ref={paneleElement} className="accordion__panel" style={itemContext.panelStyles}  {...itemContext.panelAttributes}>
      {props.children}
    </div>
  );
}

export default AccordionPanel;