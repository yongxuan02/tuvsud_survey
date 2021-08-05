import React,{Component,Fragment} from 'react';
import NavHeader from "./NavHeader"
import Footer from "../Footer";
import {Form,Input,Label,Check} from"reactstrap";
import $ from "jquery"
import CreateOthers from './CreateOthers';

export default class EditSDG extends Component{
    constructor(props){
        super(props);
        this.state={iso:"",status:false,info:""}
        this.handleEditIso = this.handleEditIso.bind(this);
    }
    getIso(){
        var id = this.props.match.params.id
        fetch(process.env.REACT_APP_API+"/api/others/SDG/"+id)
        .then(response=>response.json())
        .then(data=>{
            
         
                this.setState({iso:data.name,status:data.status,info:data.info})
            
        })
    }
    handleChange(e)
    {   
        e.target.name !="status" ? this.setState({[e.target.name]:e.target.value}) : this.setState({[e.target.name]:!this.state.status})

    }
    handleEditIso(e)
    {
        e.preventDefault();
        var id = this.props.match.params.id;

        let data = {name:this.state.iso,status:this.state.status,info:this.state.info};
        fetch(process.env.REACT_APP_API+"/api/others/SDG/"+id,{
            method:"PUT",
            headers:{
                'Accept':"application/json",
                'Content-Type':"application/json"
            },
            body:JSON.stringify(data),
            
        }) .then(res => res.text())
        .then((result) =>
        {
        //    alert(result);
           $(".alert").fadeIn();
 
 
        },
        (error) =>
        {
         alert(error);
        })
       
    }
    componentDidMount()
    {
        this.getIso();
    }
    render(){
        return(
            <Fragment>
                <NavHeader />
                <CreateOthers alertMessage={"Edited"} nameValue={this.state.iso} btn={"Edit"} link={"/admin/others/list/SDG"} linkName={"SDG List"} title={"Edit SDG"} placeholder={"Enter SDG name here..."} name={"iso"} handleChange={e=>this.handleChange(e)} handleSubmit={e=>this.handleEditIso(e)}
                
                status={ 
                <div clas="form-group">
                <label class="switch">
                <input type="checkbox" name="status"  onChange={e=>this.handleChange(e)} checked={this.state.status} />
                <span class="slider round"></span>
                </label>
                <span>&nbsp;&nbsp;Status</span>
                </div>}

                info=
                {
                <div class="form-group">
                <Label>Picture URL: </Label>   
                <Input value ={this.state.info}  placeholder={"Enter SDG pic here..."} type="text" class="form-control" name={"info"} onChange={e=>this.handleChange(e)} required/>
                </div>
                }
                
                /> 
            </Fragment>
        );
    }
}