export const WEATHER_ADVISORIES = {
  north: {
    region: "North India",
    temp: "18°C - 26°C",
    condition: "Clear Sky / Morning Mist",
    humidity: "62%",
    rainfallForecast: "Dry weather next 7 days, light western disturbance expected in western Himalayan foothills.",
    currentStage: "Wheat Tillering & Mustard Pod Formation",
    alerts: [
      {
        type: "info",
        title: "Wheat First / Second Irrigation",
        message: "Wheat sown in November is entering late tillering stage. Apply light irrigation if not done. Avoid stagnant water to prevent yellowing."
      },
      {
        type: "warning",
        title: "Aphid (चेपा) Alert in Mustard",
        message: "Cloudy humid mornings can trigger aphid outbreak in flowering mustard. Inspect borders. If >25 aphids per 10cm shoot, spray Neem oil 10,000 PPM or Dimethoate 30 EC."
      },
      {
        type: "success",
        title: "Ideal Window for Summer Moong Planning",
        message: "Procure certified seeds of Moong (Samrat / SML-668) in advance for planting immediately after sugarcane/potato harvest."
      }
    ]
  },
  south: {
    region: "South India",
    temp: "24°C - 32°C",
    condition: "Partly Cloudy with Coastal Breeze",
    humidity: "78%",
    rainfallForecast: "Isolated convective showers along coastal Andhra and Tamil Nadu delta; dry in Deccan plateau.",
    currentStage: "Samba Paddy Grain Filling / Groundnut Harvesting",
    alerts: [
      {
        type: "warning",
        title: "Brown Plant Hopper (BPH) Watch in Paddy",
        message: "High humidity may foster BPH colonies at the base of paddy tillers. Create alleyways (pathways) every 2 meters in the field to allow aeration and sunlight."
      },
      {
        type: "info",
        title: "Gypsum Application for Rabi Groundnut",
        message: "For groundnut crops at 40-45 DAS, broadcast 150 kg gypsum per acre followed by light hoeing and irrigation for firm pod development."
      },
      {
        type: "success",
        title: "Drip Fertigation in Chilli & Cotton",
        message: "Inject 19:19:19 water-soluble fertilizer via drip system every 6 days to support heavy flowering and fruit set."
      }
    ]
  },
  west: {
    region: "West India",
    temp: "20°C - 33°C",
    condition: "Sunny and Dry",
    humidity: "48%",
    rainfallForecast: "Dry weather across Maharashtra and Gujarat. Night temperatures dipping slightly in Vidarbha.",
    currentStage: "Rabi Jowar Grain Formation & Onion Transplantation",
    alerts: [
      {
        type: "info",
        title: "Rabi Onion Nursery & Transplanting",
        message: "Dip seedling roots in Trichoderma viride (10g/L) for 15 minutes before transplanting to prevent damping-off and root fungal rot."
      },
      {
        type: "warning",
        title: "Pink Bollworm Lures & Pheromone Trapping",
        message: "Clean cotton residue after final picking. Hang pheromone traps to curb over-wintering bollworm larvae for the upcoming cycle."
      },
      {
        type: "success",
        title: "Pomegranate Hasta Bahar Fruit Thinning",
        message: "Maintain 80-100 uniform fruits per healthy tree. Spray potassium nitrate 13:0:45 @ 5g/L for lustrous fruit color and rind strength."
      }
    ]
  },
  east: {
    region: "East India & Northeast",
    temp: "17°C - 28°C",
    condition: "Mild Sunshine / Foggy Mornings",
    humidity: "74%",
    rainfallForecast: "Dry across Bihar, Bengal & Odisha; localized dew accumulation in Assam valley.",
    currentStage: "Potato Tuber Bulking & Boro Rice Nursery",
    alerts: [
      {
        type: "warning",
        title: "Late Blight Warning in Potato",
        message: "Foggy mornings and dew on leaves favor Phytophthora infestans (Late blight). Spray preventive Mancozeb 75% WP @ 2.5g/L before symptoms appear."
      },
      {
        type: "info",
        title: "Boro Rice Seedbed Protection",
        message: "Cover nursery beds with polythene sheets at night in cold pockets of North Bengal & Assam to protect seedlings from low temperature chilling."
      },
      {
        type: "success",
        title: "Rabi Maize Top Dressing in Bihar",
        message: "Apply second split dose of Urea + Micronutrient zinc spray at knee-high stage. Ensure field has good drainage."
      }
    ]
  }
};

export const GOVT_SCHEMES = [
  {
    id: "smam",
    name: "Sub-Mission on Agricultural Mechanization (SMAM)",
    hindiName: "कृषि यंत्रीकरण उप-अभियान",
    benefits: "40% to 50% subsidy on purchase of Power Tillers, Battery Sprayers, Seed Drills, Brush Cutters & Tractors.",
    eligibility: "Small, marginal, and women farmers given special priority across all states.",
    portal: "agrimachinery.nic.in"
  },
  {
    id: "pmkisan",
    name: "PM-KISAN Samman Nidhi",
    hindiName: "प्रधानमंत्री किसान सम्मान निधि",
    benefits: "Direct income support of ₹6,000 per year in three equal installments of ₹2,000 directly into farmer bank accounts.",
    eligibility: "All landholding farmer families across India (Aadhaar-linked DBT).",
    portal: "pmkisan.gov.in"
  },
  {
    id: "pmfby",
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    hindiName: "प्रधानमंत्री फसल बीमा योजना",
    benefits: "Comprehensive crop insurance at lowest premium (1.5% for Rabi, 2% for Kharif, 5% for Horticulture) covering drought, flood & pests.",
    eligibility: "All farmers growing notified crops in notified areas.",
    portal: "pmfby.gov.in"
  },
  {
    id: "soilcard",
    name: "Soil Health Card Scheme",
    hindiName: "मृदा स्वास्थ्य कार्ड योजना",
    benefits: "Free 12-parameter soil test report (N, P, K, S, Zn, Fe, Cu, Mn, Bo, pH, EC, OC) with customized fertilizer recommendations.",
    eligibility: "Issued to every farmer every 2 years through local Krishi Vigyan Kendra (KVK).",
    portal: "soilhealth.dac.gov.in"
  }
];
