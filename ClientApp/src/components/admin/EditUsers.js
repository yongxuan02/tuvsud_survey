import React, { Component, Fragment } from 'react';
import NavHeader from "./NavHeader"
import Footer from "../Footer";
import { Form, Input, Label, Check } from "reactstrap";
import $ from "jquery"

export default class EditUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            admin: '',
            status: '',
            organizations_id: '',
            user_type_id: '',
            password_hashed: '',
            confirm_password: '',
            orgs: [],
            user_type: [],
            user: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    getUsers() {
        var id = this.props.match.params.id
        fetch(process.env.REACT_APP_API + "/api/users/" + id)
            .then(response => response.json())
            .then(data => {

                console.log(data);
                this.setState({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    username: data.username,
                    admin: data.admin,
                    organizations_id: data.organizations_id,
                    user_type_id: data.user_type_id,
                    status: data.status
                })

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

    getOrganizations() {
        fetch(process.env.REACT_APP_API + "/api/organizations")
            .then(response => response.json())
            .then(data => {
                this.setState({ orgs: data })
                console.log(this.state.orgs);

            })
    }


    handleChange(e) {
        if (e.target.type == "checkbox" && e.target.name == "admin") {
            this.setState({ [e.target.name]: !this.state.admin });
        } else if (e.target.type == "radio" && e.target.name == "status") {
            this.setState({ [e.target.name]: !this.state.status });
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.password_hashed != "" && this.state.password_hashed != this.state.confirm_password) {
            $(".alert").text("The password confirmation does not match.");
            $(".alert").addClass("alert-danger");
            $(".alert").fadeIn();
            return;
        }
        var id = this.props.match.params.id;

        let data = {
            id: id,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            username: this.state.email,
            email: this.state.email,
            admin: this.state.admin,
            status: this.state.status,
            organizations_id: parseInt(this.state.organizations_id),
            user_type_id: parseInt(this.state.user_type_id),
            password_hashed: this.state.password_hashed
        };
        console.log(JSON.stringify(data));
        fetch(process.env.REACT_APP_API + "/api/users/" + id, {
            method: "PUT",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data),

        }).then(res => res.text())
            .then((result) => {
                $(".alert").text("Successfully updated");
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
    componentDidMount() {
        this.getOrganizations();
        this.getUserTypes();
        this.getUsers();
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
                                    <h3 class="card-title text-uppercase mb-0">Edit User </h3>
                                </div>

                            </div>

                            <div className="card-body pb-5">

                                <div class="row">
                                    <div class="col-md-8 offset-md-2">
                                        <div class="alert alert-success alert-dismissible fade show mb-3 alert-hide" role="alert">
                                            Successfully Updated
                                            <button type="button" onClick={this.handleAlert} class="btn-close mr-2 " data-bs-dismiss="alert" aria-label="Close">X</button>
                                        </div>

                                        <Form onSubmit={e => this.handleSubmit(e)} id="myForm">

                                            <div class='form-group'>
                                                <Label>Select Company:</Label><br />
                                                <select defaultValue={this.state.organizations_id} className="browser-default custom-select" aria-label="Default select example" name={"organizations_id"} onChange={e => this.handleChange(e)}>

                                                    {orgs.map((o, index) => (
                                                        <Fragment key={o.id}>
                                                            {(() => {
                                                                if (o.id == this.state.organizations_id) {
                                                                    return (
                                                                        <option selected key={o.id} value={o.id}>
                                                                            {o.organization_name}
                                                                        </option>
                                                                    );
                                                                } else {
                                                                    return (
                                                                        <option key={o.id} value={o.id}>
                                                                            {o.organization_name}
                                                                        </option>
                                                                    );
                                                                }
                                                            })()}
                                                        </Fragment>
                                                    ))}
                                                </select>

                                            </div>
                                            <div class='form-group'>
                                                <Label>Select Type:</Label><br />
                                                <select defaultValue={this.state.user_type_id} className="browser-default custom-select" aria-label="Default select example" name={"user_type_id"} onChange={e => this.handleChange(e)}>


                                                    {user_type.map((o, index) => (
                                                        <Fragment key={o.id}>
                                                            {(() => {
                                                                if (o.id == this.state.user_type_id) {
                                                                    return (
                                                                        <option selected key={o.id} value={o.id}>
                                                                            {o.name}
                                                                        </option>
                                                                    );
                                                                } else {
                                                                    return (
                                                                        <option key={o.id} value={o.id}>
                                                                            {o.name}
                                                                        </option>
                                                                    );
                                                                }
                                                            })()}
                                                        </Fragment>
                                                    ))}

                                                </select>

                                            </div>

                                            <div class='form-group'>
                                                <Label>First Name: </Label>
                                                <Input defaultValue={this.state.first_name} type="text" class="form-control" name={"first_name"} onChange={e => this.handleChange(e)} />
                                            </div>
                                            <div class='form-group'>
                                                <Label>Last Name: </Label>
                                                <Input defaultValue={this.state.last_name} type="text" class="form-control" name={"last_name"} onChange={e => this.handleChange(e)} />
                                            </div>

                                            <div class='form-group'><Label>Email: </Label>
                                                <Input defaultValue={this.state.email} type="text" class="form-control" name={"email"} readonly />
                                            </div>
                                            <div class='form-group'>
                                                <Label>Password (optional): </Label><br></br>
                                                <Input placeholder="Enter password here..." type='password' class='form-control' name={"password_hashed"} onChange={e => this.handleChange(e)} />
                                            </div>
                                            <div class='form-group'>
                                                <Label>Confirm Password (optional): </Label><br></br>
                                                <Input placeholder="Enter password again here..." type='password' class='form-control' name={"confirm_password"} onChange={e => this.handleChange(e)} />
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
                                                <label for="">Status</label>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="status" id="status1" value="true" checked={this.state.status == true} onChange={e => this.handleChange(e)} />
                                                    <label class="form-check-label" for="status1">
                                                        Active
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="status" id="status2" value="false" checked={this.state.status == false} onChange={e => this.handleChange(e)} />
                                                    <label class="form-check-label" for="status2">
                                                        Inactive
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <button type="submit" className="btn btn-outline-primary mt-2 float-end">Update</button>
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
        );
    }
}