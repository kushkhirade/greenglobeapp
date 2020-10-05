import { leadForm } from "src/reducers/CombinedReducers";
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
    label: "3 or 4 Wheeler",
    model: ".wheeles",
    type: "select",
    options: (props) => [
      {label: "3 Wheeler", value: "3 Wheeler"},
      {label: "4 Wheeler", value: "4 Wheeler"},
    ],
  },
  {
    label: "Kit Enquired",
    model: ".kitEnquired",
    required: true,
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
  // {
  //   label: "Select Product",
  //   model: ".products",
  //   type: "select",
  //   options: (props) => 
  //   store.getState().rxFormReducer[props.formModel].wheeles === "3 Wheeler" 
  //   ? [
  //       {label: "3 Wheeler Ace", value: "3 Wheeler Ace"},
  //       {label: "3 Wheeler Pro", value: "3 Wheeler Pro"},
  //     ]
  //   : store.getState().rxFormReducer[props.formModel].wheeles === "4 Wheeler" 
  //   ? [
  //       {label: "4 Wheeler Ace", value: "4 Wheeler Ace"},
  //       {label: "4 Wheeler Pro", value: "4 Wheeler Pro"},
  //     ]
  //   : store.getState().rxFormReducer[props.formModel].wheeles === undefined
  //   ? []
  //   : [
  //       {label: "3 Wheeler Ace", value: "3 Wheeler Ace"},
  //       {label: "3 Wheeler Pro", value: "3 Wheeler Pro"},
  //       {label: "4 Wheeler Ace", value: "4 Wheeler Ace"},
  //       {label: "4 Wheeler Pro", value: "4 Wheeler Pro"},
  //     ]
  // },
  {
    label: "Vehicle Make",
    model: ".vehicleMek",
    type: "select",
    options: (props) => 
    store.getState().rxFormReducer[props.formModel].wheeles === "4 Wheeler" 
    ? [ 
        {label: "Honda", value: "Honda"},
        {label: "Hyundai", value: "Hyundai"},
        {label: "Maruti Suzuki", value: "Maruti Suzuki"},
        {label: "Tata", value: "Tata"},
        {label: "Toyota", value: "Toyota"},
        {label: "Volkswagen", value: "Volkswagen"},
        {label: "Chevrolet", value: "Chevrolet"},
        {label: "Ford", value: "Ford"},
        {label: "Flat", value: "Flat"},
        {label: "Nissan", value: "Nissan"},
        {label: "Skoda", value: "Skoda"},
        {label: "Renault", value: "Renault"},
        {label: "Audi", value: "Audi"},
        {label: "Mercedes Benz ", value: "Mercedes Benz "},
        {label: "Hindustan", value: "Hindustan"},
        {label: "Opel", value: "Opel"},
        {label: "Mitsubishi", value: "Mitsubishi"},
        {label: "Mahindra", value: "Mahindra"},
      ]
    : store.getState().rxFormReducer[props.formModel].wheeles === "3 Wheeler" 
    ? [ 
        {label: "Bajaj Auto Limited", value: "Bajaj Auto Limited"},
        {label: "Mahindra & Mahindra Ltd.", value: "Mahindra & Mahindra Ltd."},
      ]
    : store.getState().rxFormReducer[props.formModel].wheeles === undefined
    ? []
    : [
        {label: "Honda", value: "Honda"},
        {label: "Hyundai", value: "Hyundai"},
        {label: "Maruti Suzuki", value: "Maruti Suzuki"},
        {label: "Tata", value: "Tata"},
        {label: "Toyota", value: "Toyota"},
        {label: "Volkswagen", value: "Volkswagen"},
        {label: "Chevrolet", value: "Chevrolet"},
        {label: "Ford", value: "Ford"},
        {label: "Flat", value: "Flat"},
        {label: "Nissan", value: "Nissan"},
        {label: "Skoda", value: "Skoda"},
        {label: "Renault", value: "Renault"},
        {label: "Audi", value: "Audi"},
        {label: "Mercedes Benz ", value: "Mercedes Benz "},
        {label: "Hindustan", value: "Hindustan"},
        {label: "Opel", value: "Opel"},
        {label: "Mitsubishi", value: "Mitsubishi"},
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
      store.getState().rxFormReducer[props.formModel].vehicleMek === undefined
      || store.getState().rxFormReducer[props.formModel].wheeles === "3 Wheeler" 
    ? []
    :  store.getState().rxFormReducer[props.formModel].vehicleMek === "Honda" 
    ? [
        {label: "JAZZ ", value: "JAZZ "},
        {label: "AMAZE", value: "AMAZE"},
        {label: "H BRV", value: "H BRV"},
        {label: "BRIO", value: "BRIO"},
        {label: "CITY ", value: "CITY "},
        {label: "CIVIC", value: "CIVIC"},
        {label: "BRV", value: "BRV"},
        {label: "MOBILIO", value: "MOBILIO"},
        {label: "City Gienia", value: "City Gienia"},
        {label: "City Grace", value: "City Grace"},
        {label: "City Greiz", value: "City Greiz"},
      ]
    : store.getState().rxFormReducer[props.formModel].vehicleMek === "Hyundai" 
    ? [
        {label: "SANTRI XING ", value: "SANTRI XING "},
        {label: "I 10", value: "I 10"},
        {label: "GRAND I 10", value: "GRAND I 10"},
        {label: "I 20", value: "I 20"},
        {label: "XCENT", value: "XCENT"},
        {label: "EON", value: "EON"},
        {label: "VERNA (1.4/1.6)", value: "VERNA (1.4/1.6)"},
        {label: "ACCENT", value: "ACCENT"},
        {label: "GETZ 1.4/1.5", value: "GETZ 1.4/1.5"},
      ]
    : store.getState().rxFormReducer[props.formModel].vehicleMek === "Maruti Suzuki" 
    ? [
        {label: "A STAR", value: "A STAR"},
        {label: "OMNI CARGO", value: "OMNI CARGO"},
        {label: "ALTO", value: "ALTO"},
        {label: "ALTO K 10", value: "ALTO K 10"},
        {label: "ALTO 800", value: "ALTO 800"},
        {label: "CELERIO", value: "CELERIO"},
        {label: "ZEN ESTILO", value: "ZEN ESTILO"},
        {label: "RITZ", value: "RITZ"},
        {label: "SWIFT", value: "SWIFT"},
        {label: "SWIFT DZIRE", value: "SWIFT DZIRE"},
        {label: "STRINGRAY", value: "STRINGRAY"},
        {label: "EECO 5 SEAT ", value: "EECO 5 SEAT "},
        {label: "WAGONR", value: "WAGONR"},
        {label: "NEXA IGNIS", value: "NEXA IGNIS"},
        {label: "EECO 7 SEAT", value: "EECO 7 SEAT"},
        {label: "EECO AMBULANCE", value: "EECO AMBULANCE"},
        {label: "EECO CARGO", value: "EECO CARGO"},
        {label: "OMNI 5 SEAT", value: "OMNI 5 SEAT"},
        {label: "OMNI 7 SEAT", value: "OMNI 7 SEAT"},
        {label: "ERTIGA", value: "ERTIGA"},
        {label: "BALENO", value: "BALENO"},
        {label: "IGNIS", value: "IGNIS"},
        {label: "CIAZ", value: "CIAZ"},
        {label: "SX 4", value: "SX 4"},
        {label: "GYPSY", value: "GYPSY"},
        {label: "VERSA {5/8 SEATER}", value: "VERSA {5/8 SEATER}"},
      ]
    : store.getState().rxFormReducer[props.formModel].vehicleMek === "Mahindra" 
    ? [ 
        {label: "VERTIO (1.4 / 1.6)", value: "VERTIO (1.4 / 1.6)"},
        {label: "LINEA", value: "LINEA"},
      ]
    // : store.getState().rxFormReducer[props.formModel].vehicleMek === "Bajaj Auto Limited" 
    // ? [
    //     {label: "Bajaj RE Auto Rickshaw Compact 4S", value: "Bajaj RE Auto Rickshaw Compact 4S"},
    //     {label: "Bajaj RE Compact Diesel Auto Rickshaw", value: "Bajaj RE Compact Diesel Auto Rickshaw"},
    //     {label: "Bajaj RE Compact LPG Auto Rickshaw", value: "Bajaj RE Compact LPG Auto Rickshaw"},
    //   ]
    : store.getState().rxFormReducer[props.formModel].vehicleMek === "Tata" 
    ? [
        {label: "INDICA VISTA", value: "INDICA VISTA"},
        {label: "INDICA EV2", value: "INDICA EV2"},
        {label: "INDICA e CS", value: "INDICA e CS"},
        {label: "BOLD", value: "BOLD"},
        {label: "INDIGO MANZA", value: "INDIGO MANZA"},
        {label: "ZEST", value: "ZEST"},
        {label: "INDICA XETA", value: "BR-V"},
        {label: "INDIGO CS", value: "INDIGO CS"},
        {label: "INDIGO e CS", value: "INDIGO e CS"},
      ] 
    : store.getState().rxFormReducer[props.formModel].vehicleMek === "Toyota" 
    ? [
        {label: "COROLLA ALTIS", value: "COROLLA ALTIS"},
        {label: "ETIOS LIVA", value: "ETIOS LIVA"},
        {label: "ETIOS", value: "ETIOS"},
      ] 
    : store.getState().rxFormReducer[props.formModel].vehicleMek === "Volkswagen" 
    ? [
        {label: "POLO", value: "POLO"},
        {label: "VENTO", value: "VENTO"},
        {label: "JEETA ", value: "JEETA "},
      ] 
    : store.getState().rxFormReducer[props.formModel].vehicleMek === "Chevrolet" 
    ? [
        {label: "BEAT", value: "BEAT"},
        {label: "SPARK", value: "SPARK"},
        {label: "AVEO UVA", value: "AVEO UVA"},
        {label: "SAIL UVA", value: "SAIL UVA"},
        {label: "SAIL", value: "SAIL"},
        {label: "OPTRA 1.6/1.8", value: "OPTRA 1.6/1.8"}
      ] 
    : store.getState().rxFormReducer[props.formModel].vehicleMek === "Ford" 
    ? [
        {label: "ECO SPORT 1.5", value: "ECO SPORT 1.5"},
        {label: "ECO SPORT 1.0", value: "ECO SPORT 1.0"},
        {label: "FIESTA", value: "FIESTA"},
        {label: "FIGO", value: "FIGO"},
        {label: "I KON 1.3/1.6", value: "Ballade"},
        {label: "FUSION", value: "FUSION"},
      ] 
    : store.getState().rxFormReducer[props.formModel].vehicleMek === "Flat" 
    ? [
        {label: "LINEA", value: "LINEA"},
        {label: "GRAND PUNTO", value: "GRAND PUNTO"},
        {label: "PALIO", value: "PALIO"},
      ] 
    : store.getState().rxFormReducer[props.formModel].vehicleMek === "Nissan" 
    ? [
        {label: "SUNNY", value: "SUNNY"},
        {label: "MICRA", value: "MICRA"},
      ] 
    : store.getState().rxFormReducer[props.formModel].vehicleMek === "Skoda" 
    ? [
        {label: "FABIA", value: "FABIA"},
        {label: "LAURA", value: "LAURA"},
        {label: "RAPID", value: "RAPID"},
        {label: "SUPERB (1390/1798)", value: "SUPERB (1390/1798)"},
      ] 
    : store.getState().rxFormReducer[props.formModel].vehicleMek === "Renault" 
    ? [
        {label: "DUSTER", value: "DUSTER"},
      ] 
    : store.getState().rxFormReducer[props.formModel].vehicleMek === "Audi" 
    ? [
        {label: "Audi-A4", value: "Audi-A4"},
      ] 
    : store.getState().rxFormReducer[props.formModel].vehicleMek === "Mercedes Benz " 
    ? [
        {label: "Mercedes Benz -C200 CGI", value: "Mercedes Benz -C200 CGI"},
        {label: "Mercedes Benz -E200 CGI", value: "Mercedes Benz -E200 CGI"},
      ] 
    : store.getState().rxFormReducer[props.formModel].vehicleMek === "Hindustan" 
    ? [
        {label: "HM AMBASSDOR", value: "HM AMBASSDOR"},
      ] 
    : store.getState().rxFormReducer[props.formModel].vehicleMek === "Mitsubishi" 
    ? [
        {label: "LANCER 1.4/1.8", value: "LANCER 1.4/1.8"},
      ] 
    : store.getState().rxFormReducer[props.formModel].vehicleMek === "Opel" 
    ? [
        {label: "Opel CORSA", value: "Opel CORSA"},
      ] 
    : [
      {label: "JAZZ ", value: "JAZZ "},
      {label: "AMAZE", value: "AMAZE"},
      {label: "H BRV", value: "H BRV"},
      {label: "BRIO", value: "BRIO"},
      {label: "CITY ", value: "CITY "},
      {label: "CIVIC", value: "CIVIC"},
      {label: "BRV", value: "BRV"},
      {label: "MOBILIO", value: "MOBILIO"},
      {label: "City Gienia", value: "City Gienia"},
      {label: "City Grace", value: "City Grace"},
      {label: "City Greiz", value: "City Greiz"},
      {label: "SANTRI XING ", value: "SANTRI XING "},
      {label: "I 10", value: "I 10"},
      {label: "GRAND I 10", value: "GRAND I 10"},
      {label: "I 20", value: "I 20"},
      {label: "XCENT", value: "XCENT"},
      {label: "EON", value: "EON"},
      {label: "VERNA (1.4/1.6)", value: "VERNA (1.4/1.6)"},
      {label: "ACCENT", value: "ACCENT"},
      {label: "GETZ 1.4/1.5", value: "GETZ 1.4/1.5"},
      {label: "A STAR", value: "A STAR"},
      {label: "OMNI CARGO", value: "OMNI CARGO"},
      {label: "ALTO", value: "ALTO"},
      {label: "ALTO K 10", value: "ALTO K 10"},
      {label: "ALTO 800", value: "ALTO 800"},
      {label: "CELERIO", value: "CELERIO"},
      {label: "ZEN ESTILO", value: "ZEN ESTILO"},
      {label: "RITZ", value: "RITZ"},
      {label: "SWIFT", value: "SWIFT"},
      {label: "SWIFT DZIRE", value: "SWIFT DZIRE"},
      {label: "STRINGRAY", value: "STRINGRAY"},
      {label: "EECO 5 SEAT ", value: "EECO 5 SEAT "},
      {label: "WAGONR", value: "WAGONR"},
      {label: "NEXA IGNIS", value: "NEXA IGNIS"},
      {label: "EECO 7 SEAT", value: "EECO 7 SEAT"},
      {label: "EECO AMBULANCE", value: "EECO AMBULANCE"},
      {label: "EECO CARGO", value: "EECO CARGO"},
      {label: "OMNI 5 SEAT", value: "OMNI 5 SEAT"},
      {label: "OMNI 7 SEAT", value: "OMNI 7 SEAT"},
      {label: "ERTIGA", value: "ERTIGA"},
      {label: "BALENO", value: "BALENO"},
      {label: "IGNIS", value: "IGNIS"},
      {label: "CIAZ", value: "CIAZ"},
      {label: "SX 4", value: "SX 4"},
      {label: "GYPSY", value: "GYPSY"},
      {label: "VERSA {5/8 SEATER}", value: "VERSA {5/8 SEATER}"},
      {label: "VERTIO (1.4 / 1.6)", value: "VERTIO (1.4 / 1.6)"},
      {label: "LINEA", value: "LINEA"},
      {label: "Bajaj RE Auto Rickshaw Compact 4S", value: "Bajaj RE Auto Rickshaw Compact 4S"},
      {label: "Bajaj RE Compact Diesel Auto Rickshaw", value: "Bajaj RE Compact Diesel Auto Rickshaw"},
      {label: "Bajaj RE Compact LPG Auto Rickshaw", value: "Bajaj RE Compact LPG Auto Rickshaw"},
      {label: "INDICA VISTA", value: "INDICA VISTA"},
      {label: "INDICA EV2", value: "INDICA EV2"},
      {label: "INDICA e CS", value: "INDICA e CS"},
      {label: "BOLD", value: "BOLD"},
      {label: "INDIGO MANZA", value: "INDIGO MANZA"},
      {label: "ZEST", value: "ZEST"},
      {label: "INDICA XETA", value: "BR-V"},
      {label: "INDIGO CS", value: "INDIGO CS"},
      {label: "INDIGO e CS", value: "INDIGO e CS"},
      {label: "COROLLA ALTIS", value: "COROLLA ALTIS"},
      {label: "ETIOS LIVA", value: "ETIOS LIVA"},
      {label: "ETIOS", value: "ETIOS"},
      {label: "POLO", value: "POLO"},
      {label: "VENTO", value: "VENTO"},
      {label: "JEETA ", value: "JEETA "},
      {label: "BEAT", value: "BEAT"},
      {label: "SPARK", value: "SPARK"},
      {label: "AVEO UVA", value: "AVEO UVA"},
      {label: "SAIL UVA", value: "SAIL UVA"},
      {label: "SAIL", value: "SAIL"},
      {label: "OPTRA 1.6/1.8", value: "OPTRA 1.6/1.8"},
      {label: "ECO SPORT 1.5", value: "ECO SPORT 1.5"},
      {label: "ECO SPORT 1.0", value: "ECO SPORT 1.0"},
      {label: "FIESTA", value: "FIESTA"},
      {label: "FIGO", value: "FIGO"},
      {label: "I KON 1.3/1.6", value: "Ballade"},
      {label: "FUSION", value: "FUSION"},
      {label: "LINEA", value: "LINEA"},
      {label: "GRAND PUNTO", value: "GRAND PUNTO"},
      {label: "PALIO", value: "PALIO"},
      {label: "SUNNY", value: "SUNNY"},
      {label: "MICRA", value: "MICRA"},
      {label: "FABIA", value: "FABIA"},
      {label: "LAURA", value: "LAURA"},
      {label: "RAPID", value: "RAPID"},
      {label: "SUPERB (1390/1798)", value: "SUPERB (1390/1798)"},
      {label: "DUSTER", value: "DUSTER"},
      {label: "Audi-A4", value: "Audi-A4"},
      {label: "Mercedes Benz -C200 CGI", value: "Mercedes Benz -C200 CGI"},
      {label: "Mercedes Benz -E200 CGI", value: "Mercedes Benz -E200 CGI"},
      {label: "Opel CORSA", value: "Opel CORSA"},
      {label: "LANCER 1.4/1.8", value: "LANCER 1.4/1.8"},
      {label: "HM AMBASSDOR", value: "HM AMBASSDOR"},
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
    // required: true,
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
    // required: true,
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
    // required: true,
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
