import React from 'react';
import { ReactSVG } from 'react-svg';
import SvgCode from '../../static/icons/menu/code.svg';

export default function Project(props) {
  return (
    <li>
      <ReactSVG
        src={SvgCode}
        beforeInjection={(svg) => {
          {
            props.project.active ? svg.classList.add('side-menu-icon', 'active') : svg.classList.add('side-menu-icon');
          }
        }}
      />
    </li>
  );
}
