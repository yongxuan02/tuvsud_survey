import React,{Component,Fragment} from 'react';
import NavHeader from "./NavHeader"
import Footer from "../Footer";
import {Form,Label} from"reactstrap";
import $ from "jquery"

export default class SDGChoice extends Component{
    constructor(props){
        super(props);
        this.state = {sdg:[],pillar:[],industry:[],type:[],company_type:0,sdg_id:0,AddedQuestion:[],AllQuestion:[]}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.DeleteAddedQuestion = this.DeleteAddedQuestion.bind(this);
    }

    handleChange(e){
  
        if($("#pillar").val() !== "" && $("#industry").val() !== "" && $("#sdg_id").val() !== null && $("#company_type").val() !== null)
        {
            $("#refreshBtn").prop("disabled",false);
        }

        if(e.target.name ==="company_type" || e.target.name ==="sdg_id")
        {
            this.setState({[e.target.name]:e.target.value});
        }
    }
    handleAdd(e)
    {
        e.preventDefault();
        var pillar = $("#pillar").val().map(Number);
        var industry = $("#industry").val().map(Number);
        var question = [];
        $("input:checkbox[name=add]:checked").each(function(){
            // alert($(this).val())
            question.push($(this).val());
        })
        var questionList = question.map(Number);
        let data = {
            pillarList:pillar,
            industryList:industry,
            QuestionIdList:questionList,
            company_type_id:this.state.company_type,
            sdg_id:this.state.sdg_id
        }
        fetch(process.env.REACT_APP_API+"/api/userquestionfilter/addToFilter",{
            method:"POST",
            headers:{
                'Accept':"application/json",
                'Content-Type':"application/json"
            },
            body:JSON.stringify(data)
        }).then(res => res.ok === true)
        .then((result) =>
        {
        //    alert(result);
           this.getAddedQuestion();
           this.getAllQuestion();
          
        },
        (error) =>
        {
         alert(error);
        }) 

        
    }
    handleSubmit(e)
    {
        e.preventDefault();
        var pillar = $("#pillar").val().map(Number);
        var industry = $("#industry").val().map(Number);
        let data = {
            pillarList:pillar,
            industryList:industry,
            company_type_id:this.state.company_type,
            sdg_id:this.state.sdg_id
        }
        fetch(process.env.REACT_APP_API+"/api/userquestionfilter",{
            method:"POST",
            headers:{
                'Accept':"application/json",
                'Content-Type':"application/json"
            },
            body:JSON.stringify(data)
        })  .then(res => res.json())
        .then((result) =>
        {
        //    alert(result);
           this.setState({AddedQuestion:result});
           this.getAllQuestion();
        },
        (error) =>
        {
         alert(error);
        })
    }

    DeleteAddedQuestion(e)
    {
        e.preventDefault();
        // alert("dogface");
        var pillar = $("#pillar").val().map(Number);
        var industry = $("#industry").val().map(Number);
        var question = [];
        $("input:checkbox[name=added]:checked").each(function(){
            // alert($(this).val())
            question.push($(this).val());
        })
        var questionList = question.map(Number);
        let data = {
            pillarList:pillar,
            industryList:industry,
            QuestionIdList:questionList,
            company_type_id:this.state.company_type,
            sdg_id:this.state.sdg_id
        }
        fetch(process.env.REACT_APP_API+"/api/userquestionfilter/delete",{
            method:"DELETE",
            headers:{
                'Accept':"application/json",
                'Content-Type':"application/json"
            },
            body:JSON.stringify(data)
        }).then(res => res.ok === true)
        .then((result) =>
        {
        //    alert(result);
           this.getAddedQuestion();
           this.getAllQuestion();
       
        },
        (error) =>
        {
         alert(error);
        }) 


    }

    getAddedQuestion(){
        var pillar = $("#pillar").val().map(Number);
        var industry = $("#industry").val().map(Number);
        let data = {
            pillarList:pillar,
            industryList:industry,
            company_type_id:this.state.company_type,
            sdg_id:this.state.sdg_id
        }
        fetch(process.env.REACT_APP_API+"/api/userquestionfilter",{
            method:"POST",
            headers:{
                'Accept':"application/json",
                'Content-Type':"application/json"
            },
            body:JSON.stringify(data)
        })  .then(res => res.json())
        .then((result) =>
        {
           this.setState({AddedQuestion:result});
        },
        (error) =>
        {
         alert(error);
        })
    }

