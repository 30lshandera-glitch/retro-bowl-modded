/*
 * Retro Bowl Trade System
 * Version 0.4 - Trade Asset Types
 */
(function () {
  function evaluateOffer(offer, team) {
    if (
      offer.offeredType === "credits" &&
      offer.requestedType === "credits"
    ) {
      return {
        decision: "reject",
        reason: "Credits cannot be traded for credits."
      };
    }

    var offered = Number(offer.offeredValue) || 0;
    var requested = Number(offer.requestedValue) || 0;

    if (offered <= 0 || requested <= 0) {
      return {
        decision: "reject",
        reason: "Both trade values must be greater than zero."
      };
    }

    var ratio = offered / requested;
    ratio += Number(team && team.needsBonus) || 0;

    if (ratio >= 1.15) {
      return {
        decision: "accept",
        reason: "The coach likes this deal!"
      };
    }

    if (ratio >= 0.85) {
      return {
        decision: "counter",
        reason: "The coach wants a little more."
      };
    }

    return {
      decision: "reject",
      reason: "The coach thinks this offer is too weak."
    };
  }

  window.TradeSystem = {
    evaluateOffer: evaluateOffer
  };

  function addTradeScreen() {
    var menu = document.getElementById("jax-body");
    if (!menu || document.getElementById("trade-screen")) return;

    var section = document.createElement("div");
    section.id = "trade-screen";
    section.className = "mod-category";

    section.innerHTML = `
      <h2>AI TRADE TEST</h2>

      <label>YOU OFFER</label>
      <select id="trade-offer-type">
        <option value="credits">Coaching credits</option>
        <option value="player">Player</option>
        <option value="pick">Draft pick</option>
      </select>
      <input id="trade-offered" type="number"
        min="1" value="100" />

      <label>YOU WANT</label>
      <select id="trade-request-type">
        <option value="player">Player</option>
        <option value="pick">Draft pick</option>
        <option value="credits">Coaching credits</option>
      </select>
      <input id="trade-requested" type="number"
        min="1" value="100" />

      <button class="fullbtn" id="trade-evaluate"
        type="button">SEND TRADE OFFER</button>

      <p id="trade-result">
        Choose your trade assets.
      </p>
    `;

    menu.appendChild(section);

    document.getElementById("trade-evaluate").onclick =
      function () {
        var offer = {
          offeredType:
            document.getElementById("trade-offer-type").value,
          requestedType:
            document.getElementById("trade-request-type").value,
          offeredValue:
            document.getElementById("trade-offered").value,
          requestedValue:
            document.getElementById("trade-requested").value
        };

        var result = evaluateOffer(offer, {});
        document.getElementById("trade-result").textContent =
          result.decision.toUpperCase() + " — " + result.reason;
      };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addTradeScreen);
  } else {
    addTradeScreen();
  }
})();

  } else {
    addTradeScreen();
  }
})();

