<template>
  <div id="nav">
    <div :class="{'wrapper':windowTop<70, 'moved':windowTop>=70}">
      <svg @click="test" id="logo_stodac" width="122.505" height="50px" viewBox="0 0 122.505 118.342">
      <rect id="Rectangle_66" data-name="Rectangle 66" width="96" height="84" rx="42" transform="translate(0 41.392) rotate(-25)" fill="#078a6c"/>
      <circle id="Ellipse_4" data-name="Ellipse 4" cx="42" cy="42" r="42" transform="translate(120.424 53.994) rotate(130)" fill="#078a6c"/>
      <text id="S" transform="translate(36.253 82.171)" fill="#fff" font-size="63" font-family="Poppins" font-weight="700"><tspan x="0" y="0">S</tspan></text>
      <circle id="Ellipse_6" data-name="Ellipse 6" cx="6" cy="6" r="6" transform="translate(79.253 71.171)" fill="#fff"/>
    </svg>
    <div class="nav_left">
      <router-link to="/">
        Boutique
        <span id="span1"></span>
      </router-link>
      <router-link to="/mesCommandes/" v-if="!userInfos.admin">
        Mes commandes
        <span id="span2"></span>
      </router-link>
      <router-link to="/assistance/" v-if="!userInfos.admin">
        Assistance
        <span id="span3"></span>
      </router-link>
      <router-link v-if="userInfos.admin" to="/allCommandes/">
        Gestion commandes
        <span></span>
      </router-link>
      <router-link v-if="userInfos.admin" to="/add/">
        Ajouter un article
        <span></span>
      </router-link>
      <router-link v-if="userInfos.admin" to="/gestionstocks/">
        Gestion des stocks / Articles
        <span></span>
      </router-link>
    </div>
    <div class="nav_right">
      <button :class="{login, icon}" @click="connection()">
        <svg id="Layer_19" data-name="Layer 19" width="43.2" height="54" viewBox="0 0 43.2 54">
          <path id="Tracé_2" data-name="Tracé 2" d="M22,31.4c-7.732,0-14-6.805-14-15.2S14.268,1,22,1,36,7.805,36,16.2,29.732,31.4,22,31.4ZM22,4.8c-5.8,0-10.5,5.1-10.5,11.4S16.2,27.6,22,27.6s10.5-5.1,10.5-11.4S27.8,4.8,22,4.8Z" transform="translate(-0.4 -1)" fill="#fff"/>
          <path id="Tracé_3" data-name="Tracé 3" d="M38.2,42.746H13a9.26,9.26,0,0,1-9-9.5v-7.6a1.923,1.923,0,0,1,.882-1.634l9-5.7a1.753,1.753,0,0,1,2.3.776,1.968,1.968,0,0,1-.5,2.492L7.6,26.729v6.517a5.556,5.556,0,0,0,5.4,5.7H38.2a5.556,5.556,0,0,0,5.4-5.7V26.729L35.482,21.58a1.948,1.948,0,0,1-.1-3.411,1.721,1.721,0,0,1,1.9.143l9,5.7a1.919,1.919,0,0,1,.918,1.634v7.6a9.26,9.26,0,0,1-9,9.5Z" transform="translate(-4 11.254)" fill="#fff"/>
        </svg>
      </button>
      <transition name="nbPannier">
        <div id="nbPannier" v-if="$store.state.pannier.length!==0"><span>{{nbPannier}}</span></div>
      </transition>

      <button class="pannier icon" @click="openPannier()">
        <svg width="66.044" height="54.375" viewBox="0 0 66.044 54.375">
          <g id="basket_icon-icons.com_67985" transform="translate(0 0)">
            <path id="Tracé_1" data-name="Tracé 1" d="M64.357,16.991a6.942,6.942,0,0,0-5.124-2.479H33.781a1.653,1.653,0,1,0,0,3.305H59.234a3.9,3.9,0,0,1,2.644,1.157,2.956,2.956,0,0,1,.661,2.81l-1.487,8.264H42.871a1.653,1.653,0,1,0,0,3.305H60.556l-1.487,7.933a2.492,2.492,0,0,1-2.479,1.983H24.856a2.632,2.632,0,0,1-2.479-1.983L15.932,5.422A1.609,1.609,0,0,0,14.279,4.1H1.553a1.653,1.653,0,0,0,0,3.305h11.4l6.28,34.708a5.682,5.682,0,0,0,4.132,4.628,7.4,7.4,0,1,0,13.387,4.3,7.232,7.232,0,0,0-1.322-4.132H45.516a7.232,7.232,0,0,0-1.322,4.132,7.438,7.438,0,1,0,13.553-4.3,6.077,6.077,0,0,0,4.462-4.628l3.636-19.5A7.009,7.009,0,0,0,64.357,16.991ZM33.451,50.873a4.132,4.132,0,1,1-4.132-4.132A4.092,4.092,0,0,1,33.451,50.873ZM51.8,55a4.132,4.132,0,1,1,4.132-4.132A4.092,4.092,0,0,1,51.8,55Z" transform="translate(-10 -4.1)" fill="#fff"/>
          </g>
        </svg>
      </button>

      <div id="menu-btn" :class="{'open':menu}" @click="openMenu">

        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </div>

    </div>
  </div>
  <div id="menuContainer" v-if="menu">
    <router-link @click="closeMenu" class="menu-content" to="/">
      Boutique
      <span id="hovered"></span>
    </router-link>
    <router-link @click="closeMenu" class="menu-content" to="/mesCommandes/" v-if="!userInfos.admin">
      Mes commandes
      <span></span>
    </router-link>
    <router-link to="/assistance/"  @click="closeMenu" class="menu-content" v-if="!userInfos.admin">
      Assistance
      <span></span>
    </router-link>
    <router-link @click="closeMenu" class="menu-content" v-if="userInfos.admin" to="/allCommandes/">
      Commandes Admin
      <span></span>
    </router-link>
    <div class="menu-content" @click="openPannier"> Panier
      <div id="nbPannier2" v-if="$store.state.pannier.length!==0">
        <span>{{$store.state.pannier.length}}</span>
      </div>
    </div>
    <div class="menu-content" @click="connection"> Connexion </div>

  </div>

  <div class="banner">
    <h1 class="titre">Stodac.</h1>
    <p class="slogan">Vente d'accessoires et pièces détachées pour poêles à granulés de bois.</p>
  </div>


    <router-view/>


  <Login v-if="tryToLog && this.$store.state.user.userID === -1"/>
  <LogedIn v-if="tryToLog &&  this.$store.state.user.userID !== -1"/>
  <Pannier v-if="pannier"/>
  <footer>

    <div id="top_footer">
      <div id="payements">
        <p style="color: #2c3e50">Payement 100% sécurisé</p>
        <img class="img" src="./assets/footerImages/pay-pal-png.webp" alt="Paypal">
        <img class="img" src="./assets/footerImages/virement-bancaire-logo.png" alt="Virements">
        <img class="img" src="./assets/footerImages/images.jpg" alt="Chèques">
        <a href="mailto:contact@stodac.fr" style="color: #078A6C">contact@stodac.fr</a>

      </div>
    </div>
    <div id="bottom_footer">
        <ul style="text-align: center">
          <li>
            <router-link to="/MentionsLegales/" class="footerLink">
              Mention légales
            </router-link>
          </li>
          <li>
            <router-link to="/conditionsGeneralesDeVente/" class="footerLink">
              Conditions générales de vente
            </router-link>
          </li>
          <li>
            © Stodac tous droits réservés
          </li>
        </ul>

    </div>


  </footer>
  <contact></contact>
