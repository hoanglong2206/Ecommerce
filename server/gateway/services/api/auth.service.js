const AxiosService = require("../axios");
const config = require("../../config");

let axiosAuthInstance;

class AuthService {
  constructor() {
    this.axiosService = new AxiosService(
      `${config.AUTH_BASE_URL}/api/v1/auth`,
      "auth"
    );
    axiosAuthInstance = this.axiosService.axios;
  }

  async getCurrentUser() {
    const response = await axiosAuthInstance.get("/current-user");
    return response;
  }

  async getRefreshToken(username) {
    const response = await axiosAuthInstance.get(`/refresh-token/${username}`);
    return response;
  }

  async changePassword(currentPassword, newPassword, confirmNewPassword) {
    const response = await axiosAuthInstance.put("/change-password", {
      currentPassword,
      newPassword,
      confirmNewPassword,
    });
    return response;
  }

  async verifyEmail(token) {
    const response = await axiosAuthInstance.put("/verify-email", { token });
    return response;
  }

  async verifyOTP(otp, body) {
    const response = await axiosAuthInstance.put(`/verify-otp/${otp}`, body);
    return response;
  }

  async resendEmail(data) {
    const response = await axiosAuthInstance.post("/resend-email", data);
    return response;
  }

  async register(body) {
    const response = await this.axiosService.axios.post("/register", body);
    return response;
  }

  async login(body) {
    const response = await this.axiosService.axios.post("/login", body);
    return response;
  }

  async forgotPassword(email) {
    const response = await this.axiosService.axios.put("/forgot-password", {
      email,
    });
    return response;
  }

  async resetPassword(token, password, confirmPassword) {
    const response = await this.axiosService.axios.put(
      `/reset-password/${token}`,
      { password, confirmPassword }
    );
    return response;
  }
}

module.exports = {
  authService: new AuthService(),
  axiosAuthInstance,
};
