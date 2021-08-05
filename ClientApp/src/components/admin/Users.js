import React, { Component, Fragment } from 'react';
import NavHeader from "./NavHeader"
import Footer from "../Footer";
import $ from "jquery"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'


class Users extends Component {
    constructor(props) {
        super(props);
        this.state = { users: [] }

    }

    getUser() {
        console.log(process.env.REACT_APP_API + "/api/users");
        fetch(process.env.REACT_APP_API + "/api/users")
            .then(response => response.json())
            .then(data => {
                this.setState({ users: data })
                console.log(this.state.users);

            },
                (error) => {
                    console.log(error);
                })
    }

    handleDelete(e, id) {
        fetch(process.env.REACT_APP_API + "/api/users/" + id, {
            method: "DELETE",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            }
        }).then(res => res.text())
            .then((result) => {
                $('#data-table').DataTable().destroy();
                // call this method for state change to re render and reload datatable
                this.getUser();

                $(".alert").fadeIn("slow");


            },
                (error) => {
                    alert(error);
                })
    }


    componentDidMount() {
        this.getUser();
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
                                    <a href="/admin/users/add" className="btn btn-outline-info float-end btn-sm">Add New User</a>
                                    <h3 class="card-title text-uppercase mb-0">ALL Users</h3>
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
                                                <th>Name</th>
                                                <th>Type</th>
                                                <th>Email</th>
                                                <th>Company Name</th>
                                                <th>Company Type</th>
                                                <th>Admin</th>
                                                <th>Status</th>
                                                <th>Created</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.users.map((user) => (
                                                <Fragment key={user.id}>
                                                    {(() => {
                                                            return (
                                                                <tr>
                                                                    <td>{user.first_name + ' ' + user.last_name}</td>
                                                                    <td>
                                                                    {user.user_type==='Editor'
                                                                        ? <span class="text-warning">{user.user_type}</span>
                                                                        : <span class="text-primary">{user.user_type}</span>
                                                                    }
                                                                    </td>
                                                                    <td>{user.email}</td>
                                                                    <td>{user.organization_name}</td>
                                                                    <td>{user.types.map((ct, i) => <span key={i}>
                                                                    {i > 0 && ", "}
                                                                    {ct.company_type_name}
                                                                </span>)}</td>
                                                                    <td>
                                                                    {user.admin
                                                                        ? <span class="text-success">Yes</span>
                                                                        : <span class="text-danger">No</span>
                                                                    }
                                                                        </td>
                                                                        <td>
                                                                        {user.status
                                                                        ? <span class="text-success">Active</span>
                                                                        : <span class="text-warning">Inactive</span>
                                                                    }
                                                                        </td>
                                                                        <td>{user.created_dt}</td>
                                                                    <td>
                                                                        <a href={"/admin/users/edit/" + user.id} class="btn btn-sm btn-outline-warning ml-1 mb-1" >
                                                                            <i><FontAwesomeIcon icon={faEdit} ></FontAwesomeIcon></i>
                                                                        </a>
                                                                        <button type="button" onClick={e => this.handleDelete(e, user.id)} class="btn btn-sm btn-outline-danger delete-button-new ml-1 mb-1" >
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

export default Users;