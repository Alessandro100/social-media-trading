import APIService from "./api";

const LeaderboardService = {
    getLeaderboardWidgetInfo:function(username) {
        return new Promise((resolve, reject) =>{
            APIService.get('leaderboard-widget', { username: username}).then(res =>{
                resolve(res['data']);
            }, err =>{
                reject(err);
            })
        })
    },
    getAllLeaderBoard:function() {
        return new Promise((resolve, reject) =>{
            APIService.get('leaderboard').then(res =>{
                resolve(res['data']);
            }, err =>{
                reject(err);
            })
        })
    }
}

export default LeaderboardService;