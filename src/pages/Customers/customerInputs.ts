import { store } from "../../store/Store";

export const vehicleInputs = [
  {
    label: "Vehicle No.",
    model: ".vehicleNumber",
    type: "text",
    required: true,
  },
  {
    label: "Fuel Type",
    model: ".fuelType",
    type: "select",
    options: (props) => [
      {label: "Petrol", value: "Petrol"},
      {label: "Diesel", value: "Diesel"},
    ]
  },
  {
    label: "Kit Enquired",
    model: ".kitEnquired",
    type: "text",
    required: true,
  },
  {
    label: "3 or 4 Wheeler",
    model: ".wheeles",
    type: "select",
    options: (props) => [
      {label: "3 Wheeler", value: "3 Wheeler"},
      {label: "4 Wheeler", value: "4 Wheeler"},
    ],
  },
  {
    label: "Select Product",
    model: ".products",
    type: "select",
    options: (props) => 
    store.getState().rxFormReducer[props.formModel].wheeles === "3 Wheeler" 
    ? [
        {label: "3 Wheeler Ace", value: "3 Wheeler Ace"},
        {label: "3 Wheeler Pro", value: "3 Wheeler Pro"},
      ]
    : store.getState().rxFormReducer[props.formModel].wheeles === "4 Wheeler" 
    ? [
        {label: "4 Wheeler Ace", value: "4 Wheeler Ace"},
        {label: "4 Wheeler Pro", value: "4 Wheeler Pro"},
      ]
    : store.getState().rxFormReducer[props.formModel].wheeles === undefined
    ? []
    : [
        {label: "3 Wheeler Ace", value: "3 Wheeler Ace"},
        {label: "3 Wheeler Pro", value: "3 Wheeler Pro"},
        {label: "4 Wheeler Ace", value: "4 Wheeler Ace"},
        {label: "4 Wheeler Pro", value: "4 Wheeler Pro"},
      ]
  },
  {
    label: "Vehicle Make",
    model: ".vehicleMek",
    type: "select",
    options: (props) => 
    store.getState().rxFormReducer[props.formModel].wheeles === "4 Wheeler" 
    ? [ 
        {label: "Honda", value: "Honda"},  // 4w
        {label: "Hyundai", value: "Hyundai"}, // 4w
        {label: "Maruti Suzuki", value: "Maruti Suzuki"}, // 4w
        {label: "Tata", value: "Tata"}, // 4w
      ]
    : store.getState().rxFormReducer[props.formModel].wheeles === "3 Wheeler" 
    ? [ 
        {label: "Bajaj Auto Limited", value: "Bajaj Auto Limited"}, // 3w
        {label: "Mahindra & Mahindra Ltd.", value: "Mahindra & Mahindra Ltd."}, // 3w
      ]
    : store.getState().rxFormReducer[props.formModel].wheeles === undefined
    ? []
    : [
        {label: "Honda", value: "Honda"},
        {label: "Hyundai", value: "Hyundai"},
        {label: "Maruti Suzuki", value: "Maruti Suzuki"},
        {label: "Tata", value: "Tata"},
        {label: "Bajaj Auto Limited", value: "Bajaj Auto Limited"},
        {label: "Mahindra & Mahindra Ltd.", value: "Mahindra & Mahindra Ltd."},
    ],
    // required: true,
  },
  {
    label: "Vehicle Model",
    model: ".vehicleModel",
    type: "select",
    options: (props) => 
    store.getState().rxFormReducer[props.formModel].vehicleMek === "Honda" 
    ? [
        {label: "Accord", value: "Accord"}, // Honda
        {label: "Acty", value: "Diesel"}, // Honda
        {label: "Amaze", value: "Amaze"}, // Honda
        {label: "Avancier", value: "Avancier"}, // Honda
        {label: "Ballade", value: "Ballade"}, // Honda
        {label: "Brio", value: "Brio"}, // Honda
        {label: "BR-V", value: "BR-V"}, // Honda
        {label: "City", value: "City"}, // Honda
        {label: "City Gienia", value: "City Gienia"}, // Honda
        {label: "City Grace", value: "City Grace"}, // Honda
        {label: "City Greiz", value: "City Greiz"}, // Honda
      ]
    : store.getState().rxFormReducer[props.formModel].vehicleMek === "Hyundai" 
    ? [
        {label: "Hyundai Tucson", value: "Hyundai Tucson"}, // Hyundai
        {label: "Hyundai Grand i10 Nios", value: "Hyundai Grand i10 Nios"}, // Hyundai
        {label: "Hyundai Kona Electric", value: "Hyundai Kona Electric"}, // Hyundai
        {label: "Hyundai Elantra", value: "Hyundai Elantra"}, // Hyundai
      ]
    : store.getState().rxFormReducer[props.formModel].vehicleMek === "Maruti Suzuki" 
    ? [
        {label: "Maruti Suzuki Dzire Facelift", value: "Maruti Suzuki Dzire Facelift"}, // Maruti Suzuki
        {label: "Maruti Suzuki Vitara Brezza", value: "Maruti Suzuki Vitara Brezza"}, // Maruti Suzuki
        {label: "Maruti Suzuki Baleno", value: "Maruti Suzuki Baleno"}, // Maruti Suzuki
        {label: "Maruti Suzuki Swift", value: "Maruti Suzuki Swift"}, // Maruti Suzuki
        {label: "Maruti Suzuki Ertiga", value: "Maruti Suzuki Ertiga"}, // Maruti Suzuki
      ]
    : store.getState().rxFormReducer[props.formModel].vehicleMek === "Mahindra & Mahindra Ltd." 
    ? [ 
        {label: "MAHINDRA ALFA DX", value: "MAHINDRA ALFA DX"}, // Mahindra & Mahindra Ltd
        {label: "MAHINDRA ALFA Champ", value: "MAHINDRA ALFA Champ"}, // Mahindra & Mahindra Ltd
        {label: "MAHINDRA ALFA Comfy", value: "MAHINDRA ALFA Comfy"},  // Mahindra & Mahindra Ltd
      ]
    : store.getState().rxFormReducer[props.formModel].vehicleMek === "Bajaj Auto Limited" 
    ? [
        {label: "Bajaj RE Auto Rickshaw Compact 4S", value: "Bajaj RE Auto Rickshaw Compact 4S"}, // Bajaj Auto Limited
        {label: "Bajaj RE Compact Diesel Auto Rickshaw", value: "Bajaj RE Compact Diesel Auto Rickshaw"}, // Bajaj Auto Limited
        {label: "Bajaj RE Compact LPG Auto Rickshaw", value: "Bajaj RE Compact LPG Auto Rickshaw"}, // Bajaj Auto Limited
      ]
    : store.getState().rxFormReducer[props.formModel].vehicleMek === "Tata" 
    ? [
        {label: "Tata Altroz", value: "Tata Altroz"}, // Tata
        {label: "Tata EVision", value: "Tata EVision"}, // Tata
        {label: "Tata Gravitas", value: "Tata Gravitas"}, // Tata
        {label: "Tata Harrier", value: "Tata Harrier"}, // Tata
        {label: "Tata Hexa", value: "Tata Hexa"}, // Tata
        {label: "Tata Hornbill", value: "Tata Hornbill"}, // Tata
        {label: "Tata Nexon", value: "Tata Nexon"}, // Tata
        {label: "Tata Tiago", value: "Tata Tiago"}, // Tata
        {label: "Tata Tigor", value: "Tata Tigor"}, // Tata
      ] 
    : store.getState().rxFormReducer[props.formModel].vehicleMek === undefined
    ? []
    : [
        {label: "Accord", value: "Accord"},
        {label: "Acty", value: "Diesel"},
        {label: "Amaze", value: "Amaze"},
        {label: "Avancier", value: "Avancier"},
        {label: "Ballade", value: "Ballade"},
        {label: "Brio", value: "Brio"},
        {label: "BR-V", value: "BR-V"},
        {label: "City", value: "City"},
        {label: "City Gienia", value: "City Gienia"},
        {label: "City Grace", value: "City Grace"},
        {label: "City Greiz", value: "City Greiz"},
        {label: "Hyundai Tucson", value: "Hyundai Tucson"},
        {label: "Hyundai Grand i10 Nios", value: "Hyundai Grand i10 Nios"},
        {label: "Hyundai Kona Electric", value: "Hyundai Kona Electric"},
        {label: "Hyundai Elantra", value: "Hyundai Elantra"},
        {label: "Maruti Suzuki Dzire Facelift", value: "Maruti Suzuki Dzire Facelift"},
        {label: "Maruti Suzuki Vitara Brezza", value: "Maruti Suzuki Vitara Brezza"},
        {label: "Maruti Suzuki Baleno", value: "Maruti Suzuki Baleno"},
        {label: "Maruti Suzuki Swift", value: "Maruti Suzuki Swift"},
        {label: "Maruti Suzuki Ertiga", value: "Maruti Suzuki Ertiga"},
        {label: "MAHINDRA ALFA DX", value: "MAHINDRA ALFA DX"},
        {label: "MAHINDRA ALFA Champ", value: "MAHINDRA ALFA Champ"},
        {label: "MAHINDRA ALFA Comfy", value: "MAHINDRA ALFA Comfy"}, 
        {label: "Bajaj RE Auto Rickshaw Compact 4S", value: "Bajaj RE Auto Rickshaw Compact 4S"},
        {label: "Bajaj RE Compact Diesel Auto Rickshaw", value: "Bajaj RE Compact Diesel Auto Rickshaw"},
        {label: "Bajaj RE Compact LPG Auto Rickshaw", value: "Bajaj RE Compact LPG Auto Rickshaw"},
        {label: "Tata Altroz", value: "Tata Altroz"},
        {label: "Tata EVision", value: "Tata EVision"},
        {label: "Tata Gravitas", value: "Tata Gravitas"},
        {label: "Tata Harrier", value: "Tata Harrier"},
        {label: "Tata Hexa", value: "Tata Hexa"},
        {label: "Tata Hornbill", value: "Tata Hornbill"},
        {label: "Tata Nexon", value: "Tata Nexon"},
        {label: "Tata Tiago", value: "Tata Tiago"},
        {label: "Tata Tigor", value: "Tata Tigor"},
      ],
    // required: true,
  },
  {
    label: "Usage of Vehicle",
    model: ".usage",
    type: "select",
    options: (props) => [
      {label: "Commercial", value: "Commercial"},
      {label: "Private", value: "Private"},
    ],
  },
  // {
  //   label: "Engine Type",
  //   model: ".vehicleType",
  //   type: "select",
  //   options: (props) => [
  //     {label: "2 Stroke", value: "2 Stroke"},
  //     {label: "4 Stroke", value: "4 Stroke"},
  //   ],
  // },
  {
    label: "Daily Running KMS",
    model: ".dailyRunning",
    type: "number",
  },
  {
    label: "Registration Year",
    model: ".registration",
    type: "date",
  },
  {
    label: "Year Of Manufacturing",
    model: ".mfg",
    type: "select",
    options: (props) => [
      {label: "2010", value: 2010},
      {label: "2011", value: 2011},
      {label: "2012", value: 2012},
      {label: "2013", value: 2013},
      {label: "2014", value: 2014},
      {label: "2015", value: 2015},
      {label: "2016", value: 2016},
      {label: "2017", value: 2017},
      {label: "2018", value: 2018},
      {label: "2019", value: 2019},
      {label: "2020", value: 2020},
    ],
  },
  // {
  //   label: "Chassis Number",
  //   model: ".chassis",
  //   type: "text",
  //   required: true,
  // },
];

