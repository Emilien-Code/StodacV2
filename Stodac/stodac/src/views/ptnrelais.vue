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
//import jQuery from "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.js"
//import frameColissimoOpen from "https://ws.colissimo.fr/widget-point-retrait/resources/js/jquery.plugin.colissimo.min.js"
const jQuery = require('jQuery')
const axios =  require('axios')
axios.post('https://ws.colissimo.fr/widget-point-retrait/rest/authenticate.rest', {
 "login": "895244",
 "password": "LAPOSTE545483"
}).then((response)=>{
  jQuery('#widget-container').frameColissimoOpen({
    "ceLang" : "fr",
    "callBackFrame" : callBackFrame,
    "URLColissimo" : " https://ws.colissimo.fr",
    "ceCountryList" : "FR,ES,GB,PT,DE",
    "ceCountry" : "FR",
    "dyPreparationTime" : "1",
    "ceAddress" : "62 RUE CAMILLE DESMOULINS",
    "ceZipCode" : "92130",
    "ceTown" : "ISSY LES MOULINEAUX",
    "token" : response.data.token
  });
  console.log(response.data.token)
}).catch((error)=>{console.log(error)})




function callBackFrame(point) {
console.log('call back frame');
console.log(point);
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