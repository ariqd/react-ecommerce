import { useState } from "react";
import "./styles.scss";
import { Link, withRouter } from "react-router-dom";

import { signInWithGoogle, auth } from "../../firebase/utils";

import AuthWrapper from "../AuthWrapper";
import FormInput from "../Forms/FormInput";
import Button from "../Forms/Button";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      await auth.signInWithEmailAndPassword(email, password);

      resetForm();

      props.history.push("/");
    } catch (error) {
      setErrors(error.message);
    }
  };

  const configAuthWrapper = {
    headline: "Log In",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {errors && <p style={{ color: "red" }}>{errors}</p>}
        <form onSubmit={handleSubmit}>
          <div className="socialLogin">
            <div className="row">
              <FormInput
                type="email"
                name="email"
                value={email}
                handleChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />

              <FormInput
                type="password"
                name="password"
                value={password}
                handleChange={(e) => setPassword(e.target.value)}
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
};

export default withRouter(SignIn);
