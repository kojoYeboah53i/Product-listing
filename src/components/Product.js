import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//For API Requests
import axios from "axios";
//Import react routes and its other modules
class Product extends React.Component {
  //Declare state varible to store request data
  constructor(props) {
    super(props);
    this.state = {
      database: [],
    };
  }
  componentDidMount() {
    //Get all products details in bootstrap table
    axios.get("http://localhost/save.php").then((res) => {
      //Storing products detail in state array object<br>
      this.setState({ database: res.data });
    });
  }

  render() {
    return (
      <div className="shop">
        <br />
        <div class="row">
          {this.state.database.map((result, index) => {
            return (
              <div class="col-lg-3 col-md-6 mb-4">
                <div class="card h-100" key={index}>
                  <a href="#">
                    <img
                      class="card-img-top"
                      src={"http://localhost/uploads/" + result.pimage}
                      alt={result.pimage}
                    />
                  </a>
                  <div class="card-body">
                    <h4 class="card-title">
                      <a href="#">{result.ptitle}</a>
                    </h4>
                    <h5>{result.pprice}</h5>
                    <p class="card-text">{result.pdescription}</p>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted">
                      &#9733; &#9733; &#9733; &#9733; &#9734;
                    </small>
                  </div>
                  <div class="overlay"></div>
                  <div className="button">
                    <a
                      href="/#shop"
                      onClick={(e) => this.props.handleAddToCart(e, result)}
                    >
                      Add To Cart
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default Product;