    getAllQuestion(){
        var pillar = $("#pillar").val().map(Number);
        var industry = $("#industry").val().map(Number);
        let data = {
            pillarList:pillar,
            industryList:industry,
            company_type_id:this.state.company_type,
            sdg_id:this.state.sdg_id
        }
        fetch(process.env.REACT_APP_API+"/api/userquestionfilter/all_question",{
            method:"POST",
            headers:{
                'Accept':"application/json",
                'Content-Type':"application/json"
            },
            body:JSON.stringify(data)
        })  .then(res => res.json())
        .then((result) =>
        {
            if(this.state.AllQuestion.length > 0)
            {
             $('#data-table').DataTable().destroy();
 
            }
           this.setState({AllQuestion:result});
          
           $("#data-table").DataTable(); 

           $("button[name='configureBtn']").prop("disabled",false);
           $("button[name='addBtn']").prop("disabled",false)

        },
        (error) =>
        {
         alert(error);
        })
    }

    getCompanyType(){
        fetch(process.env.REACT_APP_API+"/api/others/type/Company Type")
        .then(response => response.json())
        .then(data=>{
                this.setState({type:data})
                console.log(data)
        })
    }
    
    getsdg(){
        fetch(process.env.REACT_APP_API+"/api/others/type/SDG")
        .then(response => response.json())
        .then(data=>{
                this.setState({sdg:data})
             
        })
    }
    
