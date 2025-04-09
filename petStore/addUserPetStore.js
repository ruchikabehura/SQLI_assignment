const { request } = require('@playwright/test');

(async () => {
  const apiContext = await request.newContext();
  const baseURL = 'https://petstore.swagger.io/v2';

  const userPayload = {
    id: 12345,
    username: "testuser929",
    firstName: "Test",
    lastName: "User",
    email: "testuser123@example.com",
    password: "password123",
    phone: "1234567890",
    userStatus: 1
  };

  const response = await apiContext.post(`${baseURL}/user`, {
    data: userPayload
  });

  const result = await response.json();
  console.log("Response Status:", response.status());
  console.log("API Response:", result);

  await apiContext.dispose();
})();