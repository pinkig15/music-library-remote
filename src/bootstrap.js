// src/bootstrap.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import MusicLibrary from './MusicLibrary';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<MusicLibrary />);
