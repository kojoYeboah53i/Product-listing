import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Filter from "../components/Filter";
import "jquery/dist/jquery.min.js";
//import Cart from "./Cart";
//import Swal from "sweetalert2";
import $ from "jquery";
//For API Requests
import axios from "axios";
class Product extends Component {
  //Declare state varible to store request data
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filteredProduct: [],
      productdetails: [],
      query: "",
      data: [],
      filteredData: [],
    };
    this.handleChangeSort = this.handleChangeSort.bind(this);
  }

  //handle search
  handleInputChange = (event) => {
    const query = event.target.value;

    this.setState((prevState) => {
      const filteredData = prevState.data.filter((element) => {
        return element.ptitle.toLowerCase().includes(query.toLowerCase());
      });

      return {
        query,
        filteredData,
      };
    });
  };

  getData = () => {
    fetch(`http://localhost/save.php`)
      .then((response) => response.json())
      .then((data) => {
        const { query } = this.state;
        const filteredData = data.filter((element) => {
          return element.id.toLowerCase().includes(query.toLowerCase());
        });

        this.setState({
          data,
          filteredData,
        });
      });
  };

  componentWillMount() {
    this.getData();
  }

  componentDidMount() {
    //Get all products details in bootstrap table

    axios.get("http://localhost/save.php").then((res) => {
      //Storing products details in state array object
      this.setState({ data: res.data });
    });
  }
  //add to cart

  //Get product details inside bootstrap modal popup as quick view
  productdetails(productid) {
    const fd = new FormData();
    fd.append("productid", productid);

    axios.post("http://localhost/save.php", fd).then((res) => {
      //Storing product detail in state array object
      this.setState({ productdetails: res.data[0] });
      $("#myModal").modal("show");
    });
  }

  handleChangeSort(e) {
    this.setState({ sort: e.target.value });
    this.listProduct();
  }
  listProduct() {
    this.setState((state) => {
      if (state.sort !== "") {
        this.data.sort((a, b) =>
          state.sort === "lowest"
            ? a.pprice > b.pprice
              ? 1
              : -1
            : a.pprice < b.pprice
            ? 1
            : -1
        );
      } else {
        this.data.sort((a, b) => (a.id < b.id ? 1 : -1));
      }
      return { filteredProduct: state.data };
    });
  }
  render() {
    return (
      <div className="searchForm">
        <div class="container">
          <div class="row">
            <h4>Our Products</h4>
            <div className="col-md-12">
              <Filter
                size={this.state.size}
                sort={this.state.sort}
                handleChangeSize={this.handleChangeSize}
                handleChangeSort={this.handleChangeSort}
                count={this.state.data.length}
              />
              <hr />
            </div>
          </div>
        </div>
        <form
          style={{
            width: "50%",
            height: "auto",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <input
            className="form-control"
            placeholder="Search for..."
            value={this.state.query}
            onChange={this.handleInputChange}
          />
        </form>
        <div>
          <div class="container">
            <div class="row">
              {this.state.filteredData.map((i) => (
                <div
                  class="col-lg-3 col-md-6 mb-4"
                  key={this.productdetails.id}
                >
                  <br />
                  <div class="card h-100">
                    <a href="#">
                      <img
                        class="card-img-top"
                        src={"http://localhost/uploads/" + i.pimage}
                        alt={i.pimage}
                      />
                    </a>
                    <div class="card-body">
                      <h4 class="card-title">
                        <a href="#">{i.ptitle}</a>
                      </h4>
                      <h5>{i.pprice}</h5>
                      <p class="card-text">{i.pdescription}</p>
                    </div>
                    <div class="card-footer">
                      <small class="text-muted">
                        &#9733; &#9733; &#9733; &#9733; &#9734;
                      </small>
                    </div>
                    <div class="overlay"></div>
                    <div
                      class="button"
                      onClick={(e) => {
                        this.productdetails(i.id);
                      }}
                    >
                      <a href="javascript: false"> Quick View </a>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          </div>
          <footer class="py-5 bg-dark">
            <div class="container">
              <p class="m-0 text-center text-white">
                Copyright &copy; Your Website 2020
              </p>
            </div>
          </footer>
          <div class="modal" id="myModal">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title align-center">Product Details</h4>
                  <button type="button" class="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>

                <div class="modal-body text-center">
                  <table class="table table-hover table-bordered">
                    <thead>
                      <tr>
                        <th>Product Title</th>
                        <th>Product price</th>
                        <th>Product Image</th>
                        <th>Product Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{this.state.productdetails.ptitle}</td>
                        <td>{this.state.productdetails.pprice}</td>
                        <td>
                          <img
                            class="card-img-top"
                            src={
                              "http://localhost/uploads/" +
                              this.state.productdetails.pimage
                            }
                            alt={this.state.productdetails.pimage}
                          />
                        </td>
                        <td>{this.state.productdetails.pdescription}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Product;
