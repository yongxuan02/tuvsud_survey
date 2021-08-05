import React, { Component, Fragment, useRef, useState, useEffect } from "react";
import NavHeader from "./NavHeader";
import Footer from "../Footer";
import { Chart, registerables } from "chart.js";
import $ from "jquery";

// Dashboard Attempt

export default class Dashboard extends Component {
  constructor() {
    super();
    Chart.register(...registerables);
    this.state = { TotalQuestions: 0 };
  }
  componentDidMount() {
    fetch("/api/dashboard", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(
        (result) => {
          this.setState({ TotalQuestions: result.question });
          this.bindGraph(result.labels, result.data);
        },
        (error) => {
          alert(error);
        }
      );
  }
  bindGraph(label, data) {
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: label,
        datasets: [
          {
            label: ["# of Enterprise Companies"],
            data: data,
            backgroundColor: ['Red','Green', 'Blue'],
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,

          },


          {
            label: ["# of Normal Companies"],
            // data: data,
            backgroundColor: ['Green'],
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,


          },
          {
            label: ["# of Supplier Companies"],
            // data: data,
            backgroundColor: ['Blue'],
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  render() {
    return (
      <Fragment>
        <NavHeader />
        <div className='body_background'>
          <div
            className='container'
            style={{
              background: "white",
              height: "600px",
            }}
          >
            <div
              style={{ marginTop: "10px", marginBottom: "20px" }}
              className='text-center'
            >
              <h3 class='card-title text-uppercase mb-0'>Welcome Admin!</h3>
            </div>
            <div class='row'>
              <div class='col-sm-6'>
                <div class='card ' style={{ height: "500px" }}>
                  <div class='text-center card-body'>
                    <h5 class='card-title'>Total Questions</h5>
                    <p
                      class='card-text text-center'
                      style={{
                        marginTop: "36%",
                        fontSize: "-webkit-xxx-large",
                      }}
                    >
                      {this.state.TotalQuestions}
                    </p>
                  </div>
                </div>
              </div>
              <div class='col-sm-6'>
                <div class='card'>
                  <div class='card-body'>
                    <h5 class='card-title text-center'>Companies</h5>
                    <br></br>
                    <br></br>
                    <br></br>

                    {/* <p class='card-text'>
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p> */}
                    <canvas id='myChart' width='900' height='500'></canvas>
                    <br></br>
                    <br></br>
                    
                  </div>
                </div>
              </div>
            </div>
            {/* <div className='card'>
              <div className='card-header'>
                <div className='text-center'>
                  <h3 class='card-title text-uppercase mb-0'>Welcome Admin!</h3>
                </div>
              </div>

              <div className='card-body p-5 pt-0'>
                <div class='table-responsive mt-5 text-center'>
                 
                  <div class='row'></div>
                  <div class='col-md-m6 mb-2'></div>
                  <div class='card-body text-center'></div>
                  <h3>Total Questions</h3>
                  <h4>11</h4>
                  <br></br>
                  <h3>Total Normal Companies</h3>
                  <h4>7</h4>
                  <br></br>
                  <h3>Total Enterprise Companies</h3>
                  <h4>6</h4>
                  <br></br>
                  <h3>Total Supplier Companies</h3>
                  <h4>9</h4>

                </div>
                <div></div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
              </div>
            </div> */}
          </div>
          <br></br>
        </div>
        <Footer />
      </Fragment>
    );
  }
}