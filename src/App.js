import './App.css';
import React, { useState } from 'react';
import { marked } from 'marked';
import axios from 'axios';
import data from './data.json';
import useLocalStorage from './useLocalStorage';

const App = () => {
  const [activeButton, setActiveButton] = useState('openMD');
  const [docs, setDocs] = useState([]);

  const [code, setCode] = useLocalStorage('cod', '## Hello');
  const [compiled, setCompiled] = useState('<h2 id="hello">Hello</h2>');
  const [hide, hidePreview] = useState(true);

  const openMD = (buttonName) => {
    console.log(0);
    hidePreview(true);
    setActiveButton(buttonName);
    setDocs('');
  };

  const openPreview = (buttonName) => {
    console.log(0);
    hidePreview(false);
    setActiveButton(buttonName);
    setDocs('');
  };
  const openDocs = (buttonName) => {
    setActiveButton(buttonName);
    docs < 1 &&
      axios
        .get('http://www.markdownguide.org/api/v1/basic-syntax.json')
        .then((res) => {
          console.log('success');
          setDocs(res);
        })
        .catch((err) => {
          setDocs(data.basic_syntax);
          console.log(err);
        });
  };

  const handleChange = (e) => {
    setCode(e.target.value);
    setCompiled(marked.parse(e.target.value));
  };

  return (
    <>
      <h1>MarkDown Previewer React App</h1>
      <div className="container">
        <div className="btns">
          <button
            onClick={() => openMD('openMD')}
            className={activeButton === 'openMD' ? 'active' : ''}
          >
            MarkDown
          </button>
          <button
            onClick={() => openPreview('openPreview')}
            className={activeButton === 'openPreview' ? 'active' : ''}
          >
            Preview
          </button>
          <button
            onClick={() => {
              openDocs('openDocs');
            }}
            className={activeButton === 'openDocs' ? 'active' : ''}
          >
            Docs
          </button>
        </div>
        {docs.length > 1 ? (
          <div className="docs">
            {docs.map((doc, i) => {
              return (
                <div className="doc" key={i}>
                  <h2>{doc.name}</h2>
                  <p>{doc.description}</p>
                  {doc.examples.map((exam, i) => {
                    return (
                      <div key={i} className="Example">
                        <h3>Example {i + 1}</h3>
                        <h4>-markdown</h4>
                        <p>{exam.markdown}</p>
                        <h4>-html</h4>
                        <p>{exam.html}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ) : hide ? (
          <div>
            <textarea onChange={handleChange} value={code} />
          </div>
        ) : (
          <div>
            <textarea value={compiled} readOnly/>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
