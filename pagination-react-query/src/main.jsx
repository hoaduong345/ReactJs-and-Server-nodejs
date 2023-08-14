import React from "react";
import ReactDOM from 'react-dom/client'
// import { createRoot } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from 'react-cookie'
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
// import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <CookiesProvider>
     <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </BrowserRouter>
     </CookiesProvider>
   
  </React.StrictMode>
);
