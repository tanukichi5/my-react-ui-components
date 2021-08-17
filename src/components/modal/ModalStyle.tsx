import { css, keyframes } from '@emotion/react'

const modalOpen = keyframes`
  0% {
      opacity: 0;
      visibility: visible;
  }
  100% {
      opacity: 1;
      visibility: visible;
  }
`

const modalClose = keyframes`
  0% {
      opacity: 1;
      visibility: visible;
  }
  100% {
      opacity: 0;
      visibility: hidden;
  }
`

//アコーディオン全体（wrapper）
export const container = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  opacity: 0;
  visibility: hidden;
  z-index: 100;
  /* transition: all .3s; */
  animation-duration: .3s;
  animation-timing-function: ease-out;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  &[aria-hidden="true"] {
    animation-name: ${modalClose};

    /* opacity: 0;
    visibility: hidden; */

  }
  &[aria-hidden="false"] {
    animation-name: ${modalOpen};


    /* opacity: 1;
    visibility: visible; */

  }
`;



export const overlay = css`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.8;
  z-index: -1;
`;



