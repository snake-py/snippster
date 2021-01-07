import React, { useState, useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import SvgCode from '../../../static/icons/menu/code.svg';
import { switchProject } from '../../../redux/actions/appActions';
import { useDispatch, useSelector } from 'react-redux';

const path = require('path');
const url = require('url');


export default function ProjectIcon(props) {
  const dispatch = useDispatch();
  const [projectIcon, setProjectIcon] = useState('');

  useEffect( () => {
    if (props.project.icon) {
      try {
        let projectIcon = require(`../../../../user/files/projects/icon/${props.project.icon}`);
        setProjectIcon(projectIcon.default);
      } catch (error) {
        console.log(error);
      }
    }
  }, [props.project.icon]);

  return (
    <li>
      <ReactSVG
        onClick={() => dispatch(switchProject(props.project))}
        src={projectIcon || SvgCode}
        beforeInjection={(svg) => {
          {
            props.project.active ? svg.classList.add('side-menu-icon', 'active') : svg.classList.add('side-menu-icon');
          }
        }}
      />
    </li>
  );
}
