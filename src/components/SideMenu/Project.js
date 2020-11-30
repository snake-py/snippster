import React from 'react';
import { ReactSVG } from 'react-svg';
import SvgCode from '../../static/icons/menu/code.svg';
import { switchProject } from '../../redux/actions/appActions';
import { useSelector, useDispatch } from 'react-redux';

export default function Project(props) {
  const dispatch = useDispatch();
  
  return (
    <li>
      <ReactSVG
        onClick={() => dispatch(switchProject(props.project))}
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
