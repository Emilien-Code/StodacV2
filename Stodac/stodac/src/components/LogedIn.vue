<template>
  <div class="card"  v-clickOutside="croix">
    <button id="close" @click="croix()">
      <div></div>
      <div></div>
    </button>
    <div class="form-row"> 
      <div id="svg">
        <svg id="Layer_19" data-name="Layer 19" xmlns="http://www.w3.org/2000/svg" width="43.2" height="54" viewBox="0 0 43.2 54">
          <path id="Tracé_2" data-name="Tracé 2" d="M22,31.4c-7.732,0-14-6.805-14-15.2S14.268,1,22,1,36,7.805,36,16.2,29.732,31.4,22,31.4ZM22,4.8c-5.8,0-10.5,5.1-10.5,11.4S16.2,27.6,22,27.6s10.5-5.1,10.5-11.4S27.8,4.8,22,4.8Z" transform="translate(-0.4 -1)" fill="#078A6C"/>
          <path id="Tracé_3" data-name="Tracé 3" d="M38.2,42.746H13a9.26,9.26,0,0,1-9-9.5v-7.6a1.923,1.923,0,0,1,.882-1.634l9-5.7a1.753,1.753,0,0,1,2.3.776,1.968,1.968,0,0,1-.5,2.492L7.6,26.729v6.517a5.556,5.556,0,0,0,5.4,5.7H38.2a5.556,5.556,0,0,0,5.4-5.7V26.729L35.482,21.58a1.948,1.948,0,0,1-.1-3.411,1.721,1.721,0,0,1,1.9.143l9,5.7a1.919,1.919,0,0,1,.918,1.634v7.6a9.26,9.26,0,0,1-9,9.5Z" transform="translate(-4 11.254)" fill="#078A6C"/>
        </svg>
      </div>
    </div>


      <p v-if="userInfos.firstName" class="card__subtitle"> {{userInfos.firstName}} {{userInfos.lastName}}</p>
      <p style="text-align: center" v-else>Votre connexion à éxpirée. Reconnectez vous afin d'acceder a ces informations</p>
      <a href="">Modifier mes informations</a>
      <button @click="logOut()" class="button">
        <span v-if="userInfos.firstName">Déconnexion</span>
        <span v-else>Reconexion</span>
      </button>
  </div>
</template>

<script>
let clickOutside = function(el, binding) {
  el.clickOutsideEvent = function (event) {
    if (!el.contains(event.target)) {
      binding.value()
    }
  };
  document.body.addEventListener('click', el.clickOutsideEvent)
}

import { mapState } from 'vuex'

export default {
  name: 'LogedIn',
  data: function () {
    return {
      mode: 'login',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      isOpen: false
    }
  },
  computed: {
    ...mapState(['userInfos'])
  },
  directives:{
    clickOutside
  },
  mounted: function(){
    setTimeout(()=>{
      this.isOpen = true;
    }, 500)
    if(this.$store.state.user.userID === -1){
      this.$router.push('/'); // Pq ?
      return;
    }
    this.$store.dispatch('getUserInfos')
  },
  methods: {
    logOut: function(){
      this.$store.commit('logOut');
    },
    croix: function(){
        if(this.isOpen){
          this.$parent.logCloseLogin();
          this.isOpen = false
        }
      },
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap');

a{
  color: #419D79;
  text-align: center;
  margin: 20px 0;
}
#svg {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #F1F1F1;
  display: flex;
  justify-content: center;
  align-items: center;
}
  .form-row {
    display: flex;
    justify-content: center;
    margin: 16px 0;
    gap:16px;
    flex-wrap: wrap;
  }

* {
  font-family: 'Poppins', sans-serif;
  margin:0;
  padding: 0;
  box-sizing: border-box;
}


.card {
  display: flex;
  flex-direction: column;
  position:fixed;
  z-index: 4;
  top: 70px;
  right: 25px;
  max-width: 100%;
  width: 400px;
  background:#ffffffA0;
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding:32px;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
}

.card__title {
  text-align:center;
  font-weight: 800;
}

.card__subtitle {
  text-align: center;
  color:#666;
  font-weight: 500;
}

  .button {
    background: #419D79;
    color:white;
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    width: 100%;
    padding: 16px;
    transition: .4s background-color;
  }


  .button:hover {
    cursor:pointer;
    background: #078A6C;
  }

  #close{
    position: absolute;
    top: 10px;
    right: 10px;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    background-color: #F1F1F1;
    border:none;
    cursor:pointer;
    transition: .4s background-color;
  }
  #close:hover{
    background-color: #E1E1E1;
  }
#close div{
  width: 2.5px;
  height: 15px;
  background-color: #A1A1A1;
  border-radius: 2px;
  position: absolute;
  top : 5px;
  left  : 10.5px;
}
#close div:nth-child(1){
  transform:rotate(45deg);
}
#close div:nth-child(2){
  transform:rotate(-45deg);
}
@media (max-width: 650px) {
  .card{
    right:0;
    width: 100vw;
  }
}
</style>