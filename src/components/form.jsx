import React, { Component } from "react";
import Input from "./input";

const options = ["class-1", "class-2", "class-3", "class-4", "class-5"];

class Form extends Component {
  state = {
    name: "",
    surname: "",
    graduate: "",
    description: "",
    options: [],
    errors: {}
  };
  componentDidMount() {
    fetch("http://cyf.com/options.json").then(response => {
      if (!response) {
        this.setState({
          options
        });
      } else {
        this.setState({
          options: response.options
        });
      }
    });
  }

  validate = () => {
    const errors = {};
    const { name, surname } = this.state;
    if (name.trim() === "") errors.name = "Name is required";
    if (surname.trim() === "") errors.surname = "Surname is required";
    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({
      errors
    });
    if (errors) {
      return;
    } else {
      console.log(this.state);
      fetch("./api/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json "
        },
        body: JSON.stringify(this.state)
      });
      this.setState({
        name: "",
        surname: "",
        graduate: "",
        description: "",
        errors: {}
      });
    }
  };
  handleChange = e => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  };
  render() {
    const { name, surname, graduate, description, errors } = this.state;

    return (
      <div>
        <h1>Form</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <Input
                name="name"
                value={name}
                label="Name"
                placeholder="John"
                onChange={this.handleChange}
                error={errors !== null && errors.name}
              />
              <Input
                name="surname"
                value={surname}
                label="Surname"
                placeholder="Smith"
                onChange={this.handleChange}
                error={errors !== null && errors.surname}
              />

              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">
                  Which class you studied?
                </label>
                <select
                  name="graduate"
                  className="form-control"
                  id="exampleFormControlSelect1"
                  onChange={this.handleChange}
                  value={graduate}
                >
                  {options.map((element, index) => (
                    <option key={index}>{element}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Description</label>
                <textarea
                  name="description"
                  value={description}
                  onChange={this.handleChange}
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                />
              </div>
            </div>
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;
