import React, { useState, useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import SvgCode from '../../../static/icons/menu/code.svg';
import { switchProject } from '../../../redux/actions/appActions';
import { useSelector, useDispatch } from 'react-redux';

export default function ProjectIcon(props) {
  const dispatch = useDispatch();
  const [projectIcon, setProjectIcon] = useState('');

  useEffect(async () => {
    if (props.project.icon) {
      let projectIcon = await import(`../../../static/${props.project.icon}`);
      setProjectIcon(projectIcon.default)
    }
  }, []);

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
