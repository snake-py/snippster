import React from 'react';
import { ReactSVG } from 'react-svg';
import SvgCubes from '../../../static/icons/menu/cubes.svg';

export default function MarketIcon() {
  return (
    <div>
      <li>
        <ReactSVG
          src={SvgCubes}
          beforeInjection={(svg) => {
            svg.classList.add('side-menu-icon');
          }}
        />
      </li>
    </div>
  );
}