export const options = [
  {
    label: "First Name",
    model: ".firstName",
    type: "text",
    required: true,
  },
  {
    label: "Middle Name",
    model: ".middleName",
    type: "text",
  },
  {
    label: "Last Name",
    model: ".lastName",
    type: "text",
    required: true,
  },
  {
    label: "Company",
    model: ".company",
    type: "text",
  },
  {
    label: "Email",
    model: ".email",
    type: "text",
  },
  {
    label: "WhatsApp Number",
    model: ".whatsAppNumber",
    type: "number",
    required: true,
  },
];

export const streetInputs = [
  {
    label: "Street",
    model: ".street",
    type: "text",
  },
  {
    label: "City",
    model: ".city",
    type: "text",
    required: true,
  },
  {
    label: "State/Provinance",
    model: ".state",
    type: "text",
  },
  {
    label: "Zip/Postal Code",
    model: ".zip",
    type: "text",
    required: true,
  },
  {
    label: "Country",
    model: ".country",
    type: "text",
  },
];

export const leadDealer = [
  {
    label: "First Name",
    model: ".firstName",
    type: "text",
    required: true,
  },
  {
    label: "Middle Name",
    model: ".middleName",
    type: "text",
  },
  {
    label: "Last Name",
    model: ".lastName",
    type: "text",
    required: true,
  },
  {
    label: "Company",
    model: ".company",
    type: "text",
  },
  {
    label: "Email",
    model: ".email",
    type: "text",
  },
  {
    label: "WhatsApp Number",
    model: ".whatsAppNumber",
    type: "number",
    required: true,
  },
  {
    label: "Contact Person",
    model: ".contactPerson",
    type: "text",
    required: true,
  },
  {
    label: "Lead Type",
    model: ".leadType",
    type: "select",
    required: true,
    options: (props) => [
      {label: "B2B", value: "B2B"},
      {label: "B2C", value: "B2C"},
      {label: "B2G", value: "B2G"}
    ],
  },
  {
    label: "Sub Lead Type",
    model: ".subLeadType",
    type: "select",
    required: true,
    options: (props) => [
      {label: "Customer", value: "Customer"},
      {label: "Influencer", value: "Influencer"},
      {label: "Fitment", value: "Fitment"},
      {label: "Servicing", value: "Servicing"}
    ],
  },
  {
    label: "Lead Source",
    model: ".leadSource",
    type: "select",
    required: true,
    options: (props) => [
      // {label: "Partner", value: "Partner"},
      // {label: "Website", value: "Website"},
      // {label: "Advertisement", value: "Advertisement"},
      // {label: "Webinar", value: "Webinar"},
      // {label: "Trade Show", value: "Trade Show"},
      // {label: "Employee Referral", value: "Employee Referral"},
      // {label: "Customer Event", value: "Customer Event"},
      // {label: "Google AdWords", value: "Google AdWords"},
      // {label: "Purchased List", value: "Purchased List"}, 
      // {label: "Consumers", value: "Consumers"},
      // {label: "Agents", value: "Agents"},
      // {label: "Events", value: "Events"},
      // {label: "ASM", value: "ASM"},
      {label: "Online", value: "Online"},
      {label: "Offline", value: "Offline"},
      {label: "Store Visits", value: "Store Visits"}
    ],
  },
  {
    label: "Sub Lead Source",
    model: ".subLeadSource",
    type: "select",
    options: (props) => 
    store.getState().rxFormReducer[props.formModel].leadSource === "Online" 
    ? [
        {label: "Facebook", value: "Facebook"},
        {label: "Google", value: "Google"},
        {label: "Whatsapp", value: "Whatsapp"},
        {label: "Mass Malling", value: "Mass malling"},
        {label: "Mass Messaging", value: "Mass messaging"},
        {label: "Instagram", value: "Instagram"},
        {label: "YouTube", value: "YouTube"},
        {label: "RTO", value: "RTO"},
        {label: "Bank", value: "Bank"},
        {label: "Patpedhi", value: "Patpedhi"},
        {label: "Showroom Tie-Ups", value: "Showroom Tie-Ups"},
      ]
    : store.getState().rxFormReducer[props.formModel].leadSource === "Offline" 
      || store.getState().rxFormReducer[props.formModel].leadSource === "Store Visits" 
      || store.getState().rxFormReducer[props.formModel].leadSource === undefined 
    ? []
    : [
        {label: "Facebook", value: "Facebook"},
        {label: "Google", value: "Google"},
        {label: "Whatsapp", value: "Whatsapp"},
        {label: "Mass Malling", value: "Mass malling"},
        {label: "Mass Messaging", value: "Mass messaging"},
        {label: "Instagram", value: "Instagram"},
        {label: "YouTube", value: "YouTube"},
        {label: "RTO", value: "RTO"},
        {label: "Bank", value: "Bank"},
        {label: "Patpedhi", value: "Patpedhi"},
        {label: "Showroom Tie-Ups", value: "Showroom Tie-Ups"},
      ]
  },
  {
    label: "Lead Status",
    model: ".leadStatus",
    type: "select",
    required: true,
    options: (props) => [
      {label: "New", value: "New"},
      {label: "Document Collection", value: "Document Collection"},
      {label: "Approved", value: "Approved"},
      // {label: "Basic Details", value: "Basic Details"},
      // {label: "Document Collection", value: "Document Collection"},
      // {label: "Negotiation", value: "Negotiation"},
      // {label: "Closed", value: "Closed"},
      // {label: "Job Card", value: "Job Card"},
      // {label: "Qualified", value: "Qualified"}
    ],
  },
  {
    label: "Rating",
    model: ".rating",
    type: "select",
    required: true,
    options: (props) => [
      {label: "Hot", value: "Hot"},
      {label: "Cold", value: "Cold"},
      {label: "Warm", value: "Warm"}
    ],
  },
];

