import React, { Component, Fragment } from "react";
import NavHeader from "./NavHeader";
import { Form, Input, Label, Check } from "reactstrap";
import $ from "jquery";
import CreateOthers from "./CreateOthers";

export default class EditOthers extends Component {
  constructor(props) {
    super(props);
    this.state = { id:0, name: "", info: "", status: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  getOthers() {
    var id = this.props.match.params.id;
    var type = this.props.match.params.type;
    fetch(process.env.REACT_APP_API+"/api/others/" + id)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ id: id, name: data.name, status: data.status, info: data.info });
      });
  }
  handleChange(e) {
    e.target.name != "status"
      ? this.setState({ [e.target.name]: e.target.value })
      : this.setState({ [e.target.name]: !this.state.status });
  }
  handleSubmit(e) {
    e.preventDefault();
    var id = this.props.match.params.id;
    var type = this.props.match.params.type;

    let data = {id:id, name: this.state.name, status: this.state.status, info: this.state.info };
    // alert(this.state.iso);
    fetch(process.env.REACT_APP_API+"/api/others/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.text())
      .then(
        (result) => {
          // alert(result);
          $(".alert").fadeIn();
        },
        (error) => {
          alert(error);
        }
      );
  }
  componentDidMount() {
    this.getOthers();
  }
  render() {
    var type = this.props.match.params.type;
    return (
      <Fragment>
        <NavHeader />
        <CreateOthers
          alertMessage={"Edited"}
          nameValue={this.state.name}
          btn={"Edit"}
          link={"/admin/others/list/"+type}
          linkName={type+" List"}
          title={"Edit "+type}
          placeholder={"Enter "+type+" name here..."}
          name={"iso"}
          handleChange={(e) => this.handleChange(e)}
          handleSubmit={(e) => this.handleSubmit(e)}
          status={
            <div clas='form-group'>
              <label class='switch'>
                <input
                  type='checkbox'
                  name='status'
                  onChange={(e) => this.handleChange(e)}
                  checked={this.state.status}
                />
                <span class='slider round'></span>
              </label>
              <span>&nbsp;&nbsp;Status</span>
            </div>
          }
        />
      </Fragment>
    );
  }
}
