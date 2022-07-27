<template>
  <div id="verification">
    <h1>Réinitialiser votre mot de passe </h1>
    <p>Veuillez saisir votre adresse e-mail ci-dessous</p>
    <p>Nous vous enverrons les instructions pour créer un nouveau mot de passe.</p>
    <input v-model="mail" :class="{'form-row__input': true, 'validFields': mailValidation, 'unvalidField': !mailValidation&&this.mail!==''}" type="text" placeholder="Adresse mail"/>
    <button @click="send()">Envoyer</button>
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
      mail:"",
      status: 0
    }
  },
  mounted() {

  },
  methods:{
    send : function (){
      if(this.mailValidation){
        console.log("test")
        axios.post(`https://stodac.fr/api/utils/requestResetPswd`,{
          email: this.mail
        }).then(response => {
          if (response.status == 201){
            this.status = response.status
            this.response = "Un email de réinitialisation de mot de passe vous à été envoyé."
          }
        }).catch(err => {
          if (err.response.status == 500){
            this.status = err.response.status
            this.response = "Aucuns compte n'est inscrit avec cette adresse email."
          }
        })
      }
    }
  },
  computed  :{
    mailValidation: function(){
      const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regexp.test(String(this.mail).toLowerCase());
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