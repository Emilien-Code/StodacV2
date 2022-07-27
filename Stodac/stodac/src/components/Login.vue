<template>
  <div class="card" v-clickOutside="croix">
    <button id="close" @click="croix()">
      <span></span>
      <span></span>
    </button>

    <div id="created" v-if="accountCreated">
      <p class="created-text">Un mail vous à été envoyé.</p>
      <p class="created-text">Veuillez confirmer votre compte pour continuer.</p>
    </div>

    <div v-else>
      <h1 class="card__title" v-if="mode === 'login'">Connexion</h1>
      <h1 class="card__title" v-else>Inscription</h1>

      <p class="card__subtitle" v-if="mode === 'login'">Tu n'as pas encore de compte ? <span class="card__action" @click="switchToCreateAccount()">Créer un compte</span></p>
      <p class="card__subtitle" v-else>Tu as déjà un compte ? <span class="card__action" @click="switchToLogin()">Se connecter</span></p>

      <div class="form-row">
        <input v-model="email" :class="{'form-row__input': true, 'validFields': mailValidation, 'unvalidField': !mailValidation&&this.email!==''}" type="text" placeholder="Adresse mail"/>
      </div>

      <div class="form-row" v-if="mode === 'create'">
        <input v-model="firstName" :class="{'form-row__input': true, 'validFields': firstName!==''}" type="text" placeholder="Prénom"/>
        <input v-model="lastName" :class="{'form-row__input': true, 'validFields': lastName!==''}" type="text" placeholder="Nom"/>
      </div>
      <div class="form-row" v-if="mode === 'create'">
      <input v-model="mobile" :class="{'form-row__input': true, 'validFields': phoneValidation, 'unvalidField': !phoneValidation&&this.mobile!==''}" type="tel" placeholder="Numéro de téléphone"/>
      </div>
      <div class="form-row" style="flex-direction: column">
        <input v-model="password" :class="{'form-row__input': true, 'validFields': passwordValidation, 'unvalidField': !passwordValidation&&this.password!==''} " type="password" placeholder="Mot de passe" @keyup.enter="login"/>
        <p v-if="mode === 'create'" style="font-size: .7em; padding: 0 5px ">Le mot de passe doit contenir au moins 8 charactères, une majuscule, une minuscule et un chiffre</p>
        <a v-if="mode === 'login'" style="font-size: .7em; padding: 0 5px; color: #078A6C; cursor:pointer;" href="https://stodac.fr/resetpassword">Mot de passe oublié</a>

      </div>
      <div class="form-row" v-if="mode === 'create'">
        <input v-model="passwordVerif" :class="{'form-row__input': true, 'validFields': this.passwordVerif===this.password&&this.passwordVerif!=='', 'unvalidField':this.passwordVerif!==this.password}" type="password" placeholder="Vérification du mot de passe"/>
      </div>

      <div v-if="mode === 'login'">
        <input id="checkbox" type="checkbox" v-model="check">
        <span id="CDV">Se souvenir de moi</span>
      </div>

      <div class="form-row" id="cap" v-if="mode === 'create'">
        <VueRecaptcha ref="recaptcha" sitekey="6LdK3p0fAAAAAEqnAuVYJqXnbaO8f8kRs9FqMXUG" @verify="verifyMethod" @expired="expiredMethod" :loadRecaptchaScript="true"></VueRecaptcha>
      </div>

      <div class="form-row" v-if="mode === 'login' && status === 'error_login'">
        <p style="font-size: .8em; padding: 0 5px; color: #F18F01">{{ errorMessage }}</p>
      </div>
      <div class="form-row" v-if="mode === 'create' && status === 'error_create'">
        <p style="font-size: .7em; padding: 0 5px; color: #F18F01">Adresse mail déjà utilisée</p>
      </div>

      <div class="form-row">
        <button @click="login()" class="button" :class="{'button--disabled' : !validatedFields}" v-if="mode === 'login'">
          <span v-if="status === 'loading'">Connexion en cours...</span>
          <span v-else>Connexion</span>
        </button>
        <button @click="createAccount()" class="button" :class="{'button--disabled' : !validatedFields}" v-else>
          <span v-if="status === 'loading'">Création en cours...</span>
          <span v-else>Créer mon compte</span>
        </button>
      </div>
    </div>
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

