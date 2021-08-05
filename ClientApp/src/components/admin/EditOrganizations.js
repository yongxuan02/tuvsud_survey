import React, { Component, Fragment } from 'react';
import NavHeader from "./NavHeader"
import Footer from "../Footer";
import { Form, Input, Label } from "reactstrap";
import $ from "jquery"


export default class EditOrganizations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            organization_name: '',
            industry_id: '',
            company_type_id: [],
            contact_person: '',
            contact_email: '',
            contact_no: '',
            uen: '',
            address: '',
            status: '',
            supplier_group_id:'',
            industry: [],
            supp: [],
            comp_type: [],//all company types

            company_types: [] //selected company types

        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    getOrgs() {
        var id = this.props.match.params.id
        fetch(process.env.REACT_APP_API + "/api/organizations/" + id)
            .then(response => response.json())
            .then(data => {

                console.log(data);
                this.setState({
                    organization_name: data.organization_name,
                    industry_id: data.industry_id,
                    contact_person: data.contact_person,
                    contact_email: data.contact_email,
                    contact_no: data.contact_no,
                    uen: data.uen,
                    address: data.address,
                    company_types: data.company_types,
                    supplier_group_id: data.supplier_group_id,
                    status: data.status
                });

                if(data.company_types.findIndex(ct=>ct.company_type_id==6)>=0 ) {
                    $("#suppliergroup").show();
                }

            })
    }
    handleChange(e) {
        console.log(e.target.name+ " "+e.target.value);
        if (e.target.type == "radio" && e.target.name == "status") {
            this.setState({ [e.target.name]: !this.state.status });
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
        if (e.target.name == "company_type_id") {
            if(e.target.value == "6") {
                $("#suppliergroup").toggle();
            }
            let index = this.state.company_types.findIndex(ct=>ct.company_type_id==e.target.value);
            if(index>-1) {
                if(this.state.company_types[index].organizations_id != 0) {
                    this.state.company_types[index].organizations_id = 0; 
                }
                else {
                    this.state.company_types[index].organizations_id = this.props.match.params.id;
                }
            }
            else {
                this.state.company_types.push({id:0, organizations_id: this.props.match.params.id, company_type_id: e.target.value});
            }
        }
    }
    handleSubmit(e) {
        e.preventDefault();

        //check if at least one  company typs is selected
        var id = this.props.match.params.id;

        let data = {
            id: id,
            organization_name: this.state.organization_name,
            industry_id: parseInt(this.state.industry_id),
            company_types: this.state.company_types,
            contact_person: this.state.contact_person,
            contact_email: this.state.contact_email,
            contact_no: this.state.contact_no,
            uen: this.state.uen,
            address: this.state.address,
            status: this.state.status
        };
        if($("#suppliergroup").is(":visible")) {
            data.supplier_group_id = this.state.supplier_group_id;
            console.log("visible");
        }
        console.log(JSON.stringify(data));
        // alert(this.state.first_name);
        fetch(process.env.REACT_APP_API + "/api/organizations/" + id, {
            method: "PUT",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data),

        }).then(res => res.text())
            .then((result) => {
                // alert(result);
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
    getSupplier() {
        fetch(process.env.REACT_APP_API + "/api/suppliergroup")
            .then(response => response.json())
            .then(data => {
                this.setState({ supp: data })

            })
    }

    getCompTypes() {
        fetch(process.env.REACT_APP_API + "/api/others/type/Company Type")
            .then(response => response.json())
            .then(data => {
                console.log(data);

                this.setState({ comp_type: data })
                console.log(this.state.comp_type);

            })
    }

    getIndustry() {
        fetch(process.env.REACT_APP_API + "/api/others/type/Industry")
            .then(response => response.json())
            .then(data => {
                this.setState({ industry: data })

            })
    }

    componentDidMount() {
        this.getSupplier();
        this.getIndustry();
        this.getOrgs();
        this.getCompTypes();
        $("#suppliergroup").hide();

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
                                    <h3 class="card-title text-uppercase mb-0">Edit Company </h3>
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
                                                <Input required defaultValue={this.state.organization_name} type="text" class="form-control" name={"organization_name"} onChange={e => this.handleChange(e)} />
                                            </div>
                                            <div class='form-group'>
                                                <Label>Company Type:</Label>
                                                {comp_type.map(item => (
                                                    <div class='form-check'>
                                                        <input class='form-check-input' name={"company_type_id"} type="checkbox" value={item.id} onChange={event => this.handleChange(event)} checked={this.state.company_types.findIndex(ct=>ct.company_type_id==item.id && ct.organizations_id != 0)>=0 } />
                                                        {item.name}
                                                    </div>
                                                ))
                                                }
                                                <br />
                                            </div>
                                            <div class='form-group' id="suppliergroup">
                                                <Label>Supplier Group:</Label><br />
                                                <select defaultValue={this.state.supplier_group_id} className="browser-default custom-select" aria-label="Default select example" name={"supplier_group_id"} onChange={e => this.handleChange(e)}>

                                                    {supp.map((supp, index) => (
                                                        <option key={supp.id} value={supp.id}>{supp.group_name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div class='form-group'>
                                                <Label>UEN/ROC no: </Label>
                                                <Input required defaultValue={this.state.uen} type="text" class="form-control" name={"uen"} onChange={e => this.handleChange(e)} />
                                            </div>
                                            <div class='form-group'>
                                                <Label>Company Address: </Label>
                                                <Input required defaultValue={this.state.address} type="text" class="form-control" name={"address"} onChange={e => this.handleChange(e)} />
                                            </div>
                                            <div class='form-group'>
                                                <Label>Industry:</Label><br />
                                                <select required defaultValue={this.state.industry_id} className="browser-default custom-select" aria-label="Default select example" name={"industry_id"} onChange={e => this.handleChange(e)}>

                                                    {industry.map((i, index) => (
                                                        <option key={i.id} value={i.id}>{i.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div class='form-group'>
                                                <Label>Contact Person: </Label>
                                                <Input required defaultValue={this.state.contact_person} type="text" class="form-control" name={"contact_person"} onChange={e => this.handleChange(e)} />
                                            </div>
                                            <div class='form-group'>
                                                <Label>Contact No.: </Label>
                                                <Input required defaultValue={this.state.contact_no} type="text" class="form-control" name={"contact_no"} onChange={e => this.handleChange(e)} />
                                            </div>
                                            <div class='form-group'>
                                                <Label>Company Email: </Label>
                                                <Input required defaultValue={this.state.contact_email} type="text" class="form-control" name={"contact_email"} onChange={e => this.handleChange(e)} />
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
            </Fragment >
        );
    }
}