// Character class definition
class Character {
    static MAX_HEALTH = 100; // Static property for maximum health
  
    constructor(name) {
      this.name = name;
      this.health = Character.MAX_HEALTH;
      this.inventory = [];
    }
  
    roll() {
      console.log(`${this.name} rolls...`);
    }
  
    // Static method to check if the health value is valid
    static isValidHealth(health) {
      return health > 0 && health <= Character.MAX_HEALTH;
    }
  }
  
  // Adventurer class definition, extending Character
  class Adventurer extends Character {
    static ROLES = ["Fighter", "Healer", "Wizard"]; // Static property for roles
  
    constructor(name, role) {
      super(name);
      if (!Adventurer.ROLES.includes(role)) {
        throw new Error(`Invalid role: ${role}. Valid roles are: ${Adventurer.ROLES.join(", ")}.`);
      }
      this.role = role;
      this.level = 1;
      this.experience = 0;
      this.skills = [];
      this.inventory.push("bedroll", "50 gold coins");
    }
  
    // Adventurers have the ability to scout ahead of them.
    scout() {
      console.log(`${this.name} is scouting ahead...`);
      super.roll();
    }
  
    // Method for gaining experience.
    gainExperience(points) {
      this.experience += points;
      console.log(`${this.name} gains ${points} experience points.`);
      this.checkLevelUp();
    }
  
    // Method to check if the adventurer can level up.
    checkLevelUp() {
      const requiredExperience = this.level * 100; // Example level-up threshold.
      if (this.experience >= requiredExperience) {
        this.levelUp();
      }
    }
  
    // Method to level up.
    levelUp() {
      this.level += 1;
      this.experience = 0; // Reset experience or carry over excess.
      console.log(`${this.name} has leveled up to level ${this.level}!`);
    }
  
    // Method to learn a new skill.
    learnSkill(skill) {
      this.skills.push(skill);
      console.log(`${this.name} has learned a new skill: ${skill}.`);
    }
  
    // Method to use a skill.
    useSkill(skill) {
      if (this.skills.includes(skill)) {
        console.log(`${this.name} uses the skill: ${skill}.`);
      } else {
        console.log(`${this.name} hasn't learned the skill: ${skill}.`);
      }
    }
  
    // Static method to list all available roles
    static listRoles() {
      return Adventurer.ROLES.join(", ");
    }
  }
  
  // AdventurerFactory class definition
  class AdventurerFactory {
    constructor(role) {
      this.role = role;
      this.adventurers = [];
    }
  
    // Method to generate a new adventurer with the specified role
    generate(name) {
      const newAdventurer = new Adventurer(name, this.role);
      this.adventurers.push(newAdventurer);
      return newAdventurer;
    }
  
    // Method to find an adventurer by index
    findByIndex(index) {
      return this.adventurers[index];
    }
  
    // Method to find an adventurer by name
    findByName(name) {
      return this.adventurers.find(a => a.name === name);
    }
  }
  
  // Specialized Adventurer classes
  class Fighter extends Adventurer {
    constructor(name) {
      super(name, "Fighter");
      this.strength = 10;
    }
  
    attack() {
      console.log(`${this.name} attacks with strength ${this.strength}!`);
    }
  }
  
  class Healer extends Adventurer {
    constructor(name) {
      super(name, "Healer");
      this.healingPower = 10;
    }
  
    heal() {
      console.log(`${this.name} heals with power ${this.healingPower}!`);
    }
  }
  
  class Wizard extends Adventurer {
    constructor(name) {
      super(name, "Wizard");
      this.mana = 100;
    }
  
    castSpell() {
      console.log(`${this.name} casts a spell with ${this.mana} mana!`);
    }
  }
  
  // Example usage
  const healerFactory = new AdventurerFactory("Healer");
  const robin = healerFactory.generate("Robin");
  robin.scout();
  robin.gainExperience(150);
  robin.learnSkill("Healing Touch");
  robin.useSkill("Healing Touch");
  
  const fighterFactory = new AdventurerFactory("Fighter");
  const arthur = fighterFactory.generate("Arthur");
  
  const littleJohn = new Companion("Little John", "Human");
  littleJohn.assist();
  littleJohn.bondWithAdventurer();
  
  const friarTuck = new Companion("Friar Tuck", "Human");
  friarTuck.assist();
  friarTuck.increaseLoyalty(20);
  
  console.log(`Available roles for Adventurer: ${Adventurer.listRoles()}`);
  