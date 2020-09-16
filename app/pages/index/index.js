import React from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import "./index.css";
import Welcome from "../Welcome";
import "fontsource-roboto";
import Navbar from "../../components/navbar/navbar";

class App extends React.Component {
  render() {
    return (
      <>
        <Navbar></Navbar>
        <Welcome></Welcome>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