</template>
<script>
import Login from '@/components/Login.vue'
import LogedIn from '@/components/LogedIn.vue'
import Pannier from './components/Pannier.vue'
import contact from './components/Contact.vue'
import { mapState } from 'vuex'

export default {
  name: 'app',
  data: function (){
    return{
      tryToLog: false,
      icon: 'icon',
      login:'',
      loginData : Login.data,
      pannier: false,
      menu:false,
      windowTop:0
    }
  },
  mounted: function(){
    window.addEventListener('scroll', this.handleScroll);
    if(this.$store.state.user.userID !== -1){
      this.$store.dispatch('getUserInfos').then(()=>{
        //console.log("la il y a le userInfo")
      })
    }
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll)
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
      this.menu=false
    },
    handleScroll () {
      this.windowTop = window.top.scrollY
    },
    logCloseLogin(){
      this.tryToLog = false;
      this.login = '';
    },
    openPannier(){
      this.pannier = !this.pannier;
      this.tryToLog = false;
      this.menu=false
    },
    closePannier(){
      this.pannier = false;
    },
    openMenu(){
      this.menu=!this.menu
    },
    closeMenu(){
      this.menu = false
    },
    test: function(){
      this.$router.push("/")
    }
  },
  components: {
    Login,
    LogedIn,
    Pannier,
    contact
  },
  computed: {
    ...mapState(['userInfos']),
    nbPannier: function (){
      let sum = 0;
      this.$store.state.pannier.forEach((e)=>{
        sum+=e.qty;
      })
      return sum;

    }
  },
}
</script>

<style>
html, body{
  max-width: 100%;
  overflow-x: hidden;
}
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap');
#nbPannier{
  position: absolute;
  top: 40px;
  right: 60px;
  width: 25px;
  height: 25px;
  background-color:#F18F01;
  border-radius: 50%;
}
#nav  {
  width: 100%;
  position: fixed;
  z-index: 4;
}
#nbPannier2{
  position: absolute;
  top: -10px;
  right: -30px;
  width: 20px;
  height: 20px;
  background-color:#F18F01;
  border-radius: 50%;
}
#nbPannier2 span{
  display : block;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-25%, -50%);
}
#nbPannier span{
  display : block;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-15%, -50%);
}
footer ul{
  margin: 10px;
  text-decoration: none;
  list-style: none;
}

