<template>
  <div id="verification">
    <h1>Réinitialiser votre mot de passe </h1>
    <p>Veuillez saisir votre nouveau mot de passe ci-dessous</p>
    <input v-model="pswd" :class="{'form-row__input': true, 'validFields': passwordValidation, 'unvalidField': !passwordValidation&&this.pswd!==''}" type="password" placeholder="Mot de passe"/>
    <p style="font-size: .7em; padding: 0 5px ">Le mot de passe doit contenir au moins 8 charactères, une majuscule, une minuscule et un chiffre</p>
    <input style="margin-top: 5px" v-model="pswd2" :class="{'form-row__input': true, 'validFields': pswd===pswd2 && pswd2!=='', 'unvalidField': !(pswd===pswd2)&&this.pswd2!==''}" type="password" placeholder="Confirmation du mot de passe"/>
    <button @click="send()">Réinitialiser</button>
    <p v-if="response" id="res" :class="{'error' : status==500, 'validate': status==201 }">{{response}}</p>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'verification',
  data: function () {
    return {
      response: "",
      pswd:"",
      pswd2:"",
      status: 0
    }
  },
  mounted() {
  },
  methods:{
    send : function (){
      if(this.passwordValidation && (this.pswd === this.pswd2)){
        axios.post(`https://stodac.fr/api/utils/ResetPswd`,{
          email: this.$route.params.email,
          id : this.$route.params.id,
          password: this.pswd
        }).then(response => {
          if (response.status == 200){
            this.status = response.status
            this.response = "Votre mot de passe à bien été changé."
          }
        }).catch(err => {
          if (err.response.status != 200){
            this.status = err.response.status
            this.response = "Une erreur est survenu."
          }
        })
      }
    }
  },
  computed  :{
    passwordValidation: function(){
      const regexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      return regexp.test(String(this.pswd));
    },
  }
}
</script>
<style scoped>
textarea, select, input, button { outline: none; }
h1  {
  margin-bottom: 40px;
  font-size: calc(1em + 2vw);
}
#verification{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  margin-top: 70px;
  height: calc(100vh - 370px);
}
p{
  font-size: 1em;
  width: 300px;
  margin: 0 0 10px 20px;
}
.form-row__input {
  margin-top: 20px;
  padding:16px;
  border-radius: 8px;
  background:#f2f2f2;
  font-weight: 500;
  font-size: 16px;
  width: 300px;
  color: black;
  border: solid 2px #ffffff;
  transition : 1s;
}
.validFields{
  transition: 1s;
  border: solid 2px #078A6C;
}
.form-row__input::placeholder {
  color:#aaaaaa;
}
.unvalidField{
  border: solid 2px #F18F01;
  transition: 1s;
}
button:hover {
  cursor:pointer;
  background: #078A6C;
}

button {
  margin-top: 10px;
  background: #419D79;
  color:white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 300px;
  padding: 16px;
  transition: .4s background-color;
}
#res{
  padding: 8px;
  margin: 24px;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  border-radius: 10px;
}
.error{
  color: #F18F01;
}
.validate{
  color: #078A6C;
}
</style>