import { axiosInstance } from "./http";

class AdminService {
  async login(email, password) {
    const admin = await axiosInstance
      .post('admin/auth', {email, password})
      .then(data => data.data) 

    return admin;  
  }

  async getVolunteersRequests() {
    const requests = await axiosInstance
      .get('admin/requests')
      .then(data => data.data) 

    return requests;  
  }

  async getVolunteerRequest(id) {
    const request = await axiosInstance
      .get(`admin/requests/${id}`)
      .then(data => data.data) 

    return request;  
  }

  async approveRequest(userId, status) {
    const res = await axiosInstance
      .post('admin/requests/', {userId, status})
      .then(data => data.data) 

    return res;  
  }
}

const adminService = new AdminService();
export default adminService;