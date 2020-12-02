import React, { useState } from "react";
import SideNav from "react-simple-sidenav";
import menu from "../assets/menu.png";
import { Link } from "react-router-dom";
//import { Carousel } from "react-bootstrap";

function SideBar() {
  const [showNav, setShowNav] = useState();
  const navItems = [
    <Link to="/addproduct">
      <span>
        <i class="fas fa-plus"></i>
      </span>
      Add Product
    </Link>,
  ];

  return (
    <div>
      <hr style={{ backgroundColor: "black", fontWeight: "bold" }}></hr>
      <div>
        <Link to="#">
          <img
            alt="png"
            src={menu}
            onClick={() => setShowNav(true)}
            style={{ width: 30, height: 30 }}
          />
        </Link>

        <SideNav
          showNav={showNav}
          onHideNav={() => setShowNav(false)}
          title="Dashboard"
          titleStyle={{ backgroundColor: "green" }}
          itemStyle={{ backgroundColor: "#fff" }}
          itemHoverStyle={{ backgroundColor: "white" }}
          items={navItems}
        />
      </div>
    </div>
  );
}

export default SideBar;
