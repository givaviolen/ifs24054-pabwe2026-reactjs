export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const putAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

export const fetchWithToken = async (endpoint, options = {}) => {
  const token = getAccessToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${DELCOM_BASEURL}${endpoint}`, {
    ...options,
    headers,
  });

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(responseJson.message || "Something went wrong");
  }

  return responseJson;
};
