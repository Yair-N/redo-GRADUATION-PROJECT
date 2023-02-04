
const calcDistance = (pointA = { lat: 0, lon: 0 }, pointB = { lat: 0, lon: 0 }) => {
    if ((pointA.lat === pointB.lat) && (pointA.lon === pointB.lon)) {
        return 0;
    }
    else {
        let radPointA = Math.PI * pointA.lat / 180;
        let radPointB = Math.PI * pointB.lat / 180;
        let theta = pointA.lon - pointB.lon;
        let radTheta = Math.PI * theta / 180;
        let dist = Math.sin(radPointA) * Math.sin(radPointB) + Math.cos(radPointA) * Math.cos(radPointB) * Math.cos(radTheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;

        return { K: dist * 1.609344, M: dist, N: dist * 0.8684 }
    }
}
export default calcDistance

// will return a list of objects with their range from origin in kilometers
export const calcDistanceList = (origin, listOfObjects) => {
    const originCoordinates = { lat: origin.lat_decimal, lon: origin.lon_decimal }
    const list = listOfObjects.map(obj => {
        let objCoordinates = { lat: obj.lat_decimal, lon: obj.lon_decimal }
        let distance = parseInt(calcDistance(originCoordinates, objCoordinates).K)
        return { ...obj, distance: distance }
    })
    return list
}

// will return a list of grouped locations by distance from origin
export const groupByDistance = (list, division = 100, range = 20000) => {
    if (range === 0 || range === division || division < 100 || list.length < 1)
        return [];
    // const list = calcDistanceList(origin, listOfObjects)
    const intervals = range / division
    let groupedAirport = []
    let key = division

    for (let i = 1; i < intervals; i++) {
        groupedAirport = {
            ...groupedAirport,
            [key]: list.filter(obj => (obj.distance <= key) && (obj.distance > key - division))
        }

        key += division

    }

    return groupedAirport
}



// will return a list of grouped locations by distance from origin
export const groupCountriesByDistance = (list, division = 100, range = 20000) => {
    if (range === 0 || range === division || division < 100 || list.length < 1)
        return [];
    // const list = calcDistanceList(origin, listOfObjects)
    const intervals = range / division
    let groupedCountries = []
    let key = division

    for (let i = 1; i < intervals; i++) {
        let group = new Set()
        list.filter(obj => (obj.distance <= key) && (obj.distance > key - division) && group.add(obj.country_code))
        groupedCountries = {
            ...groupedCountries,
            [key]: Array.from(group.values())
        }

        key += division

    }

    return groupedCountries
}

Array.prototype.max = function () {
    return Math.max.apply(null, this);
};
export const minMaxCountry = (origin,list )=> {
    // const list = calcDistanceList(origin, listOfObjects)
    let minAirport
    let maxAirport
    let min = 30000
    let max = 0
    list = list.filter(airport=>airport.country_code !== origin.countryCode)
    list.map(airport => {
        if(airport.country_code !== origin.country_code && airport.distance < min) min= airport.distance;
        if(airport.country_code !== origin.country_code&&airport.distance > max) max = airport.distance;
    })

    // let min = Math.min.apply(Math, ...distances)
    // let max = Math.max.apply(Math, ...distances)
    minAirport = list.filter(airport => airport.distance === min && airport.country_code !== origin.country_code)
    maxAirport = list.filter(airport => airport.distance === max && airport.country_code !== origin.country_code)


    return {min:minAirport, max:maxAirport}
}


export const returnCountry = (code,list ) =>{
let country = list.find(country=> country.code === code)
return country
}