import { fetchWithToken } from "../../../helpers/apiHelper";

export const loginUser = async ({ email, password }) => {
  return await fetchWithToken("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const registerUser = async ({ name, email, password }) => {
  return await fetchWithToken("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
};
