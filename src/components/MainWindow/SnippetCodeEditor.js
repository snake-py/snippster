import React from 'react';
import '../../static/scss/_editor.scss';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import { editCode } from '../../redux/actions/snippetsActions.js';
import { useSelector, useDispatch } from 'react-redux';

export default function SnippetCodeEditor() {
  const activeSnippet = useSelector((state) => state.snippets.activeSnippet);
  const dispatch = useDispatch()


  function onChangeEditor(newValue) {
    dispatch(editCode(activeSnippet, newValue))
  }

  return (
    <div className="window wrapper-editor">
      <AceEditor
        mode="javascript"
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
