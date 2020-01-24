import React, { Component } from "react";

import AppTitle from "./components/AppTitle"
import AppFooter from "./components/AppFooter"
import Tests from "./components/tests";
import Api from "./components/Api";


import SocialButton from './components/SocialButton'

import {
  FacebookLoginButton,
  GoogleLoginButton
} from "react-social-login-buttons";

import "./App.css";


const handleSocialLogin = (user) => {
  console.log(user);
  localStorage.setItem('access', 'granted');
  window.location.reload();
}

const handleSocialLoginFailure = (err) => {
  console.error(err)
}

class App extends Component {

  render() {

    let dataSession = localStorage.getItem('access');

    if (dataSession === 'granted') {
      return (
        <div>
          <Tests api={Api} />
        </div>
      );

    } else {
      return (
        <div>

          <div className="appHeader">
            <AppTitle />
          </div>

          <div className="appMainContent socialAccess">
            <SocialButton
              provider='facebook'
              appId='1482186278596666'
              onLoginSuccess={handleSocialLogin}
              onLoginFailure={handleSocialLoginFailure}
            >
              <FacebookLoginButton />
            </SocialButton>

            <SocialButton
              provider='google'
              appId='978909589464-ptkcpeqse7chc7o3nil4tpb67vfl5rt2.apps.googleusercontent.com'
              onLoginSuccess={handleSocialLogin}
              onLoginFailure={handleSocialLoginFailure}
            >
              <GoogleLoginButton />
            </SocialButton>
          </div>

          <div className="appFooter">
            <AppFooter />
          </div>

        </div>
      );
    }
  }
}

export default App;
