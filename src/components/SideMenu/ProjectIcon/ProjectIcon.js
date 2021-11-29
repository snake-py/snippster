import React from 'react';
import { ReactSVG } from 'react-svg';
import SvgCode from '../../../static/icons/menu/code.svg';
import { switchProject } from '../../../redux/actions/appActions';
import { useDispatch } from 'react-redux';
import Parser from 'html-react-parser';

export default function ProjectIcon(props) {
  const dispatch = useDispatch();

  if (props.project.icon) {
    return (
      <li className={props.project.active ? 'side-menu-icon--users active--users' : 'side-menu-icon--users'} onClick={() => dispatch(switchProject(props.project))} >
        {Parser(props.project.icon)}
        {/* 
        className={props.project.active ? 'side-menu-icon active' : 'side-menu-icon'} */}
      </li>
    );
  } else {
    return (
      <li onClick={() => dispatch(switchProject(props.project))}>
        <ReactSVG
          src={SvgCode}
          onClick={() => dispatch(switchProject(props.project))}
          beforeInjection={(svg) => {
            props.project.active ? svg.classList.add('side-menu-icon', 'active') : svg.classList.add('side-menu-icon');
          }}
        />
      </li>
    );
  }
}
