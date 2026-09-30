Plan: Dedicated Booking Engine (book.gamingvault47.pk)1. System Ecosystem & Multi-Site Routing ArchitectureTo replicate the decoupling model used by SuperGame (supergame.pk $\to$ book.supergame.pk), the application is architected as a two-tier frontend system:[ Tier 1: Brand & Marketing Hub ]
  URL: https://gamingvault47.pk (or index.html)
  Role: Brand storytelling, room previews, static rate sheet, location & social proof
         │
         │  [ "Book Now" CTA / Route Interceptor ]
         ▼
[ Tier 2: Dedicated Booking Engine ]
  URL: https://book.gamingvault47.pk (or book.html)
  Role: Interactive amenity browser, real-time slot selection, dynamic bill calculator, 
        digital verification pass generator, WhatsApp protocol dispatcher
         │
         ├── Amenity Catalog State Manager
         ├── 7-Day Date Picker & 24/7 Time Slot Matrix (48 slots/day)
         ├── Dynamic Math Pricing Engine
         ├── Verification Pass (QR Code Generator)
         └── WhatsApp Deep-Link Dispatch Engine
                 │
                 ▼
     [ Front Desk WhatsApp Terminal ] ──> (+92 334 3680630)
2. Technical Stack & State Machine SpecificationLayerTechnologyArchitectural FunctionRuntime ViewHTML5 Semantic EngineLightweight web application, zero compilation overhead, instant paint.Style & ThemeTailwind CSS / CSS3 VariablesHigh-contrast cyber-dark palette (#050711, #00d2ff, #ff007f) with hardware-accelerated glassmorphism panels.Reactive StateVanilla JavaScript (ES6+ State Machine)Client-side reactive session object tracking selected amenity, date, time slot, duration, controllers, and customer credentials.Pass RenderingDynamic Canvas / SVG QR GeneratorGenerates a cryptographically unique reservation ticket (#GV-XXXXX) encoded into a scan-ready QR pass.Lead DispatchWhatsApp URI Deep-Link SchemeURL-encoded direct socket trigger transmitting finalized cart metadata directly to management.3. Data Schema & Rate MatrixThe booking engine computes transaction totals using this configuration object:JavaScriptconst BOOKING_CONFIG = {
  currency: "PKR",
  businessContact: "923343680630",
  businessName: "Gaming Vault",
  operatingHours: "24/7",
  services: [
    {
      id: "titan",
      name: "PS-5 Private Room: Titan",
      category: "ps5",
      type: "Private Room",
      discountPerHour: 800,
      normalPerHour: 1000,
      discountPerHalf: 400,
      normalPerHalf: 500,
      maxControllers: 4,
      defaultControllers: 2,
      badge: "Popular Squad Room",
      nextAvailable: "Immediate (Ready to Play)"
    },
    {
      id: "omega",
      name: "PS-5 Private Room: Omega",
      category: "ps5",
      type: "Private Room",
      discountPerHour: 800,
      normalPerHour: 1000,
      discountPerHalf: 400,
      normalPerHalf: 500,
      maxControllers: 4,
      defaultControllers: 2,
      badge: "High-FPS Display",
      nextAvailable: "Immediate"
    },
    {
      id: "phantom",
      name: "PS-5 Private Room: Panthom",
      category: "ps5",
      type: "Private Room",
      discountPerHour: 800,
      normalPerHour: 1000,
      discountPerHalf: 400,
      normalPerHalf: 500,
      maxControllers: 4,
      defaultControllers: 2,
      badge: "Acoustic Shielding",
      nextAvailable: "Immediate"
    },
    {
      id: "vault_vip",
      name: "PS-5 Private Room: The Vault (Premium)",
      category: "ps5",
      type: "VIP Executive Suite",
      discountPerHour: 1000,
      normalPerHour: 1200,
      discountPerHalf: 500,
      normalPerHalf: 600,
      maxControllers: 4,
      defaultControllers: 2,
      badge: "VIP Luxury Recliners",
      nextAvailable: "Slots Open"
    },
    {
      id: "snooker",
      name: "Snooker Arena",
      category: "cuesports",
      type: "Tournament Grade",
      discountPerHour: 720,
      normalPerHour: 840,
      discountPerHalf: 360,
      normalPerHalf: 420,
      maxControllers: 0,
      defaultControllers: 0,
      badge: "Strachan Cloth & Pro Cues",
      nextAvailable: "Immediate"
    },
    {
      id: "dabbu",
      name: "Dabbu (Carrom Board)",
      category: "boardgames",
      type: "Standard Table",
      discountPerHour: 400,
      normalPerHour: 500,
      discountPerHalf: 200,
      normalPerHalf: 250,
      maxControllers: 0,
      defaultControllers: 0,
      badge: "Smooth Powder Surface",
      nextAvailable: "Immediate"
    },
    {
      id: "luddo",
      name: "Luddo Arena",
      category: "boardgames",
      type: "Table Setup",
      discountPerHour: 350,
      normalPerHour: 350,
      discountPerHalf: 200,
      normalPerHalf: 200,
      maxControllers: 0,
      defaultControllers: 0,
      badge: "Traditional Classic",
      nextAvailable: "Immediate"
    }
  ],
  addons: {
    ps5ControllerRatePerHour: 150
  }
};
4. End-to-End User Experience & Interaction Workflow[ Step 1: Amenity Catalog ]
  User selects from responsive amenity cards (Titan, Omega, Phantom, The Vault, Snooker, Dabbu, Luddo)
              │
              ▼
