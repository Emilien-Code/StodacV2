<template>
  <div id="ptnrelais">
    <div id="widget-container" ></div>
    <input type="hidden" id="pudoWidgetErrorCode">

  </div>
</template>

<script>
const axios = require("axios")
import $ from 'jQuery'
function callBack(point){
  console.log("callBack");
  console.log("callBack");
  console.log("callBack");
  console.log("callBack");
  console.log("callBack");
  console.log("callBack");
  console.log("callBack");
  console.log("point : " + point)
  console.log("callBack");
  console.log("callBack");
  console.log("callBack");
  console.log("callBack");

}
export default {
  data: function (){
    return{
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
      this.jQ = document.createElement("script");
      this.jQ.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.js";
      this.jQ.addEventListener("load", this.setLoaded);
      document.body.appendChild(this.jQ);
    },
    setLoaded: function () {
      axios.post('https://ws.colissimo.fr/widget-point-retrait/rest/authenticate.rest', {
        "login": "895244",
        "password": "LAPOSTE545483",
        "SameSite":"Secure"
      }).then((response) => {
        $('#widget-container').frameColissimoOpen({
          "URLColissimo": " https://ws.colissimo.fr",
          "ceCountryList": "FR",
          "ceCountry": "FR",
          "dyPreparationTime": 1,
          "token": response.data.token,
          "callBackFrame":callBack()
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

#widget-container{
  margin-bottom: 150px;
}
#ptnrelais{
}
 </style>