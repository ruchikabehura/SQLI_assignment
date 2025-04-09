const { request } = require('@playwright/test');
const PetAnalyzer = require('./petAnalyzer');

(async () => {
  const apiContext = await request.newContext();
  const baseURL = 'https://petstore.swagger.io/v2';

  const response = await apiContext.get(`${baseURL}/pet/findByStatus?status=sold`);

  if (response.ok()) {
    const soldPets = await response.json();

    // Extract only pets with a name
    const soldPetTuples = soldPets
      .filter(pet => pet.name)
      .map(pet => ({ id: pet.id, name: pet.name }));

    console.log("Sold Pets (id, name):");
    console.log(soldPetTuples);

    // Analyze name counts
    const analyzer = new PetAnalyzer(soldPetTuples);
    const nameCounts = analyzer.countPetsByName();

    console.log("\n Pet Name Frequency:");
    console.log(nameCounts);

  } else {
    console.log(`Failed to fetch sold pets. Status: ${response.status()}`);
  }

  await apiContext.dispose();
})();
