import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import { useTheme } from 'next-themes';

import Home from './pages/Home';
import TravelOptions from '@/pages/TravelOptions';

import Layout from './components/Layout';

import { store } from './store/store';

import './globals.css';

type ThemeProps = {
  theme: 'light' | 'dark' | 'system';
}

const App: React.FC = () => {
  const { theme } = useTheme() as unknown as ThemeProps;
  return (
    <Provider store={store}>
      <Toaster richColors visibleToasts={1} position="top-center" theme={theme} />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/travel-options" element={<TravelOptions />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;

