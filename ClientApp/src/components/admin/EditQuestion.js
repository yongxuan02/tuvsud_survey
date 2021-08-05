import React, { Component, Fragment } from "react";
import NavHeader from "./NavHeader";
import Footer from "../Footer";
import { Form, Input, Label } from "reactstrap";
import $ from "jquery";
var autoPoints = 0;
export default class EditQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      Question: "",
      Type: "",
      Applicable: true,
      status: false,
      Others: true,
      iso_standard: "",
      others: [],
      optiongroups: [],
      answer_options: [
        { id: 0, option_description: "", points: 0.0, question_id: 0 },
      ],
      past_answer_option: [],
      points: 0,
      deletedChoices: [],
    };
    this.handleAlert = this.handleAlert.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleQuestionSubmit = this.handleQuestionEdit.bind(this);
    this.handleAddAnswerOption = this.handleAddAnswerOption.bind(this);
    this.handleDeleteAnswerOption = this.handleDeleteAnswerOption.bind(this);
    this.handlePointsCalculation = this.handlePointsCalculation.bind(this);
  }

  handleAlert() {
    var alert = $(".alert");
    alert.fadeOut();
  }

  generateid() {
    var arr = [];
    var answer_option_list = this.state.answer_options;
    for (var i = 0; i < answer_option_list.length; i++) {
      arr.push(answer_option_list[i].id);
    }
    var id = Math.max.apply(null, arr);
    var new_id = id + 1;
    return new_id;
  }

  handleChange(e) {
    if (e.target.type == "checkbox" && e.target.name == "Applicable") {
      this.setState({ [e.target.name]: !this.state.Applicable });
    } else if (e.target.type == "checkbox" && e.target.name == "Others") {
      this.setState({ [e.target.name]: !this.state.Others });
    } else if (e.target.type == "checkbox" && e.target.name == "status") {
      this.setState({ [e.target.name]: !this.state.status });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }
  handlePointsCalculation(e) {
    if ($("#auto_calculation").is(":checked")) {
      console.log("test");
      var answer_option_list = [...this.state.answer_options];
      var total_point = 1.0;
      var p = (total_point/answer_option_list.length).toFixed(2);
      $("input[name='points']").prop("disabled", true);
      $("input[name='points']").val(p);
      autoPoints = p;
      //   for (var i = 0; i < answer_option_list.length; i++) {
      //     answer_option_list[i].points = p;
      //   }
      //   this.setState({ answer_options: answer_option_list });
    } else {
      $("input[name='points']").prop("disabled", false);
    }
  }
  handleQuestionEdit(e) {
    e.preventDefault();
    var id = this.props.match.params.id;
    console.log(this.state.Type);
    var qoList = [];
    var answer_points_list = this.state.answer_options;
    for (var i = 0; i < answer_points_list.length; i++) {
      var aEle = {
        option_description: answer_points_list[i].option_description,
        id: answer_points_list[i].id,
        question_id: answer_points_list[i].question_id
      };
      if(answer_points_list[i].isInsert) {
        aEle["id"] = 0;
        aEle["question_id"] = this.state.id;
      }
      if ($("#auto_calculation").is(":checked")) {
        aEle["points"] = autoPoints;
      } else {
        aEle["points"] = answer_points_list[i].points;
      }

      qoList.push(aEle);
    }

    var deletedChoices = this.state.deletedChoices;
    for (var i = 0; i < deletedChoices.length; i++) {
      var aEle = {
        id: deletedChoices[i],
        question_id: 0
      };
      qoList.push(aEle);
    }

    let data = {
      id: this.state.id,
      question_name: this.state.Question,
      input_type_id: this.state.Type,
      status: this.state.status,
      applicable: this.state.Applicable,
      show_others_option: this.state.Others,
      iso_std_id: this.state.iso_standard,
      points: this.state.points,
      qoList: qoList
    };
    console.log(JSON.stringify(data));
    fetch(process.env.REACT_APP_API+"/api/questions/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.text())
      .then(
        (result) => {
          // alert(result);
          $(".alert").fadeIn();
          
        },
        (error) => {
          alert(error);
        }
      );
  }

  handleAddAnswerOption() {
    var answer_option_list = this.state.answer_options;
    var id = this.generateid();
    var answer_options = {
      id: id,
      isInsert: true,
      option_description: "",
      points: 0.0,
    };
    answer_option_list.push(answer_options);
    this.setState({ answer_options: answer_option_list });
  }
  handleDeleteAnswerOption(e, index) {
    var answer_option_list = [...this.state.answer_options];
    var deletedChoices = [...this.state.deletedChoices];
    if (answer_option_list[index].isInsert) {
      console.log(answer_option_list);
      answer_option_list.splice(index, 1);
      console.log(answer_option_list);
    } else {
      deletedChoices.push(answer_option_list[index].id);
      this.setState({ deletedChoices: deletedChoices });
      console.log(answer_option_list);
      answer_option_list.splice(index, 1);
      console.log(answer_option_list);
    }
    this.setState({ answer_options: answer_option_list });
  }
  handleAnswerOptionChange(e, index) {
    var answer_option_list = this.state.answer_options;
    answer_option_list[index][e.target.name] = e.target.value;
    this.setState({ answer_options: answer_option_list });
  }

  handleAnswerOptionPointChange(e, index) {
    var answer_option_list = this.state.answer_options;
    answer_option_list[index][e.target.name] = e.target.value;
    this.setState({ answer_options: answer_option_list });
  }

  getQuestions() {
    var id = this.props.match.params.id;
    fetch(process.env.REACT_APP_API+"/api/questions/" + id)
      .then((response) => response.json())
      .then((data) => {


          this.setState({
            id: data.id,
            Question: data.question_name,
            Type: data.input_type_id,
            Applicable: data.applicable,
            Others: data.show_others_option,
            iso_standard: data.iso_std_id,
            status: true,
            points: data.points,
            answer_options: data.qolist
          });
        
      });
  }

  getOthers() {
    fetch(process.env.REACT_APP_API+"/api/others/type/ISO Standard")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ others: data });
        console.log(this.state.others);
        console.log(data);
      });
  }

  getOptionGroups() {
    fetch(process.env.REACT_APP_API+"/api/inputtypes")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ optiongroups: data });
        console.log(this.state.optiongroups);
      });
  }
  getAnswerOptions() {
    var id = this.props.match.params.id;
    fetch(process.env.REACT_APP_API+"/api/optionchoices/" + id)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ answer_options: data });
        this.setState({ past_answer_option: data });
      });
  }

  componentDidMount() {
    this.getOthers();
    this.getOptionGroups();
    this.getQuestions();
    this.getAnswerOptions();
  }

  componentDidUpdate(prevProps, prevState) {
    this.handlePointsCalculation();
  }
  render() {
    const others = this.state.others;
    const answer_option = this.state.answer_options;
    const option_group = this.state.optiongroups;
    return (
      <Fragment>
        <NavHeader />
        <div className='body_background'>
          <br></br>
          <br></br>
          <div className='container'>
            <div className='card'>
              <div className='card-header'>
                <div className='text-center'>
                  <a
                    href='/admin/question/'
                    className='btn btn-outline-info float-end btn-sm'
                  >
                    Question List
                  </a>
                  <h3 class='card-title text-uppercase mb-0'>Edit question</h3>
                </div>
              </div>
              <div className='card-body pb-5'>
                <div class='row'>
                  <div class='col-md-8 offset-md-2'>
                    <div
                      class='alert alert-success alert-dismissible fade show mb-3 alert-hide'
                      role='alert'
                    >
                      Successfully Edited
                      <button
                        type='button'
                        onClick={this.handleAlert}
                        class='btn-close mr-2 '
                        data-bs-dismiss='alert'
                        aria-label='Close'
                      >
                        X
                      </button>
                    </div>
                    <Form onSubmit={(e) => this.handleQuestionEdit(e)}>
                      <div class='form-group'>
                        <Label>Question {this.state.currentDateTime}</Label>
                        <Input
                          placeholder='Enter your question here...'
                          type='text'
                          defaultValue={this.state.Question}
                          onChange={(e) => this.handleChange(e)}
                          class='form-control'
                          name='Question'
                          required
                        />
                      </div>
                      <div class='form-group'>
                        <Label>Points </Label>
                        <Input
                          placeholder='Enter question Points'
                          type='text'
                          value={this.state.points}
                          onChange={(e) => this.handleChange(e)}
                          class='form-control'
                          name='_points'
                          required
                        />
                      </div>
                      <div class='form-group'>
                        <Label>Question type</Label>
                        <select
                          defaultValue={this.state.Type}
                          className='browser-default custom-select'
                          onChange={(e) => this.handleChange(e)}
                          aria-label='Default select example'
                          name='Type'
                        >
                          {option_group.map((og, index) => (
                            <Fragment key={og.id}>
                              {(() => {
                                if (og.id == this.state.Type) {
                                  return (
                                    <option selected value={og.id}>
                                      {og.input_type_name}
                                    </option>
                                  );
                                } else {
                                  return (
                                    <option value={og.id}>
                                      {og.input_type_name}
                                    </option>
                                  );
                                }
                              })()}
                            </Fragment>
                          ))}
                        </select>
                      </div>
                      <div clas='form-group'>
                        <label class='switch'>
                          <input
                            type='checkbox'
                            name='status'
                            onChange={(e) => this.handleChange(e)}
                            checked={this.state.status}
                          />
                          <span class='slider round'></span>
                        </label>
                        <span>&nbsp;&nbsp;Status</span>
                      </div>
                      <div class='form-group'>
                        <label class='switch'>
                          <input
                            type='checkbox'
                            name='Applicable'
                            onChange={(e) => this.handleChange(e)}
                            checked={this.state.Applicable}
                          />
                          <span class='slider round'></span>
                        </label>
                        <span>&nbsp;&nbsp;Applicable</span>
                        <br></br>
                        <label class='switch'>
                          <input
                            type='checkbox'
                            id='auto_calculation'
                            name='auto_calculation'
                            onChange={(e) => this.handlePointsCalculation(e)}
                          />
                          <span class='slider round'></span>
                        </label>
                        <span>&nbsp;&nbsp;Auto calculate answer value</span>
                        <br></br>
                        <Label>Answer Options</Label>
                        <div class='row'>
                          {this.state.answer_options.map((ao, index) => (
                            <Fragment key={ao.id}>
                              <div class='col-md-8'>
                                <Input
                                  onChange={(e) => {
                                    this.handleAnswerOptionChange(e, index);
                                  }}
                                  type='text'
                                  defaultValue={ao.option_description}
                                  name='option_description'
                                  placeholder='Enter your answer option here...'
                                ></Input>
                              </div>
                              <div class='col-md-3'>
                                <Input
                                  onChange={(e) => {
                                    this.handleAnswerOptionPointChange(
                                      e,
                                      index
                                    );
                                  }}
                                  type='number'
                                  name='points'
                                  defaultValue={ao.points}
                                  step='0.01'
                                ></Input>
                                <br></br>
                              </div>
                              {index > 0 ? (
                                <div class='col-md-1'>
                                  <button
                                    type='button'
                                    onClick={(e) =>
                                      this.handleDeleteAnswerOption(e, index)
                                    }
                                    style={{ height: "38px" }}
                                    class='btn btn-outline-danger mb-2 ml-1'
                                  >
                                    X
                                  </button>
                                </div>
                              ) : (
                                <p></p>
                              )}
                              {/* {JSON.stringify(answer_option)} */}
                            </Fragment>
                          ))}
                        </div>
                        <button
                          type='button'
                          onClick={this.handleAddAnswerOption}
                          class='btn btn-warning mb-2 '
                        >
                          Add Another Option
                        </button>
                        <br></br>
                        <label class='switch'>
                          <input
                            type='checkbox'
                            name='Others'
                            onChange={(e) => this.handleChange(e)}
                            checked={this.state.Others}
                          />
                          <span class='slider round'></span>
                        </label>
                        <span>&nbsp;&nbsp;Show Others Option</span>
                        <br></br>
                        <div class='form-group'>
                          <Label>ISO Standard</Label>
                          <br></br>
                          <select
                            onChange={(e) => this.handleChange(e)}
                            defaultValue={this.state.iso_standard}
                            className='browser-default custom-select'
                            aria-label='Default select example'
                            name='iso_standard'
                          >
                            {others.map((o, index) => (
                              <Fragment key={o.id}>
                                {(() => {
                                  if (o.id == this.state.iso_standard) {
                                    return (
                                      <option selected key={o.id} value={o.id}>
                                        {o.name}
                                      </option>
                                    );
                                  } else {
                                    return (
                                      <option key={o.id} value={o.id}>
                                        {o.name}
                                      </option>
                                    );
                                  }
                                })()}
                              </Fragment>
                            ))}
                          </select>
                        </div>
                        <div class='form-group'>
                          <button
                            type='submit'
                            className='btn btn-outline-primary mt-2 float-end'
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
          <Footer />
        </div>
      </Fragment>
    );
  }
}
