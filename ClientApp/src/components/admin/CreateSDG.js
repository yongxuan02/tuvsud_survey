import React,{Component,Fragment} from 'react';
import NavHeader from "./NavHeader"
import {Form,Input,Label,Check} from"reactstrap";
import $ from "jquery"
import CreateOthers from './CreateOthers';


export default class CreateSDG extends Component{
    constructor(props)
    {
        super(props);
        this.state={sdg:"",info:""}
        this.handleCreateSdg = this.handleCreateSdg.bind(this);
    }
    handleCreateSdg(e){
        e.preventDefault();
        let data = {name:this.state.sdg,info:this.state.info}
        fetch(process.env.REACT_APP_API+"/api/others/sdg",{
            method:"POST",
            headers:{
                'Accept':"application/json",
                'Content-Type':"application/json"
            },
            body:JSON.stringify(data)
        }).then(res=>res.text())
        .then((result) =>
             {
                $(".alert").fadeIn();                 
             },
             (error) =>
             {
              alert(error);
             })
             
    }
    // Correct Codes

    handleChange(e)
    {
        this.setState({[e.target.name]:e.target.value})
    }

    // // Validation Code Attempt 
    // handleChange(e) 
    // {
    //     if(e.target.value.match("^[a-zA-Z ]*$") != null){
    //         this.setState({[e.target.name]:e.target.value});
    //         // this.setState({UserName: e.target.value});
    //     }
    //  } 
    

    render(){
  
        return(
            <Fragment>
                <NavHeader />
  
                          <CreateOthers alertMessage={"Created"} btn={"Create"} link={"/admin/others/list/SDG"} 
                          linkName={"SDG List"} title={"Create new SDG"} 
                          placeholder={"Enter sdg name here..."} 
                          name={"sdg"} 
                          handleChange={e=>this.handleChange(e)} handleSubmit={e=>this.handleCreateSdg(e)}
                          
                          info=
                          {
                            <div class="form-group">
                            <Label>Picture URL: </Label>   
                            <Input  placeholder={"Enter SDG pic here..."} type="text" class="form-control" name={"info"} onChange={e=>this.handleChange(e)} 
                            

                            required
                            />
                             </div>
                          }
                          
                          /> 


            </Fragment>
          
        )
    }
}

