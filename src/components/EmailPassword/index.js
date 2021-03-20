import "./styles.scss";
import { Component } from "react";
import { withRouter } from "react-router-dom";

import AuthWrapper from "../AuthWrapper";
import FormInput from "../Forms/FormInput";
import Button from "../Forms/Button";
import { auth } from "../../firebase/utils";

const initialState = {
  email: "",
  errors: [],
};

class EmailPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });

    return;
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email } = this.state;

      const config = {
        url: "http://localhost:3000/login",
      };

      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          //   console.log("Password Reset");

          this.props.history.push("/login");
        })
        .catch(() => {
          //   console.log("Something went wrong");

          const err = ["Email not found! Please try again."];

          this.setState({
            errors: err,
          });
        });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { email, errors } = this.state;

    const configAuthWrapper = {
      headline: "Recover Password",
    };

    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className="formWrap">
          {errors.length > 0 && (
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
          <form onSubmit={this.handleSubmit}>
            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              handleChange={this.handleChange}
            />

            <Button type="submit">Send Recovery Email</Button>
          </form>
        </div>
      </AuthWrapper>
    );
  }
}

export default withRouter(EmailPassword);