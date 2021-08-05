import React, { Component, Fragment } from "react";
import Footer from "./Footer";

export default class Home extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Fragment>
        <div id="wrap">
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
              <a class="navbar-brand" href="/" height='55'>
                <img src="https://www.tuvsud.com/images/TS_TS_f_4c.png" height='55' alt="Logo" />
              </a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="/login">Login</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/signup">Sign up</a>
                  </li>
                </ul>


              </div>
            </div>
          </nav>

          <div class="bg1"></div>


        </div>

        <Footer />
      </Fragment>
    );
  }
}