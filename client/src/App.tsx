import { useState } from 'react';
import { Routes, Route } from 'react-router';

import './App.css';
import { UrlTemplates } from './lib/urlBuilder';

const Navigator = () => (
  <Routes>
    <Route index element={} />
  </Routes>
);

const App = () => <Navigator />;

export default App;
