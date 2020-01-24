import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:3001/"
});

const apis = {
	loadTests: () => api.get("details")
};

export default apis;