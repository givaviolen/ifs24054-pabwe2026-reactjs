export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const putAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

export const fetchWithToken = async (endpoint, options = {}) => {
  const token = getAccessToken();
  const headers = { ...options.headers };

  // Jangan paksa application/json jika body adalah FormData (misal untuk upload file)
  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  } else if (!options.body) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Handle query params
  let url = `${DELCOM_BASEURL}${endpoint}`;
  if (options.params) {
    const query = new URLSearchParams(options.params).toString();
    url += `?${query}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(responseJson.message || "Something went wrong");
  }

  return responseJson;
};
