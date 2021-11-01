/** @jsxImportSource @emotion/react */
import React from "react";
import Provider, { Context, InjectedAccordionState } from './AccordionContext';


const Accordion: React.FC<InjectedAccordionState> = (props) => {
  const childrenWithProps = React.Children.map(props.children, (child:any, i) => {
    // 各子要素をクローンしつつ index を渡す
    // console.log(i)
    return React.cloneElement(child, { panelIndex: i });
  });

  return (
    <Provider
      defaultExpandedPanels={props.defaultExpandedPanels}
      multipleExpanded={props.multipleExpanded}
      easing={props.easing}
      duration={props.duration}
      notTransition={props.notTransition}
      onOpen={props.onOpen}
      onClose={props.onClose}
    >
      <Context.Consumer>
        {(value) => {

          return (
            <>
              <div className="Accordion">{childrenWithProps}</div>
            </>
          );
        }}
      </Context.Consumer>
    </Provider>
  );
};

export default Accordion;
