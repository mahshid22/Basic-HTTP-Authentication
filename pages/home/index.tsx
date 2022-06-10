import { NextPage } from "next";
import { logout } from "services/user.service";
import styles from "./home.module.css";
import Cat from "svgs/cat.svg";
const Home: NextPage = () => {
  const userName =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : "";

  return (
    <div className={styles.mainContent}>
      <p>Hi {userName?.email}</p>
      <p>
        you are loged in with Basic HTTP Authentication (Gaurd), if you want to
        try that log out and without submiting form just redirect to /home and
        see how gaurd act
      </p>
      <Cat />
      <button type="button" onClick={logout}>
        logOut
      </button>
    </div>
  );
};

export default Home;
