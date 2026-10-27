
/*
 * Retro Bowl Trade System
 * Version 0.2 - Shared AI trade evaluator
 */

(function () {
  function evaluateOffer(offer, team) {
    var offeredValue = Number(offer.offeredValue) || 0;
    var requestedValue = Number(offer.requestedValue) || 0;

    if (offeredValue <= 0 || requestedValue <= 0) {
      return {
        decision: "reject",
        reason: "Invalid trade offer."
      };
    }

    var ratio = offeredValue / requestedValue;

    // Teams can have different preferences.
    var needsBonus = Number(team && team.needsBonus) || 0;
    ratio += needsBonus;

    if (ratio >= 1.15) {
      return {
        decision: "accept",
        reason: "This deal offers good value."
      };
    }

    if (ratio >= 0.85) {
      return {
        decision: "counter",
        reason: "We want a little more in return."
      };
    }

    return {
      decision: "reject",
      reason: "This deal does not meet our needs."
    };
  }

  window.TradeSystem = {
    evaluateOffer: evaluateOffer
  };
})();
