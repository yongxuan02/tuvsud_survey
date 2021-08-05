import React, { Component, Fragment } from 'react';
import NavHeader from "./NavHeader"
import Footer from "../Footer";
import $ from "jquery"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'


class Organizations extends Component {
    constructor(props) {
        super(props);
        this.state = { orgs: [] }

    }

    getOrg() {
        fetch(process.env.REACT_APP_API + "/api/organizations")
            .then(response => response.json())
            .then(data => {
                this.setState({ orgs: data })
                //               console.log(this.state.orgs);

            })
    }

    handleDelete(e, id) {
        fetch(process.env.REACT_APP_API + "/api/organizations/" + id, {
            method: "DELETE",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            }
        }).then(res => res.text())
            .then((result) => {
                $('#data-table').DataTable().destroy();
                // call this method for state change to re render and reload datatable
                this.getOrg();

                $(".alert").fadeIn("slow");


            },
                (error) => {
                    alert(error);
                })
    }


    componentDidMount() {
        this.getOrg();
    }
    componentDidUpdate() {
        $("#data-table").DataTable();
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
                                    <a href="/admin/organizations/create" className="btn btn-outline-info float-end btn-sm">Add New Company</a>
                                    <h3 class="card-title text-uppercase mb-0">ALL Companies</h3>
                                </div>
                            </div>
                            <div className="card-body p-5 pt-0">
                                <div class="alert alert-success alert-dismissible fade show mb-3 alert-hide" role="alert">
                                    Successfully Deleted
                                    <button type="button" onClick={this.handleAlert} class="btn-close mr-2 " data-bs-dismiss="alert" aria-label="Close">X</button>
                                </div>
                                <div class="table-responsive mt-5 text-center">
                                    <table class="table no-footer" id="data-table">
                                        <thead>
                                            <tr>
                                                <th>Company Name</th>
                                                <th>Type</th>
                                                <th>Enterprise</th>
                                                <th>UEN/ROC No</th>
                                                <th>Company Address</th>
                                                <th>Contact Person</th>
                                                <th>Contact No</th>
                                                <th>Industry</th>
                                                <th>Status</th>
                                                <th>Created</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.orgs.map((org) => (
                                                <Fragment key={org.id}>
                                                    {(() => {
                                                        return (
                                                            <tr>
                                                                <td>{org.organization_name}</td>
                                                                <td>{org.company_types.map((ct, i) => <span key={i}>
                                                                    {i > 0 && ", "}
                                                                    {ct.company_type_name}
                                                                </span>)}</td>
                                                                <td>{org.supplier_group ? org.supplier_group.group_name : 'N/A'}</td>
                                                                <td>{org.uen}</td>
                                                                <td>{org.address}</td>
                                                                <td>{org.contact_person}</td>
                                                                <td>{org.contact_no}</td>
                                                                <td>{org.industry.name}</td>
                                                                <td>
                                                                    {org.status
                                                                        ? <span class="text-success">Active</span>
                                                                        : <span class="text-danger">Inactive</span>
                                                                    }
                                                                </td>
                                                                <td>{org.created_dt}</td>
                                                                <td>
                                                                    <a href={"/admin/organizations/edit/" + org.id} class="btn btn-sm btn-outline-warning ml-1 mb-1" >
                                                                        <i><FontAwesomeIcon icon={faEdit} ></FontAwesomeIcon></i>
                                                                    </a>
                                                                    <button type="button" onClick={e => this.handleDelete(e, org.id)} class="btn btn-sm btn-outline-danger delete-button-new ml-1 mb-1" >
                                                                        <i><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></i>
                                                                    </button>
                                                                </td>


                                                            </tr>
                                                        )

                                                    })()}
                                                </Fragment>


                                            ))

                                            }
                                        </tbody>
                                    </table>
                                </div>



                            </div>
                        </div>
                    </div>
                    <br></br>
                    <Footer />

                </div>
            </Fragment>
        );
    }
}

export default Organizations;