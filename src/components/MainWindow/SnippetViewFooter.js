import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveSnippet} from '../../redux/actions/snippetsActions.js';
import { updateLanguage } from '../../redux/actions/snippetsActions.js';
import Option from '../utilities/Option'


export default function SnippetViewFooter() {
    const activeSnippet = useSelector((state) => state.snippets.activeSnippet);
    const appState = useSelector((state) => state.app);
    const dispatch = useDispatch();
  
  console.log(activeSnippet);
  return (
    <>
      <div>
        <div>
          <select 
          value={activeSnippet.language}
           onChange={(e) => dispatch(updateLanguage(activeSnippet, e.target.value, appState.languages))}>
            {appState.languages.map((language) => ( <Option
            key={language.id}
            language={language.language}
            icon={language.languageIcon}
            id={language.id}
            />
            ))}
          </select>

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
