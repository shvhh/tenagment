const { Component } = React;
const { BrowserRouter, Route, Link, Redirect } = window.ReactRouterDOM;

class Dashboard extends Component{
  constructor(props) {
    super(props);
    this.state = { selected: "home" ,firststate:'true'};
  } 
  render()
  {
    return(<BrowserRouter>
        <div className="home">
    <div className="container-fluid display-table">
        <div className="row display-table-row">
    <div className="col-md-2 col-sm-1 hidden-xs display-table-cell v-align box" id="navigation">
                <div className="logo">
                    asdf
                </div>
                <div className="navi">
                    <ul>
                        <li className={(this.state.selected=='home')?'active':''}><Link to="#" onClick={()=>this.setState({selected:'home'})}><i className="fa fa-home" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Home</span></Link></li>
                        <li className={(this.state.selected=='home1')?'active':''}><Link to="#" onClick={()=>this.setState({selected:'home1'})}><i className="fa fa-tasks" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Workflow</span></Link></li>
                        <li className={(this.state.selected=='home2')?'active':''}><Link to="#" onClick={()=>this.setState({selected:'home2'})}><i className="fa fa-tasks" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Workflow</span></Link></li>
                        <li className={(this.state.selected=='home3')?'active':''}><Link to="#" onClick={()=>this.setState({selected:'home3'})}><i className="fa fa-bar-chart" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Statistics</span></Link></li>
                        <li className={(this.state.selected=='home4')?'active':''}><Link to="#" onClick={()=>this.setState({selected:'home4'})}><i className="fa fa-user" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Calender</span></Link></li>
                        <li className={(this.state.selected=='home5')?'active':''}><Link to="#" onClick={()=>this.setState({selected:'home5'})}><i className="fa fa-calendar" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Users</span></Link></li>
                        <li className={(this.state.selected=='home6')?'active':''}><Link to="#" onClick={()=>this.setState({selected:'home6'})}><i className="fa fa-cog" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Setting</span></Link></li>
                    </ul>
                </div>
            </div>       




        </div>
        </div>
        </div>
        </BrowserRouter>
);
  } 
}

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { val: "" };
  }
  onInputhandler(e) {
    this.props.update(e.target.value);
    this.setState({ val: e.target.value });
  }
  render() {
    return (
      <input
        type={this.props.type}
        name={this.props.name}
        id={this.props.id}
        
        className={this.props.className}
        placeholder={this.props.placeholder}
        value={this.state.val}
        onInput={this.onInputhandler.bind(this)}
        required
      />
    );
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", error: "" };
  }
  authentication() {
    //console.log(BrowserRouter);
    //BrowserRouter.push('/login');
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        
        this.setState({ error: errorMessage });
      });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.login();
        console.log(user);
        
      }
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div className="panel panel-login">
            <div className="panel-heading">
              <div className="row">
                <div className="col-xs-6">
                  <Link to="/" className="active" id="login-form-link">
                    Login
                  </Link>
                </div>
                <div className="col-xs-6">
                  <Link to="/signup" id="register-form-link">
                    Register
                  </Link>
                </div>
              </div>
              <hr />
            </div>
            <div className="panel-body">
              <div className="row">
                <div className="col-lg-12">
                  <div id="login-form" role="form">
                    <div className="form-group">
                      <label htmlFor="Email">Email</label>
                      <Input
                        update={email => this.setState({ email: email })}
                        type="text"
                        id="Email"
                        tabindex="1"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <Input
                        update={pass => this.setState({ password: pass })}
                        type="password"
                        id="password"
                        tabindex="2"
                        className="form-control"
                        placeholder="Password"
                      />
                    </div>
                    <div className="form-group">
                      <h3 style={{ color: "red" }}>
                        {this.state.error}
                      </h3>
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-sm-6">
                          <Link
                            to="/"
                            id="login-form-link"
                            onClick={this.authentication.bind(this)}
                            name="login-submit"
                            id="login-submit"
                            tabindex="4"
                            className="form-control btn btn-login"
                          >
                            Log In
                          </Link>
                        </div>
                        <div className="col-sm-6">
                          <input
                            type="submit"
                            onClick={this.authentication.bind(this)}
                            name="forget-password"
                            id="forget-password"
                            tabindex="4"
                            className="form-control btn btn-login"
                            value="Forget Password"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", password: "", repass: "", error: "" };
  }
  registration() {
    var errormsg = "";

    if (this.state.password == this.state.repass) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;

          this.setState({ error: errorMessage });
        });
    } else {
      this.setState({ error: "Password Don't Match" });
    }
    

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.updateProfile({
  displayName: this.state.name,
}).then(() => {
    this.props.login();
 firebase.database().ref(user.uid)
          .set({ name: this.state.name, email: this.state.email });
          
})
      }
    });
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div className="panel panel-login">
            <div className="panel-heading">
              <div className="row">
                <div className="col-xs-6">
                  <Link to="/" id="login-form-link">
                    Login
                  </Link>
                </div>
                <div className="col-xs-6">
                  <Link to="/signup" className="active" id="register-form-link">
                    Register
                  </Link>
                </div>
              </div>
              <hr />
            </div>
            <div className="panel-body">
              <div className="row">
                <div className="col-lg-12">
                  <div id="register-form">
                    <div className="form-group">
                      <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <Input
                          update={name => this.setState({ name: name })}
                          type="text"
                          name="name"
                          id="name"
                          tabindex="1"
                          className="form-control"
                          placeholder="Full Name"
                        />
                      </div>
                      <label htmlFor="Email">Email</label>
                      <Input
                        update={email => this.setState({ email: email })}
                        type="text"
                        name="Email"
                        id="Email"
                        tabindex="1"
                        className="form-control"
                        placeholder="Email"
                        value=""
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <Input
                        update={password =>
                          this.setState({ password: password })}
                        type="password"
                        name="password"
                        id="password"
                        tabindex="2"
                        className="form-control"
                        placeholder="Password"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirm-password">Confirm password</label>
                      <Input
                        update={repass => this.setState({ repass: repass })}
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        tabindex="2"
                        className="form-control"
                        placeholder="Confirm Password"
                      />
                    </div>
                    <div className="form-group">
                      <h3 style={{ color: "red" }}>
                        {this.state.error}
                      </h3>
                    </div>

                    <div className="form-group">
                      <div className="row">
                        <div className="col-sm-6 col-sm-offset-3">
                          <Link
                          to='signup'
                            onClick={this.registration.bind(this)}
                            name="register-submit"
                            id="register-submit"
                            tabindex="4"
                            className="form-control btn btn-register"
                          >
                          Register Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { authentication: false };
  }

  validation() {}
  login() {
    this.setState({ authentication: true });
    console.log(this.state.authentication);
  }
  render() {
    
    if (this.state.authentication) {
      return (< Dashboard />);
    } else {
      return (
        <BrowserRouter>
          <div>
            <div id="fullscreen_bg" className="fullscreen_bg" />
            <div id="regContainer" className="container">
              <Route
                exact
                path="/"
                render={() => <Login login={this.login.bind(this)} />}
              />
              <Route
                path="/signup"
                render={() => <SignUp login={this.login.bind(this)} />}
              />


            </div>
          </div>
        </BrowserRouter>
      );
    }
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));
