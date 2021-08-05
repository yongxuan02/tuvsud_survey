import React, { Component } from 'react';
import Footer from "../Footer";
import { Form, Input, Label } from "reactstrap";
import $ from "jquery"

export default class CreateOthers extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="body_background">
                <br></br><br></br>
                <div className="container">
                    <div className="card">
                        <div className="card-header">
                            <div className="text-center">
                                <a href={this.props.link} className="btn btn-outline-info float-end btn-sm">{this.props.linkName}</a>
                                <h3 class="card-title text-uppercase mb-0">{this.props.title} </h3>
                            </div>

                        </div>

                        <div className="card-body pb-5">

                            <div class="row">
                                <div class="col-md-8 offset-md-2">
                                    <div class="alert alert-success alert-dismissible fade show mb-3 alert-hide" role="alert">
                                        Successfully {this.props.alertMessage}
                                        <button type="button" onClick={this.handleAlert} class="btn-close mr-2 " data-bs-dismiss="alert" aria-label="Close">X</button>
                                    </div>

                                    <Form onSubmit={this.props.handleSubmit} id="myForm">
                                        <div class="form-group">
                                            <Label>Name: </Label>
                                            <Input value={this.props.nameValue} placeholder={this.props.placeholder} type="text" class="form-control" name="name" onChange={this.props.handleChange} required />
                                        </div>
                                        {this.props.info}
                                        {this.props.status}
                                        <div class="form-group">
                                            <button type="submit" className="btn btn-outline-primary mt-2 float-end">{this.props.btn}</button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br /><br /><br /><br /><br></br><br></br><br></br><br></br><br></br><br></br>
                <Footer />
            </div>

        );
    }
}