[ Step 2: 7-Day Date Carousel ]
  User selects date tab (Today, Tomorrow, Day 3... up to Day 7)
              │
              ▼
[ Step 3: 24/7 Time-Slot Matrix ]
  Selects starting time slot from dynamic 30-minute interval grid (12:00 AM to 11:30 PM)
              │
              ▼
[ Step 4: Duration & Controller Add-ons ]
  Chooses duration (30m, 1h, 2h, 3h, 4h). Configures extra controllers (+150 PKR/hr)
              │
              ▼
[ Step 5: Gamer Profile & Live Price Audit ]
  Inputs gamer name and phone number. Engine renders live price breakdown:
  (Base Service Rate + Addon Fees = Total Payable PKR)
              │
              ▼
[ Step 6: Confirmation, Pass Generation & Deep-Link Dispatch ]
  1. Generates unique booking ticket ID: #GV-XXXXX
  2. Renders scan-ready digital entry pass with QR code
  3. Dispatches structured booking order to WhatsApp: 0334-3680630
5. Algorithmic Pricing & Dispatch Logic5.1 Bill Calculation Formula$$\text{DurationHours} = \frac{\text{SelectedMinutes}}{60}$$If $\text{SelectedMinutes} = 30$:$$\text{BaseRate} = \text{Service.discountPerHalf}$$$$\text{ControllerCharges} = \text{ExtraControllers} \times \text{ControllerRatePerHour} \times 0.5$$If $\text{SelectedMinutes} \ge 60$:$$\text{BaseRate} = \text{Service.discountPerHour} \times \text{DurationHours}$$$$\text{ControllerCharges} = \text{ExtraControllers} \times \text{ControllerRatePerHour} \times \text{DurationHours}$$$$\text{FinalAmount} = \text{BaseRate} + \text{ControllerCharges}$$5.2 Deep-Link Message Payload Template🎮 *GAMING VAULT - BOOKING RESERVATION*
━━━━━━━━━━━━━━━━━━━━━━
🎫 *Pass ID:* #GV-74892
👤 *Gamer Name:* {CustomerName}
📱 *Phone Number:* {CustomerPhone}
🕹️ *Service / Amenity:* {ServiceName}
📅 *Date:* {SelectedDate}
⏰ *Start Time:* {SelectedTimeSlot}
⏳ *Duration:* {DurationLabel}
🎮 *Extra Controllers:* {ExtraControllerCount} (+Rs. {AddonCost})
━━━━━━━━━━━━━━━━━━━━━━
💰 *Total Amount:* Rs. {FinalAmount} PKR
🟢 *Status:* Awaiting Slot Lock Verification
━━━━━━━━━━━━━━━━━━━━━━
Please confirm availability and lock my slot!
6. Execution File StructureFor standalone multi-page setups or sub-domain routing:gaming-vault-suite/
│
├── index.html                 # Tier 1: Main Marketing Landing Page
├── book.html                  # Tier 2: Dedicated Booking Engine Web App
│
├── css/
│   ├── cyberpunk-theme.css    # Central design tokens, neon text/glow filters
│   └── booking-engine.css     # Step-by-step layout, calendar scroll & pass styling
│
├── js/
│   ├── config.js              # Central rates, room data, business constants
│   ├── booking-engine.js      # State machine, slot rendering, pricing calculations
│   └── pass-generator.js      # Dynamic QR pass generator & WhatsApp URL builder
│
└── assets/
    ├── icons/                 # PS5, snooker, carrom SVG vector icons
    └── rooms/                 # WebP compressed lounge imagery
7. Master Antigravity Execution PromptCopy and paste the block below into Antigravity to generate the complete dedicated booking engine (book.html):MarkdownRole: Lead Web Applications Architect & Senior Frontend Engineer