export const leadSource = [
  {
    label: "Lead Type",
    model: ".leadType",
    type: "select",
    options: (props) => [
      {label: "B2B", value: "B2B"},
      {label: "B2C", value: "B2C"},
      {label: "B2G", value: "B2G"}
      // {label: "Customer", value: "Customer"},
      // {label: "Influencer", value: "Influencer"},
      // {label: "Fitment", value: "Fitment"},
      // {label: "Servicing", value: "Servicing"}
    ],
    required: true,
  },
  {
    label: "Sub Lead Type",
    model: ".subLeadType",
    type: "select",
    options: (props) => [
      {label: "Customer", value: "Customer"},
      {label: "Influencer", value: "Influencer"},
      {label: "Fitment", value: "Fitment"},
      {label: "Servicing", value: "Servicing"}
    ],
    required: true,
  },
  {
    label: "Lead Source",
    model: ".leadSource",
    type: "select",
    options: (props) => 
      // {label: "Partner", value: "Partner"},
      // {label: "Website", value: "Website"},
      // {label: "Advertisement", value: "Advertisement"},
      // {label: "Webinar", value: "Webinar"},
      // {label: "Trade Show", value: "Trade Show"},
      // {label: "Employee Referral", value: "Employee Referral"},
      // {label: "Customer Event", value: "Customer Event"},
      // {label: "Google AdWords", value: "Google AdWords"},
      // {label: "Purchased List", value: "Purchased List"},
      // {label: "Consumers", value: "Consumers"},
      // {label: "Agents", value: "Agents"},
      // {label: "Events", value: "Events"},
      // {label: "ASM", value: "ASM"},
    [
      {label: "Online", value: "Online"},
      {label: "Offline", value: "Offline"},
      {label: "Store Visits", value: "Store Visits"}
    ],
    required: true,
  },
  {
    label: "Sub Lead Source",
    model: ".subLeadSource",
    type: "select",
    options: (props) => 
    store.getState().rxFormReducer[props.formModel].leadSource === "Online" 
    ? [
        {label: "Facebook", value: "Facebook"},
        {label: "Google", value: "Google"},
        {label: "Whatsapp", value: "Whatsapp"},
        {label: "Mass Malling", value: "Mass malling"},
        {label: "Mass Messaging", value: "Mass messaging"},
        {label: "Instagram", value: "Instagram"},
        {label: "YouTube", value: "YouTube"},
        {label: "RTO", value: "RTO"},
        {label: "Bank", value: "Bank"},
        {label: "Patpedhi", value: "Patpedhi"},
        {label: "Showroom Tie-Ups", value: "Showroom Tie-Ups"},
      ]
      : store.getState().rxFormReducer[props.formModel].leadSource === "Offline" 
      || store.getState().rxFormReducer[props.formModel].leadSource === "Store Visits" 
      || store.getState().rxFormReducer[props.formModel].leadSource === undefined 
      ? []
      : [
          {label: "Facebook", value: "Facebook"},
          {label: "Google", value: "Google"},
          {label: "Whatsapp", value: "Whatsapp"},
          {label: "Mass Malling", value: "Mass malling"},
          {label: "Mass Messaging", value: "Mass messaging"},
          {label: "Instagram", value: "Instagram"},
          {label: "YouTube", value: "YouTube"},
          {label: "RTO", value: "RTO"},
          {label: "Bank", value: "Bank"},
          {label: "Patpedhi", value: "Patpedhi"},
          {label: "Showroom Tie-Ups", value: "Showroom Tie-Ups"},
        ]
  },
  {
    label: "Lead Status", 
    model: ".leadStatus",
    type: "select",
    options: (props) => [
      {label: "New", value: "New"},
      {label: "Basic Details", value: "Basic Details"},
      {label: "Document Collection", value: "Document Collection"},
      {label: "Negotiation", value: "Negotiation"},
      {label: "Closed", value: "Closed"},
      {label: "Job Card", value: "Job Card"},
      {label: "Qualified", value: "Qualified"}
    ],
    required: true,
  },
  {
    label: "Rating",
    model: ".rating",
    type: "select",
    options: (props) => [
      {label: "Hot", value: "Hot"},
      {label: "Cold", value: "Cold"},
      {label: "Warm", value: "Warm"}
    ],
    required: true,
  },
];