    getPillar(){
        fetch(process.env.REACT_APP_API+"/api/others/type/Pillar")
        .then(response => response.json())
        .then(data=>{
                this.setState({pillar:data})
             
        })
    }
    getIndustry(){
        fetch(process.env.REACT_APP_API+"/api/others/type/Industry")
        .then(response => response.json())
        .then(data=>{
                this.setState({industry:data})
             
        })
    }
    componentDidMount(){
        this.getsdg();
        this.getPillar();
        this.getIndustry();
        this.getCompanyType();
    }
    componentDidUpdate()
    {
       
   
    }
    render(){
        return(
            <Fragment>
                <NavHeader />
                <div className="body_background">
                    <br></br><br></br>
                    <div className="container">
                        <div className="card">
                            <div className="card-header">
                                <div className="text-center">
                                    <h3 class="card-title text-uppercase mb-0">User question filter</h3>
                                </div>
                            </div>
                            <div className="card-body pb-5">
                                <div class ="row">
                                    <div class="col-md-8 offset-md-2">
                                        <div class = "row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                <Label>Company Type</Label>
                                                <select defaultValue=""  className="browser-default custom-select"  aria-label="Default select example" id="company_type" name="company_type" onChange={e=>this.handleChange(e)}   >
                                                <option value="" disabled selected hidden>Select  Type</option>

                                                {this.state.type.map((type,index)=>(
                                                <Fragment key={type.id}>
                                                    {(()=>{
                                                        if(type.company_type_name === "Normal")
                                                        {
                                                            return(
                                                                <option  value ={type.id}>{type.name}</option>

                                                            )
                                                        }else{
                                                            return(
                                                                <option  value ={type.id}>{type.name}</option>

                                                            )
                                                        }
                                                    })()}
                                                </Fragment>    
                                                        ))}
                                                <option>Supplier Group</option>
                                              
                                                </select>
                                                </div>
                                            </div>
                                
                                            
                                        </div>
                                        <hr style={{height:"2px",color:"inherit"}}></hr>
                                        <div class="row">
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                    <Label>SDG</Label>
                                                    <select defaultValue={this.state.sdg_id} id="sdg_id"  className="browser-default custom-select"  aria-label="Default select example" name="sdg_id" onChange={e=>this.handleChange(e)}  >
                                                    <option value="" disabled selected hidden>Select  Type</option>

                                                    {this.state.sdg.map((sdg,index)=>(
                                                        <option key={sdg.id} value ={sdg.id}>{sdg.name}</option>
                                                        ))}
                                                    </select>
                                                    </div>
                                                </div>

                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                    <Label>Pillar</Label>
                                                    <select  defaultValue="" multiple className="browser-default custom-select"  aria-label="Default select example" id="pillar" name="pillar_id" onChange={e=>this.handleChange(e)}   >
                                                    {this.state.pillar.map((pillar,index)=>(
                                                        <option key={pillar.id} value ={pillar.id}>{pillar.name}</option>
                                                        ))}
                                                    </select>
                                                    </div>
                                                </div>

                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                    <Label>Industry</Label>
                                                    <select defaultValue=""  multiple  className="browser-default custom-select"  aria-label="Default select example" id="industry" name="industry_id" onChange={e=>this.handleChange(e)}   >
                                                    {this.state.industry.map((industry,index)=>(
                                                        <option key={industry.id} value ={industry.id}>{industry.name}</option>
                                                        ))}
                                                    </select>
                                                    </div>
                                                </div>

                                            </div>
                                            <Form onSubmit={e=>this.handleSubmit(e)}>

                                                <div class="form-group">
                                                    <div class="float-end" >
                                                        <button disabled    id="refreshBtn"class="btn btn-outline-primary">Refresh List</button>
                                                    </div>
                                              
                                                    
                                                </div>
                                                </Form>
                                                <div style={{clear:"both"}}></div>
                                            <hr style={{height:"2px",color:"inherit"}}></hr>

                                            <ul class="nav nav-tabs" role="tablist" id="myTab">
                                                <li role="presentation" class="nav-item">
                                                    <a id="added-questions-tab" data-toggle="tab" href="#added-questions" role="tab" aria-controls="added-questions" aria-selected="true" class="nav-link active" >Added Questions</a>
                                                </li>
                                                <li role="presentation" class="nav-item">
                                                    <a id="all-questions-tab" data-toggle="tab" href="#all-questions" role="tab" aria-controls="all-questions" aria-selected="false" class="nav-link" style={{color:"orange"}}>All Questions</a>
                                                </li>

                                            </ul>

                                            <div class="tab-content" id="myTabContent">
                                               
                                                <div class="tab-pane fade show active pt-5 pb-5 text-center" id="added-questions" role="tabpanel">
                                                   
                                                     <Form onSubmit={e=>this.DeleteAddedQuestion(e)}>
                                                    <button disabled name="configureBtn" className="btn btn-outline-danger float-end mb-4">Remove</button>
                                                    </Form>
                                                    <table class="table no-footer" >
                                                        <thead>
                                                            <tr>
                                                                <th>#SN</th>
                                                                <th>Question</th>
                                                                <th>ISO Standard</th>
                                                                <th>Date of Creation</th>
                                                                <th>
                                                                    <input type="checkbox" id="checkbox" />
                                                                </th>
                                                            </tr>
                                                            
                                                        </thead>
                                                        <tbody>
                                                            {this.state.AddedQuestion.map((aq,index)=>(
                                                                <Fragment key={aq.id}>
                                                                <tr>
                                                                    <td>{aq.id}</td>
                                                                    <td>{aq.question_name}</td>
                                                                    <td>{aq.name}</td>
                                                                    <td>{aq.created_dt}</td>
                                                                    <td>
                                                                        <input name="added" type ="checkbox" class="checkbox-question-remove" value={aq.id}></input>
                                                                    </td>
                                                                </tr>
                                                                </Fragment>
                                                              
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                    <button disabled type ="button" name="configureBtn" className="btn btn-outline-danger float-end mt-4">Remove</button>
                                                </div>
                                                <div class="tab-pane fade pt-5 pb-5 text-center" id="all-questions" role="tabpanel"
                                                aria-labelledby="all-questions-tab">
                                                      <Form onSubmit={e=>this.handleAdd(e)}>

                                                    <button disabled  name="addBtn"  className="btn btn-outline-success float-end mb-4">Add</button>
                                                    </Form>
                                                    <table class="table no-footer" id="data-table">
                                                        <thead>
                                                            <tr>
                                                                <th>#SN</th>
                                                                <th>Question</th>
                                                                <th>ISO Standard</th>
                                                                <th>Date of Creation</th>
                                                                <th>
                                                                    <input type="checkbox" id="checkbox" />
                                                                </th>
                                                            </tr>
                                                            
                                                        </thead>
                                                        <tbody>
                                                        {this.state.AllQuestion.map((aq,index)=>(
                                                                <Fragment key={aq.id}>
                                                                <tr>
                                                                    <td>{aq.id}</td>
                                                                    <td>{aq.question_name}</td>
                                                                    <td>{aq.name}</td>
                                                                    <td>{aq.created_dt}</td>
                                                                    <td>
                                                                        <input type ="checkbox" name="add" class="checkbox-question-remove" value={aq.id}></input>
                                                                    </td>
                                                                </tr>
                                                                </Fragment>
                                                              
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                    <Form onSubmit={e=>this.handleSubmit(e)}>
                                                    <button disabled name="addBtn" type ="button" className="btn btn-outline-success float-end mt-4">Add</button>
                                                    </Form>
                                                </div>
                                                
                                             </div>

                                         

                                    </div>
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