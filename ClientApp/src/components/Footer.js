import React,{Component} from "react";
import { FontAwesomeIcon,library } from '@fortawesome/react-fontawesome'
import {faFacebook,faDribbble,faTwitter,faLinkedin} from '@fortawesome/free-brands-svg-icons'

export default class Footer extends Component{
    render(){
        return(
            
            <footer class="site-footer">
                <div class="container footer">
                    <div class="push">
                    <div class="row">
                        <div class="col-md-8 col-xs-12 col-sm-6">
                            <p class="copyright-text">Copyright © 2020 All Rights Reserved by<a href="#"> TUV</a></p>
                        </div>
                        <div class="col-md-4 col-xs-12 col-sm-6">
                            <ul class="social-icons">
                                <li>
                                    <a class="facebook"><FontAwesomeIcon icon={faFacebook} /></a>
                                </li>
                                <li>
                                    <a class="twitter"><FontAwesomeIcon icon={faTwitter} /></a>
                                </li>
                                <li>
                                    <a class="dribbble"><FontAwesomeIcon icon={faDribbble} /></a>
                                </li>
                                <li>
                                    <a class="linkedin"><FontAwesomeIcon icon={faLinkedin} /></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                   
                    </div>
                </div>
            </footer>
            
        );
    }
}