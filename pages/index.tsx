import type { NextPage } from "next";
import * as React from "react";
import { login } from "../services/user.service";
import styles from "../styles/main.module.css";
import { useRouter } from "next/router";

interface FormState {
  userName: string;
  password: string;
}

const LogIn: NextPage = () => {
  const router = useRouter();

  const [errorMsg, setError] = React.useState<string>("");
  const [logindisable, setLogindisable] = React.useState<boolean>(false);
  const [values, setValues] = React.useState<FormState>({
    userName: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmitLogIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLogindisable(true);
    login("eve.holt@reqres.in", "cityslicka")
      .then(() => {
        const returnUrl = router.query.returnUrl || "/home";
        if (typeof returnUrl === "string") router.push(returnUrl);
        setLogindisable(false);
      })
      .catch((error) => {
        setError(error.response.data.error);
        setLogindisable(false);
      });
  };

  return (
    <div className={styles.mainContent}>
      <form onSubmit={handleSubmitLogIn}>
        <input
          type="text"
          name="userName"
          onChange={handleChange}
          placeholder="userName"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="password"
        />
        <button type="submit" disabled={logindisable}>
          {logindisable ? "Loging in ..." : "Submit"}
        </button>
        <div className={styles.errorMsg}>{errorMsg ? errorMsg : ""}</div>
      </form>
    </div>
  );
};

export default LogIn;
