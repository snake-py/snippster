import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveSnippet, deleteSnippet } from '../../redux/actions/snippetsActions.js';
import { updateLanguage, updateFramework } from '../../redux/actions/snippetsActions.js';
import Select from 'react-select';

export default function SnippetViewFooter() {
  const activeSnippet = useSelector((state) => state.snippets.activeSnippet);
  const appState = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const [currentFrameworks, setcurrentFrameworks] = useState([]);
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
      border: '2px solid #656565',
      width: '90%',
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

  return (
    <>
      <div>
        <div className="flex">
          <Select
            styles={selectStyles}
            menuPlacement="top"
            placeholder="Choose a language"
            className="form-select"
            value={{ value: activeSnippet.language, label: activeSnippet.language }}
            options={appState.languages.map((language) => ({ value: language.language, label: language.language }))}
            onChange={(e) => dispatch(updateLanguage(activeSnippet, e.value, appState.languages))}
          />

          {currentFrameworks[0] ? (
            <Select
              styles={selectStyles}
              menuPlacement="top"
              placeholder="Choose a framework"
              className="form-select"
              value={{ value: activeSnippet.framework, label: activeSnippet.framework }}
              options={currentFrameworks.map((framework) => ({ value: framework.framework, label: framework.framework }))}
              onChange={(e) => dispatch(updateFramework(activeSnippet, e.value, appState.languages))}
            />
          ) : (
            ''
          )}
        </div>
        <div style={{marginTop: '20px'}} >
          <a className="form-btn save-btn" onClick={() => dispatch(saveSnippet(activeSnippet))}>
            Save
          </a>
          <a className="form-btn save-btn" onClick={() => dispatch(deleteSnippet(activeSnippet))}>
            Delte
          </a>
        </div>
      </div>
    </>
  );
}
