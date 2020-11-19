import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../static/scss/_card.scss';
import { ReactSVG } from 'react-svg';
import SvgReact from '../../static/icons/react.svg';
import SvgJs from '../../static/icons/js-square.svg';
import SvgImages from '../../static/icons/images.svg';

import {activateSnippet} from '../../redux/actions/snippetsActions.js'

export default function Card(props) {
  console.log(props);
  
  const dispatch = useDispatch()    
  return (
    <div className="card-wrapper">
      <div onClick={() => dispatch(activateSnippet(props.snippet))}  className={`card ${props.snippet.active ? "card-active" : ""}`}>
        <div className="card-head">
          <h2 className="card-title">{props.snippet.title}</h2>
        </div>
        <div className="card-body">
          <p>{props.snippet.description}</p>
        </div>
        <div className="card-foot">
          <div className="left-foot">
            <div className="imgCounter">6</div>
            <ReactSVG
              src={SvgImages}
              beforeInjection={(svg) => {
                svg.classList.add('card-icon');
              }}
            />
          </div>
          <div className="right-foot">
            <ReactSVG
              src={SvgJs}
              beforeInjection={(svg) => {
                svg.classList.add('card-icon');
              }}
            />
            <ReactSVG
              src={SvgReact}
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
