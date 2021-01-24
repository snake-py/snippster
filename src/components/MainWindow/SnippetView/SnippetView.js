import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editTitle, editDescription } from '../../../redux/actions/snippetsActions.js';
import TextareaAutosize from 'react-textarea-autosize';
import SnippetViewFooter from './SnippetViewFooter';


export default function SnippetView() {
  const activeSnippet = useSelector((state) => state.snippets.activeSnippet);
  const dispatch = useDispatch();
  
  return (
    <div className="window">
      <div className="current-snippet">
        <div>
          <input placeholder="Snippet Title" className="form-input title" onChange={(e) => dispatch(editTitle(activeSnippet, e.target.value))} value={activeSnippet.title} />
          <TextareaAutosize placeholder="Your Snippet Description" value={activeSnippet.description} className="form-input description" onChange={(e) => dispatch(editDescription(activeSnippet, e.target.value))} />
          <SnippetViewFooter />
        </div>
      </div>
    </div>
  );
}
