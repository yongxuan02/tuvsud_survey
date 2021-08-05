import React, { Component, Fragment } from 'react';
import NavHeader from "./NavHeader"
import Footer from "../Footer";
import { Form, Input, Label, Check } from "reactstrap";
import $ from "jquery"


export default class AddSupplierGroup extends Component {
    constructor(props) {
        super(props);
        // var today = new Date(),
        // date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + " " +  today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        this.state = {
            group_name: ''
        }
        this.handleAddSupplier = this.handleAddSupplier.bind(this);
    }
    handleAddSupplier(e) {
        e.preventDefault();
        let data = {
            group_name: this.state.group_name
        }

        fetch(process.env.REACT_APP_API + "/api/suppliergroup", {
            method: "POST",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.text())
            .then((result) => {
                $(".alert").fadeIn();
                console.log(JSON.stringify(data))
            },
                (error) => {
                    alert(error);
                })

    }





    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }


    render() {

        const supp = this.state.supp;

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
                                    <h3 class="card-title text-uppercase mb-0">Edit Group </h3>
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
                                                <Label>Supplier Group Name: </Label>
                                                <Input placeholder={"e.g. Supplier 1"} type="text" class="form-control" name={"group_name"} onChange={e => this.handleChange(e)} />
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