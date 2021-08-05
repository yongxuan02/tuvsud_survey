import React, { Component, Fragment } from 'react';
import NavHeader from "./NavHeader"
import Footer from "../Footer";
import { Form, Input, Label } from "reactstrap";

import $ from "jquery"

export default class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            admin: '',
            organizations_id: '',
            user_type_id: '',
            password_hashed: '',
            orgs: [],
            user_type: [],
            user: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        console.log("submit");
        e.preventDefault();
        console.log(this.state.password_hashed+" "+this.state.confirm_password);
        if(this.state.password_hashed!=this.state.confirm_password) {
            $(".alert").text("The password confirmation does not match.");
            $(".alert").addClass("alert-danger");
            $(".alert").fadeIn();
            return;
        }
        let data = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            username: this.state.email,
            email: this.state.email,
            admin: (this.state.admin=="on"),
            organizations_id: parseInt(this.state.organizations_id),
            user_type_id: parseInt(this.state.user_type_id),
            password_hashed: this.state.password_hashed
        }
console.log(JSON.stringify(data));
        fetch(process.env.REACT_APP_API + "/api/users", {
            method: "POST",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.text())
            .then((result) => {
                $(".alert").text("Successfully created");
                $(".alert").removeClass("alert-danger");
                $(".alert").addClass("alert-success");
                $(".alert").fadeIn();
            },
                (error) => {
                    $(".alert").text(error);
                    $(".alert").addClass("alert-danger");
                    $(".alert").fadeIn();
                })

    }

    getOrganizations() {
        fetch(process.env.REACT_APP_API + "/api/organizations")
            .then(response => response.json())
            .then(data => {
                this.setState({ orgs: data })
                console.log(this.state.orgs);

            })
    }

    getUser() {
        fetch(process.env.REACT_APP_API + "/api/users")
            .then(response => response.json())
            .then(data => {
                this.setState({ user: data })
                console.log(this.state.user);

            })
    }

    getUserTypes() {
        fetch(process.env.REACT_APP_API + "/api/others/type/User Type")
            .then(response => response.json())
            .then(data => {
                this.setState({ user_type: data })
                console.log(this.state.user_type);

            })
    }


    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })

    }

    componentDidMount() {
        this.getOrganizations();
        this.getUserTypes();
        this.getUser();
    }


    render() {
        const orgs = this.state.orgs;
        const user_type = this.state.user_type;
        return (
            <Fragment>
                <NavHeader />

                <div className="body_background">
                    <br></br><br></br>
                    <div className="container">
                        <div className="card">
                            <div className="card-header">
                                <div className="text-center">
                                    <a href="/admin/users" className="btn btn-outline-info float-end btn-sm">Users List</a>
                                    <h3 class="card-title text-uppercase mb-0">Add New User </h3>
                                </div>

                            </div>

                            <div className="card-body pb-5">

                                <div class="row">
                                    <div class="col-md-8 offset-md-2">
                                        <div class="alert alert-success alert-dismissible fade show mb-3 alert-hide" role="alert">
                                            Successfully Created
                                            <button type="button" onClick={this.handleAlert} class="btn-close mr-2 " data-bs-dismiss="alert" aria-label="Close">X</button>
                                        </div>

                                        <Form onSubmit={e => this.handleSubmit(e)} id="myForm">
                                            <div class='form-group'>
                                                <Label>Select Company:</Label><br />
                                                <select className="browser-default custom-select" aria-label="Default select example" name={"organizations_id"} onChange={e => this.handleChange(e)}>
                                                    <option value="" disabled selected hidden>Select Organization</option>
                                                    {orgs.map((org) => (
                                                        <option key={org.id} value={org.id}>{org.organization_name}</option>
                                                    ))}
                                                </select>

                                            </div>
                                            <div class='form-group'>
                                                <Label>Select Type:</Label><br />
                                                <select defaultValue="" className="browser-default custom-select" aria-label="Default select example" name={"user_type_id"} onChange={e => this.handleChange(e)}>
                                                    <option value="" disabled selected hidden>Select User Type</option>
                                                    {user_type.map((ut, index) => (
                                                        <option key={ut.id} value={ut.id}>{ut.name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div class='form-group'>
                                                <Label>First Name: </Label>
                                                <Input required placeholder="Enter first name here" type="text" class="form-control" name={"first_name"} onChange={e => this.handleChange(e)} />
                                            </div>
                                            <div class='form-group'>
                                                <Label>Last Name: </Label>
                                                <Input required placeholder="Enter last name here" type="text" class="form-control" name={"last_name"} onChange={e => this.handleChange(e)} />
                                            </div>
                                            <div class='form-group'><Label>Email: </Label>
                                                <Input required placeholder="Enter email here..." type="text" class="form-control" name={"email"} onChange={e => this.handleChange(e)} />
                                            </div>
                                            <div class='form-group'>
                                                <Label>Password: </Label><br></br>
                                                <Input required placeholder="Enter password here..." type='password' class='form-control' name={"password_hashed"} onChange={e => this.handleChange(e)} />
                                            </div>
                                            <div class='form-group'>
                                                <Label>Confirm Password: </Label><br></br>
                                                <Input required placeholder="Enter password again here..." type='password' class='form-control' name={"confirm_password"} onChange={e => this.handleChange(e)} />
                                            </div>
                                            <div clas='form-group'>
                                                <label class='switch'>
                                                    <input
                                                        type='checkbox'
                                                        name='admin'
                                                        onChange={(e) => this.handleChange(e)}
                                                        checked={this.state.admin}
                                                    />
                                                    <span class='slider round'></span>
                                                </label>
                                                <span>&nbsp;&nbsp;Make Admin</span>
                                            </div>
                                            <div class="form-group">
                                                <button type="submit" className="btn btn-outline-primary mt-2 float-end">Create</button>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br /><br /><br /><br /><br></br><br></br><br></br><br></br><br></br><br></br>
                    <Footer />
                </div>

            </Fragment>

        )
    }
}