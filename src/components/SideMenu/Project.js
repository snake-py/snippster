import React from 'react';
import { ReactSVG } from 'react-svg';
import SvgCode from '../../static/icons/file-code-solid.svg';

export default function Project(props) {
  console.log(props);
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
