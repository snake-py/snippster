import React, { useEffect } from 'react';
import { getProjects } from '../../redux/actions/appActions.js';
import { useSelector, useDispatch } from 'react-redux';

import '../../static/scss/_sideMenu.scss';
import { ReactSVG } from 'react-svg';
import SvgCode from '../../static/icons/file-code-solid.svg';
import SvgPlus from '../../static/icons/plus.svg';
import SvgCubes from '../../static/icons/cubes.svg';

export default function SideMenu() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('useEffectCalled');
    dispatch(getProjects());
  }, []);

  return (
    <div className="side-menu-wrapper">
      <div className="top-list">
        <ul className="side-menu">
          <li>
            <ReactSVG
              src={SvgCode}
              beforeInjection={(svg) => {
                svg.classList.add('side-menu-icon');
              }}
            />
          </li>
          <li>
            <ReactSVG
              src={SvgCubes}
              beforeInjection={(svg) => {
                svg.classList.add('side-menu-icon');
              }}
            />
          </li>
        </ul>
      </div>
      <div className="bottom-list">
        <ul className="side-menu">
          <li>
            <ReactSVG
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
