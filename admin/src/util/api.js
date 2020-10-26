const baseUrl = process.env.NODE_ENV === 'development' ? 'http://admin.localhost:3001/api' : `https://${window.location.hostname}/api`;

const methods = {
  get: async function (endpoint) {
    const token = localStorage.token || null;

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

  post: async function (endpoint, body) {
    const isFormData = body instanceof FormData;

    const token = localStorage.token || null;

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
  put: async function (endpoint, body) {
    const isFormData = body instanceof FormData;

    const token = localStorage.token || null;

    const options = {
      method: 'PUT',
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
  delete: async function (endpoint, body) {
    const isFormData = body instanceof FormData;

    const token = localStorage.token || null;

    const options = {
      method: 'DELETE',
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
};

export async function login(username, password) {
  const json = await methods.post('login', { username, password });
  return json.token;
}

export async function changePassword(oldPassword, newPassword) {
  const json = await methods.post('change-password', { oldPassword, newPassword });
  return json.token;
}

export async function uploadPdfMenu(data) {
  return await methods.post('pdf-menu', data);
}

export async function toggleCovidQuestionnaire() {
  return await methods.post('toggle-covid-questionnaire', {});
}

export const categoryEndpoints = {
  create: async (category) => await methods.post('categories', category),
  edit: async (category) => await methods.put('categories', { category }),
  get: async () => await methods.get('categories'),
  move: async (categoryId, destinationIndex) => await methods.post('categories/move', { categoryId, destinationIndex }),
  remove: async (categoryId) => await methods.delete(`categories/${categoryId}`),
};

export const productEndpoints = {
  create: async (productData) => await methods.post('products', productData),
  edit: async (product) => await methods.put('products', { product }),
  get: async () => await methods.get('products'),
  move: async (productId, destinationIndex) => await methods.post('products/move', { productId, destinationIndex }),
  remove: async (productId) => await methods.delete(`products/${productId}`),
};
