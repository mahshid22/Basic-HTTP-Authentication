import Router from "next/router";
import axiosGlobal from "../axios/axiosConfig";

export const login = async (username: string, password: string) => {
  const res = await axiosGlobal.post("/api/login", {
    email: username,
    password: password,
  });
  localStorage.setItem(
    "user",
    JSON.stringify({
      ...res.data,
      email: username,
      password: password,
    })
  );
  return { email: "eve.holt@reqres.in", password: "cityslicka" };
};

export const logout = () => {
  localStorage.removeItem("user");
  Router.push("/");
};

function getAll() {
  //   return fetchWrapper.get(baseUrl);
}
