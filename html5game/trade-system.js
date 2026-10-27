
/*
 * Retro Bowl Trade System
 * Version 0.3 - First trade screen
 */

(function () {
  function evaluateOffer(offer, team) {
    var offered = Number(offer.offeredValue) || 0;
    var requested = Number(offer.requestedValue) || 0;

    if (offered <= 0 || requested <= 0) {
      return {
        decision: "reject",
        reason: "Enter two values greater than zero."
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
      <label for="trade-offered">VALUE YOU OFFER</label>
      <div class="line">
        <input id="trade-offered" type="number"
          min="1" value="100" />
      </div>

      <label for="trade-requested">VALUE YOU WANT</label>
      <div class="line">
        <input id="trade-requested" type="number"
          min="1" value="100" />
      </div>

      <button class="fullbtn" id="trade-evaluate"
        type="button">SEND TRADE OFFER</button>

      <p id="trade-result"
        style="font-size:9px;line-height:1.8">
        Choose your values and send an offer.
      </p>
    `;

    menu.appendChild(section);

    document.getElementById("trade-evaluate").onclick =
      function () {
        var offer = {
          offeredValue:
            document.getElementById("trade-offered").value,
          requestedValue:
            document.getElementById("trade-requested").value
        };

        var result = evaluateOffer(offer, {});
        var output = document.getElementById("trade-result");

        output.textContent =
          result.decision.toUpperCase() + " — " + result.reason;
      };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addTradeScreen);
  } else {
    addTradeScreen();
  }
})();

