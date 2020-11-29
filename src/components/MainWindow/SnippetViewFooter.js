import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveSnippet } from '../../redux/actions/snippetsActions.js';
import { updateLanguage, updateFramework } from '../../redux/actions/snippetsActions.js';
import Option from '../utilities/Option';

export default function SnippetViewFooter() {
  const activeSnippet = useSelector((state) => state.snippets.activeSnippet);
  const appState = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const [currentFrameworks, setcurrentFrameworks] = useState([]);
  console.log(currentFrameworks[0]);
  useEffect(() => {
    const currentLang = appState.languages.filter((lang) => lang.language === activeSnippet.language)[0];
    setcurrentFrameworks(currentLang.framework);
  });

  console.log(activeSnippet);
  return (
    <>
      <div>
        <div>
          <select value={activeSnippet.language} onChange={(e) => dispatch(updateLanguage(activeSnippet, e.target.value, appState.languages))}>
            {appState.languages.map((language) => (
              <Option key={language.id} language={language.language} icon={language.languageIcon} id={language.id} />
            ))}
          </select>
          {currentFrameworks[0] ? (
            <select 
             value={activeSnippet.framework ? activeSnippet.framework : '' } onChange={(e) => dispatch(updateFramework(activeSnippet, e.target.value, appState.languages))}
            >
              {currentFrameworks.map((framework) => (
                <Option key={framework.id} framework={framework.framework} icon={framework.frameworkIcon} id={framework.id} />
              ))}
            </select>
          ) : (
            ''
          )}
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
