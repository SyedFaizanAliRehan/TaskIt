import React from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";
import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./routers/AppRouter";

function App() {
  return (
    <>
      <ReduxProvider store={store}>
        <QueryClientProvider client={new QueryClient()}>
          <div className="App">
            <RouterProvider router={AppRouter} />
          </div>
        </QueryClientProvider>
      </ReduxProvider>
    </>
  );
}

export default App;
