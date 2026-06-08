import axios from "axios";

// Create an Axios instance with the base URL of your backend API
export default axios.create({
    baseURL: "https://techroad-6lc6.onrender.com/api"
});