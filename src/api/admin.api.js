import { axiosInstance } from "./http";

class AdminService {
  async login(credentials) {
    const admin = await axiosInstance
      .post('admin/auth/sign-in/', credentials)
      .then(data => data.data) 

    if (admin?.token) {
      localStorage.setItem(
        'token',
        admin.token
      );
    }  
    return admin;  
  }

  getVolunteersRequests() {
    return axiosInstance
      .get('admin/requests')
      .then(data => data.data) 
  }

  getVolunteerRequest(id) {
    return axiosInstance
      .get(`admin/requests/${id}`)
      .then(data => data.data)   
  }

  approveRequest(userId, status, message = null) {
    return axiosInstance
      .post('admin/requests/', {userId, status, message})
      .then(data => data.data) 
  }
}

const adminService = new AdminService();
export default adminService;