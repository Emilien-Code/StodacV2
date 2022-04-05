<template>
  <div id="home">    
      COMMANDE

    <h1>Le haut de la page</h1>
    <div id="widget-container" ></div>
    <input type="hidden" id="pudoWidgetErrorCode">
    <h1>Le bas de la page</h1>

  </div>
</template>

<script>
const axios = require("axios")
export default {
  data: function (){
    return{
      jQ:'',

    }
  },
  mounted() {
    const script = document.createElement("script");
    script.src = "https://ws.colissimo.fr/widget-point-retrait/resources/js/jquery.plugin.colissimo.min.js";
    script.addEventListener("load", this.jQueryLoad);
    document.body.appendChild(script);
  },
  methods: {
    jQueryLoad: function(){
      const jQ = document.createElement("script");
      jQ.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.js";
      jQ.addEventListener("load", this.setLoaded);
      document.body.appendChild(jQ);
      this.jQ = jQ;
    },
    setLoaded: function () {
      console.log(this.jQ)
      axios.post('https://ws.colissimo.fr/widget-point-retrait/rest/authenticate.rest', {
        "login": "895244",
        "password": "LAPOSTE545483"
      }).then((response) => {
        this.jQ.jQuery('#widget-container').frameColissimoOpen({
          "ceLang": "fr",
          "callBackFrame": this.callBackFrame,
          "URLColissimo": " https://ws.colissimo.fr",
          "ceCountryList": "FR,ES,GB,PT,DE",
          "ceCountry": "FR",
          "dyPreparationTime": "1",
          "ceAddress": "62 RUE CAMILLE DESMOULINS",
          "ceZipCode": "92130",
          "ceTown": "ISSY LES MOULINEAUX",
          "token": response.data.token
        })
      }).catch((error)=>{console.log(error)})
    },
    callBackFrame: function (point) {
      console.log('call back frame');
      console.log(point);
    }
  }
}

</script>
 <style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

svg{
  width: 25px;
  height: 25px;
  position: absolute;
  top: 192px;
  left: 420px;
}
#precision{
  height: 20px;
}
#category, #manufacturer{
  margin-top: 15px ;
}
#stuff-container{
  width: 90vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 50px;
}
.product{
  margin: 25px 25px ;
 cursor: pointer;
  border-radius: 15px;
 overflow:hidden;
 box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
#buttons_wrapper{
  width: 100vw;
  display: flex;
  align-items: center ;
  justify-content: center;
}
button{
  width: 50px;
  height: 50px;
  margin-left: 10px;
  border-radius: 10px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color:#ffffff ;
  cursor: pointer;
  transition: .5s;
}
button:hover{
  background: #e3e3e3;
  transition: .5s;
}
 </style>