import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import $ from 'jqeury'
Vue.use(VueAxios, axios)

var json = require('../../hero.json')
// console.log(json)
var str = str = window.location.pathname
var index = str .lastIndexOf("\/");
var player_id = str .substring(index + 1, str .length);

var recent_match = new Vue({
  el: '#recent_match',
  data: {
    recent_matches:[],
    profile: {},
    heroes: []
  },
  mounted: function(){
    this.getMatch(),
    this.getProfile(),
    this.getHero()
  },
  methods:{
    getPic:function(){
      const api = 'https://api.opendota.com/api/heroStats'
      Vue.axios.get(api).then((response) => {

      })
    },
    getHero: function(){
      const api = 'https://api.opendota.com/api/players/' + player_id + '/heroes'
      Vue.axios.get(api).then((response) => {
        var array = []
        var data = response.data
        for(var i = 0; i < 7; i++){
          var hero_id = data[i].hero_id
          array.push({'hero_id':data[i].hero_id})
          array[i]['games'] = data[i].games
          array[i]['win'] = data[i].win
          array[i]['win_rate'] = ((data[i].win/data[i].games) * 100).toFixed(1)
          array[i]['image'] = '/image/' + json[hero_id].en_name + '.png'
          array[i]['cn_name'] = json[hero_id].cn_name

        }
        this.heroes = array
      })
    },
    getProfile: function(){
      const api = 'https://api.opendota.com/api/players/' + player_id
      Vue.axios.get(api).then((response) => {
        var hash ={}
        hash['account_id'] = response.data.profile.account_id
        hash['avatar'] = response.data.profile.avatarmedium
        hash['personaname'] = response.data.profile.personaname
        // var id = response.data.profile.account_id
        this.profile = hash
      })
    },
    getMatch: function(){
      const api = 'https://api.opendota.com/api/players/' + player_id + '/recentMatches'
      Vue.axios.get(api).then((response) => {
        var matches = response.data
        var array = []
        for(var i = 0; i < 7; i++){
          if((matches[i].player_slot<=4 && matches[i].radiant_win === true) || (matches[i].player_slot>=128 && matches[i].radiant_win === false)){
            array.push({'result':"胜"})
          }else{
            array.push({'result':"负"})
          }
          array[i]["match_id"] = matches[i].match_id
          array[i]["kills"] = matches[i].kills
          array[i]["deaths"] = matches[i].deaths
          array[i]["assists"] = matches[i].assists
          array[i]["kda"] = ((matches[i].kills + matches[i].assists)/matches[i].deaths).toFixed(1)
          var hero_id = matches[i].hero_id
          array[i]["cn_name"] = json[hero_id].cn_name
          array[i]["ended_at"] = this.getEndTime(matches[i].start_time, matches[i].duration)
          array[i]["image"] = '/image/' + json[hero_id].en_name + '.png'

        }
        this.recent_matches = array
      })
    },
    getEndTime: function(start_time, duration){
      var msPerMinute = 60 * 1000;
      var msPerHour = msPerMinute * 60;
      var msPerDay = msPerHour * 24;
      var msPerMonth = msPerDay * 30;
      var msPerYear = msPerDay * 365;
      var current = Date.now()
      var previous = (start_time + duration) * 1000

      var elapsed = current - previous;

      if (elapsed < msPerMinute) {
        return Math.round(elapsed/1000) + '秒前';
      }

      else if (elapsed < msPerHour) {
        return Math.round(elapsed/msPerMinute) + '分钟前';
      }

      else if (elapsed < msPerDay ) {
        return Math.round(elapsed/msPerHour ) + '小时前';
      }

      else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + '天前';
      }

      else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + '月前';
      }

      else {
        return Math.round(elapsed/msPerYear ) + '年前';
      }

    }
  }
})