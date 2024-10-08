import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ReactSVG } from 'react-svg';
import { activateSnippet } from '../../redux/actions/snippetsActions.js';

export default function Card(props) {
  const snippets = useSelector((state) => state.snippets);
  const [langaugeIcon, setLangaugeIcon] = useState('');
  const [frameworkIcon, setFrameworkIcon] = useState('');
  useEffect(() => {
    if (props.snippet.frameworkIcon) {
      try {
        let frameworkIcon = require(`../../static/${props.snippet.frameworkIcon}`);
        setFrameworkIcon(frameworkIcon.default);
      } catch (error) {
        console.log(error);
      }
    } else {
      setFrameworkIcon('');
    }
    if (props.snippet.languageIcon) {
      try {
        let languageIcon = require(`../../static/${props.snippet.languageIcon}`);
        setLangaugeIcon(languageIcon.default);
      } catch (error) {
        console.log(error);
      }
    } else {
      setLangaugeIcon('');
    }
  }, [snippets, langaugeIcon, frameworkIcon, props]);

  const dispatch = useDispatch();

  if (!props.snippet) {
    return null;
  }
  return (
    <div className="card-wrapper">
      <div onClick={() => dispatch(activateSnippet(props.snippet))} className={`card ${props.snippet.active ? 'card-active' : ''} ${props.snippet.isSaved ? '' : 'unsaved'}`}>
        <div className="card-head">
          <h2 className="card-title">{props.snippet.title}</h2>
        </div>
        <div className="card-body">
          <p>{props.snippet.description.substring(0, 50)}</p>
        </div>
        <div className="card-foot">
          {/* <div className="left-foot">
            <div className="imgCounter">6</div>
            <ReactSVG
              src={SvgImages}
              beforeInjection={(svg) => {
                svg.classList.add('card-icon');
              }}
            /> 
          </div> */}
          <div className="right-foot">
            <ReactSVG
              src={langaugeIcon}
              beforeInjection={(svg) => {
                svg.classList.add('card-icon');
              }}
            />
            <ReactSVG
              src={frameworkIcon}
              beforeInjection={(svg) => {
                svg.classList.add('card-icon');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
