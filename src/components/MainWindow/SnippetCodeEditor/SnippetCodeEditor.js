import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { editCode } from '../../../redux/actions/snippetsActions.js';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-javascript'; // Bug if not imported ?

export default function SnippetCodeEditor() {
  const activeSnippet = useSelector((state) => state.snippets.activeSnippet);
  const dispatch = useDispatch();

  const [currentMode, setcurrentMode] = useState('');
  useEffect(() => {
    if (activeSnippet && activeSnippet.language) {
      try {
        require(`ace-builds/src-noconflict/mode-${activeSnippet.language_short}`);
        setcurrentMode(activeSnippet.language_short);
      } catch (error) {
        console.log(error);
      }
    }
  }, [activeSnippet]);
  const myStyle = {
    minWidth: '500px',
  };

  function onChangeEditor(newValue) {
    dispatch(editCode(activeSnippet, newValue));
  }

  return (
    <div style={myStyle} className="window wrapper-editor">
      <AceEditor
        mode={`${currentMode ? currentMode : 'javascript'}`}
        theme="monokai"
        onChange={onChangeEditor}
        name="AceEditor"
        editorProps={{ $blockScrolling: true }}
        setOptions={{ useWorker: false }}
        value={activeSnippet ? activeSnippet.code : ''}
      />
    </div>
  );
}
