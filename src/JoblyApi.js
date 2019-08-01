/** Class to interact with API */

import axios from 'axios'

const TESTING_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjQ1OTU3ODR9.GJQegyC_s9R54tfXAWsZ1zIfVPJBOu50-3UHbmZzzYo"

class JoblyApi {
    static async request(endpoint, paramsOrData = {}, verb = "get") {
        paramsOrData._token = ( // for now, hardcode token for "testing"
            TESTING_TOKEN);

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
        let res = await this.request("companies", {search: searchTerm});
        return res.companies;
    }

    static async getJobs() {
        let res = await this.request("jobs");
        return res.jobs;
    }

    static async getFilteredJobs(searchTerm) {
        let res = await this.request("jobs", {search: searchTerm});
        return res.jobs;
    }
    
}

export default JoblyApi;
