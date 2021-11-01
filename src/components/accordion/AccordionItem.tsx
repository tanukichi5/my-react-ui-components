/** @jsxImportSource @emotion/react */
import React, { useContext } from 'react'
import { Provider, Context } from "./ItemContext"
import { Context as  accordionContext} from "./AccordionContext"

interface Props {
  panelIndex?: any
}

const AccordionItem: React.FC<Props> = (props) => {
  const rootContext = useContext(accordionContext)
  return (
    <Provider panelIndex={props.panelIndex}>
      <Context.Consumer>
        {() => {
          return (
            <>
              <div className="accordionItem">
                {props.children}
              </div>
            </>
          )
        }}
      </Context.Consumer>
    </Provider>
  );
};

export default AccordionItem;
