import React, { useState, useEffect  } from 'react';
import Card from '../utilities/Card';
const { ipcRenderer } = window.require('electron');

export default function SnippetResults() {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
      ipcRenderer.invoke('getSnippets').then((res) => setSnippets(res.snippets));
      return () => {
          console.log("cleaning");
      }
  }, [])

  return (
    <div className="window">
      {snippets.map(snippet => <Card active={false} snippet={snippet} key={snippet.id} />)}
    </div>
  );
}
