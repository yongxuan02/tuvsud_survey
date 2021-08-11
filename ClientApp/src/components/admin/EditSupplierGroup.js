import React, { Component, Fragment } from 'react';
import NavHeader from "./NavHeader"
import Footer from "../Footer";
import { Form, Input, Label, Check } from "reactstrap";
import $ from "jquery"

export default class EditSupplierGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            group_name: '',
            status: false,
            orgs: [],
            sel_orgs: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleEditSupplierGroup = this.handleEditSupplierGroup.bind(this);
    }
    getSupplierGroup() {
        var id = this.props.match.params.id
        fetch(process.env.REACT_APP_API + "/api/suppliergroup/" + id)
            .then(response => response.json())
            .then(data => {

                console.log(data);
                this.setState({
                    group_name: data.group_name,
                    status: data.status,
                    sel_orgs: data.orgs
                })

            })
    }
    getOrgs() {
        // var id = this.props.match.params.id
        fetch(process.env.REACT_APP_API + "/api/organizations/")
            .then(response => response.json())
            .then(data => {

                this.setState({ orgs: data })
                console.log(this.state.orgs);
            })
    }
    handleChange(e) {
        if (e.target.name == "status") {
            this.setState({ [e.target.name]: !this.state.status });
        }
        else {
            this.setState({ [e.target.name]: e.target.value });
        }

    }
    handleEditSupplierGroup(e) {
        e.preventDefault();
        var id = this.props.match.params.id;
        var orgslist = $("#orgs").val().map(Number);
        console.log("orgs=" + orgs);
        //convert list of ints to list of objects
        var orgs = [];
        for (var i = 0; i < orgslist.length; i++) {
            var org = { "id": orgslist[i] };
            orgs.push(org);
        }

        let data = {
            id: id,
            group_name: this.state.group_name,
            status: this.state.status,
            orgs: orgs

        };
        console.log(JSON.stringify(data));
        // alert(this.state.supplier_group_id);
        fetch(process.env.REACT_APP_API + "/api/suppliergroup/" + id, {
            method: "PUT",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data),

        }).then(res => res.text())
            .then((result) => {
                // alert(result);
                $(".alert").fadeIn();


            },
                (error) => {
                    alert(error);
                })

    }
    componentDidMount() {
        this.getSupplierGroup();
        this.getOrgs();
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
                                            Successfully Editted
                                            <button type="button" onClick={this.handleAlert} class="btn-close mr-2 " data-bs-dismiss="alert" aria-label="Close">X</button>
                                        </div>

                                        <Form onSubmit={e => this.handleSubmit(e)} id="myForm">

                                            <div class='form-group'>
                                                <Label>Supplier Group Name: </Label>
                                                <Input defaultValue={this.state.group_name} type="text" class="form-control" name={"group_name"} onChange={e => this.handleChange(e)} checked={this.state.group_name} />
                                            </div>

                                            <div class="form-group">
                                                <Label>Organizations</Label>
                                                <select defaultValue="" multiple className="browser-default custom-select" aria-label="Default select example" id="orgs" name={"orgs_id"} onChange={e => this.handleChange(e)}>
                                                    {this.state.orgs.map((org) => (
                                                        <option key={org.id} value={org.id} selected={this.state.sel_orgs.findIndex(ct => ct.id == org.id) >= 0}>{org.organization_name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div clas='form-group'>
                                                <label class='switch'>
                                                    <input type='checkbox' name='status' onChange={(e) => this.handleChange(e)} checked={this.state.status} />
                                                    <span class='slider round'></span>
                                                </label>
                                                <span>&nbsp;&nbsp;Status</span>
                                            </div>

                                            <div class="form-group">
                                                <button type="submit" className="btn btn-outline-primary mt-2 float-end">Edit</button>
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
