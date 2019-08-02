/** Class to interact with API */

import axios from 'axios'

// this.request('/users/[username]', {username: __, password: ___})

class JoblyApi {
  static async request(endpoint, paramsOrData = {}, verb = "get", useToken = true) {
    if (useToken) {
      paramsOrData._token = window.localStorage.getItem("token");
      // console.log("token in jobly API: ", paramsOrData._token);
    }
    console.log("IN JOBLYAPI paramsOrData: ", paramsOrData)

    console.debug("API Call:", endpoint, paramsOrData, verb);

    try {
      return (await axios({
        method: verb,
        url: `http://localhost:3001/${endpoint}`,
        [verb === "get" ? "params" : "data"]: paramsOrData
      })).data;
      // axios sends query string data via the "params" key,
      // and request body data via the "data" key,
      // so the key we need depends on the HTTP verb
    }

    catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getCompanies() {
    let res = await this.request("companies");
    return res.companies;
  }

  static async getFilteredCompanies(searchTerm) {
    let res = await this.request("companies", { search: searchTerm });
    return res.companies;
  }

  static async getJobs() {
    let res = await this.request("jobs");
    return res.jobs;
  }

  static async getFilteredJobs(searchTerm) {
    let res = await this.request("jobs", { search: searchTerm });
    return res.jobs;
  }

  static async logInUser({ username, password }) {
    let res = await this.request("login", { username, password }, "post", false);
    return res.token;
  }

  static async registerUser({ username, password, first_name, last_name, email }) {
    let res = await this.request("users", {
      username, password, first_name, last_name, email
    }, "post", false);
    return res.token;
  }

  static async getUserInfo(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async updateUserInfo({ username, password, first_name, last_name, email, photo_url }){
    let requestBody = { password, first_name, last_name, email, photo_url }
    if (!requestBody.photo_url){
      delete requestBody.photo_url;
    }
    
    
    let res = await this.request(`users/${username}`, requestBody , "patch");
    return res.user;    
  }
}

export default JoblyApi;
