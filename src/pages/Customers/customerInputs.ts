import { store } from "../../store/Store";
import { getToken } from "src/state/Utility";
import getData from "src/utils/getData";

var data = null;
const getAllCustomersAssignedToDelaer = async () => {
  console.log("token: ");
  console.log("sfid: ");
  try {
    const customerData = await getData({
      query: `SELECT id, name, recordtypeid, createddate, assigned_dealer__c, email, firstname, lastname, whatsapp_number__c, kit_enquiry__c, x3_or_4_wheeler__c, dealer_generated__c, Company, rating, city, postalcode, sfid, Status 
      FROM salesforce.Lead 
      WHERE sfid is not null AND Status != 'Closed'`,
      token: "sd"
    });

    console.log("customerData =>", data);
    return customerData.result;

  } catch (e) {
    console.log('fetch Inventory Error', e)
  }
}

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
    options: (props, state) => [
      {label: "Petrol", value: "Petrol"},
      {label: "Diesel", value: "Diesel"},
    ]
  },
  {
    label: "3 or 4 Wheeler",
    model: ".wheeles",
    type: "select",
    options: (props, state) => {
      const token = getToken().data.sfid;
      console.log("3 OR 4 WHEELER DATA FETCH", token);
      return [
      {label: "3 Wheeler", value: "3 Wheeler"},
      {label: "4 Wheeler", value: "4 Wheeler"},
    ]},
  },
  {
    label: "Kit Enquired",
    model: ".kitEnquired",
    required: true,
    type: "select",
    options: (props, state) => 
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
  //   options: (props, state) => 
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
    options: (props, state) => 
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
        {label: "Pajio", value: "Pajio"},
        {label: "TVS", value: "TVS"},
        {label: "Atul", value: "Atul"},
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
        {label: "Pajio", value: "Pajio"},
        {label: "TVS", value: "TVS"},
        {label: "Atul", value: "Atul"},
        {label: "Mahindra & Mahindra Ltd.", value: "Mahindra & Mahindra Ltd."},
    ],
    // required: true,
  },
  {
    label: "Vehicle Model",
    model: ".vehicleModel",
    type: "select",
    options: (props, state) => 
    store.getState().rxFormReducer[props.formModel].vehicleMek === undefined
    ? []
    : store.getState().rxFormReducer[props.formModel].wheeles === "3 Wheeler" 
      ? [
          {label: "BSIII 2Stoke ", value: "BSIII 2Stoke "},
          {label: "BSIII 4Stroke", value: "BSIII 4Stroke"},
          {label: "BS IV 2Stoke", value: "BS IV 2Stoke"},
          {label: "BS IV 4Stoke", value: "BS IV 4Stoke"}
        ]
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
        {label: "BSIII 2Stoke ", value: "BSIII 2Stoke "},
        {label: "BSIII 4Stroke", value: "BSIII 4Stroke"},
        {label: "BS IV 2Stoke", value: "BS IV 2Stoke"},
        {label: "BS IV 4Stoke", value: "BS IV 4Stoke"},
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
    options: (props, state) => [
      {label: "Commercial", value: "Commercial"},
      {label: "Private", value: "Private"},
    ],
  },
  // {
  //   label: "Engine Type",
  //   model: ".vehicleType",
  //   type: "select",
  //   options: (props, state) => [
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
    options: (props, state) => [
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
  // {
  //   label: "Company",
  //   model: ".company",
  //   type: "text",
  
  // },
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
  // {
  //   label: "RTO Code",
  //   model: ".rtoCode",
  //   type: "select",
  //   options: (props, state) => [
  //     {label: "Andhra Pradesh || AP", value: "AP"},
  //     {label: "Arunachal Pradesh || AR", value: "AR"},
  //     {label: "Assam || AS", value: "AS"},
  //     {label: "Bihar || BR", value: "BR"},
  //     {label: "Chhattisgarh || CG", value: "CG"},
  //     {label: "Goa || GA", value: "GA"},
  //     {label: "Gujarat || GJ", value: "GJ"},
  //     {label: "Haryana || HR", value: "HR"},
  //     {label: "Himachal Pradesh || HP", value: "HP"},
  //     {label: "Jharkhand || JH", value: "JH"},
  //     {label: "Karnataka || KA", value: "KA"},
  //     {label: "Kerala || KL", value: "KL"},
  //     {label: "Madhya Pradesh || MP", value: "MP"},
  //     {label: "Maharashtra || MH", value: "MH"},
  //     {label: "Manipur || MN", value: "MN"},
  //     {label: "Meghalaya || ML", value: "ML"},
  //     {label: "Mizoram || MZ", value: "MZ"},
  //     {label: "Nagaland || NL", value: "NL"},
  //     {label: "Odisha || OD", value: "OD"},
  //     {label: "Punjab || PB", value: "PB"},
  //     {label: "Rajasthan || RJ", value: "RJ"},
  //     {label: "Sikkim || SK", value: "SK"},
  //     {label: "Tamil Nadu || TN", value: "TN"},
  //     {label: "Tripura || TR", value: "TR"},
  //     {label: "Uttar Pradesh || UP", value: "UP"},
  //     {label: "Uttarakhanad || UK", value: "UK"},
  //     {label: "Uttarakhanad || UA", value: "UA"},
  //     {label: "West Bengal || WB", value: "WB"},
  //     {label: "Telangana || TS", value: "TS"},
  //   ]
  // },
];

