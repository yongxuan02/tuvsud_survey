import React,{Component,Fragment} from 'react';
import NavHeader from "./NavHeader"
import Footer from "../Footer";
import $ from "jquery"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit,faTrash} from '@fortawesome/free-solid-svg-icons'

export default class Others extends Component{
    
    constructor(props){
        super(props);
        this.state={others:[]}

    }

    getOthers(){
        var type = this.props.match.params.type;
        fetch(process.env.REACT_APP_API+"/api/others/type/"+type)
        .then(response => response.json())
        .then(data=>{
                this.setState({others:data});
                console.log(this.state.others);
             
        })
    }
        
    handleDelete(e,id)
    {
        fetch(process.env.REACT_APP_API+"/api/others/"+id,{
            method:"DELETE",
            headers:{
                'Accept':"application/json",
                'Content-Type':"application/json"
            }
        }).then(res => res.text())
        .then((result) =>
        {
            $('#data-table').DataTable().destroy();
            // call this method for state change to re render and reload datatable
            this.getOthers();
            
            $(".alert").fadeIn("slow");


        },
        (error) =>
        {
         alert(error);
        })
    }
    

    componentDidMount(){
        this.getOthers();
    }
    componentDidUpdate(){
        $("#data-table").DataTable();
    }
    
    render(){
        var type = this.props.match.params.type;
        return(
            <Fragment>
                <NavHeader />
                <div className="body_background">
                    <br></br><br></br>
                    <div className="container">
                        <div className="card">
                            <div className="card-header">
                                <div className="text-center">
                                    <a href = {"/admin/others/add/"+type} className="btn btn-outline-info float-end btn-sm">Add New {type}</a>
                                    <h3 class="card-title text-uppercase mb-0">{type}</h3>
                                </div>
                            </div>
                            <div className="card-body p-5 pt-0">
                                <div class="alert alert-success alert-dismissible fade show mb-3 alert-hide"  role="alert">
                                    Successfully Deleted
                                    <button type="button" onClick={this.handleAlert} class="btn-close mr-2 " data-bs-dismiss="alert" aria-label="Close">X</button>
                                </div>
                                <div class="table-responsive mt-5 text-center">
                                <table class="table no-footer" id="data-table">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Status</th>
                                                <th>Created</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.others.map((i)=>(
                                                <Fragment key={i.id}>
                                                    {(() => {
                                                        var status = "Active";
                                                        if (i.status===false) {
                                                            status = "Inactive";

                                                        }

                                                            return(
                                                                <tr>
                                                                    <td>{i.name}</td>
                                                                    <td><span class="text-success">{status}</span></td>
                                                                    <td>{i.created_dt}</td>
                                                                    <td>
                                                                        <a href={"/admin/others/edit/"+type+"/"+i.id}class="btn btn-sm btn-outline-warning ml-1 mb-1" >
                                                                        <i><FontAwesomeIcon icon={faEdit} ></FontAwesomeIcon></i>
                                                                        </a>
                                                                        <button type="button" onClick={e=>this.handleDelete(e,i.id)} class="btn btn-sm btn-outline-danger delete-button-new ml-1 mb-1" >
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


