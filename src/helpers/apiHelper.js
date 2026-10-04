const TOKEN_KEY = "accessToken";

export const getAccessToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const putAccessToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const buildQuery = (params = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if ((value ?? "") !== "") {
      searchParams.append(key, value);
    }
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
};

export const fetchWithToken = async (endpoint, options = {}) => {
  const { params, headers: customHeaders, ...fetchOptions } = options;
  const token = getAccessToken();
  const headers = { ...customHeaders };

  // FormData (upload cover/foto) harus dikirim tanpa Content-Type manual
  // agar browser menambahkan boundary multipart/form-data secara otomatis.
  if (!(fetchOptions.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(
    `${DELCOM_BASEURL}${endpoint}${buildQuery(params)}`,
    { ...fetchOptions, headers }
  );

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(responseJson.message || "Something went wrong");
  }

  return responseJson;
};