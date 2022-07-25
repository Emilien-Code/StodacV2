<template>
  <div :class="{'contact':true, 'minimized': isMinimized, 'large': !isMinimized}" v-click-outside="close" @click.self="clicked">
    <h1>Nous contacter</h1>
    <button id="close" @click="close()">
      <div></div>
      <div></div>
    </button>
    <img src="../../src/assets/chat.png" alt="Nous contacter" @click.self="clicked">
    <div class="form">
      <div id="form_clolumn">
        <input id="mail" type="text" v-model="email"  placeholder="Adresse mail">
      </div>
      <textarea name="" id="" cols="30" v-model="msg" rows="10" placeholder="Saisissez votre message ici."></textarea>
    </div>
    <VueRecaptcha id="VueRecaptcha" v-if="!isMinimized" ref="recaptcha" sitekey="6LdK3p0fAAAAAEqnAuVYJqXnbaO8f8kRs9FqMXUG" @verify="verifyMethod" @expired="expiredMethod" :loadRecaptchaScript="true"></VueRecaptcha>
    <p>{{ error }}</p>
    <p style="color: #078A6C;text-align: center">{{ result }}</p>
    <button id="button" @click="send">Envoyer</button>
  </div>
</template>

<script>
import {VueRecaptcha} from "vue-recaptcha";
const axios = require("axios")

let clickOutside = function(el, binding) {
  el.clickOutsideEvent = function (event) {
    if (!el.contains(event.target)) {
      binding.value()
    }
  };
  document.body.addEventListener('click', el.clickOutsideEvent)
}

export default {
  name: "Contact",
  data: ()=>{
    return {
      isMinimized : true,
      captcha:false,
      alreadyClicked: false,
      email:'',
      msg:'',
      error: '',
      result:''
    }
  },
  methods:{
    clicked: function(){
      if(this.isMinimized){
        this.isMinimized = !this.isMinimized
      }
    },
    close: function(){
      this.isMinimized = true;
      this.error = ''
      this.result = ""
    },
    verifyMethod : function(){
      this.captcha = true
    },
    expiredMethod : function(){
      this.captcha = false
    },
    send: function (){
      if (this.captcha && this.msg != '' && this.email != '' && !this.alreadyClicked){

        axios.post("https://stodac.fr/api/utils/mail", {
            mail: this.email,
            message: this.msg
        })
          this.alreadyClicked = true
          this.error =  ""
          this.result = "Votre message à bien été envoyé. Une réponse vous sera transmise a l'adresse indiquée."
      } else{
        if(this.alreadyClicked){
          this.error =  ""
        }else{
          this.error =  "L'intégralité des champs doit être saisis."
        }
      }

    }
  },
  directives:{
    clickOutside
  },
  components:{
    VueRecaptcha
  }
}
</script>

<style scoped>
  * {
    font-family: 'Poppins', sans-serif;
    margin:0;
    padding: 0;
    box-sizing: border-box;
  }
  p{
    color: lightcoral;
  }
  .large #close{
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
  .large #close:hover{
    background-color: #E1E1E1;
  }
  .large #close div{
    width: 2.5px;
    height: 15px;
    background-color: #A1A1A1;
    border-radius: 2px;
    position: absolute;
    top : 5px;
    left  : 10.5px;
  }
  .large #close div:nth-child(1){
    transform:rotate(45deg);
  }
  .large #close div:nth-child(2){
    transform:rotate(-45deg);
  }

  .contact{
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    transition: .5s ease-out;
    top: 89vh;
    right: 20px;
    z-index: 5;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: rgb(0 0 0 / 24%) 0 3px 8px;
  }
  .minimized{
    justify-content: center;
    width: 70px;
    height: 70px;
    cursor: pointer;
  }
  .large{
    width: 500px;
    height: 600px;
    transform:translateY(-530px)
  }
  .minimized img{
    transition: .5s ease-out;
    width: 50px;
  }
  .large img{
    transition: .5s ease-out;
    opacity: 0;
    display: none;
  }
  #mail, textarea {
    padding:8px;
    border-radius: 8px;
    background:#f2f2f2;
    font-weight: 500;
    font-size: 16px;
    flex:1;
    width: 100%;
    min-width: 100px;
    color: black;
    border: solid 2px #ffffff;
    transition : 1s;
  }
  #mail{
    animation: apear .5s ease-out .6s forwards;
    opacity: 0;
  }
  textarea{
    animation: apear .5s ease-out .7s forwards;
    opacity: 0;
  }
  .minimized h1{
    display: none;
  }
  .minimized .form{
    display: none;
  }
  #mail::placeholder {
    color:#aaaaaa;
  }
  .minimized button{
    display: none;
  }
  h1 {
    animation: apear .5s ease-out .5s forwards;
    opacity: 0;
    padding: 25px;
  }
  .form{
    display: flex;
    flex-direction: column;
    width: 80%;
  }
  #form_clolumn{
    height: 44px;
    width:100%
  }
  #button:hover {
    cursor:pointer;
    background: #078A6C;
  }
  #button {
    background: #419D79;
    color:white;
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    width: 80%;
    padding: 16px;
    transition: .4s background-color;
    animation: apear .5s ease-out .9s forwards;
    opacity: 0;
  }
  #VueRecaptcha{
    animation: apear .5s ease-out .8s forwards;
    opacity: 0;
  }
  @media (max-width: 935px){
    .contact{
      right: 10%;
      top: 79vh;
    }
    .large{
      left: 50%;
      transform: translateX(-50%);
      width: 90%;
      top: calc(79vh - 530px );
    }
  }
  @keyframes apear {
    0%{
      transform: translateY(-30px);
      opacity: 0;
    }
    100%{
      transform: translateY(0);
      opacity:1;
    }
  }
</style>