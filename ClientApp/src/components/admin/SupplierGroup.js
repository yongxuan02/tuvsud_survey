import React, { Component, Fragment } from 'react';
import NavHeader from "./NavHeader"
import Footer from "./Footer";
import $ from "jquery"
import { FontAwesomeIcon, library } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'


class SupplierGroup extends Component {
    constructor(props) {
        super(props);
        this.state = { supp: [] }

    }

    getSupplierGroup() {
        console.log(process.env.REACT_APP_API+"/api/suppliergroup");
        fetch(process.env.REACT_APP_API + "/api/suppliergroup")
            .then(response => response.json())
            .then(data => {
                this.setState({ supp: data })
                console.log(this.state.supp);

            },
            (error) => {
              console.log(error);

            })
    }



    handleDelete(e, id) {

        fetch(process.env.REACT_APP_API + "/api/suppliergroup/" + id, {
            method: "DELETE",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            }
        }).then(res => res.text())
            .then((result) => {
                $('#data-table').DataTable().destroy();
                // call this method for state change to re render and reload datatable
                this.getSupplierGroup();

                $(".alert").fadeIn("slow");


            },
                (error) => {
                    alert(error);
                })
    }


    componentDidMount() {
        this.getSupplierGroup();
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
                                    <a href="/admin/suppliergroup/add" className="btn btn-outline-info float-end btn-sm">Add New Supplier Group</a>
                                    <h3 class="card-title text-uppercase mb-0">ALL Supplier Group</h3>
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
                                                <th>ID</th>
                                                <th>Group Name</th>
                                                <th>Suppliers</th>
                                                <th>Status</th>
                                                <th>Created</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        {<tbody>
                                            {this.state.supp.map((supp) => (
                                                <Fragment key={supp.id}>
                                                    {(() => {


                                                        return (
                                                            <tr>
                                                                <td>{supp.id}</td>
                                                                <td>{supp.group_name}</td>
                                                                {/* <td>{supp.orgs.id}</td> */}
                                                                <td>{supp.orgs.map((ot, i) => <span key={i}>
                                                                    {i > 0 && ", "}
                                                                    {ot.organization_name}
                                                                </span>)}</td>
                                                                <td>{supp.status
                                                                    ? <span class="text-success">Active</span>
                                                                    : <span class="text-danger">Inactive</span>
                                                                }</td>
                                                                <td>{supp.created_dt}</td>
                                                                <td>
                                                                    <a href={"/admin/suppliergroup/edit/" + supp.id} class="btn btn-sm btn-outline-warning ml-1 mb-1" >
                                                                        <i><FontAwesomeIcon icon={faEdit} ></FontAwesomeIcon></i>
                                                                    </a>
                                                                    <button type="button" onClick={e => this.handleDelete(e, supp.id)} class="btn btn-sm btn-outline-danger delete-button-new ml-1 mb-1" >
                                                                        <i><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></i>
                                                                    </button>
                                                                </td>


                                                            </tr>
                                                        )




                                                    })()}
                                                </Fragment>


                                            ))

                                            }
                                        </tbody>}
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

export default SupplierGroup;
