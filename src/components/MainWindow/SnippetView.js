import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../static/scss/_snippetView.scss';
import { saveSnippet, editSnippet } from '../../redux/actions/snippetsActions.js';
const { ipcRenderer } = window.require('electron');

export default function SnippetView(props) {
  const activeSnippet = useSelector((state) => state.snippets.activeSnippet);
  const dispatch = useDispatch();
  console.log(props);

  function titleChange(e) {
    e.preventDefault();
  }
  function descriptionChange(e) {
    e.preventDefault();
  }


  return (
    <div className="window">
      <div className="current-snippet">
        <div>
          <input placeholder="Snippet Title" className="form-input title" onChange={(e) => dispatch(editSnippet(activeSnippet, e.target.value))} value={activeSnippet.title} />
          <div suppressContentEditableWarning={true} data-placeholder="Snippet description...." contentEditable="true" className="form-input description" onChange={(e) => dispatch(editSnippet(activeSnippet, e.target.value))}>
            {activeSnippet.description}
          </div>
          <a className="form-btn save-btn" onClick={() => dispatch(saveSnippet(activeSnippet))}>
            Save
          </a>
        </div>
      </div>
    </div>
  );
}
