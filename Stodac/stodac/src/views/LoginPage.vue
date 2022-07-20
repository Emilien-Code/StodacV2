<template>
    <div class="card">
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
      <div class="form-row">
        <input v-model="password" :class="{'form-row__input': true, 'validFields': passwordValidation, 'unvalidField': !passwordValidation&&this.password!==''} " type="password" placeholder="Mot de passe" @keyup.enter="login"/>
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
        Adresse mail et/ou mot de passe invalide
      </div>
      <div class="form-row" v-if="mode === 'create' && status === 'error_create'">
        Adresse mail déjà utilisée
      </div>





    <div class="form-row conexion">

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
</template>

<script>
import { mapState } from 'vuex'
import  { VueRecaptcha } from 'vue-recaptcha'
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
      redirection: this.$route.params.id,
      captcha:false,
      check:false
    }
  },
  components: { VueRecaptcha },
  mounted() {
    if(this.$store.state.retient_adresse != ''){
      this.email = this.$store.state.retient_adresse
      this.check = true
    }
  },
  computed: {
    validatedFields: function () {
      if (this.mode === 'create') {
        return this.mailValidation && this.firstName !== "" && this.lastName !== "" && this.passwordValidation && this.password===this.passwordVerif && this.captcha;
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
  methods: {
    switchToCreateAccount: function () {
      this.mode = 'create';
    },
    switchToLogin: function () {
      this.mode = 'login';
    },
    verifyMethod : function(){
      this.captcha = true
    },
    expiredMethod : function(){
      this.captcha = false
    },
    login: function(){
      if(this.validatedFields) {
        const a = this;
        let retient_adresse = ''
        if(this.check){
          retient_adresse = this.email
        }
        this.$store.dispatch('login', [{
          email: this.email,
          password: this.password
        },retient_adresse]).then(function () {
          if(a.redirection==="payement"){
            a.$store.dispatch('savepanier').then(()=>{a.$router.push("/payement/")})
          }else{
            a.$router.push(`/${a.redirection}`)
          }
        })
            .catch(function (error) {
              console.log("cannot log", error)
            })
      }
    },
    createAccount: function(){
      if(this.validatedFields) {
        const a = this;
        this.$store.dispatch('createAccount', {
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          mobile: 33 + this.mobile,
        }).then(function () {
          a.login();
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

.form-row {
    display: flex;
    margin: 16px 0;
    gap:16px;
    flex-wrap: wrap;
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
  padding-top: 90px;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
  width: 800px;
  height: calc(100vh - 150px ) ;
  background:white;
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
  width: 380px;
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
    background:#cecece;
    color:#ececec
  }
  .button--disabled:hover {
    cursor:not-allowed;
    background:#cecece;
  }
  .conexion{
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: self-end;
    height: 100px;
    justify-content: center;
  }
.unvalidField{
  border: solid 2px #F18F01;
  transition: 1s;

}
.validFields{
  transition: 1s;
  border: solid 2px #078A6C;
}
.emptyField{
  border: solid 2px #000!important;
}
#cap{
  display: flex;
  justify-content: center;
}
textarea, select, input, button { outline: none; }


</style>