export const leadSourceForJobCard = [
  {
    label: "Lead Type",
    model: ".leadType",
    type: "select",
    options: (props) => [
      {label: "B2B", value: "B2B"},
      {label: "B2C", value: "B2C"},
      {label: "B2G", value: "B2G"}
    ],
    required: true,
  },
  {
    label: "Sub Lead Type",
    model: ".subLeadType",
    type: "select",
    options: (props) => [
      {label: "Customer", value: "Customer"},
      {label: "Influencer", value: "Influencer"},
      {label: "Fitment", value: "Fitment"},
      {label: "Servicing", value: "Servicing"}
    ],
    required: true,
  },
  {
    label: "Lead Source",
    model: ".leadSource",
    type: "select",
    options: (props) => [
      // {label: "Partner", value: "Partner"},
      // {label: "Website", value: "Website"},
      // {label: "Advertisement", value: "Advertisement"},
      // {label: "Webinar", value: "Webinar"},
      // {label: "Trade Show", value: "Trade Show"},
      // {label: "Employee Referral", value: "Employee Referral"},
      // {label: "Customer Event", value: "Customer Event"},
      // {label: "Google AdWords", value: "Google AdWords"},
      // {label: "Purchased List", value: "Purchased List"},
      // {label: "Consumers", value: "Consumers"},
      // {label: "Agents", value: "Agents"},
      // {label: "Events", value: "Events"},
      // {label: "ASM", value: "ASM"},
      {label: "Online", value: "Online"},
      {label: "Offline", value: "Offline"},
      {label: "Store Visits", value: "Store Visits"}
    ],
    required: true,
  },
  {
    label: "Sub Lead Source",
    model: ".subLeadSource",
    type: "select",
    options: (props) => 
    store.getState().rxFormReducer[props.formModel].leadSource === "Online" 
    ? [
        {label: "Facebook", value: "Facebook"},
        {label: "Google", value: "Google"},
        {label: "Whatsapp", value: "Whatsapp"},
        {label: "Mass Malling", value: "Mass malling"},
        {label: "Mass Messaging", value: "Mass messaging"},
        {label: "Instagram", value: "Instagram"},
        {label: "YouTube", value: "YouTube"},
        {label: "RTO", value: "RTO"},
        {label: "Bank", value: "Bank"},
        {label: "Patpedhi", value: "Patpedhi"},
        {label: "Showroom Tie-Ups", value: "Showroom Tie-Ups"},
      ]
      : store.getState().rxFormReducer[props.formModel].leadSource === "Offline" 
      || store.getState().rxFormReducer[props.formModel].leadSource === "Store Visits" 
      || store.getState().rxFormReducer[props.formModel].leadSource === undefined 
      ? []
      : [
          {label: "Facebook", value: "Facebook"},
          {label: "Google", value: "Google"},
          {label: "Whatsapp", value: "Whatsapp"},
          {label: "Mass Malling", value: "Mass malling"},
          {label: "Mass Messaging", value: "Mass messaging"},
          {label: "Instagram", value: "Instagram"},
          {label: "YouTube", value: "YouTube"},
          {label: "RTO", value: "RTO"},
          {label: "Bank", value: "Bank"},
          {label: "Patpedhi", value: "Patpedhi"},
          {label: "Showroom Tie-Ups", value: "Showroom Tie-Ups"},
        ]
  },
  {
    label: "Lead Status", 
    model: ".leadStatus",
    type: "text",
    defaultValue: "Closed",
    isDisable: true,
  },
  {
    label: "Rating",
    model: ".rating",
    type: "select",
    options: (props) => [
      {label: "Hot", value: "Hot"},
      {label: "Cold", value: "Cold"},
      {label: "Warm", value: "Warm"}
    ],
    required: true,
  },
];

