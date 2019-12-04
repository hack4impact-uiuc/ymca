import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  if (typeof window.URL.createObjectURL === 'undefined') {
    window.URL.createObjectURL = function() {};
  }
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
