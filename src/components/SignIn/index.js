import { Component } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

import { signInWithGoogle, auth } from "../../firebase/utils";

import AuthWrapper from "../AuthWrapper";
import FormInput from "../Forms/FormInput";
import Button from "../Forms/Button";

const initialState = {
  email: "",
  password: "",
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);

      this.setState({
        ...initialState,
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { email, password } = this.state;

    const configAuthWrapper = {
      headline: "Log In",
    };

    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className="formWrap">
          <form onSubmit={this.handleSubmit}>
            <div className="socialLogin">
              <div className="row">
                <FormInput
                  type="email"
                  name="email"
                  value={email}
                  handleChange={this.handleChange}
                  placeholder="Email"
                />

                <FormInput
                  type="password"
                  name="password"
                  value={password}
                  handleChange={this.handleChange}
                  placeholder="Password"
                />

                <Button type="submit">Log In</Button>
              </div>
            </div>
          </form>

          <div className="socialLogin">
            <div className="row">
              <Button onClick={signInWithGoogle}>Sign in with Google</Button>
            </div>
          </div>

          <div className="links">
            <Link to="/recovery">Reset Password</Link>
          </div>
        </div>
      </AuthWrapper>
    );
  }
}

export default SignIn;
