import React from "react";
import "./Navbar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import Searchbar from "../SearchResults/Searchbar";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar__left">
        <Link to="/">
          <img className="logo" src={logo} alt="" />
        </Link>
      </div>
      <div className="navbar__right">
        <div className="links">
          <Link
            to="/"
            style={{
              display: "flex",
              textDecoration: "none",
              color: "#d62929bb",
              alignItems: "center",
              marginRight: "1vw",
              marginLeft: "3vw",
            }}
          >
            <HomeOutlinedIcon style={{ padding: "5px", marginTop: "3px" }} />{" "}
            <p className="linkdesc">Home</p>
          </Link>
          <Link
            to="/favorite"
            style={{
              display: "flex",
              textDecoration: "none",
              color: "#d62929bb",
              alignItems: "center",
              marginRight: "3vw",
              marginLeft: "1vw",
            }}
          >
            <FavoriteBorderOutlinedIcon
              style={{ padding: "5px", marginTop: "3px" }}
            />{" "}
            <p className="linkdesc">Favorite</p>
          </Link>
          <Searchbar />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
