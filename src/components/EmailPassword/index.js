import "./styles.scss";
import { useState } from "react";
import { withRouter } from "react-router-dom";

import AuthWrapper from "../AuthWrapper";
import FormInput from "../Forms/FormInput";
import Button from "../Forms/Button";
import { auth } from "../../firebase/utils";

const EmailPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: "http://localhost:3000/login",
      };

      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          this.props.history.push("/login");
        })
        .catch(() => {
          const err = ["Email not found! Please try again."];

          setErrors(err);
        });
    } catch (e) {
      console.log(e);
    }
  };

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
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />

          <Button type="submit">Send Recovery Email</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(EmailPassword);
