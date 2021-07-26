import React from 'react'
// import { Color } from '../../../Styles/Foundation/Color'

export interface Props {
  text?: string;
  color?: string;
}

// export const Sample: React.FC<Props> = ({
 
// }) => {
//   return (

//      <p></p>

//   )
// }

const Sample: React.FC<Props> = (props) => {
  return (
    <div className="Accordion">
      <p>{props.text}</p>
      <p>{props.color}</p>
    </div>
  );
}

export default Sample;
