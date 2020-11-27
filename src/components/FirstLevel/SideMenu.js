import React, { useEffect } from 'react';
import { getProjects } from '../../redux/actions/appActions.js';
import { useSelector, useDispatch } from 'react-redux';
import { addSnippet } from '../../redux/actions/snippetsActions.js';

import { ReactSVG } from 'react-svg';
import Project from '../SideMenu/Project';
import Market from '../SideMenu/Market';
import SvgPlus from '../../static/icons/plus.svg';
import '../../static/scss/_sideMenu.scss';

export default function SideMenu() {
  const appState = useSelector((state) => state.app);
  const dispatch = useDispatch();
  console.log(appState);

  useEffect(() => {
    console.log('useEffectCalled');
    dispatch(getProjects());
  }, []);

  return (
    <div className="side-menu-wrapper">
      <div className="top-list">
        <ul className="side-menu">

          {appState.projects
            ? appState.projects.map((project) => {
                return <Project project={project} key={project.id}/>;
              })
            : ''}
          
          <Market />
        </ul>
      </div>
      <div className="bottom-list">
        <ul className="side-menu">
          <li>
            <ReactSVG
              onClick={(e) => dispatch(addSnippet())}
              src={SvgPlus}
              beforeInjection={(svg) => {
                svg.classList.add('side-menu-icon');
              }}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
