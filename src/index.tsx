import { FluentProvider, webDarkTheme, webLightTheme } from '@fluentui/react-components';
import { App } from './App';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// Use the `matchMedia` function to detect the user's preferred color scheme
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
  <React.StrictMode>
    <FluentProvider theme={prefersDarkMode ? webDarkTheme : webLightTheme} id="viewport">
      <App />
    </FluentProvider>
  </React.StrictMode>
);
