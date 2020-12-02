import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cart from "../components/Cart";
//For API Requests
import axios from "axios";
import Product from "./Product";
//Import react routes and its other modules
//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
class Shop extends React.Component {
  //Declare state varible to store request data
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      cartItems: [],
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
  }
  componentDidMount() {
    //Get all products details in bootstrap table
    axios.get("http://localhost/save.php").then((res) => {
      this.setState({ data: res.data });
    });
    if (localStorage.getItem("cartItems")) {
      this.setState({
        cartItems: JSON.parse(localStorage.getItem("cartItems")),
      });
    }
  }
  handleAddToCart(e, result) {
    this.setState((state) => {
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;
      cartItems.forEach((item) => {
        if (item.id === result.id) {
          productAlreadyInCart = true;
          item.count++;
        }
      });
      if (!productAlreadyInCart) {
        cartItems.push({ ...result, count: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      return cartItems;
    });
  }
  handleRemoveFromCart(e, item) {
    this.setState((state) => {
      const cartItems = state.cartItems.filter((elm) => elm.id !== item.id);
      localStorage.setItem("cartItems", cartItems);
      return { cartItems };
    });
  }
  render() {
    return (
      <div className="shop">
        <br />
        <div className="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div className="container-fluid">
                <div class="row">
                  <div class="col-md-9">
                    <Product handleAddToCart={this.handleAddToCart} />
                  </div>
                  <div class="col-md-3">
                    <Cart
                      cartItems={this.state.cartItems}
                      handleRemoveFromCart={this.handleRemoveFromCart}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Shop;
