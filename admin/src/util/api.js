const baseUrl = 'http://localhost:3001/api';
// const baseUrl = process.env.NODE_ENV === 'development' ? 'http://admin.localhost:3001/api' : `https://${window.location.hostname}/api`;

const methods = {
  get: async function (endpoint, token = null) {
    const options = {
      method: 'GET',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    const response = await fetch(`${baseUrl}/${endpoint}`, options);
    const json = await response.json();

    if (!response.ok) throw Error(json.message);

    return json;
  },

  post: async function (endpoint, body, token = null) {
    const isFormData = body instanceof FormData;

    const options = {
      method: 'POST',
      headers: {
        [!isFormData ? 'Content-Type' : 'balauca']: 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: isFormData ? body : JSON.stringify(body),
    };

    const response = await fetch(`${baseUrl}/${endpoint}`, options);
    const json = await response.json();

    if (!response.ok) {
      if (json.errors) {
        if (response.status === 422) {
          json.errors.forEach((error) => {
            throw Error(`${error.param} ${error.msg}`);
          });
        }
      }

      if (json.message) {
        throw Error(`${json.message}`);
      }

      throw Error(json.message);
    }

    return json;
  },

  delete: async function (endpoint, token = null) {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    const response = await fetch(`${baseUrl}/${endpoint}`, options);
    const json = await response.json();

    if (!response.ok) {
      if (response.status === 401) throw Error('unauthorized');
      throw Error(json.message);
    }

    return json;
  },
};

export async function login(username, password) {
  const json = await methods.post('login', { username, password });
  return json.token;
}

export async function changePassword(oldPassword, newPassword) {
  const json = await methods.post('change-password', { oldPassword, newPassword }, localStorage.token);
  return json.token;
}

export async function uploadPdfMenu(data) {
  return await methods.post(`pdf-menu`, data, localStorage.token);
}
