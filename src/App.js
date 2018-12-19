import React, { Component } from "react";
import Form from "./components/form";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <main className="container">
          <Form />
        </main>
      </div>
    );
  }
}

export default App;
