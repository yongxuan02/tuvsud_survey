import React, { Component, Fragment } from 'react';
import NavHeader from "./NavHeader"
import { Form, Input, Label, Check } from "reactstrap";
import $ from "jquery"
import CreateOthers from './CreateOthers';

export default class AddOthers extends Component {
    constructor(props) {
        super(props);
        this.state = {name: "", info: "", others_type_id:0};
        this.getOthersType();
    }
    getOthersType() {
        var type = this.props.match.params.type;
        fetch(process.env.REACT_APP_API + "/api/otherstype/" + type)
            .then((response) => response.json())
            .then((data) => {
                this.state.others_type_id = data;
            });
    }

    handleSubmit(e) {
        e.preventDefault();
        let data = { name: this.state.name, info: this.state.info, others_type_id: this.state.others_type_id }
        fetch(process.env.REACT_APP_API + "/api/others", {
            method: "POST",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.text())
            .then((result) => {
                $(".alert").fadeIn();
            },
                (error) => {
                    alert(error);
                })

    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    componentDidMount() {
        this.getOthersType();
    }
    render() {
        var type = this.props.match.params.type;
        return (
            <Fragment>
                <NavHeader />

                <CreateOthers btn={"Create"} link={"/admin/others/list/"+type} linkName={type+" List"} title={"Create new "+type} placeholder={"Enter "+type+" name here..."} handleChange={e => this.handleChange(e)} handleSubmit={e => this.handleSubmit(e)} />
            </Fragment>

        )
    }
}