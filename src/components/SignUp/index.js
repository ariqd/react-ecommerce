import "./styles.scss";
import { useState } from "react";
import { withRouter } from "react-router-dom";
import Button from "../Forms/Button";
import FormInput from "../Forms/FormInput";

import { auth, handleUserProfile } from "../../firebase/utils";
import AuthWrapper from "../AuthWrapper";

const SignUp = (props) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const resetForm = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      const err = ["Password does not match!"];

      setErrors(err);

      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await handleUserProfile(user, { displayName });

      resetForm();

      props.history.push("/");
    } catch (err) {
      setErrors((prevState) => [...prevState, err.message]);
    }
  };

  const configAuthWrapper = {
    headline: "Register",
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
        <form onSubmit={handleFormSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            handleChange={(e) => setDisplayName(e.target.value)}
            placeholder="Full Name"
          />

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

          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            handleChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />

          <Button type="submit">Register</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(SignUp);
