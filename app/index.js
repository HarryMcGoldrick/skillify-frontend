import React from "react";
import ReactDOM from "react-dom";
import "fontsource-roboto";
import Button from "@material-ui/core/Button";
// import './index.css';

class App extends React.Component {
  render() {
    return (
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
