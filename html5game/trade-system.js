
/*
 * Retro Bowl Trade System
 * First version: AI trade evaluation.
 */

const TradeSystem = (() => {
  function evaluateOffer(offer, team) {
    const offeredValue =
      Number(offer?.offeredValue) || 0;

    const requestedValue =
      Number(offer?.requestedValue) || 0;

    if (offeredValue <= 0 || requestedValue <= 0) {
      return {
        decision: "reject",
        reason: "The offer is invalid."
      };
    }

    const ratio = offeredValue / requestedValue;

    if (ratio >= 1.15) {
      return {
        decision: "accept",
        reason: "This is a good deal for our team."
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
      reason: "The offer does not meet our needs."
    };
  }

  return { evaluateOffer };
})();
