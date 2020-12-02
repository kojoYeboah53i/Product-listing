import React, { Component } from "react";

export default class Filter extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-4">{this.props.count} products found</div>
        <div className="col-md-4">
          <label>
            Order By
            <select
              className="form-control"
              value={this.props.sort}
              onChange={this.props.handleChangSort}
            >
              <option value="select">select</option>
              <option value="lowest">lowest to highest</option>
              <option value="highest">highest to lowest</option>
            </select>
          </label>
        </div>
      </div>
    );
  }
}
