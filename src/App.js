import React from "react";
//import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Product from "./components/Product";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";

import Shop from "./components/Shop";
import SideNav from "./components/SideNav";
function App() {
  return (
    <React.Fragment>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route exact path="/product/:id" component={Product} />
          <Route path="/addproduct" component={AddProduct} />
          <Route path="/shop" component={Shop} />
          <Route path="/sidenav" component={SideNav} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
