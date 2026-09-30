/* -------------------------------------------------------------
   GAMING VAULT - PRICING ENGINE & WHATSAPP DISPATCHER
------------------------------------------------------------- */

const PRICING_DATA = {
  phone: "03343680630",
  whatsappPhone: "923343680630",
  services: {
    titan: {
      name: "PS-5 Private Room Titan",
      category: "ps5",
      discountHour: 800,
      regularHour: 1000,
      discountHalf: 400,
      regularHalf: 500
    },
    omega: {
      name: "PS-5 Private Room Omega",
      category: "ps5",
      discountHour: 800,
      regularHour: 1000,
      discountHalf: 400,
      regularHalf: 500
    },
    phantom: {
      name: "PS-5 Private Room Phantom",
      category: "ps5",
      discountHour: 800,
      regularHour: 1000,
      discountHalf: 400,
      regularHalf: 500
    },
    vault: {
      name: "PS-5 VIP Room The Vault (Premium)",
      category: "ps5",
      discountHour: 1000,
      regularHour: 1200,
      discountHalf: 500,
      regularHalf: 600
    },
    snooker: {
      name: "Tournament Snooker Table",
      category: "table",
      discountHour: 720,
      regularHour: 840,
      discountHalf: 360,
      regularHalf: 420
    },
    carrom: {
      name: "Dabbu (Carrom Arena)",
      category: "board",
      discountHour: 400,
      regularHour: 500,
      discountHalf: 200,
      regularHalf: 250
    },
    luddo: {
      name: "Luddo Lounge Table",
      category: "board",
      discountHour: 350,
      regularHour: 350,
      discountHalf: 200,
      regularHalf: 200
    }
  },
  addons: {
    extraControllerRate: 150 // PKR / hr
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initCalculator();
});

function initCalculator() {
  const serviceSelect = document.getElementById('calc-service');
  const durationSelect = document.getElementById('calc-duration');
  const controllerDecBtn = document.getElementById('btn-dec-controller');
  const controllerIncBtn = document.getElementById('btn-inc-controller');
  const controllerValEl = document.getElementById('controller-val');
  const controllerContainer = document.getElementById('controller-container');

  const calcBasePriceEl = document.getElementById('calc-base-price');
  const calcBaseRegularEl = document.getElementById('calc-base-regular');
  const calcAddonPriceEl = document.getElementById('calc-addon-price');
  const calcSavingsEl = document.getElementById('calc-savings');
  const calcTotalEl = document.getElementById('calc-total');
  const whatsappBtn = document.getElementById('calc-whatsapp-btn');

  const customerNameInput = document.getElementById('calc-name');
  const timeSlotInput = document.getElementById('calc-time');

  if (!serviceSelect || !durationSelect) return;

  let controllerQty = 0;

  // Update controller state
  function updateControllerUI(isPS5) {
    if (!isPS5) {
      controllerQty = 0;
      controllerValEl.textContent = '0';
      controllerContainer.classList.add('opacity-40', 'pointer-events-none');
    } else {
      controllerContainer.classList.remove('opacity-40', 'pointer-events-none');
    }
  }

  // Calculate pricing logic
  function calculateTotal() {
    const selectedServiceKey = serviceSelect.value;
    const durationMinutes = parseFloat(durationSelect.value);
    const service = PRICING_DATA.services[selectedServiceKey];

    if (!service) return;

    const isPS5 = service.category === 'ps5';
    updateControllerUI(isPS5);

    const durationHours = durationMinutes / 60;
    
    // Base cost calculation
    let baseDiscountCost = 0;
    let baseRegularCost = 0;

    if (durationMinutes === 30) {
      baseDiscountCost = service.discountHalf;
      baseRegularCost = service.regularHalf;
    } else {
      baseDiscountCost = service.discountHour * durationHours;
      baseRegularCost = service.regularHour * durationHours;
    }

    // Extra Controllers calculation (scales with duration in hours)
    const addonCost = controllerQty * PRICING_DATA.addons.extraControllerRate * durationHours;

    const grandDiscountTotal = baseDiscountCost + addonCost;
    const grandRegularTotal = baseRegularCost + addonCost;
    const totalSavings = Math.max(0, grandRegularTotal - grandDiscountTotal);

    // Update UI elements
    calcBasePriceEl.textContent = `${baseDiscountCost.toLocaleString()} PKR`;
    
    if (baseRegularCost > baseDiscountCost) {
      calcBaseRegularEl.textContent = `${baseRegularCost.toLocaleString()} PKR`;
      calcBaseRegularEl.style.display = 'inline';
    } else {
      calcBaseRegularEl.style.display = 'none';
    }

    if (addonCost > 0) {
      calcAddonPriceEl.textContent = `+${addonCost.toLocaleString()} PKR (${controllerQty} Controller${controllerQty > 1 ? 's' : ''})`;
    } else {
      calcAddonPriceEl.textContent = `0 PKR`;
    }

    if (totalSavings > 0) {
      calcSavingsEl.textContent = `Save ${totalSavings.toLocaleString()} PKR!`;
      calcSavingsEl.classList.remove('hidden');
    } else {
      calcSavingsEl.classList.add('hidden');
    }

    calcTotalEl.textContent = `${grandDiscountTotal.toLocaleString()} PKR`;

    // Construct WhatsApp Deep-link
    const durationLabel = durationSelect.options[durationSelect.selectedIndex].text;
    const customerName = customerNameInput ? customerNameInput.value.trim() : '';
    const timeSlot = timeSlotInput ? timeSlotInput.value.trim() : '';

    let waMessage = `Salam Gaming Vault! 🎮\nI would like to book a gaming session:\n\n`;
    if (customerName) waMessage += `👤 Name: ${customerName}\n`;
    waMessage += `🕹️ Room / Game: ${service.name}\n`;
    waMessage += `⏱️ Duration: ${durationLabel}\n`;
    if (isPS5 && controllerQty > 0) {
      waMessage += `🎮 Extra Controllers: ${controllerQty} (+${addonCost} PKR)\n`;
    }
    if (timeSlot) waMessage += `📅 Preferred Time: ${timeSlot}\n`;
    
    waMessage += `\n💰 Total Amount: ${grandDiscountTotal.toLocaleString()} PKR (Opening Discount Rate)\n`;
    waMessage += `\nPlease confirm room availability. Thank you!`;

    const encodedText = encodeURIComponent(waMessage);
    whatsappBtn.href = `https://wa.me/${PRICING_DATA.whatsappPhone}?text=${encodedText}`;
  }

  // Event Listeners
  serviceSelect.addEventListener('change', calculateTotal);
  durationSelect.addEventListener('change', calculateTotal);
  if (customerNameInput) customerNameInput.addEventListener('input', calculateTotal);
  if (timeSlotInput) timeSlotInput.addEventListener('input', calculateTotal);

  controllerDecBtn.addEventListener('click', () => {
    if (controllerQty > 0) {
      controllerQty--;
      controllerValEl.textContent = controllerQty;
      calculateTotal();
    }
  });

  controllerIncBtn.addEventListener('click', () => {
    if (controllerQty < 4) {
      controllerQty++;
      controllerValEl.textContent = controllerQty;
      calculateTotal();
    }
  });

  // Global trigger function to select room directly from card click
  window.selectRoomForBooking = function(serviceKey) {
    if (PRICING_DATA.services[serviceKey]) {
      serviceSelect.value = serviceKey;
      calculateTotal();
      const calcSection = document.getElementById('calculator');
      if (calcSection) {
        calcSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Initial Calculation
  calculateTotal();
}
