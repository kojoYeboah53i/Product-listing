import React, { Component } from "react";
import util from "../components/Util";
export default class Cart extends Component {
  render() {
    const { cartItems } = this.props;
    return (
      <div className="alert alret-info">
        <form className="shadow-lg p-4">
          {cartItems.length === 0 ? (
            "Cart is empty"
          ) : (
            <div>You have {cartItems.length} products in your cart</div>
          )}
          {cartItems.length > 0 && (
            <div>
              <ul>
                {cartItems.map((item, i) => (
                  <li key={i}>
                    <b>{item.ptitle}</b>&nbsp;X {item.count}&nbsp;=
                    {item.pprice * item.count}
                    <button
                      className="btn btn-danger"
                      onClick={(e) => this.props.handleRemoveFromCart(e, item)}
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
              Total = &nbsp;
              {util.formatCurrency(
                cartItems.reduce((a, b) => a + b.pprice * b.count, 0)
              )}
              <br />
              <br />
              <button
                className="btn btn-primary"
                target="_blank"
                onClick={(e) => this.handleCheckOut}
              >
                CheckOut
              </button>
            </div>
          )}
        </form>
      </div>
    );
  }
}
