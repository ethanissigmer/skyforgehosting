document.addEventListener("DOMContentLoaded", function () {
  const hamburgerIcon = document.getElementById("hamburger-icon");
  const centeritems = document.getElementById("center");
  const rightitems = document.getElementById("right");
  const totalPriceElement = document.getElementById("total-price");
  const purchaseButton = document.getElementById("purchase-btn");
  const popup = document.getElementById("purchase-popup");
  const closePopup = document.getElementsByClassName("close")[0];
  const purchaseInfo = document.getElementById("purchase-info");

  // Pricing structure for different tiers
  const pricingStructure = {
    minecraft: {
      "Wood Tier": { ram: 4, vCores: 2, storage: 60, price: 9 },
      "Stone Tier": { ram: 8, vCores: 4, storage: 120, price: 15 },
      "Diamond Tier": { ram: 16, vCores: 8, storage: 240, price: 29 },
      "Netherite Tier": { ram: 24, vCores: 12, storage: 480, price: 49 },
    },
    fivem: {
      "Basic Tier": { ram: 4, vCores: 2, storage: 60, price: 9 },
      "Standard Tier": { ram: 8, vCores: 4, storage: 100, price: 13.50 },
      "Advanced Tier": { ram: 12, vCores: 6, storage: 150, price: 18.49 },
      "Pro Tier": { ram: 16, vCores: 8, storage: 200, price: 25.49 },
      "Elite Tier": { ram: 24, vCores: 10, storage: 300, price: 43.49 },
      "Ultimate Tier": { ram: 32, vCores: 12, storage: 400, price: 53.49 },
      "Premium Tier": { ram: 48, vCores: 20, storage: 600, price: 77.49 },
    },
    projectBot: {
      "Small Project/Bot Package": { ram: 1, vCores: 1, storage: 5, price: 5 },
      "Medium Project/Bot Package": { ram: 2, vCores: 1, storage: 10, price: 10 },
      "Large Project/Bot Package": { ram: 4, vCores: 2, storage: 20, price: 20 },
      "Advanced Project/Bot Package": { ram: 8, vCores: 4, storage: 40, price: 40 },
    },
  };

  // Get dropdown elements for the tier selection
  const tierSelect = document.getElementById("tier-select");
  const planLengthDropdown = document.getElementById("plan-length");
  const serverTypeDropdown = document.getElementById("server-type");

  // Function to populate tier dropdown based on selected server type
  function populateTierDropdown() {
    const serverType = serverTypeDropdown.value;
    tierSelect.innerHTML = ""; // Clear existing options

    // Populate tier options based on the selected server type
    for (const tier in pricingStructure[serverType]) {
      const option = document.createElement("option");
      option.value = tier;
      option.textContent = tier;
      tierSelect.appendChild(option);
    }

    // Update specs and total price when the server type changes
    updateSpecsDisplay();
    updateTotalPrice();
  }

  // Function to update the displayed specifications based on the selected tier
  function updateSpecsDisplay() {
    const serverType = serverTypeDropdown.value;
    const selectedTier = tierSelect.value;

    // Get the pricing details for the selected tier
    const pricing = pricingStructure[serverType]?.[selectedTier]; // Use optional chaining

    // Display the specifications
    const specsDisplay = document.getElementById("specs-display");
    if (pricing) {
      specsDisplay.textContent = `Specifications: ${pricing.ram} GB RAM | ⚙️ ${pricing.vCores} vCores | 💾 ${pricing.storage} GB SSD | 💸 £${pricing.price.toFixed(2)}`;
    } else {
      specsDisplay.textContent = "Select a tier to see the specifications.";
    }
 }

  // Function to update the total price based on selected tier and plan length
  function updateTotalPrice() {
    const serverType = serverTypeDropdown.value;
    const selectedTier = tierSelect.value;

    // Get the pricing details for the selected tier
    const pricing = pricingStructure[serverType]?.[selectedTier]; // Use optional chaining

    // Check if pricing is defined
    if (!pricing) {
      totalPriceElement.textContent = "Please select a valid tier.";
      return; // Exit the function if pricing is not available
    }

    let totalPrice = pricing.price;

    // Adjust total price based on plan length
    if (planLengthDropdown.value === "monthly") {
      totalPrice *= 1; // Example adjustment for quarterly plans
    } else if (planLengthDropdown.value === "quarterly") {
      totalPrice *= 1.7; // Example adjustment for semi-annual plans
    } else if (planLengthDropdown.value === "yearly") {
      totalPrice *= 2.6; // Example adjustment for annual plans
    }

    // Update the total price display
    totalPriceElement.textContent = `Total Price: £${totalPrice.toFixed(2)}`;
  }

  // Event listeners for dropdown changes
  serverTypeDropdown.addEventListener("change", function () {
    populateTierDropdown();
  });

  tierSelect.addEventListener("change", function () {
    updateSpecsDisplay();
    updateTotalPrice();
  });

  planLengthDropdown.addEventListener("change", function () {
    updateTotalPrice();
  });

  function openPopup() {
    const serverType = serverTypeDropdown.value;
    const selectedTier = tierSelect.value;
    const pricing = pricingStructure[serverType]?.[selectedTier]; // Get pricing details for selected tier
  
    if (!pricing) {
      alert("Please select a valid tier before purchasing.");
      return;
    }
  
    const ramGB = pricing.ram;
    const storageGB = pricing.storage;
    const vCores = pricing.vCores; // Use vCores as backups
    const planLength = planLengthDropdown.value;
  
    // Calculate total price based on selected plan length
    let total = pricing.price;
  
    if (planLength === "quarterly") {
      total *= 1.7; // Adjust for quarterly plan
    } else if (planLength === "yearly") {
      total *= 2.6; // Adjust for yearly plan
    }
  
    totalPriceElement.textContent = `Total Price: £${total.toFixed(2)}`;
  
    // Display purchase information in the popup
    purchaseInfo.textContent = `Purchase: ${ramGB} GB RAM, ${storageGB} GB storage, ${vCores} vCores, ${serverType} Server || Final Price: £${total.toFixed(2)} / ${planLength}`;
  
    popup.style.display = "block"; // Show the popup
  
    // Disable purchase button if server type is VPS
    purchaseButton.disabled = (serverType === "vps");
  }
  
  function closePurchasePopup() {
    popup.style.display = "none"; // Close the popup
  }
  
  // Add event listener for purchase button
  purchaseButton.addEventListener("click", openPopup);
  closePopup.addEventListener("click", closePurchasePopup);

  // Initial setup
  populateTierDropdown(); // Populate tiers on page load
});
