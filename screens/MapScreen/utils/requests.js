const api = "http://10.0.2.2:4567/";
import store from '../../../shared/store/store'

function getUserToken() {
    return store.getState().userInfo.userInfo;
}

function getUserID() {
    return store.getState().userInfo.userID
}

function getHeaders() {
    return {
        'USER_TOKEN': getUserToken()
    };
}

export function fetchAddMarker(marker) {
    return fetch(api + "addMarker", {
        method: "POST",
        body: JSON.stringify(Object.assign({}, marker, {ownerID: getUserID()})),
        headers: getHeaders()
    }).then(res => res.json());
}

export function fetchAddRoute(route) {
    return fetch(api + "addRoute", {
        method: "POST",
        body: JSON.stringify(route),
        headers: getHeaders()
    })

}