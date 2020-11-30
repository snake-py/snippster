import React, { useEffect } from 'react';
import Card from '../utilities/Card';


export default function SnippetResults(props) {



  return (
    <div className="window">
      {props.snippets ? props.snippets.map((snippet) => <Card snippet={snippet} key={snippet.id} />) : 'No Snippets are currently found'}
    </div>
  );
}
