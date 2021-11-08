import React from 'react';
import logo from './logo.svg';
// import './App.css';

import { Accordion, AccordionItem, AccordionTrigger, AccordionPanel } from 'components/accordion/';

function App() {

  function hoge() {
    console.log("aaaaaa")
  }
  function fuga(v:any) {
    console.log(v)
  }
  return (
    <div className="App">

      <Accordion defaultExpandedPanels={[3]} onOpen={hoge} onClose={fuga}>

        <AccordionItem>
          <div className="AccordionItem__header">
            <AccordionTrigger>
              あああああ
            </AccordionTrigger>
          </div>
          <AccordionPanel>
            <div className="AccordionPanel__content">
              てすと
            </div>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <div className="AccordionItem__header">
            <AccordionTrigger>
              フシギダネ
            </AccordionTrigger>
          </div>
          <AccordionPanel>
            <div className="AccordionPanel__content">
              うまれたときから せなかに しょくぶつの タネが あって すこしずつ おおきく そだつ。
            </div>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <div className="AccordionItem__header">
            <AccordionTrigger>
              ヒトカゲ
            </AccordionTrigger>
          </div>
          <AccordionPanel>
            <div className="AccordionPanel__content">
              うまれたときから しっぽに ほのおが ともっている。ほのおが きえたとき その いのちは おわって しまう。
            </div>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <div className="AccordionItem__header">
            <AccordionTrigger>
              ゼニガメ
            </AccordionTrigger>
          </div>
          <AccordionPanel>
            <div className="AccordionPanel__content">
              ながい くびを こうらのなかに ひっこめるとき いきおいよく みずでっぽうを はっしゃする。
            </div>
          </AccordionPanel>
        </AccordionItem>

      </Accordion>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
