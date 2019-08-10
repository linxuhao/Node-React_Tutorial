import axios from "axios";
const headers = {
  "Content-Type": "application/json"
};
const burl = "http://localhost:8800";

export default {
  login: function(email, password) {
    return axios.post(
      `${burl}/user/login`,
      {
        email,
        password
      },
      {
        headers: headers
      }
    );
  },
  signup: function(send) {
    return axios.post(`${burl}/user/signup`, send, { headers: headers });
  },

  isAuth: function() {
    return localStorage.getItem("token") !== null;
  },
  logout: function() {
    localStorage.clear();
  },
  getUsers: function(){
    return axios.post(`${burl}/user/get`, {}, { headers: headers });
  },
  updateUser: function(email, name, organization){
    return axios.post(`${burl}/user/update`, {email, name, organization}, { headers: headers });
  },

  getOrganization: function(){
    axios.post(`${burl}/organization/get`, {}, { headers: headers });
  },
  addOrganization: function(name){
    axios.post(`${burl}/organization/add`, {name}, { headers: headers });
  },
  removeOrganization: function(name){
    axios.post(`${burl}/organization/remove`, {name}, { headers: headers });
  },
  updateOrganization: function(name, subOrganizations){
    axios.post(`${burl}/organization/update`, {name, subOrganizations}, { headers: headers });
  },

  getTeam: function(){
    axios.post(`${burl}/team/get`, {}, { headers: headers });
  },
  addTeam: function(name){
    axios.post(`${burl}/team/add`, {name}, { headers: headers });
  },
  removeTeam: function(name){
    axios.post(`${burl}/team/remove`, {name}, { headers: headers });
  },
  updateTeam: function(name, user_mails){
    axios.post(`${burl}/team/update`, {name, user_mails}, { headers: headers });
  }
};