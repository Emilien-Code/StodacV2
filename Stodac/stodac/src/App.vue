<template>
  <div id="nav">
      <svg id="logo_stodac" xmlns="http://www.w3.org/2000/svg" width="122.505" height="50px" viewBox="0 0 122.505 118.342">
        <rect id="Rectangle_66" data-name="Rectangle 66" width="96" height="84" rx="42" transform="translate(0 41.392) rotate(-25)" fill="#078a6c"/>
        <circle id="Ellipse_4" data-name="Ellipse 4" cx="42" cy="42" r="42" transform="translate(120.424 53.994) rotate(130)" fill="#078a6c"/>
        <text id="S" transform="translate(36.253 82.171)" fill="#fff" font-size="63" font-family="Poppins" font-weight="700"><tspan x="0" y="0">S</tspan></text>
        <circle id="Ellipse_6" data-name="Ellipse 6" cx="6" cy="6" r="6" transform="translate(79.253 71.171)" fill="#fff"/>
      </svg>
    <div class="nav_left">
      <router-link to="/">
        Boutique
        <span></span>
      </router-link> 
      <router-link to="/">
        Aide
        <span></span>
      </router-link>
      <router-link to="/">
        Contact
        <span></span>
      </router-link>
    </div>
    <div class="nav_right">
      <button :class="{login, icon}" @click="connection()">
        <svg id="Layer_19" data-name="Layer 19" xmlns="http://www.w3.org/2000/svg" width="43.2" height="54" viewBox="0 0 43.2 54">
          <path id="Tracé_2" data-name="Tracé 2" d="M22,31.4c-7.732,0-14-6.805-14-15.2S14.268,1,22,1,36,7.805,36,16.2,29.732,31.4,22,31.4ZM22,4.8c-5.8,0-10.5,5.1-10.5,11.4S16.2,27.6,22,27.6s10.5-5.1,10.5-11.4S27.8,4.8,22,4.8Z" transform="translate(-0.4 -1)" fill="#fff"/>
          <path id="Tracé_3" data-name="Tracé 3" d="M38.2,42.746H13a9.26,9.26,0,0,1-9-9.5v-7.6a1.923,1.923,0,0,1,.882-1.634l9-5.7a1.753,1.753,0,0,1,2.3.776,1.968,1.968,0,0,1-.5,2.492L7.6,26.729v6.517a5.556,5.556,0,0,0,5.4,5.7H38.2a5.556,5.556,0,0,0,5.4-5.7V26.729L35.482,21.58a1.948,1.948,0,0,1-.1-3.411,1.721,1.721,0,0,1,1.9.143l9,5.7a1.919,1.919,0,0,1,.918,1.634v7.6a9.26,9.26,0,0,1-9,9.5Z" transform="translate(-4 11.254)" fill="#fff"/>
        </svg>
      </button>
      <button class="pannier icon" @click="openPannier()">
        <svg xmlns="http://www.w3.org/2000/svg" width="66.044" height="54.375" viewBox="0 0 66.044 54.375">
          <g id="basket_icon-icons.com_67985" transform="translate(0 0)">
            <path id="Tracé_1" data-name="Tracé 1" d="M64.357,16.991a6.942,6.942,0,0,0-5.124-2.479H33.781a1.653,1.653,0,1,0,0,3.305H59.234a3.9,3.9,0,0,1,2.644,1.157,2.956,2.956,0,0,1,.661,2.81l-1.487,8.264H42.871a1.653,1.653,0,1,0,0,3.305H60.556l-1.487,7.933a2.492,2.492,0,0,1-2.479,1.983H24.856a2.632,2.632,0,0,1-2.479-1.983L15.932,5.422A1.609,1.609,0,0,0,14.279,4.1H1.553a1.653,1.653,0,0,0,0,3.305h11.4l6.28,34.708a5.682,5.682,0,0,0,4.132,4.628,7.4,7.4,0,1,0,13.387,4.3,7.232,7.232,0,0,0-1.322-4.132H45.516a7.232,7.232,0,0,0-1.322,4.132,7.438,7.438,0,1,0,13.553-4.3,6.077,6.077,0,0,0,4.462-4.628l3.636-19.5A7.009,7.009,0,0,0,64.357,16.991ZM33.451,50.873a4.132,4.132,0,1,1-4.132-4.132A4.092,4.092,0,0,1,33.451,50.873ZM51.8,55a4.132,4.132,0,1,1,4.132-4.132A4.092,4.092,0,0,1,51.8,55Z" transform="translate(-10 -4.1)" fill="#fff"/>
          </g>
        </svg>
      </button>
    </div>
  </div>
    <div class="banner">
      <h1 class="titre">Stodac.</h1>
      <p class="slogan">Vente de poêles à granulés et assistance technique.</p>
    </div>
  <router-view/>

  <Login v-if="tryToLog && this.$store.state.user.userID == -1"/>
  <LogedIn v-if="tryToLog &&  this.$store.state.user.userID !== -1"/>
  <Pannier v-if="pannier"/>
  <footer>

    J'aime le saucisson

  </footer>
</template>
<script>
  import Login from '@/components/Login.vue'
  import LogedIn from '@/components/LogedIn.vue'
  import Pannier from './components/Pannier.vue'

  export default {
    name: 'nav',
    data: function (){
      return{
        tryToLog: false,
        icon: 'icon',
        login:'',
        loginData : Login.data,
        pannier: false
      }
    },
    methods:{
      connection(){
        this.pannier = false;
        this.tryToLog = !this.tryToLog;
        if(this.tryToLog){
          this.login = 'login';
        }else{
          this.login = '';
        }
      },
      logCloseLogin(){
        this.tryToLog = false;
        this.login = '';
      },
      openPannier(){
        this.pannier = !this.pannier;
        this.tryToLog = false;
      },
      closePannier(){
        this.pannier = false;
      }
    },
    components: {
      Login,
      LogedIn,
      Pannier
    }
  }
</script>

<style>
footer{
  margin-top: 50px;
  height: 100px;
  background-color: #007057;
  color: white;
  text-align: center;
}
a{
  text-decoration: none;
  color: white;
}
.nav_left{
  margin: 100px;
}
#logo_stodac{
  position: absolute;
  top: 0px;
  height: 70px;
  width: 70px;
}
#nav{
  width:100%;
  overflow:hidden;
}
button.icon {
  overflow: hidden;
  background-color: #007057;
  border-radius: 50%;
  border: #007057;
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: background-color .5s;
  margin-right: 20px;
}
button:hover{
  background-color: #078A6C;
  transition: background-color .5s;
}
button.icon svg{
  height: 40px;
}
button.pannier svg {
  margin-right: 50px;
}

button.login {
  background-color: #078A6C;
}
.banner{
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #007057;
  height: 100px;
}
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.titre{
  font-size: 4em;
  font-family: 'Poppins', sans-serif;
  padding-left: 60px;
}
.slogan{
  font-size: 1.5em;
  padding-left: 100px;
}
#app {
  font-family: sans-serif;
  color: #2c3e50;
}

#nav {
  padding: 20px;
  height: 70px;
  color: White;
  background-color: #007057;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#nav a {
  font-weight: bold;
  font-size: 1.2em;
  color: White;
  margin-right: 5vw
}

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap');
</style>