import {VueRecaptcha} from "vue-recaptcha";
import { mapState } from 'vuex'
export default {
  name: 'Login',
  data: function () {
    return {
      mode: 'login',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      mobile: '',
      passwordVerif:'',
      closeLogin: false,
      captcha:false,
      isOpen: false,
      check:false,
      errorMessage: '',
      accountCreated : false
    }
  },
  mounted() {
    setTimeout(()=>{
      this.isOpen = true;
    }, 500)
    if(this.$store.state.retient_adresse != ''){
      this.email = this.$store.state.retient_adresse
      this.check = true
    }
  },
  components: { VueRecaptcha },
  computed: {
    validatedFields: function () {
      if (this.mode === 'create') {
        return this.mailValidation && this.firstName !== "" && this.lastName !== "" && this.passwordValidation && this.password===this.passwordVerif && this.captcha && this.phoneValidation
      } else {
        return this.mailValidation && this.passwordValidation
      }
    },
    mailValidation: function(){
      const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regexp.test(String(this.email).toLowerCase());
    },
    passwordValidation: function(){
      const regexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      return regexp.test(String(this.password));
    },
    phoneValidation: function(){
      const regexp = /^[0-9]{10}$/;
      return regexp.test(String(this.mobile));
    },
    ...mapState(['status'])
  },
  directives:{
    clickOutside
  },
  methods: {
    switchToCreateAccount: function () {
      setTimeout(()=>{
       this.mode = 'create';
      },50)
    },
    verifyMethod : function(){
      this.captcha = true
    },
    expiredMethod : function(){
      this.captcha = false
    },
    switchToLogin: function () {
      setTimeout(()=>{
            this.mode = 'login';
            },50)
    },
    croix: function(){
      if(this.isOpen){
        this.$parent.logCloseLogin();
        this.isOpen = false
      }
    },
    login: function(){
      const a = this
      if(this.validatedFields) {
        let retient_adresse = ''
        if(this.check){
          retient_adresse = this.email
        }
        this.$store.dispatch('login', [{
          email: this.email,
          password: this.password
        },retient_adresse])
            .then(function () {
          //console.log("user loggedIn")
        }).catch(function (error) {
          if(error.response.status == 401){
            a.errorMessage = "Adresse email ou mot de passe incorrecte."
          }else{
            a.errorMessage = "Votre compte n'a pas encore été vérifié."
          }
        })
      }
    },
    createAccount: function(){
      const a = this
      if(this.validatedFields) {
        this.$store.dispatch('createAccount', {
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          mobile: 33 + this.mobile,
        }).then(function (){
          a.accountCreated = true
        }).catch(function (error) {
          console.log(error);
        });
      }
    }
  }
}




</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap');

.SSDM{
    display: flex;
    margin: 16px 0;
    gap:16px;
    flex-wrap: wrap;
  }
.form-row {
    display: flex;
    margin: 16px 0;
    gap:16px;
    flex-wrap: wrap;
  }
#cap{
  display: flex;
  justify-content: center;
}
  .form-row__input {
    padding:8px;
    border: none;
    border-radius: 8px;
    background:#f2f2f2;
    font-weight: 500;
    font-size: 16px;
    flex:1;
    min-width: 100px;
    color: black;
    border: solid 2px #ffffff;
    transition : 1s;
  }

  .form-row__input::placeholder {
    color:#aaaaaa;
  }

* {
  font-family: 'Poppins', sans-serif;
  margin:0;
  padding: 0;
  box-sizing: border-box;
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
#close span{
  width: 2.5px;
  height: 15px;
  background-color: #A1A1A1;
  border-radius: 2px;
  position: absolute;
  top : 5px;
  left  : 10.5px;
}
#close span:nth-child(1){
  transform:rotate(45deg);
}
#close span:nth-child(2){
  transform:rotate(-45deg);
}
#checkbox {
  top:4px;
  -webkit-appearance: none;
  background-color: #acacac;
  border: none;
  padding: 10px;
  border-radius: 3px;
  display: inline-block;
  position: relative;
}
#checkbox:checked {
   background-color: #078A6C;
   color: #99a1a7;
 }

#checkbox:checked:after {
  content: '\2714';
  font-size: 13px;
  position: absolute;
  top: 0px;
  left: 6px;
  color: #fff;
}
#CDV  {
  color:#666;
  margin: 10px;
  font-weight: 400;
}

.card {
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
  transform-origin: top ;
  animation: apearCard 0.5s ease;
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

  .card__action {
    color:#419D79;
    text-decoration: underline;
  }

  .card__action:hover {
    cursor:pointer;
  }

  .button:hover {
    cursor:pointer;
    background: #078A6C;
  }

  .button--disabled {
    background:#aeaeae;
    color:#ececec
  }
  .button--disabled:hover {
    cursor:not-allowed;
    background:#aeaeae;
  }

.unvalidField{
  border: solid 2px #F18F01;
  transition: 1s;

}
.validFields{
  transition: 1s;
  border: solid 2px #078A6C;
}
textarea, select, input, button { outline: none; }

@media (max-width: 650px) {
  .card{
    right:0;
    top: 0px;
    width: 100vw;
  }
}
#created  {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
}
.created-text{
  font-size: 1em;
  width: 90%;
  margin: 0 0 10px 20px;
}

.form-row{
  animation: apearform .5s ease forwards;
  opacity: 0;
}

/* Email connection password*/
.card div.form-row:nth-child(4){
  animation-delay: .2s;
}
.card div.form-row:nth-child(5){
  animation-delay: .4s;
}
.card div.form-row:nth-child(6){
  animation-delay: .6s;
}

@keyframes apearform {
  0%{
    opacity: 0;
    transform: translateX(-30px);

  }
  100%{
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes apearCard {
  0%{
    transform: scaleY(0);
  }
  100%{
    transform: scaleY(1);
  }
}
</style>