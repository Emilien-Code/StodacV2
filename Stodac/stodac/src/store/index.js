import { createStore } from 'vuex'
const axios = require('axios');

const instance = axios.create({
  baseURL : 'http://localhost:3000/api/'
})

let user = localStorage.getItem('user');
let pannier = localStorage.getItem('pannier');

if(!pannier){
  pannier = []
}
else{
  try{
    pannier = JSON.parse(pannier);
  }catch{
    pannier = [];
  }
}

if(!user){
  user = {
    userID: -1,
    token: ''
  }
}else{
  try{
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + user.token
    }catch{
      user = {
        userID: -1,
        token: ''
      };
    }
}

export default createStore({
  state: {
    status:'',
    userInfos: {
      lastName:'',
      firstName:'',
      email:'',
      admin:false
    },
    nbStuff:0,
    user : user,
    stuffs:[],
    pannier: pannier
  },
  mutations: {
    setStatus: function(state, status){
      state.status = status;
    },
    logUser: function(state, user){
      instance.defaults.headers.common['Authorization'] = 'Bearer ' + user.token
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },
    logOut: function(state){
      state.user = {
          userID: -1,
          token: ''
      }
      localStorage.removeItem('user');
    },
    userInfos : function(state, userInfos){
      state.userInfos = userInfos;
    },
    stuffs: function(state, stuffs){
      state.stuffs = stuffs
    },
    stuffsBy: function(state, stuffs){
      state.stuffs = stuffs
      state.nbStuff = 0
    },
    product: function(state, product){
      state.product = product
    },
    count : function(state, nb){
      state.nbStuff = nb
    },
    addPannierMutation : function(state, a){
      let hasBeenFound = false;
      if(state.pannier.length !== 0){
        state.pannier.forEach(i => {
          if(i.article._id === a.article._id){
            i.qty += a.qty
            console.log(' ' + i.qty)
            hasBeenFound = true;
          }
        });
      }
      if(!hasBeenFound){
        state.pannier.push(a); 
      }
      localStorage.setItem('pannier', JSON.stringify(state.pannier));
    },
    suprPannierMutation : function(state, a){
      let index = 0;
      state.pannier.forEach(i => {
        if(i.article._id === a._id){
          state.pannier.splice(index, 1);
        }
        index++
      });
      localStorage.setItem('pannier', JSON.stringify(state.pannier));
    },
    addOneQty : function(state, id){
      let index = 0;
      state.pannier.forEach(i => {
        if(i.article._id === id){
          state.pannier[index] = {'article' : state.pannier[index].article, 'qty' : state.pannier[index].qty +=1 }
        }
        index++
      });
      console.log(state.pannier)
      localStorage.setItem('pannier', JSON.stringify(state.pannier));
    },
    lessOneQty : function(state, id){
      let index = 0;
      state.pannier.forEach(i => {
        if(i.article._id === id){
          state.pannier[index] = {'article' : state.pannier[index].article, 'qty' : state.pannier[index].qty -=1 }
        }
        index++
      });
      localStorage.setItem('pannier', JSON.stringify(state.pannier));
    },
  },
  actions: {
    login : ({commit}, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) =>{
        instance.post('/user/login/mail', userInfos)
        .then(function (response) {
          commit('setStatus', 'Connecté');
          commit('logUser', response.data);
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_login');
          reject(error);
        });
      });
    },
    createAccount : ({commit}, userInfos) => {
      return new Promise((resolve, reject) =>{
        commit('setStatus', 'loading');
        instance.post('/user/signup', userInfos)
        .then(function (response) {
          commit('setStatus', 'created')
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_create')
          reject(error);
        });
      });
    },
    getUserInfos: ({commit, state})=>{
      instance.get(`/user/getinfos/${state.user.userID}`)
      .then(function(response) {
        commit('userInfos', response.data[0]);
      })
      .catch( function (error) {
        console.log(error);
      })
    },
    getStufs: ({commit}, nbloaded )=>{
      instance.get(`/stuff/all/${nbloaded*20}/${(nbloaded-1)*20}`)
      .then(function(response){
        commit('stuffs', response.data)
      })
      .catch(function(error){
        console.log(error)
      })
    },
    getStufsCategory: ({commit}, category)=>{
      instance.get(`/stuff/category/${category}`)
      .then(function(response){
        commit('stuffsBy', response.data)
      })
      .catch(function(error){
        console.log(error)
      })
    },
    getStufsManufacture: ({commit}, manufacturer)=>{
      instance.get(`/stuff/manufacturer/${manufacturer}`)
      .then(function(response){
        commit('stuffsBy', response.data)
      })
      .catch(function(error){
        console.log(error)
      })
    },
    getStuffByFirstLetters : ({commit}, word) => {
      instance.get(`/stuff/name/${word}/20`)
      .then(function(response){
        commit('stuffsBy', response.data)
      })
      .catch(function(error){
        console.log(error)
      })
    },
    getStuffNb : ({commit}) => {
      instance.get(`/stuff/count/`)
      .then(function(response){
        commit('count', response.data)
      })
      .catch(function(error){
        console.log(error)
      })
    },
    addPannier : ({commit}, a) =>{
      commit('addPannierMutation', a)
    },
    suprPannier : ({commit}, a) =>{
      commit('suprPannierMutation', a)
    },
    addOne : ({commit}, a) =>{
      commit('addOneQty', a)
    },
    lessOne : ({commit}, a) =>{
      commit('lessOneQty', a)
    },
  },
  modules: {
  }
})
