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
        massage: "Something went wrong",
      }
    );
  }
};

export const GetCurrentUser = async (values) => {
  try {
    const response = await axiosInstance.post("/users/getCurrentUser", values);
    return response.data;
  } catch (err) {
    return (
      err.response?.data || {
        massage: "Something went wrong",
      }
    );
  }
};
