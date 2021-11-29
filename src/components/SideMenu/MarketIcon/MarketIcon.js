import React from 'react';
import { ReactSVG } from 'react-svg';
import SvgCubes from '../../../static/icons/menu/cubes.svg';
import { openSnippsterMarket } from '../../../redux/actions/appActions';
import { useDispatch } from 'react-redux';

export default function MarketIcon() {
  const dispatch = useDispatch();

  return (
    <div>
      <li>
        <ReactSVG
          src={SvgCubes}
          onClick={() => dispatch(openSnippsterMarket())}
          beforeInjection={(svg) => {
            svg.classList.add('side-menu-icon');
          }}
        />
      </li>
    </div>
  );
}
