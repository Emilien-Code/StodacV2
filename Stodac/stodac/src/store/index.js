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
    pannier: pannier,
    adress:{
      postCode:'',
      adress:'',
      city:'',
      complement:''
    },
    FDP:0,
    MDL:'',
    parametrepayement:[]
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
          token: '',
      }
      state.userInfos = {
        lastName:'',
        firstName:'',
        email:'',
        admin:false
      },
      localStorage.removeItem('user');
      localStorage.removeItem('userInfos')
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
          state.pannier[index].qty +=1;
        }
        index++
      });
      localStorage.setItem('pannier', JSON.stringify(state.pannier));
    },
    lessOneQty : function(state, id){
      let index = 0;
      state.pannier.forEach(i => {
        if(i.article._id === id){
          state.pannier[index].qty -=1
        }
        index++
      });
      localStorage.setItem('pannier', JSON.stringify(state.pannier));
    },
    resetPanier: function(state){
      state.pannier = []
      localStorage.setItem('pannier', JSON.stringify(state.pannier));
    },
    changeUserID : function(state){
      state.user.token = "dfuahgu"
      state.user.userID = "heehhehez"
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    saveAdressM: function(state, ad){
      state.adress.city = ad.city
      state.adress.adress = ad.adress
      state.adress.postCode = ad.postCode
    },
    modeDeLivraison: function(state, MDL){
      state.MDL = MDL;
    },
    FDP: function(state, FDP){
      state.FDP = FDP;
    },
    saveparametrepayement:function(state, parametre){
      state.parametrepayement = parametre
      localStorage.setItem('parametrepayement', JSON.stringify(state.parametrepayement));
    }
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
      return new Promise((resolve, reject) => {
      instance.get(`/user/getinfos/${state.user.userID}`)
      .then(function(response) {
        commit('userInfos', response.data[0]);
        resolve()
      })
      .catch( function (error) {
        console.log(error);
        commit('logOut')
        reject()
      })
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
      let array;
      instance.get(`/stuff/name/${word}/20`)
      .then(function(response){
        array = response.data
        //commit('stuffsBy', response.data)
      }).then(()=>{
        instance.get(`/stuff/reference/${word}/20`)
            .then((res)=>{
              res.data.forEach(e=>{
                array[array.length] = e
              })
              commit('stuffsBy', array)
            })
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
    changeAddress : (state, address) =>{
      console.log(state, address)
      console.log(state.state.user)
      //instance.post('http://localhost:3000/api/user/MA/' + state.user.userID,address)
      instance.post(`/user/MA/${state.state.user.userID}`,address)
      .then(function(){
        console.log('c passer')
      })
      .catch(function(error){
        console.log(error)
      })
    },
    saveparametre:({commit}, parametre) =>{
      commit('saveparametrepayement', parametre)
    },
    savepanier: (state) => {
      return new Promise((resolve, reject) => {
        // console.log(state, panier)
        // console.log(panier)
        // console.log(adresseLivraison)
        // console.log(modeDeLivraison)
        const envoieca = {panier:state.state.parametrepayement[0],adresseLivraison:state.state.parametrepayement[1],modeDeLivraison:state.state.parametrepayement[2]}
        console.log(envoieca)
        instance.post(`/user/addpanier/${state.state.user.userID}`,envoieca)
        .then(function(){
          resolve()
        })
        .catch(function(error){
          console.log(error)
          reject()
        })
      })
    },
    resetpanier: ({commit, state}) => {
      console.log("je suis passer !")
      instance.get(`/user/resetpanier/${state.user.userID}`)
      .then(function(){
        commit('resetPanier')
        console.log('c passer pour le reset')
      })
      .catch(function(error){
        console.log(error)
      })
    },
    saveFacture:({commit,state}, option) => {
      return new Promise((resolve, reject) => {
        instance.post(`/user/addCommande/${state.user.userID}`, option)
        .then(function(){
          commit('resetPanier') 
          console.log('c passer pour le la facture')
          resolve()
        })
        .catch(function(error){
          console.log(error)
          reject()
        })
      })
    },
    getFacture:(state, numFacture) => {
      return new Promise((resolve, reject) => {
        console.log(numFacture)
        instance.get(`/user/facture/${state.state.user.userID}/${numFacture}`)
        .then(function(response){
          console.log(response.data)
          resolve(response.data)
        })
        .catch(function(error){
          console.log(error)
          reject(null)
        })
      })
    },
    getFactureAdm:(state, numFacture) => {
      return new Promise((resolve, reject) => {
        console.log(numFacture)
        instance.get(`/user/factureAdm/${state.state.user.userID}/${numFacture}`)
        .then(function(response){
          console.log(response.data)
          resolve(response.data)
        })
        .catch(function(error){
          console.log(error)
          reject(null)
        })
      })
    },
    getAllCommande:(state, parametre) => {
      return new Promise((resolve, reject) => {
        instance.post(`/user/allFacture/${state.state.user.userID}/`, parametre)
        .then(function(response){
          console.log(response.data)
          resolve(response.data)
        })
        .catch(function(error){
          console.log(error)
          reject(null)
        })
      })
    },
    removeProduct:(state, parameter) =>{
      return new Promise((resolve,reject)=>{
        instance.delete(`/stuff/${parameter}`)
            .then(()=>{
              resolve(null)
            })
            .catch(()=>{
              reject(null)
            })
      })
    },
    changeEtat:(state, parametre) => {
      return new Promise((resolve, reject) => {
        instance.post(`/user/changeEtat/${state.state.user.userID}`, parametre)
        .then(()=>{
          resolve()
        })
        .catch(function(error){
          console.log(error)
          reject()
        })
      })
    },
    changeFacture:(state, parametre) => {
      return new Promise((resolve, reject) => {
        instance.post(`/user/changeAdm/${state.state.user.userID}`, parametre)
        .then(() => {
          resolve()
        })
        .catch(function(error){
          console.log(error)
          reject()
        })
      })
    },
    saveMDL:({commit},MDL)=>{
      commit('modeDeLivraison', MDL)
    },
    saveFDP:({commit},FDP)=>{
      commit('FDP', FDP)
    },
    saveAdress:({commit}, ad) =>{
      commit('saveAdressM', ad)
    },
    timeout : ({commit, state}) =>{
      console.log('au moins ça marche')
      commit('changeUserID', state)
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
