const { request } = require('@playwright/test');

(async () => {
  const apiContext = await request.newContext();
  const baseURL = 'https://petstore.swagger.io/v2';

 // const username = "prebb";

  const response = await apiContext.get(`${baseURL}/user/${username}`);

  if (response.ok()) {
    const userData = await response.json();
    console.log("User data retrieved:");
    console.log(userData);
  } else {
    console.log(`Failed to get user. Status code: ${response.status()}`);
  }

  await apiContext.dispose();
})();
