import axios from "axios";

const instance = axios.create({
  baseURL: "https://burgerbuilder-14d86-default-rtdb.firebaseio.com/",
});

export default instance;
