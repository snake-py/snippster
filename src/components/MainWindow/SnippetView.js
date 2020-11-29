import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../static/scss/_snippetView.scss';
import { saveSnippet, editTitle, editDescription } from '../../redux/actions/snippetsActions.js';
import TextareaAutosize from 'react-textarea-autosize';
import SnippetViewFooter from './SnippetViewFooter';


export default function SnippetView() {
  const activeSnippet = useSelector((state) => state.snippets.activeSnippet);
  const appState = useSelector((state) => state.app)
  const dispatch = useDispatch();

  return (
    <div className="window">
      <div className="current-snippet">
        <div>
          <input placeholder="Snippet Title" className="form-input title" onChange={(e) => dispatch(editTitle(activeSnippet, e.target.value))} value={activeSnippet.title} />
          <TextareaAutosize value={activeSnippet.description} className="form-input description" onChange={(e) => dispatch(editDescription(activeSnippet, e.target.value))} />
          <div>
            <div><select name="" id="">
            {appState.app ? '' : ''}
              <option value="">Test</option>
            </select></div>
            <div>
              <a className="form-btn save-btn" onClick={() => dispatch(saveSnippet(activeSnippet))}>
                Save
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
