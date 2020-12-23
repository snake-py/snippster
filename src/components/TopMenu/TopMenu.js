import React from 'react';
import HoverBox from './HoverBox';

export default function TopMenu() {
  const testMenu = [
    {
      label: 'project',
      submenu: [
        {
          label: 'save',
          action: 'some action',
        },
        {
          label: 'delete',
          action: 'some action',
        },
      ],
    },
    {
      label: 'file',
      submenu: [
        {
          label: 'save',
          action: 'some action',
        },
        {
          label: 'delete',
          action: 'some action',
        },
      ],
    },
  ];
  return (
    <div className="top-menu">
    hi
      {/* <ul className="top-menu__list">
        {testMenu.map((field) => {
          return (
            <li className="top-menu__list-item">
              {field.label}
              <HoverBox items={field} />;
            </li>
          );
        })}
      </ul> */}
    </div>
  );
}
