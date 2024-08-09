import ReactDOM from 'react-dom/client';
import React, { Suspense, useState, useEffect } from 'react';

import '../public/assets/css/main.css'; // Application-specific import
import 'bootstrap/dist/css/bootstrap.min.css'; // External library import
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './app'; // Application-specific import
import { LoaderProvider } from './loaderContext/loaderContext'; // Import LoaderProvider

const root = ReactDOM.createRoot(document.getElementById('root'));

function AppWithCursor() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <App />
      <div
        className="custom-cursor"
        style={{ left: cursorPosition.x, top: cursorPosition.y }}
      />
    </>
  );
}

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense>
        <LoaderProvider>
          <AppWithCursor />
        </LoaderProvider>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
