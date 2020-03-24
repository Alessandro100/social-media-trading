import APIService from "./api";
import UserService from "./user";

const PositionService = {
    positions: [],

    getUserPositions: function() {
        return new Promise((resolve, reject) =>{
            APIService.get('position-list', { username: UserService.username}).then(res =>{
                resolve(res['data']);
            }, err =>{
                reject(err);
            })
        })
    }
}

export default PositionService