const hamburgerIcon = document.getElementById("hamburger-icon");
const centeritems = document.getElementById("center");
const rightitems = document.getElementById("right");
const scrollFooter = document.getElementById("footer");

function toggleFAQ() {
  var faqCard = document.getElementById("faq-card");
  var faqHeader = document.querySelector(".section-four h2");

  if (faqCard.classList.contains("show")) {
    faqCard.classList.remove("show");
    faqCard.classList.add("close-animation");
    faqHeader.querySelector("ion-icon").style.transform = "rotate(0deg)";
    setTimeout(function () {
      faqCard.style.display = "none";
      faqCard.classList.remove("close-animation");
    }, 500);
  } else {
    faqCard.style.display = "block";
    faqCard.classList.add("show");
    faqHeader.querySelector("ion-icon").style.transform = "rotate(180deg)";
  }
}

function closeFooter() {
  var close = document.getElementById("footer");
  close.style.display = "none";
  setInterval(() => {
    close.style.display = "block";
  }, 1800000); // Executes every 1,800,000 milliseconds (30 minutes)
}

// Listen for scroll events to show/hide the footer
window.addEventListener("scroll", () => {
  if (scrollFooter.style.display !== "none") {
    scrollFooter.style.bottom = "0";
  }
});

// Navbar Script
hamburgerIcon.addEventListener("click", function () {
  if (centeritems.style.display === "none") {
    centeritems.style.display = "block";
    rightitems.className = "responsive-nav";
    rightitems.style.display = "block";
  } else {
    centeritems.style.display = "none";
    rightitems.style.display = "none";
  }
});

// Get the sliders
const ramSlider = document.getElementById("ram-slider");
const storageSlider = document.getElementById("storage-slider");
const backupsSlider = document.getElementById("backups-slider");

// Get the value display elements
const ramValue = document.getElementById("ram-value");
const storageValue = document.getElementById("storage-value");
const backupsValue = document.getElementById("backups-value");
const planLengthValue = document.getElementById("plan-length-value");

// Get the plan length and server type dropdowns
const planLengthDropdown = document.getElementById("plan-length");
const serverTypeDropdown = document.getElementById("server-type");

// Get the total price element
const totalPriceElement = document.getElementById("total-price");

// Add event listeners to update the values on slider change
ramSlider.addEventListener("input", updateRamValue);
storageSlider.addEventListener("input", updateStorageValue);
backupsSlider.addEventListener("input", updateBackupsValue);
planLengthDropdown.addEventListener("change", updateTotalPrice);
serverTypeDropdown.addEventListener("change", updateTotalPrice);

function updateRamValue() {
  ramValue.textContent = `${ramSlider.value} GB`;
  updateTotalPrice();
}

function updateStorageValue() {
  storageValue.textContent = `${storageSlider.value} GB`;
  updateTotalPrice();
}

function updateBackupsValue() {
  backupsValue.textContent = backupsSlider.value;
  updateTotalPrice();
}

function updateTotalPrice() {
    const ramPrice = 0.7; // 70 cents per GB
    const storagePrice = 0.02; // 2 cents per GB
    const backupsPrice = 1; // $1 for backups
  
    const ramGB = parseInt(ramSlider.value);
    const storageGB = parseInt(storageSlider.value);
    const backupsCount = parseInt(backupsSlider.value);
    const planLength = planLengthDropdown.value;
    const serverType = serverTypeDropdown.value;
  
    let totalPrice = ramGB * ramPrice + storageGB * storagePrice + backupsCount * backupsPrice;
  
    // Increase price if server type is Minecraft
    if (serverType.startsWith("minecraft")) {
      totalPrice *= 1.5; // Increase the total price by 50% for Minecraft servers
    }
    
    if (
        serverType.startsWith("rust") || 
        serverType.startsWith("palword") 
    ) {
        totalPrice *= 1.7; // Increase the total price by 30%
    }

    if (
        serverType.startsWith("python") || 
        serverType.startsWith("nodejs") || 
        serverType.startsWith("c#") || 
        serverType.startsWith("java")
    ) {
        totalPrice *= 1.3; // Increase the total price by 30%
    }
  
    if (planLength === "quarterly") {
      totalPrice *= 1.7;
    } else if (planLength === "yearly") {
      totalPrice *= 5.7;
    }
    
    totalPriceElement.textContent = `${totalPrice.toFixed(2)}$`;
    planLengthValue.textContent = " /" + planLength;
  }
  
  // Initial calculation on page load
  updateTotalPrice();
  
  const purchaseButton = document.getElementById("purchase-btn");
  const popup = document.getElementById("purchase-popup");
  const closePopup = document.getElementsByClassName("close")[0];
  const purchaseInfo = document.getElementById("purchase-info");
  
  // Add event listeners
  purchaseButton.addEventListener("click", openPopup);
  closePopup.addEventListener("click", closePurchasePopup);
  
  function openPopup() {
    const ramPrice = 0.7; // 70 cents per GB
    const storagePrice = 0.02; // 2 cents per GB
    const backupsPrice = 1; // $1 for backups
  
    const ramGB = parseInt(ramSlider.value);
    const storageGB = parseInt(storageSlider.value);
    const backupsCount = parseInt(backupsSlider.value);
    const planLength = planLengthDropdown.value;
    const serverType = serverTypeDropdown.value;
  
    let total = ramGB * ramPrice + storageGB * storagePrice + backupsCount * backupsPrice;
  
    // Increase price if server type is Minecraft
    if (serverType.startsWith("minecraft")) {
      total *= 1.5; // Increase the total price by 50% for Minecraft servers
    }

    if (serverType.startsWith("rust")) {
        total *= 1.7
    }

    if (serverType.startsWith("palw")) {
        total *= 1.7
    }

    if (
        serverType.startsWith("python") || 
        serverType.startsWith("nodejs") || 
        serverType.startsWith("c#") || 
        serverType.startsWith("java")
    ) {
        total *= 1.3; // Increase the total price by 30%
    }
  
    if (planLength === "quarterly") {
      total *= 1.7;
    } else if (planLength === "yearly") {
      total *= 5.7;
    }
  
    totalPriceElement.textContent = `$ ${total.toFixed(2)}`;
  
    purchaseInfo.textContent = `Purchase: ${ramGB} GB RAM, ${storageGB} GB storage, ${backupsCount} CPU vCores, ${serverType} Server || Final Price: ${total.toFixed(
      2
    )}$ /${planLength}`;
  
    popup.style.display = "block";
  }
  
  // Close the purchase popup
  function closePurchasePopup() {
    popup.style.display = "none";
  }

const dropdown = document.getElementById("server-type");

dropdown.addEventListener("change", function () {
  const selectedOption = dropdown.options[dropdown.selectedIndex];

  if (selectedOption.value === "vps") {
    window.open("/vps.html", "_blank");
  }
});