const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: null
};

global.localStorage = localStorageMock;

// Mock the request issued by the react app to get the client configuration parameters.
window.fetch = () => {
  return Promise.resolve(
    {
      ok: true,
      headers: null,
      redirected: null,
      status: null,
      statusText: '',
      type: null,
      url: null,
      clone: null,
      body: null,
      bodyUsed: null,
      arrayBuffer: null,
      blob: null,
      formData: null,
      text: null,
      json: () => Promise.resolve({
        authority: "https://localhost:7110",
        client_id: "GameWebStore",
        redirect_uri: "https://localhost:7110/authentication/login-callback",
        post_logout_redirect_uri: "https://localhost:7110/authentication/logout-callback",
        response_type: "id_token token",
        scope: "GameWebStoreAPI openid profile"
     })
    });
};
