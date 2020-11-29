import React from 'react';

export default function Option(props) {
  return (
    <>
      <option>{props.language ? props.language : props.framework }</option>
    </>
  );
}
