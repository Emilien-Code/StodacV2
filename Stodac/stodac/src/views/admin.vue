<template>
  <div class="admin">

    <div class="form-row">
      <input v-model="email" class="form-row__input" type="text" placeholder="Adresse mail"/>
    </div>


    <div class="form-row">
      <input v-model="password" class="form-row__input" type="password" placeholder="Mot de passe"/>
    </div>

    <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
      Adresse mail et/ou mot de passe invalide
    </div>

    <div class="form-row">
      <button @click="login()" class="button" :class="{'button--disabled' : !validatedFields}" v-if="mode == 'login'">
        <span v-if="status == 'loading'">Connexion en cours...</span>
        <span v-else>Connexion</span>
      </button>
      <button @click="createAccount()" class="button" :class="{'button--disabled' : !validatedFields}" v-else>
        <span v-if="status == 'loading'">Création en cours...</span>
        <span v-else>Créer mon compte</span>
      </button>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'admin',
  data: function () {
    return {
      mode: 'login',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      mobile: '',
      passwordVerif:'',
      closeLogin: false
    }
  },
  computed: {
    validatedFields: function () {
      if (this.mode == 'create') {
        if (this.email != "" && this.firstName != "" && this.lastName != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    ...mapState(['status'])
  },
  methods: {
    login: function(){
      this.$store.dispatch('loginAdmin',{
        email: this.email,
        password:this.password
      }).then(function(){console.log("user loggedIn")})
          .catch(function(error){console.log("cannot log", error)})
    },
  }
}
</script>

<style scoped>
.form-row {
  display: flex;
  margin: 16px 0px;
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
}

.form-row__input::placeholder {
  color:#aaaaaa;
}
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap');

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

.card {
  position:fixed;
  top: 60px;
  right: 25px;
  max-width: 100%;
  width: 400px;
  background:white;
  border-radius: 16px;
  padding:32px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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
  background:#cecece;
  color:#ececec
}
.button--disabled:hover {
  cursor:not-allowed;
  background:#cecece;
}


</style>