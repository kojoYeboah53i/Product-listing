import React from "react";
//For API Requests
import axios from "axios";
import { Link } from "react-router-dom";
import back from "../assets/back.png";
//Success POPUP
import Swal from "sweetalert2";

class AddProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imagedata: String,
    };
    this.addFormData = this.addFormData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  //FileChange
  handleChange(file) {
    this.setState({
      imagedata: file[0],
    });
  }
  //Form Submission
  addFormData(evt) {
    evt.preventDefault();
    const fd = new FormData();
    fd.append("productname", this.refs.productname.value);
    fd.append("productprice", this.refs.productprice.value);
    fd.append("productimage", this.state.imagedata);
    fd.append("productdesc", this.refs.productdesc.value);
    axios.post("http://localhost/savedata.php", fd).then((res) => {
      this.myFormRef.reset();
      //alert("submitted successfully");
      //Success Message in Sweetalert modal
      Swal.fire({
        title: "Product has been added successfully.",
        text: "Thanks",
        type: "success",
      });
    });
  }

  render() {
    return (
      <div className="MainDiv">
        <div class="container main-container">
          <Link to="/sidenav">
            <img
              alt="png"
              src={back}
              style={{ width: 30, height: 30, marginLeft: 20, marginTop: 20 }}
            />
          </Link>
          <div class="row">
            <div class="col-lg-12">
              <h1 className="text-center mt-5 mb-5">Add Product</h1>
              <form ref={(el) => (this.myFormRef = el)} className="mt-5 mb-5">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="productname"
                    placeholder="Enter Product Name"
                    ref="productname"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    placeholder="Product Price"
                    ref="productprice"
                  />
                </div>
                <div className="form-group">
                  <label for="image">Product Image:</label>
                  <input
                    onChange={(e) => this.handleChange(e.target.files)}
                    type="file"
                    className="form-control"
                    id="image"
                    ref="productimage"
                  />
                </div>
                <div className="form-group">
                  <label for="comment">Product Description:</label>
                  <textarea
                    class="form-control"
                    rows="5"
                    id="productdesc"
                    ref="productdesc"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.addFormData}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AddProduct;
