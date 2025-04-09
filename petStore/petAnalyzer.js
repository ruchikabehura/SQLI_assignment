class PetAnalyzer {
    constructor(petTuples) {
      this.petTuples = petTuples;
    }
  
    countPetsByName() {
      const nameCount = {};
  
      this.petTuples.forEach(pet => {
        const name = pet.name;
        nameCount[name] = (nameCount[name] || 0) + 1;
      });
  
      return nameCount;
    }
  }
  
  module.exports = PetAnalyzer;  