footer{
  position: relative;
  bottom: 0px;
  margin-top: 50px;
  height: 150px;
  color: white;
  z-index: 5;
}
footer .img{
  height: 40px;
}
#top_footer{
  height:50px ;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF;
}
#payements{
  width: 40%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
#bottom_footer {
  background-color: #007057;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.footerLink{
  padding: 10px;
}
a{
  text-decoration: none;
  color: white;
}
.nav_left{
  margin-left: 100px;
}
#logo_stodac{
  position: absolute;
  top: 0;
  height: 70px;
  width: 70px;
  cursor: pointer;
}
button.icon {
  background-color: #00705700;
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
  position: relative;
  top: 70px;
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
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
}
.wrapper,.moved {
  padding: 20px;
  height: 70px;
  color: White;
  background-color: #007057;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width:100%;
  overflow:hidden;
  transform-origin: center;
}
.moved{
  position: absolute;
  z-index: 2;
  transition: width .5s ease;
  background-color: #007057F0;
  backdrop-filter: blur(10px);
  width: 80vw;
  left: 50%;
  top: 89vh;
  transform-origin: center;
  transform: translateX(-50%);
  border-radius: 20px;
}
.wrapper a {
  font-weight: bold;
  font-size: 1.2em;
  color: White;
  margin-right: 50px
}
.moved a {
  font-weight: bold;
  font-size: 1.2em;
  color: White;
  margin-right: 50px
}
#menu-btn{
  display: none;
}
#menuContainer{
  display: none;
}
.nbPannier-enter-active {
animation: bounce-in .5s;
}
.nbPannier-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
@media (max-width: 780px) {
  .slogan{
    display: none;
  }
  button.icon{
    width: 40px;
    height: 40px;
  }
  button.icon svg{
    width: 35px;
    height: 35px;
  }
  button.pannier svg {
    width: 40px;
    height: 40px;
  }
  .titre  {
    padding: 0;
  }
  .nav_left {
    display: none;
  }
  .icon{
    display: none;
  }
  #menu-btn{
    display: block;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    width: 50px;
    height: 50px ;
    user-select: none;
  }
  .line{
    width: 50%;
    height:  3px ;
    background: #fff;
    border-radius: 2px;
    transition: transform 0.4s ease, opacity 0s ease 0.4s, top 0.4s ease 0.4s;
    position: relative  ;
    will-change: transform;
  }
  .line:nth-child(1){
  top: 15px;
  }
  .line:nth-child(2){
  top: 20px;
  }
  .line:nth-child(3){
  top: 25px;
  }

  .open .line:nth-child(1){
    top: 23px;
    transform: rotate(45deg);
    transition: top 0.2s ease, transform 0.2s ease  0.2s;
  }
  .open .line:nth-child(2){
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  .open .line:nth-child(3){
    top: 17px;
    transform: rotate(-45deg);
    transition: top 0.2s ease, transform 0.2s ease 0.2s;
  }
  #menuContainer{
    display: flex;
    position: fixed;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 3;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #007057E0;
    backdrop-filter: blur(10px);
    color: #ffffff;
    animation: 0.5s apearMenu;
    font-size: 1.2rem;
    user-select: none;
  }
  .menu-content{
    opacity: 0;
    margin: 10px;
    cursor: pointer;
    -webkit-animation: 0.5s ease 0.5s forwards apearText;
    -o-animation: 0.5s ease 0.5s forwards apearText;
    animation: 0.5s ease 0.5s forwards apearText;
  }
  .menu-content:nth-child(1){
    animation-delay: 0.3s;
  }
  .menu-content:nth-child(2){
    animation-delay: 0.4s;
  }
  .menu-content:nth-child(3){
    animation-delay: 0.5s;
  }
  .menu-content:nth-child(4){
    animation-delay: 0.6s;
  }
  @keyframes apearText {
    0%{
      transform: translateX(-100px);
      opacity: 0;
    }
    100%{
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes apearMenu {
    0%{
      transform: scale(0);
      border-radius: 100%;
    }
    100%{
      transform: scale(1);
      border-radius: 0;
    }
  }
}
a span{
  display: block;
  position: absolute;
  transform: scale(0);
  bottom: 15px;
  height: 3px;
  background-color: #ffffff;
  transition: transform .5s ease 0s;
  transform-origin: right ;
}
a:hover span{
  transform: scale(1);
  transform-origin: left;
  transition: transform .5s ease 0s;
}
#span1{
  left: 125px;
  width:70px;
}
#span2{
  left: 265px;
  width:140px;
}
#span3{
  left: 475px;
  width:85px;
}
.router-link-active span {
  color: #F18F01;
}
</style>
