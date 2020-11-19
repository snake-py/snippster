import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../static/scss/_snippetView.scss';
const { ipcRenderer } = window.require('electron');

export default function SnippetView() {
  const activeSnippet = useSelector((state) => state.snippets.activeSnippet);

  function titleChange(e) {
    e.preventDefault();
    
  }
  function descriptionChange(e) {
    e.preventDefault();
    
  }
  function saveBtnClick(e) {
    e.preventDefault();
  }

  return (
    <div className="window">
      <div className="current-snippet">
        <form>
          <input placeholder="Snippet Title" className="form-input title" onChange={titleChange} value={activeSnippet.title} />
          <div suppressContentEditableWarning={true} data-placeholder="Snippet description...." contentEditable="true" className="form-input description" onChange={descriptionChange}>
            {activeSnippet.description}
          </div>
          <button className="form-btn save-btn" onClick={saveBtnClick}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
