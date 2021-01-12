import React, { useState, useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import SvgCode from '../../../static/icons/menu/code.svg';
import { switchProject } from '../../../redux/actions/appActions';
import { useDispatch, useSelector } from 'react-redux';
console.log(SvgCode);
const path = require('path');

export default function ProjectIcon(props) {
  const dispatch = useDispatch();
  const [projectIcon, setProjectIcon] = useState('');
  const appState = useSelector((state) => state.app);

  useEffect(() => {
    console.log(props.project.icon);
    if (props.project.icon) {
      setProjectIcon(props.project.icon);
    }
  }, [props.project.icon]);

  return (
    <>

    <li  dangerouslySetInnerHTML={{ __html: props.project.icon }}>

    </li>
    <li>
      <ReactSVG
        onClick={() => dispatch(switchProject(props.project))}
        src={projectIcon || SvgCode}
        beforeInjection={(svg) => {
          props.project.active ? svg.classList.add('side-menu-icon', 'active') : svg.classList.add('side-menu-icon');
        }}
      />
    </li>
    </>
  );
}