Task:
Build the dedicated, standalone booking web application for "Gaming Vault" (@gamingvault47.pk) named `book.html` (representing book.gamingvault47.pk), directly modeled after the clean, high-performance booking interface of https://book.supergame.pk/. This page works in tandem with the primary marketing website (`index.html`) to manage reservations, rate computations, dynamic verification passes, and direct WhatsApp booking dispatches.

---

### 1. BRAND IDENTITY & COLOR SYSTEM
- Brand: Gaming Vault (@gamingvault47.pk)[cite: 2]
- Hotline: 0334-3680630[cite: 1]
- WhatsApp: 923343680630[cite: 1]
- Visual Tone: Cyberpunk dark esports lounge matching supergame.pk.
  * Canvas Dark: #050711, #0a0d1e
  * Neon Cyan / Electric Blue: #00d2ff
  * Neon Pink / Magenta: #ff007f
  * Live Status Green: #00ff88
  * Glass Surface: rgba(13, 17, 36, 0.85) with backdrop-filter: blur(14px) and 1px neon borders
- No Restaurant/Cafe Menu: Restrict scope strictly to PS5 gaming suites, snooker, and board games[cite: 1, 2].

---

### 2. CORE DATA MATRIX (STRICT RATES)
- PS-5 Private Room: Titan (Discount 800/hr | 400/half hr) [Normal: 1000/hr | 500/half hr][cite: 1]
- PS-5 Private Room: Omega (Discount 800/hr | 400/half hr) [Normal: 1000/hr | 500/half hr][cite: 1]
- PS-5 Private Room: Panthom (Discount 800/hr | 400/half hr) [Normal: 1000/hr | 500/half hr][cite: 1]
- PS-5 Private Room: The Vault [VIP] (Discount 1000/hr | 500/half hr) [Normal: 1200/hr | 600/half hr][cite: 1]
- Snooker Arena (Discount 720/hr | 360/half hr) [Normal: 840/hr | 420/half hr][cite: 1]
- Dabbu (Carrom) (Discount 400/hr | 200/half hr) [Normal: 500/hr | 250/half hr][cite: 1]
- Luddo (350/hr | 200/half hr) [No discount][cite: 1]
- PS-5 Extra Controller: 150 PKR/hour per extra controller[cite: 1]

---

### 3. INTERACTIVE BOOKING WORKFLOW (SUPERGAME PATTERN)
1. **Header Navigation:**
   - "← Back to Website" link pointing to `index.html`.
   - Neon "GAMING VAULT BOOKING PORTAL" logo badge[cite: 1].
   - Live "24/7 SLOTS ACTIVE" badge with a pulsing LED indicator[cite: 1].
   - Direct helpline link: `tel:03343680630`[cite: 1].

2. **Step 1: Amenity Directory (Card Selection):**
   - Display cards for all 7 verified services with badge details, pricing labels, and "Select Slot" buttons[cite: 1].
   - Selecting a card activates Step 2 and highlights the selected amenity.

3. **Step 2: 7-Day Date Carousel:**
   - Horizontal scrollable row displaying the next 7 dates (Today, Tomorrow, Day 3 to Day 7) with dynamic date labels.

4. **Step 3: 24/7 Time-Slot Grid:**
   - Interactive 48-slot picker in 30-minute intervals covering a full 24-hour cycle (12:00 AM, 12:30 AM ... 11:30 PM)[cite: 1].
   - Visual states: Standard, Hover, and Active Selected Neon Cyan.

5. **Step 4: Duration & Controller Counter:**
   - Duration options: 30 Mins, 1 Hour, 2 Hours, 3 Hours, 4 Hours.
   - Extra PS5 Controllers counter (0 to 4), disabled automatically for Snooker, Dabbu, and Luddo[cite: 1].

6. **Step 5: Customer Details & Dynamic Price Breakdown:**
   - Text inputs: Full Name & WhatsApp Number.
   - Live summary card updating automatically:
     * Base Service Rate[cite: 1]
     * Extra Controller Charges (if applicable)[cite: 1]
     * Applied Opening Discount Tag[cite: 1]
     * Total Estimated Bill in PKR[cite: 1]

7. **Step 6: Digital Verification Pass & Instant Dispatch:**
   - "Lock Slot & Generate Pass" CTA button.
   - Triggers an on-screen reservation modal:
     * Displays generated pass ID (e.g., `#GV-9842`).
     * Renders a real-time QR code encoding the reservation payload using `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=...`.
     * "Confirm via WhatsApp" button dispatching an auto-formatted booking message directly to `https://wa.me/923343680630?text=...`[cite: 1].
     * Print / Save Pass button.

---

### 4. DELIVERABLE SPECIFICATION
Output the complete, production-ready code inside a self-contained file (`book.html`) with embedded Tailwind classes, custom CSS variables for neon glows, and vanilla JavaScript managing state, pricing arithmetic, and QR generation.