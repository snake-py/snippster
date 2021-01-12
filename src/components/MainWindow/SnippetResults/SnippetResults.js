import React from 'react';
import Card from '../../Card';
import SnippetQuerier from '../SnippetQuerier';

export default function SnippetResults(props) {
  return (
    <div className="window">
      <SnippetQuerier />
      {props.snippets ? props.snippets.map((snippet) => <Card snippet={snippet} key={snippet.id} />) : <div className="message__empty-window">No Snippets are currently found</div>}
    </div>
  );
}
