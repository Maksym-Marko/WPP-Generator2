import React from "react"
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux"
import store from "@reactJs/store"
import { RouterProvider } from "react-router-dom"
import router from "@reactJs/router"
import "@reactJs/assets/css/main.scss"

// Function to render React components
const renderReactJsApp = () => {

  const rootElement = document.getElementById('mxsfwnReactJsApp');

  if (!rootElement) return;

  const root = createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  );
}

// Call the render function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', renderReactJsApp)