
/// attempting an API call to get real time offers


const axios = require("axios");


const options = {
  method: 'GET',
  url: 'https://priceline-com-provider.p.rapidapi.com/v1/flights/search',
  params: {
    itinerary_type: 'ONE_WAY',
    class_type: 'BUS',
    location_arrival: 'TLV',
    date_departure: '2022-11-15',
    location_departure: 'FRA',
    sort_order: 'PRICE',
    number_of_stops: '1',
    price_max: '20000',
    number_of_passengers: '1',
    duration_max: '2051',
    price_min: '100',
    date_departure_return: '2022-11-16'
  },
  headers: {
    'X-RapidAPI-Key': '7809a242bdmshb92d36df5e587a5p15c6f1jsn8332ffba2b8a',
    'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
}).catch(function (error) {
	console.error(error);
});