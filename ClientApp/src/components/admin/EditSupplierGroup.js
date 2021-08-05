import React, { Component, Fragment } from 'react';
import NavHeader from "./NavHeader"
import Footer from "../Footer";
import { Form, Input, Label, Check } from "reactstrap";
import $ from "jquery"

export default class EditSupplierGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            group_name: ''
        }
        this.handleEditSupplierGroup = this.handleEditSupplierGroup.bind(this);
    }
    getSupplierGroup() {
        var id = this.props.match.params.id
        fetch(process.env.REACT_APP_API + "/api/suppliergroup/" + id)
            .then(response => response.json())
            .then(data => {


                this.setState({ group_name: data.group_name })

            })
    }
    handleChange(e) {
        e.target.name != "status" ? this.setState({ [e.target.name]: e.target.value }) : this.setState({ [e.target.name]: !this.state.status })

    }
    handleEditSupplierGroup(e) {
        e.preventDefault();
        var id = this.props.match.params.id;

        let data = {
            group_name: this.state.group_name

        };
        alert(this.state.supplier_group_id);
        fetch(process.env.REACT_APP_API + "/api/suppliergroup/edit/" + id, {
            method: "PUT",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data),

        }).then(res => res.text())
            .then((result) => {
                alert(result);
                $(".alert").fadeIn();


            },
                (error) => {
                    alert(error);
                })

    }
    componentDidMount() {
        this.getSupplierGroup();
    }
    render() {

        return (
            <Fragment>
                <NavHeader />
                <div className="body_background">
                    <br></br><br></br>
                    <div className="container">
                        <div className="card">
                            <div className="card-header">
                                <div className="text-center">
                                    <a href="/admin/suppliergroup" className="btn btn-outline-info float-end btn-sm">Group List</a>
                                    <h3 class="card-title text-uppercase mb-0">Add New Group </h3>
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
                                                <Label>Supplier Group Name: </Label>
                                                <Input defaultValue={this.state.group_name} type="text" class="form-control" name={"group_name"} onChange={e => this.handleChange(e)} checked={this.state.first_name} />
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
        );
    }
}