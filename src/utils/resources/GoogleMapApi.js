/**
 * 
 * 谷歌地图服务接口
 */
import axios from 'axios';
const GoogleApiKey = 'AIzaSyB3hPHaD2n1sdYY1q7673seTi97oy2u3HQ';

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
  
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

export function GeoCoordinateToStreet(latitude, longitude) {
    return new Promise((resolve, reject)=> { 
        axios.get(  
            `   https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=
                ${GoogleApiKey}
            `
        )
        .then(checkStatus)
        .then(response => resolve(response.data))
        .catch(err => reject(err));
    })
}
export function GeoStreetToCoordinate(address) {
    return new Promise((resolve, reject)=> {
        axios.get(  
            `   https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=
                ${GoogleApiKey}
            `
        )
        .then(checkStatus)
        .then(response => resolve(response.data))
        .catch(err => reject(err));
    })
}

export function CompleteSearch(place, fields) {
    return new Promise((resolve, reject)=> {
        axios.get(  
            `  https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${place}&inputtype=textquery&fields=${fields}&key=${GoogleApiKey}
            `
        )
        .then(checkStatus)
        .then(response => {
            resolve(response.data)
        })
        .catch(err => reject(err));
    })
}

export function FuzzySearch(place) {
    return new Promise((resolve, reject)=> {
        axios.get(  
            `  https://maps.googleapis.com/maps/api/place/textsearch/json?query=${place}&key=${GoogleApiKey}
            `
        )
        .then(checkStatus)
        .then(response => {
            resolve(response.data)
        })
        .catch(err => reject(err));
    })
}

export function DetailSearch(placeId, fields) {
    return new Promise((resolve, reject)=> {
        axios.get(  
            `  https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${GoogleApiKey}
            `
        )
        .then(checkStatus)
        .then(response => {
            resolve(response.data)
        })
        .catch(err => reject(err));
    })
}

export function DirectionsSearch({origin, destination, options}) {
    return new Promise((resolve, reject)=> {
        axios.get(  
            `  https://maps.googleapis.com/maps/api/directions/json?origin=${origin[0]},${origin[1]}
                &destination=${destination[0]},${destination[1]}${options}&key=${GoogleApiKey}
            `
        )
        .then(checkStatus)
        .then(response => {
            resolve(response.data)
        })
        .catch(err => reject(err));
    })
}