import React from 'react';
import '../../static/scss/_editor.scss';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

export default function SnippetCodeEditor() {
  function onChange(newValue) {
    console.log('change', newValue);
  }
  return (
    <div className="window wrapper-editor">
      <AceEditor
      mode="javascript"
      theme="monokai"
      onChange={onChange}
      name="AceEditor"
      editorProps={{ $blockScrolling: true }}
      setOptions={{ useWorker: false }}
       />

    </div>
  );
}
