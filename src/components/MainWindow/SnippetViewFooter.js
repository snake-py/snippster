import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveSnippet } from '../../redux/actions/snippetsActions.js';
import { updateLanguage, updateFramework } from '../../redux/actions/snippetsActions.js';
import Option from '../utilities/Option';
import Select from 'react-select';

export default function SnippetViewFooter() {
  const activeSnippet = useSelector((state) => state.snippets.activeSnippet);
  const appState = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const [currentFrameworks, setcurrentFrameworks] = useState([]);
  console.log(currentFrameworks[0]);
  useEffect(() => {
    const currentLang = appState.languages.filter((lang) => lang.language === activeSnippet.language)[0];
    if (currentLang) {
      setcurrentFrameworks(currentLang.framework);
    }
  });

  const selectStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted #00bfd8',
      backgroundColor: state.isSelected ? '#00bfd8' : 'grey',
      '&:hover': { backgroundColor: '#00bfd8' },
      color: 'white',
      padding: '10px 20px 10px 10px',
    }),
    menuList: (provided) => ({
      ...provided,
      '::-webkit-scrollbar': {
        opacity: 0,
      },
      '::-webkit-scrollbar-track': {
        background: '#292929',
      },
      '::-webkit-scrollbar-thumb': {
        background: '#656565',
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: '#656565',
      },
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: '#3B3B3B',
    }),
    
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#3B3B3B',
      color: 'white',
      border: '2px solid #656565'
    }),
    
    indicatorSeparator: (provided, state) => ({
      ...provided,
      backgroundColor: '#656565',
    }),
        
    singleValue: (provided, state) => ({
      ...provided,
      color: 'white',
    }),
  };

  console.log(activeSnippet);
  return (
    <>
      <div>
        <div>
          <Select
            styles={selectStyles}
            menuPlacement="top"
            placeholder="Choose a language"
            className="form-select"
            value={{ value: activeSnippet.language, label: activeSnippet.language }}
            options={appState.languages.map((language) => ({ value: language.language, label: language.language }))}
            onChange={(e) => console.log(e)}
          />
          {/* <select className="form-select" value={activeSnippet.language} onChange={(e) => dispatch(updateLanguage(activeSnippet, e.target.value, appState.languages))}>
            {appState.languages.map((language) => (
              <Option key={language.id} language={language.language} icon={language.languageIcon} id={language.id} />
            ))}
            <span className="custom-select-arrow"></span>
          </select>
          {currentFrameworks[0] ? (
            <select
              className="form-select"
              value={activeSnippet.framework ? activeSnippet.framework : ''}
              onChange={(e) => dispatch(updateFramework(activeSnippet, e.target.value, appState.languages))}
            >
              {currentFrameworks.map((framework) => (
                <Option key={framework.id} framework={framework.framework} icon={framework.frameworkIcon} id={framework.id} />
              ))}
              <span className="custom-select-arrow"></span>
            </select>
          ) : (
            ''
          )} */}
        </div>
        <div>
          <a className="form-btn save-btn" onClick={() => dispatch(saveSnippet(activeSnippet))}>
            Save
          </a>
        </div>
      </div>
    </>
  );
}
