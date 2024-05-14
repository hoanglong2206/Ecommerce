const config = require("../config");
const AxiosService = require("../axios");

let axiosUserInstance;

class UserService {
  constructor() {
    this.axiosService = new AxiosService(
      `${config.USERS_BASE_URL}/api/v1/user`,
      "user"
    );
    axiosUserInstance = this.axiosService.axios;
  }

  async getUserById(id) {
    const response = await axiosUserInstance.get(`/${id}`);
    return response;
  }

  async getUserByEmail() {
    const response = await axiosUserInstance.get(`/email`);
    return response;
  }

  async getUserByUsername(username) {
    const response = await axiosUserInstance.get(`/username/${username}`);
    return response;
  }

  async createUser(body) {
    const response = await axiosUserInstance.post("/", body);
    return response;
  }

  async updateUser(id, body) {
    const response = await axiosUserInstance.put(`/${id}`, body);
    return response;
  }
}

module.exports = {
  userService: new UserService(),
  axiosUserInstance,
};
