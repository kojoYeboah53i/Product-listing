/*import React, { useState } from "react";
import Si from "./Si";

const Search = () => {
  const [img, setImg] = useState("");
  const inputEvent = (event) => {
    const data = event.target.value;
    console.log(data);
    setImg(data);
  };
  return (
    <>
      <div
        style={{
          width: "50%",
          height: "auto",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search"
          onChange={inputEvent}
          value={img}
        />
        <Si />
      </div>
    </>
  );
};

export default Search;
*/
import React, { Component } from "react";
import ProductList from "../components/ProductList";

class Search extends Component {
  state = {
    query: "",
    data: [],
    filteredData: [],
  };

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

  render() {
    return (
      <div className="searchForm">
        <form>
          <input
            placeholder="Search for..."
            value={this.state.query}
            onChange={this.handleInputChange}
          />
        </form>
        <div>
          {this.state.filteredData.map((i) => (
            <div className="MainDiv">
              <div class="container">
                <div class="row">
                  <h4>Our Products</h4>
                  <div className="col-md-12">
                    <p>
                      <Search />
                    </p>
                  </div>
                </div>
              </div>
              <div class="container">
                <div class="row">
                  {this.state.data.map((result) => {
                    return (
                      <div class="col-lg-3 col-md-6 mb-4">
                        <br />
                        <div class="card h-100">
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
                          <div
                            class="button"
                            onClick={(e) => {
                              this.productdetails(result.id);
                            }}
                          >
                            <a href="javascript: false"> Quick View </a>
                          </div>
                        </div>
                        <hr />
                      </div>
                    );
                  })}
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
          ))}
        </div>
      </div>
    );
  }
}

export default Search;
