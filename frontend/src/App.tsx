import React from "react";
import "./App.css";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <div className="App">
          <LoginPage />
        </div>
      </QueryClientProvider>
    </ReduxProvider>
  );
}

export default App;
