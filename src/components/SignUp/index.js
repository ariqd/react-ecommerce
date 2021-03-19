import { Component } from "react";
import Button from "../Forms/Button";
import FormInput from "../Forms/FormInput";
import "./styles.scss";

import { auth, handleUserProfile } from "../../firebase/utils";

const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: [],
};

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const {
      displayName,
      email,
      password,
      confirmPassword,
      errors,
    } = this.state;

    if (password !== confirmPassword) {
      const err = ["Password does not match!"];

      this.setState({
        errors: err,
      });

      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await handleUserProfile(user, { displayName });

      this.setState({
        ...initialState,
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const {
      displayName,
      email,
      password,
      confirmPassword,
      errors,
    } = this.state;

    return (
      <div className="signUp">
        <div className="wrap">
          <h2>Register</h2>

          {errors.length > 0 && (
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}

          <div className="formWrap">
            <form onSubmit={this.handleFormSubmit}>
              <FormInput
                type="text"
                name="displayName"
                value={displayName}
                handleChange={this.handleChange}
                placeholder="Full Name"
              />

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

              <FormInput
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                handleChange={this.handleChange}
                placeholder="Confirm Password"
              />

              <Button>Submit</Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
