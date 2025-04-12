import { axiosInstance } from ".";

export const RegisterUser = async (values) => {
  try {
    const response = await axiosInstance.post("/users/register", values);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const LoginUser = async (values) => {
  try {
    const response = await axiosInstance.post("/users/login", values);
    return response.data;
  } catch (err) {
    return (
      err.response?.data || {
        message: "Something went wrong",
      }
    );
  }
};

export const OtpCheck = async (values) => {
  try {
    const response = await axiosInstance.post("/users/validateOtp", values);
    return response.data;
  } catch (err) {
    return (
      err.response?.data || {
        message: "Something went wrong",
      }
    );
  }
};

export const GetCurrentUser = async (values) => {
  try {
    const response = await axiosInstance.get("/users/getCurrentUser", values);
    return response.data;
  } catch (err) {
    return (
      err.response?.data || {
        massage: "Something went wrong",
      }
    );
  }
};

export const HandleUserLogout = async () => {
  try {
    const response = await axiosInstance.post("/users/logout");
    return response.data;
  } catch (e) {
    return (
      e.response?.data || {
        message: "Something went wrong",
      }
    );
  }
};

export const handleCheckUserLoggedIn = async () => {
  try {
    const response = await axiosInstance.get("/users/userLoggedIn");
    return response.data;
  } catch (err) {
    return (
      err.response?.data || {
        message: "Something went wrong",
      }
    );
  }
};
