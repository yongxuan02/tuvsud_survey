import React,{Component,Fragment} from 'react';
import NavHeader from "./NavHeader"
import Footer from "../Footer";
import $ from 'jquery'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit,faTrash} from '@fortawesome/free-solid-svg-icons'



class Question extends Component{
    constructor(props){
        super(props);
        this.state ={question:[]}
        this.handleAlert = this.handleAlert.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

    }

    handleAlert(){
        var alert = $(".alert");
     
   
            alert.fadeOut();

        
    }
    handleDelete(e,id)
    {   
         var alert = $(".alert");
        fetch(process.env.REACT_APP_API+"/api/questions/"+id,{
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
            this.getQuestion();
            
            alert.fadeIn("slow");


        },
        (error) =>
        {
         alert(error);
        })
    }

    getQuestion(){
        fetch(process.env.REACT_APP_API+"/api/questions")
        .then(response => response.json())
        .then(data=>{
                this.setState({question:data})
                console.log(this.state.question);
             
        })
    }
    componentDidMount(){

        this.getQuestion();



    }
    componentDidUpdate(){
        $('#data-table').DataTable();

        console.log("test");
    }
    


    render(){
        const question = this.state.question;
        
        return(
            <Fragment>
                <NavHeader />
                <div className="body_background">
                    <br></br><br></br>
                    <div className="container">
                        <div className="card">
                            <div className="card-header">
                                <div className="text-center">
                                    <a href = "/admin/question/create" className="btn btn-outline-info float-end btn-sm">Add Question</a>
                                    <h3 class="card-title text-uppercase mb-0">Question Bank</h3>
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
                                            <th>#SN</th>
                                            <th>Question</th>
                                            <th>Type</th>
                                            <th>Iso Standard</th>
                                            <th>Status</th>
                                            <th>Created</th>
                                            <th>Action</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {question.map((q,index)=>(
                                                <Fragment key={q.id}>
                                                    {(() => {
                                                        if(q.status === true)
                                                        {
                                                            return(
                                                                <tr>
                                                                <td>{q.id}</td>
                                                                <td>{q.question_name}</td>
                                                                <td>{q.option_group_name}</td>
                                                                <td>{q.name}</td>
                                                                <td><span class="text-success">Active</span></td>
                                                                <td>{q.created_dt.toLocaleString("dd-mmmm-yyyy")}</td>
                                                                <td>
                                                                    <a href={"/admin/question/edit/"+q.id}class="btn btn-sm btn-outline-warning ml-1 mb-1" >
                                                                    <i><FontAwesomeIcon icon={faEdit} ></FontAwesomeIcon></i>
                                                                    </a>
                                                                    <button type="button" onClick={e=>this.handleDelete(e,q.id)} class="btn btn-sm btn-outline-danger delete-button-new ml-1 mb-1" >
                                                                    <i><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></i>
                                                                    </button>

                                                                </td>
                                                                </tr>
                                                            )
                                                           
                                                        }else{
                                                            return(
                                                                <tr>
                                                                <td>{q.id}</td>
                                                                <td>{q.question_name}</td>
                                                                <td>{q.option_group_name}</td>
                                                                <td>{q.name}</td>
                                                                <td><span class="text-danger">Inactive</span></td>
                                                                <td>{q.created_dt.toLocaleString("dd-mmmm-yyyy")}</td>
                                                                <td>
                                                                    <a href={"/admin/question/edit/"+q.id}class="btn btn-sm btn-outline-warning ml-1 mb-1" >
                                                                    <i><FontAwesomeIcon icon={faEdit} ></FontAwesomeIcon></i>
                                                                    </a>
                                                                    <button type="button" onClick={e=>this.handleDelete(e,q.id)} class="btn btn-sm btn-outline-danger delete-button-new ml-1 mb-1" >
                                                                    <i><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></i>
                                                                    </button>

                                                                </td>
                                                                </tr>
                                                            )
                                                        }
                                                    })()}
                                              
                                                </Fragment>

                                            ))}

                                           
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


export default Question;