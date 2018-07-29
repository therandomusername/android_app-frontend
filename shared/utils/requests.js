const api = "http://10.0.2.2:4567/";
import store from '../store/store'

function getGetOthers() {
    return store.getState().getOthers;
}

function getUserID() {
    return store.getState().userInfo.userID;
}

export function fetchMarkers() {
    return fetch(api + "getMarkers" + "?getOthers=" + getGetOthers() + "&userID=" + getUserID())
        .then(res => res.json())
}

export function fetchPolylines() {
    return fetch(api + "getRoutes" + "?getOthers=" + getGetOthers() + "&userID=" + getUserID())
        .then(res => res.json());
}