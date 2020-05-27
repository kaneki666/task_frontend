import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Products from "./Screens/Products";
import Seedetails from "./Screens/Seedetails";
import Cart from "./Screens/Cart";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Provider store={store}>
          <Route path="/" exact component={Products} />
          <Route path="/details" exact component={Seedetails} />
          <Route path="/cart" exact component={Cart} />
        </Provider>
      </div>
    </Router>
  );
};

export default App;
