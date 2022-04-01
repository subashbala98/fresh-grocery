import axios from "axios";

const fbBaseURL = axios.create({
  baseURL: "https://fresh-grocery-bac6d-default-rtdb.firebaseio.com/",
});

export default fbBaseURL;
