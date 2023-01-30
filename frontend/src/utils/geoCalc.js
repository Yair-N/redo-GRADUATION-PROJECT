
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
export const groupByDistance = (origin, listOfObjects, division = 100, range = 20000) => {
    if (range === 0 || range === division || division < 100 || listOfObjects.length < 1)
        return [];
    const list = calcDistanceList(origin, listOfObjects)
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
export const groupCountriesByDistance = (origin, listOfObjects, division = 100, range = 20000) => {
    if (range === 0 || range === division || division < 100 || listOfObjects.length < 1)
        return [];
    const list = calcDistanceList(origin, listOfObjects)
    const intervals = range / division
    let groupedCountries = []
    let key = division

    for (let i = 1; i < intervals; i++) {
        let group = new Set()
        list.filter(obj => (obj.distance <= key) && (obj.distance > key - division)&&group.add(obj.country_code))
        groupedCountries = {
            ...groupedCountries,
            [key]: Array.from(group.values())
        }

        key += division

    }

    return groupedCountries
}