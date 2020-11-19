import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
const { ipcRenderer } = window.require('electron');

export default function SnippetView() {

    return (
        <div className='window'>
            <h1>hi</h1>
        </div>
    )
}