export const streetInputs = [
  {
    label: "Street",
    model: ".street",
    type: "text",
  },
  {
    label: "Zip/Postal Code",
    model: ".zip",
    type: "text",
    required: true,
  },
  {
    label: "City",
    model: ".city",
    type: "select",
    required: true,
    options: (props, state) => state.cities,
  },
  {
    label: "Taluka",
    model: ".taluka",
    type: "text",
  },
  {
    label: "District",
    model: ".district",
    type: "text",
  },
  {
    label: "State",
    model: ".state",
    type: "text",
  },
  {
    label: "RTO Code",
    model: ".rtoCode",
    type: "multiselect",
    options: (props, state) => 
    store.getState().rxFormReducer[props.formModel].state === "Andhra Pradesh" 
    ? [
      {label: "AP-01", value: "AP-01"},
      {label: "AP-02", value: "AP-02"},
      {label: "AP-03", value: "AP-03"},
      {label: "AP-04", value: "AP-04"},
      {label: "AP-05", value: "AP-05"},
      {label: "AP-07", value: "AP-07"},
      {label: "AP-09", value: "AP-09"},
      {label: "AP-10", value: "AP-10"},
      {label: "AP-11", value: "AP-11"},
      {label: "AP-12", value: "AP-12"},
      {label: "AP-13", value: "AP-13"},
      {label: "AP-15", value: "AP-15"},
      {label: "AP-16", value: "AP-16"},
      {label: "AP-20", value: "AP-20"},
      {label: "AP-21", value: "AP-21"},
      {label: "AP-22", value: "AP-22"},
      {label: "AP-23", value: "AP-23"},
      {label: "AP-24", value: "AP-24"},
      {label: "AP-25", value: "AP-25"},
      {label: "AP-26", value: "AP-26"},
      {label: "AP-27", value: "AP-27"},
      {label: "AP-28", value: "AP-28"},
      {label: "AP-29", value: "AP-29"},
      {label: "AP-30", value: "AP-30"},
      {label: "AP-31", value: "AP-31"},
      {label: "AP-35", value: "AP-35"},
      {label: "AP-36", value: "AP-36"},
      {label: "AP-37", value: "AP-37"},
    ]
    : store.getState().rxFormReducer[props.formModel].state === "Maharashtra" 
      ? [
        {label: "MH-01", value: "MH-01"},
        {label: "MH-02", value: "MH-02"},
        {label: "MH-03", value: "MH-03"},
        {label: "MH-04", value: "MH-04"},
        {label: "MH-05", value: "MH-05"},
        {label: "MH-07", value: "MH-07"},
        {label: "MH-09", value: "MH-09"},
        {label: "MH-10", value: "MH-10"},
        {label: "MH-11", value: "MH-11"},
        {label: "MH-12", value: "MH-12"},
        {label: "MH-13", value: "MH-13"},
        {label: "MH-15", value: "MH-15"},
        {label: "MH-16", value: "MH-16"},
        {label: "MH-20", value: "MH-20"},
        {label: "MH-21", value: "MH-21"},
        {label: "MH-22", value: "MH-22"},
        {label: "MH-23", value: "MH-23"},
        {label: "MH-24", value: "MH-24"},
        {label: "MH-25", value: "MH-25"},
        {label: "MH-26", value: "MH-26"},
        {label: "MH-27", value: "MH-27"},
        {label: "MH-28", value: "MH-28"},
        {label: "MH-29", value: "MH-29"},
        {label: "MH-30", value: "MH-30"},
        {label: "MH-31", value: "MH-31"},
        {label: "MH-35", value: "MH-35"},
        {label: "MH-36", value: "MH-36"},
        {label: "MH-37", value: "MH-37"},
        {label: "MH-38", value: "MH-38"},
        {label: "MH-39", value: "MH-39"},
        {label: "MH-40", value: "MH-40"},
        {label: "MH-41", value: "MH-41"},
        {label: "MH-42", value: "MH-42"},
        {label: "MH-43", value: "MH-43"},
        {label: "MH-44", value: "MH-44"},
        {label: "MH-45", value: "MH-45"},
        {label: "MH-46", value: "MH-46"},
        {label: "MH-47", value: "MH-47"},
        {label: "MH-48", value: "MH-48"},
        {label: "MH-49", value: "MH-49"},
        {label: "MH-50", value: "MH-50"},
        {label: "MH-51", value: "MH-51"},
        {label: "MH-52", value: "MH-52"},
        {label: "MH-53", value: "MH-53"},
        {label: "MH-54", value: "MH-54"},
        {label: "MH-55", value: "MH-55"},
        {label: "MH-56", value: "MH-56"},
      ]
      : store.getState().rxFormReducer[props.formModel].state === undefined
        ? []
        : [
          {label: "MH-01", value: "MH-01"},
          {label: "MH-02", value: "MH-02"},
          {label: "MH-03", value: "MH-03"},
          {label: "MH-04", value: "MH-04"},
          {label: "MH-05", value: "MH-05"},
          {label: "MH-07", value: "MH-07"},
          {label: "MH-09", value: "MH-09"},
          {label: "MH-10", value: "MH-10"},
          {label: "MH-11", value: "MH-11"},
          {label: "MH-12", value: "MH-12"},
          {label: "MH-13", value: "MH-13"},
          {label: "MH-15", value: "MH-15"},
          {label: "MH-16", value: "MH-16"},
          {label: "MH-20", value: "MH-20"},
          {label: "MH-21", value: "MH-21"},
          {label: "MH-22", value: "MH-22"},
          {label: "MH-23", value: "MH-23"},
          {label: "MH-24", value: "MH-24"},
          {label: "MH-25", value: "MH-25"},
          {label: "MH-26", value: "MH-26"},
          {label: "MH-27", value: "MH-27"},
          {label: "MH-28", value: "MH-28"},
          {label: "MH-29", value: "MH-29"},
          {label: "MH-30", value: "MH-30"},
          {label: "MH-31", value: "MH-31"},
          {label: "MH-35", value: "MH-35"},
          {label: "MH-36", value: "MH-36"},
          {label: "MH-37", value: "MH-37"},
          {label: "MH-38", value: "MH-38"},
          {label: "MH-39", value: "MH-39"},
          {label: "MH-40", value: "MH-40"},
          {label: "MH-41", value: "MH-41"},
          {label: "MH-42", value: "MH-42"},
          {label: "MH-43", value: "MH-43"},
          {label: "MH-44", value: "MH-44"},
          {label: "MH-45", value: "MH-45"},
          {label: "MH-46", value: "MH-46"},
          {label: "MH-47", value: "MH-47"},
          {label: "MH-48", value: "MH-48"},
          {label: "MH-49", value: "MH-49"},
          {label: "MH-50", value: "MH-50"},
          {label: "MH-51", value: "MH-51"},
          {label: "MH-52", value: "MH-52"},
          {label: "MH-53", value: "MH-53"},
          {label: "MH-54", value: "MH-54"},
          {label: "MH-55", value: "MH-55"},
          {label: "MH-56", value: "MH-56"},
        ]
  },
  {
    label: "CGD Company",
    model: ".cgdCompany",
    type: "select",
    options: (props, state) => [
      {label: "IRM Energy Private Limited", value: "IRM Energy Private Limited"},
      {label: "Unison Enviro Private Limited", value: "Unison Enviro Private Limited"},
      {label: "Naveriya Gas Private Limited", value: "Naveriya Gas Private Limited"},
      {label: "Bharat Gas Resources Limited", value: "Bharat Gas Resources Limited"},
      {label: "Sholagasco Private Limited", value: "Sholagasco Private Limited"},
      {label: "HPOIL Gas Private Limited", value: "HPOIL Gas Private Limited"},
      {label: "Indian Oil-Adani Gas Private Limited", value: "Indian Oil-Adani Gas Private Limited"},
      {label: "Baghpat Green Energy Private Limited", value: "Baghpat Green Energy Private Limited"},
      {label: "Indraprastha Gas Limited", value: "Indraprastha Gas Limited"},
      {label: "Central UP Gas Limited", value: "Central UP Gas Limited"},
      {label: "Maharashtra Natural Gas Limited", value: "Maharashtra Natural Gas Limited"},
      {label: "Mahanagar Gas Limited", value: "Mahanagar Gas Limited"},
      {label: "Bhagyanagar Gas Limited", value: "Bhagyanagar Gas Limited"},
      {label: "Sabarmati Gas Limited", value: "Sabarmati Gas Limited"},
      {label: "Aavantika Gas Limited", value: "Aavantika Gas Limited"},
      {label: "GAIL Gas Limited", value: "GAIL Gas Limited"},
      {label: "Bengal Gas Company Limited", value: "Bengal Gas Company Limited"},
      {label: "Assam Gas Company Limited", value: "Assam Gas Company Limited"},
      {label: "Tripura Natural Gas Company Limited", value: "Tripura Natural Gas Company Limited"},
      {label: "Green Gas Limited", value: "Green Gas Limited"},
      {label: "Vadodara Gas Limited", value: "Vadodara Gas Limited"},
      {label: "Torrent Gas Private Limited", value: "Torrent Gas Private Limited"},
      {label: "Gujarat Gas Limited", value: "Gujarat Gas Limited"},
      {label: "Adani Gas Limited", value: "Adani Gas Limited"},
    ],
  }
  // {
  //   label: "Country",
  //   model: ".country",
  //   type: "text",
  
  // },
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
    label: "Lead Background",
    model: ".leadBackground",
    type: "select",
    // required: true,
    options: (props, state) => [
      {label: "Showroom Owner", value: "Showroom Owner"},
      {label: "Garage/Workshop Owner", value: "Garage/Workshop Owner"},
      {label: "Ancillary Vendor", value: "Ancillary Vendor"},
      {label: "New To the business", value: "New To the business"},
    ],
  },
  {
    label: "Interest In",
    model: ".interestIn",
    type: "select",
    // required: true,
    options: (props, state) => [
      {label: "3w Dealership", value: "3w Dealership"},
      {label: "4w Dealership", value: "4w Dealership"},
      {label: "Both", value: "Both"}
    ],
  },
  // {
  //   label: "Lead Type",
  //   model: ".leadType",
  //   type: "select",
  //   // required: true,
  //   options: (props, state) => [
  //     {label: "B2B", value: "B2B"},
  //     {label: "B2C", value: "B2C"},
  //     {label: "B2G", value: "B2G"}
  //   ],
  // },
  // {
  //   label: "Sub Lead Type",
  //   model: ".subLeadType",
  //   type: "select",
  //   required: true,
  //   options: (props, state) => [
  //     {label: "Customer", value: "Customer"},
  //     {label: "Influencer", value: "Influencer"},
  //     {label: "Fitment", value: "Fitment"},
  //     {label: "Servicing", value: "Servicing"}
  //   ],
  // },
  {
    label: "Lead Source",
    model: ".leadSource",
    type: "select",
    required: true,
    options: (props, state) => [
      {label: "Field Visit", value: "Field Visit"},
      {label: "Given by CGD", value: "Given by CGD"},
      {label: "Online", value: "Online"},
      {label: "Other Reference", values: "Other Reference"}
    ],
  },
  // {
  //   label: "Sub Lead Source",
  //   model: ".subLeadSource",
  //   type: "select",
  //   options: (props, state) => 
  //   store.getState().rxFormReducer[props.formModel].leadSource === "Online" 
  //   ? [
  //       {label: "Facebook", value: "Facebook"},
  //       {label: "Google", value: "Google"},
  //       {label: "Whatsapp", value: "Whatsapp"},
  //       {label: "Mass Malling", value: "Mass malling"},
  //       {label: "Mass Messaging", value: "Mass messaging"},
  //       {label: "Instagram", value: "Instagram"},
  //       {label: "YouTube", value: "YouTube"},
  //       {label: "RTO", value: "RTO"},
  //       {label: "Bank", value: "Bank"},
  //       {label: "Patpedhi", value: "Patpedhi"},
  //       {label: "Showroom Tie-Ups", value: "Showroom Tie-Ups"},
  //     ]
  //   : store.getState().rxFormReducer[props.formModel].leadSource === "Offline" 
  //     || store.getState().rxFormReducer[props.formModel].leadSource === "Store Visits" 
  //     || store.getState().rxFormReducer[props.formModel].leadSource === undefined 
  //   ? []
  //   : [
  //       {label: "Facebook", value: "Facebook"},
  //       {label: "Google", value: "Google"},
  //       {label: "Whatsapp", value: "Whatsapp"},
  //       {label: "Mass Malling", value: "Mass malling"},
  //       {label: "Mass Messaging", value: "Mass messaging"},
  //       {label: "Instagram", value: "Instagram"},
  //       {label: "YouTube", value: "YouTube"},
  //       {label: "RTO", value: "RTO"},
  //       {label: "Bank", value: "Bank"},
  //       {label: "Patpedhi", value: "Patpedhi"},
  //       {label: "Showroom Tie-Ups", value: "Showroom Tie-Ups"},
  //     ]
  // },
  {
    label: "Lead Stage",
    model: ".leadStatus",
    type: "select",
    required: true,
    options: (props, state) => [
      {label: "In process", value: "In process"},
      {label: "Token Collected", value: "Token Collected"},
      {label: "Document Collection", value: "Document Collection"},
      {label: "RTO Process", value: "RTO Process"},
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
    options: (props, state) => [
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
    options: (props, state) => [
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
    options: (props, state) => [
      {label: "Fitment", value: "Fitment"},
      {label: "Servicing", value: "Servicing"}
    ],
    required: true,
  },
  {
    label: "Lead Source",
    model: ".leadSource",
    type: "select",
    options: (props, state) => 
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
    options: (props, state) => 
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
    options: (props, state) => [
      {label: "New", value: "New"},
      {label: "Basic Details", value: "Basic Details"},
      {label: "Document Collection", value: "Document Collection"},
      {label: "Negotiation", value: "Negotiation"},
      // {label: "Closed", value: "Closed"},
      {label: "Job Card", value: "Job Card"},
      {label: "Qualified", value: "Qualified"}
    ],
    required: true,
  },
  {
    label: "Rating",
    model: ".rating",
    type: "select",
    options: (props, state) => [
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
    options: (props, state) => [
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
    options: (props, state) => [
      {label: "Fitment", value: "Fitment"},
      {label: "Servicing", value: "Servicing"}
    ],
    required: true,
  },
  {
    label: "Lead Source",
    model: ".leadSource",
    type: "select",
    options: (props, state) => [
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
    options: (props, state) => 
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
    options: (props, state) => [
      {label: "Hot", value: "Hot"},
      {label: "Cold", value: "Cold"},
      {label: "Warm", value: "Warm"}
    ],
    required: true,
  },
];

export const jobCardStreetInputs = [
  {
    label: "Street",
    model: ".street",
    type: "text",
  },
  {
    label: "Zip/Postal Code",
    model: ".zip",
    type: "text",
    required: true,
  },
  {
    label: "City",
    model: ".city",
    type: "select",
    required: true,
    options: (props, state) => state.cities,
  },
  {
    label: "Taluka",
    model: ".taluka",
    type: "text",
  },
  {
    label: "District",
    model: ".district",
    type: "text",
  },
  {
    label: "State",
    model: ".state",
    type: "text",
  },
  {
    label: "RTO Code",
    model: ".rtoCode",
    type: "multiselect",
    options: (props, state) => 
    store.getState().rxFormReducer[props.formModel].state === "Andhra Pradesh" 
    ? [
      {label: "AP-01", value: "AP-01"},
      {label: "AP-02", value: "AP-02"},
      {label: "AP-03", value: "AP-03"},
      {label: "AP-04", value: "AP-04"},
      {label: "AP-05", value: "AP-05"},
      {label: "AP-07", value: "AP-07"},
      {label: "AP-09", value: "AP-09"},
      {label: "AP-10", value: "AP-10"},
      {label: "AP-11", value: "AP-11"},
      {label: "AP-12", value: "AP-12"},
      {label: "AP-13", value: "AP-13"},
      {label: "AP-15", value: "AP-15"},
      {label: "AP-16", value: "AP-16"},
      {label: "AP-20", value: "AP-20"},
      {label: "AP-21", value: "AP-21"},
      {label: "AP-22", value: "AP-22"},
      {label: "AP-23", value: "AP-23"},
      {label: "AP-24", value: "AP-24"},
      {label: "AP-25", value: "AP-25"},
      {label: "AP-26", value: "AP-26"},
      {label: "AP-27", value: "AP-27"},
      {label: "AP-28", value: "AP-28"},
      {label: "AP-29", value: "AP-29"},
      {label: "AP-30", value: "AP-30"},
      {label: "AP-31", value: "AP-31"},
      {label: "AP-35", value: "AP-35"},
      {label: "AP-36", value: "AP-36"},
      {label: "AP-37", value: "AP-37"},
    ]
    : store.getState().rxFormReducer[props.formModel].state === "Maharashtra" 
      ? [
        {label: "MH-01", value: "MH-01"},
        {label: "MH-02", value: "MH-02"},
        {label: "MH-03", value: "MH-03"},
        {label: "MH-04", value: "MH-04"},
        {label: "MH-05", value: "MH-05"},
        {label: "MH-07", value: "MH-07"},
        {label: "MH-09", value: "MH-09"},
        {label: "MH-10", value: "MH-10"},
        {label: "MH-11", value: "MH-11"},
        {label: "MH-12", value: "MH-12"},
        {label: "MH-13", value: "MH-13"},
        {label: "MH-15", value: "MH-15"},
        {label: "MH-16", value: "MH-16"},
        {label: "MH-20", value: "MH-20"},
        {label: "MH-21", value: "MH-21"},
        {label: "MH-22", value: "MH-22"},
        {label: "MH-23", value: "MH-23"},
        {label: "MH-24", value: "MH-24"},
        {label: "MH-25", value: "MH-25"},
        {label: "MH-26", value: "MH-26"},
        {label: "MH-27", value: "MH-27"},
        {label: "MH-28", value: "MH-28"},
        {label: "MH-29", value: "MH-29"},
        {label: "MH-30", value: "MH-30"},
        {label: "MH-31", value: "MH-31"},
        {label: "MH-35", value: "MH-35"},
        {label: "MH-36", value: "MH-36"},
        {label: "MH-37", value: "MH-37"},
        {label: "MH-38", value: "MH-38"},
        {label: "MH-39", value: "MH-39"},
        {label: "MH-40", value: "MH-40"},
        {label: "MH-41", value: "MH-41"},
        {label: "MH-42", value: "MH-42"},
        {label: "MH-43", value: "MH-43"},
        {label: "MH-44", value: "MH-44"},
        {label: "MH-45", value: "MH-45"},
        {label: "MH-46", value: "MH-46"},
        {label: "MH-47", value: "MH-47"},
        {label: "MH-48", value: "MH-48"},
        {label: "MH-49", value: "MH-49"},
        {label: "MH-50", value: "MH-50"},
        {label: "MH-51", value: "MH-51"},
        {label: "MH-52", value: "MH-52"},
        {label: "MH-53", value: "MH-53"},
        {label: "MH-54", value: "MH-54"},
        {label: "MH-55", value: "MH-55"},
        {label: "MH-56", value: "MH-56"},
      ]
      : store.getState().rxFormReducer[props.formModel].state === undefined
        ? []
        : [
          {label: "MH-01", value: "MH-01"},
          {label: "MH-02", value: "MH-02"},
          {label: "MH-03", value: "MH-03"},
          {label: "MH-04", value: "MH-04"},
          {label: "MH-05", value: "MH-05"},
          {label: "MH-07", value: "MH-07"},
          {label: "MH-09", value: "MH-09"},
          {label: "MH-10", value: "MH-10"},
          {label: "MH-11", value: "MH-11"},
          {label: "MH-12", value: "MH-12"},
          {label: "MH-13", value: "MH-13"},
          {label: "MH-15", value: "MH-15"},
          {label: "MH-16", value: "MH-16"},
          {label: "MH-20", value: "MH-20"},
          {label: "MH-21", value: "MH-21"},
          {label: "MH-22", value: "MH-22"},
          {label: "MH-23", value: "MH-23"},
          {label: "MH-24", value: "MH-24"},
          {label: "MH-25", value: "MH-25"},
          {label: "MH-26", value: "MH-26"},
          {label: "MH-27", value: "MH-27"},
          {label: "MH-28", value: "MH-28"},
          {label: "MH-29", value: "MH-29"},
          {label: "MH-30", value: "MH-30"},
          {label: "MH-31", value: "MH-31"},
          {label: "MH-35", value: "MH-35"},
          {label: "MH-36", value: "MH-36"},
          {label: "MH-37", value: "MH-37"},
          {label: "MH-38", value: "MH-38"},
          {label: "MH-39", value: "MH-39"},
          {label: "MH-40", value: "MH-40"},
          {label: "MH-41", value: "MH-41"},
          {label: "MH-42", value: "MH-42"},
          {label: "MH-43", value: "MH-43"},
          {label: "MH-44", value: "MH-44"},
          {label: "MH-45", value: "MH-45"},
          {label: "MH-46", value: "MH-46"},
          {label: "MH-47", value: "MH-47"},
          {label: "MH-48", value: "MH-48"},
          {label: "MH-49", value: "MH-49"},
          {label: "MH-50", value: "MH-50"},
          {label: "MH-51", value: "MH-51"},
          {label: "MH-52", value: "MH-52"},
          {label: "MH-53", value: "MH-53"},
          {label: "MH-54", value: "MH-54"},
          {label: "MH-55", value: "MH-55"},
          {label: "MH-56", value: "MH-56"},
        ]
  }
];

export const billingDetails = [
  {
    label: "Kit Price",
    model: ".kitPrice",
    type: "number",
  },
  {
    label: "kit GST No.",
    model: ".kitGST",
    type: "text",
    defaultValue: "28%",
    isDisable: true,
  },
  {
    label: "Tank Price",
    model: ".tankPrice",
    type: "number",
  },
  {
    label: "Tank GST No.",
    model: ".tankGST",
    type: "text",
    defaultValue: "28%",
    isDisable: true,
  },
  {
    label: "Labour Price",
    model: ".labourPrice",
    type: "number",
  },
  {
    label: "Labour GST No.",
    model: ".labourGST",
    type: "text",
    defaultValue: "18%",
    isDisable: true,
  },
  {
    label: "Discount",
    model: ".discount",
    type: "number",
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
  {
    label: "GST Number",
    model: ".gstNumber",
    type: "number",
    // required: true,
  },
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

export const companyDetails = [
  {
    model : ".GST_Certificate__c", 
    label : "GST Certificate",
    type : "image",
  },
  {
    model : ".Company_PAN_Card__c", 
    label : "Company PAN Card",
    type : "image",
  },
  {
    model : ".Cheque_Photo__c",
    label : "Cheque Photo",
    type : "image",
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

export const activityForm = [
  {
    label: "Subject",
    model: ".subject",
    type: "select",
    options: (props, state) => [
      { value: "Call", label: "Call" },
      { value: "Send Letter", label: "Send Letter" },
      { value: "SL", label: "SL" },
      { value: "Send Quote", label: "Send Quote" },
      { value: "Other", label: "Other" },
    ]
  },
  {
    label: "Priority",
    model: ".priority",
    type: "select",
    options: (props, state) => [
      { value: "High", label: "High" },
      { value: "Normal", label: "Normal" },
    ]
  },
  {
    label: "Data",
    model: ".date",
    type: "date",
  },
  {
    label: "Rating",
    model: ".taskRating",
    type: "select",
    options: (props, state) => [
      { value: "Hot", label: "Hot" },
      { value: "Warm", label: "Warm" },
      { value: "Cold", label: "Cold" },
    ],
  },
  {
    label: "Status",
    model: ".taskStatus",
    type: "select",
    options: (props, state) => [
      { value: "Open", label: "Open" },
      { value: "Completed", label: "Completed" },
    ],
  },
  {
    label: "Call Result",
    model: ".cllResult",
    type: "select",
    options: (props, state) =>  [
      { value: "Phone", label: "Phone" },
      { value: "Space Unreachable", label: "Space Unreachable" },
      { value: "Customer didn't Pick", label: "Customer didn't Pick"},
      { value: "Spoke with Customer", label: "Spoke with Customer"},
    ]
  },
  {
    label: "Comments",
    model: ".comments",
    type: "text",
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
