import React, { useEffect } from 'react';
import { openQueryViewOnClick, addProject } from '../../redux/actions/appActions.js';
import { useSelector, useDispatch } from 'react-redux';
import { addSnippet } from '../../redux/actions/snippetsActions.js';

import { ReactSVG } from 'react-svg';
import Project from './ProjectIcon';
import Market from './MarketIcon';
import SvgPlus from '../../static/icons/menu/plus.svg';
import SvgSearch from '../../static/icons/menu/search.svg';

export default function SideMenu() {
  const appState = useSelector((state) => state.app);
  const dispatch = useDispatch();

  return (
    <div className="side-menu-wrapper">
      <div className="top-list">
        <ul className="side-menu side-menu--top">
          <li>
            <ReactSVG
              onClick={(e) => dispatch(openQueryViewOnClick())}
              src={SvgSearch}
              beforeInjection={(svg) => {
                {
                  appState.queriedView ? svg.classList.add('side-menu-icon', 'active') : svg.classList.add('side-menu-icon');
                }
                svg.classList.add('side-menu-icon');
              }}
            />
          </li>

          {appState.projects
            ? appState.projects.map((project) => {
                return <Project project={project} key={project.id} />;
              })
            : ''}

          <Market />
        </ul>
      </div>
      <div className="bottom-list">
        <ul className="side-menu">
          {appState.queriedView ? (
            <></>
          ) : (
            <li>
              <ReactSVG
                onClick={(e) => dispatch(addSnippet())}
                src={SvgPlus}
                beforeInjection={(svg) => {
                  svg.classList.add('side-menu-icon');
                }}
              />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
