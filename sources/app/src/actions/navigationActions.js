import { navService } from '../api.js';

export function getNav() {
    return function(dispatch) {
        dispatch({type: "GET_NAV"});

        navService.getNavTree("/site/website", 3, null).then(tree => {
            dispatch({type: "GET_NAV_FULFILLED", payload: tree})
        }).catch(error => {
            console.log(error)
        });
    }
}