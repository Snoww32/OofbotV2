module.exports = client => {

  /**
   * Utilities
   */
  client.tools = {}

  /**
   * Gets a users permission level
   * @param {Object} member
   */
  client.tools.permCheck = (member) => {
    // permLvl 0 by default (failsafe)
    let permLvl = 0;
    
    // Don't actually know what this line does (When did I write this??)
    const permOrder = client.config.permLvls.slice(0).sort((p, c) => p.level < c.level ? 1 : -1)
    
    // Cycle through each permission check in config.js
    while (permOrder.length) {

      // Pick out a permission level
      const currentLevel = permOrder.shift()

      // If member passes check, upgrade their permission level
      if (currentLevel.check(member)) {
        permLvl = currentLevel.level
        break;
      }
      
    }

    // Returns members permission level as the result of the function
    return permLvl
  }
}
