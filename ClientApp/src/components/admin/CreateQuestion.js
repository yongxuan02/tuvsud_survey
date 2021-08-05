import React, { Component, Fragment } from "react";
import NavHeader from "./NavHeader";
import Footer from "../Footer";
import { Form, Input, Label, Check } from "reactstrap";
import $ from "jquery";

export default class CreateQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Question: "",
      Type: "",
      Applicable: true,
      Others: true,
      iso_standard: "4",
      others: [],
      optiongroups: [],
      answer_options: [{ id: 0, option_choice_name: "", points: 0.0 }],
    };
    this.handleCreateQuestionSubmit =
      this.handleCreateQuestionSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddAnswerOption = this.handleAddAnswerOption.bind(this);
    this.handleDeleteAnswerOption = this.handleDeleteAnswerOption.bind(this);
    this.handlePointsCalculation = this.handlePointsCalculation.bind(this);
  }
  // user-defined method
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

  // events
  handleAlert() {
    var alert = $(".alert");
    alert.fadeOut();
  }
  handleCreateQuestionSubmit(e) {
    e.preventDefault();
    var answer_points_list = this.state.answer_options;
    var qolist = [];
    console.log(answer_points_list);
    for (var i = 0; i < answer_points_list.length; i++) {
      var qo = {
        option_description: answer_points_list[i].option_choice_name,
        points: answer_points_list[i].points
      };
      qolist.push(qo);
    }
    let data = {
      question_name: this.state.Question,
      input_type_id: this.state.Type,
      applicable: this.state.Applicable,
      show_others_option: this.state.Others,
      iso_std_id: this.state.iso_standard,
      qolist: qolist
    };


    fetch(process.env.REACT_APP_API + "/api/questions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.text())
      .then(
        (result) => {
          $("#myForm").trigger("reset");
          $(".alert").fadeIn();
          this.setState({
            answer_options: [
              { id: 0, option_choice_name: "", points: 0.0, question_id: 0 },
            ],
          });
        },
        (error) => {
          alert(error);
        }
      );
  }

  handleChange(e) {
    if (e.target.type == "checkbox" && e.target.name == "Applicable") {
      this.setState({ [e.target.name]: !this.state.Applicable });
    } else if (e.target.type == "checkbox" && e.target.name == "Others") {
      this.setState({ [e.target.name]: !this.state.Others });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  handleAddAnswerOption() {
    var answer_option_list = this.state.answer_options;
    var id = this.generateid();
    var answer_options = { id: id, option_choice_name: "", points: 0.0 };
    answer_option_list.push(answer_options);
    this.setState({ answer_options: answer_option_list });
  }
  handleDeleteAnswerOption(e, index) {
    var answer_option_list = [...this.state.answer_options];
    console.log(answer_option_list);
    answer_option_list.splice(index, 1);
    console.log(answer_option_list);
    this.setState({ answer_options: answer_option_list });
  }
  handleAnswerOptionChange(e, index) {
    var answer_option_list = this.state.answer_options;
    answer_option_list[index][e.target.name] = e.target.value;
    this.setState({ answer_options: answer_option_list });
  }
  handlePointsCalculation(e) {
    if ($("#auto_calculation").is(":checked")) {
      console.log("test");
      var answer_option_list = this.state.answer_options;
      var total_point = 1.0;
      var p = (total_point / answer_option_list.length).toFixed(2);
      $("input[name='points']").prop("disabled", true);
      $("input[name='points']").val(p);

       for(var i =0;i<answer_option_list.length;i++)
       {
           answer_option_list[i].points = p;
       }
    } else {
      $("input[name='points']").prop("disabled", false);
    }
  }

  getOthers() {
    fetch(process.env.REACT_APP_API + "/api/others/type/ISO Standard")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ others: data });
        console.log(this.state.others);
      });
  }

  getOptionGroups() {
    fetch(process.env.REACT_APP_API + "/api/inputtypes")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ optiongroups: data });
        console.log(this.state.optiongroups);
      });
  }

  componentDidMount() {
    this.getOthers();
    this.getOptionGroups();
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
                    href='/admin/question'
                    className='btn btn-outline-info float-end btn-sm'
                  >
                    Question List
                  </a>
                  <h3 class='card-title text-uppercase mb-0'>
                    create new question
                  </h3>
                </div>
              </div>
              <div className='card-body pb-5'>
                <div class='row'>
                  <div class='col-md-8 offset-md-2'>
                    <div
                      class='alert alert-success alert-dismissible fade show mb-3 alert-hide'
                      role='alert'
                    >
                      Successfully Created
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
                    <Form
                      onSubmit={(e) => this.handleCreateQuestionSubmit(e)}
                      id='myForm'
                    >
                      <div class='form-group'>
                        <Label>Question </Label>
                        <Input
                          placeholder='Enter your question here...'
                          type='text'
                          class='form-control'
                          name='Question'
                          onChange={(e) => this.handleChange(e)}
                          required
                        />
                      </div>
                      <div class='form-group'>
                        <Label>Question type</Label>
                        <select
                          defaultValue=''
                          className='browser-default custom-select'
                          aria-label='Default select example'
                          name='Type'
                          onChange={(e) => this.handleChange(e)}
                        >
                          <option value='' disabled selected hidden>
                            Select Question Type
                          </option>
                          {option_group.map((og, index) => (
                            <option key={og.id} value={og.id}>
                              {og.input_type_name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div class='form-group'>
                        <label class='switch'>
                          <input
                            type='checkbox'
                            name='Applicable'
                            checked={this.state.Applicable}
                            onChange={(e) => this.handleChange(e)}
                          />
                          <span class='slider round'></span>
                        </label>
                        <span>&nbsp;&nbsp;Applicable</span>
                        <br></br>
                        <label class='switch'>
                          <input
                            type='checkbox'
                            id='auto_calculation'
                            onChange={(e) => this.handlePointsCalculation(e)}
                            name='auto_calculation'
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
                                  onChange={(e) =>
                                    this.handleAnswerOptionChange(e, index)
                                  }
                                  type='text'
                                  defaultValue={ao.option_choice_name}
                                  name='option_choice_name'
                                  placeholder='Enter your answer option here...'
                                ></Input>
                              </div>
                              <div class='col-md-3'>
                                <Input
                                  type='number'
                                  onChange={(e) =>
                                    this.handleAnswerOptionChange(e, index)
                                  }
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
                      </div>
                      <label class='switch'>
                        <input
                          type='checkbox'
                          name='Others'
                          checked={this.state.Others}
                          onChange={(e) => this.handleChange(e)}
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
                          defaultValue=''
                          className='browser-default custom-select'
                          aria-label='Default select example'
                          name='iso_standard'
                        >
                          <option value='' disabled selected hidden>
                            Select Iso Standard
                          </option>

                          {others.map((o, index) => (
                            <option key={o.id} value={o.id}>
                              {o.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div class='form-group'>
                        <button
                          type='submit'
                          className='btn btn-outline-primary mt-2 float-end'
                        >
                          Create
                        </button>
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
