import React, { Component } from 'react';
import '../../static/scss/_sideMenu.scss';
import { ReactSVG } from 'react-svg';
import SvgCode from '../../static/icons/file-code-solid.svg';

export default class SideMenu extends Component {
  render() {
    return (
      <div className="side-menu-wrapper">
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
              src={SvgCode}
              beforeInjection={(svg) => {
                svg.classList.add('side-menu-icon');
              }}
            />
          </li>
        </ul>
      </div>
    );
  }
}
