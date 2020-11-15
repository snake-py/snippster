import React from 'react';

export default function Card() {
  return (
    <div className="card-wrapper">
      <div className="card">
        <div className="card-head">
          <h2 className="card-title">Some Snippet</h2>
        </div>
        <div className="card-body">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, dolorem</p>
        </div>
        <div className="card-foot"> some icons</div>
      </div>
    </div>
  );
}