export const addressDetails = [
  {
    label: "Billing Address",
    model: ".billingAddress",
    type: "textarea",
  },
  {
    label: "Shipping Address",
    model: ".shippingAddress",
    type: "textarea",
  },
];

export const gstDetails = [
  // {
  //   label: "Jobcard Type",
  //   model: ".jobcardtype",
  //   type: "select",
  //   options: [
  //     {label: "Fitment", value: "Fitment"},
  //     {label: "Servicing", value: "Servicing"}
  //   ]
  // },
  {
    label: "GST Number",
    model: ".gstNumber",
    type: "number",
    // required: true,
  },
  // {
  //   label: "Company Name",
  //   model: ".NameCompany",
  //   type: "text",
  //   required: true,
  // },
];

export const rtoDocs = [
  {
    model : ".Original_RC_Book__c", 
    label : "Original R.C. Book",
    type: "image",
  },
  {
    model : ".Bank_NOC__c", 
    label : "Bank NOC In case of Hypothecation",
    type: "image",
  },
  {
    model : ".Insurance_Photocopy__c", 
    label : "Valid Insurance Photocopy",
    type: "image",
  },
  {
    model : ".Permit_URL__c", 
    label : "Permit",
    type: "image",
  },
  {
    model : ".Tax_url__c", 
    label : "Tax",
    type: "image",
  },
  {
    model : ".Passing_url__c", 
    label : "Passing",
    type: "image",
  }
]

export const kycDocs = [
  {
    model : ".Aadhaar__c", 
    label : "Aadhar Card",
    type: "image",
  },
  {
    model : ".PAN__c", 
    label : "PAN Card",
    type: "image",
  }
]

export const distCust = [
  {
    label: "First Name",
    model: ".firstName",
    type: "text",
  },
  {
    label: "Middle Name",
    model: ".middleName",
    type: "text",
  },
  {
    label: "Last Name",
    model: ".lastName",
    type: "text",
  },
  {
    label: "City",
    model: ".city",
    type: "text",
  },
  {
    label: "Vehicle No.",
    model: ".vehicleNumber",
    type: "text",
  },
  {
    label: "Vehicle Type",
    model: ".vehicleType",
    type: "text",
  },
  {
    label: "Kit Installed",
    model: ".kitIns",
    type: "text",
  },
  {
    label: "Assigned Dealer",
    model: ".assignedDealers",
    type: "text",
  },
  {
    label: "Dealer Rating",
    model: ".dealerRating",
    type: "text",
  },
];
