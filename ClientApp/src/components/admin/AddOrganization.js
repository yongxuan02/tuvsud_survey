import React, { Component, Fragment } from 'react';
import NavHeader from "./NavHeader"
import Footer from "../Footer";
import { Form, Input, Label, Check } from "reactstrap";
import $ from "jquery"

export default class AddOrganization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            organization_name: '',
            industry_id: '',
            company_type_id: '',
            contact_person: '',
            contact_email: '',
            contact_no: '',
            supplier_group_id:'',
            uen: '',
            address: '',
            industry: [],
            comp_type: [],
            supp: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    handleSubmit(e) {
        e.preventDefault();
        var company_types = [];
        $("[name=company_type_id]:checked").each(function () {
            var ct = { "company_type_id": $(this).val() };
            company_types.push(ct);
        })

        let data = {
            organization_name: this.state.organization_name,
            industry_id: parseInt(this.state.industry_id),
            contact_person: this.state.contact_person,
            contact_email: this.state.contact_email,
            contact_no: this.state.contact_no,
            uen: this.state.uen,
            address: this.state.address,
            company_types: company_types,
            supplier_group_id: this.state.supplier_group_id,
            status: true

        }

        fetch(process.env.REACT_APP_API + "/api/organizations", {
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
                console.log(JSON.stringify(data))
            },
                (error) => {
                    $(".alert").text(error);
                    $(".alert").addClass("alert-danger");
                    $(".alert").fadeIn();
                })

    }

    getSupplier() {
        fetch(process.env.REACT_APP_API + "/api/suppliergroup")
            .then(response => response.json())
            .then(data => {
                this.setState({ supp: data })
                console.log(this.state.supp);

            })
    }

    getCompTypes() {
        fetch(process.env.REACT_APP_API + "/api/others/type/Company Type")
            .then(response => response.json())
            .then(data => {
                this.setState({ comp_type: data })
                console.log(this.state.comp_type);

            })
    }

    getIndustry() {
        fetch(process.env.REACT_APP_API + "/api/others/type/Industry")
            .then(response => response.json())
            .then(data => {
                this.setState({ industry: data })
                console.log(this.state.industry);

            })
    }

    componentDidMount() {
        this.getCompTypes();
        this.getIndustry();
        this.getSupplier();
        $("#suppliergroup").hide();
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log(e.target.name+" "+e.target.value);
        if(e.target.name=="company_type_id" && e.target.value == "6") {   
            $("#suppliergroup").toggle();
            console.log("here");
        }
    }

    render() {
        const supp = this.state.supp;
        const comp_type = this.state.comp_type;
        const industry = this.state.industry;
        
        return (
            <Fragment>
                <NavHeader />

                <div className="body_background">
                    <br></br><br></br>
                    <div className="container">
                        <div className="card">
                            <div className="card-header">
                                <div className="text-center">
                                    <a href="/admin/organizations" className="btn btn-outline-info float-end btn-sm">Organizations List</a>
                                    <h3 class="card-title text-uppercase mb-0">Add New Company </h3>
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
                                                <Label>Company Name: </Label>
                                                <Input required placeholder="Enter company name here" type="text" class="form-control" name={"organization_name"} onChange={e => this.handleChange(e)} />
                                            </div>
                                            <div class="form-group">
                                                <label for="">Select Company Type</label>
                                                {comp_type.map((comp_type, index) => (
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" name="company_type_id" id={comp_type.name} value={comp_type.id} onChange={e => this.handleChange(e)} />
                                                        <label class="form-check-label" for={comp_type.name}>{comp_type.name}</label>
                                                    </div>
                                                ))}
                                            </div>
                                            <div class='form-group' id="suppliergroup">
                                                <Label>Supplier Group:</Label><br />
                                                <select className="browser-default custom-select" aria-label="Default select example" name={"supplier_group_id"} onChange={e => this.handleChange(e)}>

                                                    {supp.map((supp, index) => (
                                                        <option key={supp.id} value={supp.id}>{supp.group_name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div class='form-group'>
                                                <Label>UEN/ROC No: </Label>
                                                <Input required placeholder="Enter company uen/roc here" type="text" class="form-control" name={"uen"} onChange={e => this.handleChange(e)} />
                                            </div>
                                            <div class='form-group'>
                                                <Label>Company Address: </Label>
                                                <Input required placeholder="Enter company address here" type="text" class="form-control" name={"address"} onChange={e => this.handleChange(e)} />
                                            </div>
                                            <div class='form-group'>
                                                <Label>Industry:</Label><br />
                                                <select defaultValue="" className="browser-default custom-select" aria-label="Default select example" name={"industry_id"} onChange={e => this.handleChange(e)}>
                                                    <option value="" disabled selected hidden>Select Industry</option>
                                                    {industry.map((i, index) => (
                                                        <option key={i.id} value={i.id}>{i.name}</option>
                                                    ))}

                                                </select>
                                            </div>
                                            <div class='form-group'>
                                                <Label>Contact Person: </Label>
                                                <Input required placeholder="Enter contact person here" type="text" class="form-control" name={"contact_person"} onChange={e => this.handleChange(e)} />
                                            </div>
                                            <div class='form-group'>
                                                <Label>Contact No: </Label>
                                                <Input required placeholder="Enter contact no here" type="text" class="form-control" name={"contact_no"} onChange={e => this.handleChange(e)} />
                                            </div>
                                            <div class='form-group'>
                                                <Label>Company Email: </Label>
                                                <Input required placeholder="Enter company email here" type="text" class="form-control" name={"contact_email"} onChange={e => this.handleChange(e)} />
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