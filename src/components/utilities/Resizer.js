import React from 'react';
import '../../static/scss/_resizer.scss';


export default function Resizer() {
    const resizeWindows = (e) => {
        console.log(e);
    }


  return <div draggable="true" onClick={resizeWindows} onDrag={resizeWindows} className="resizer"></div>;
}
