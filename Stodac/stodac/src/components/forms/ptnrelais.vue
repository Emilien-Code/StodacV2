<template>
  <div id="ptnrelais">
    <div id="widget-container" ></div>
    <input type="hidden" id="pudoWidgetErrorCode">
    <input type="hidden" id="pudoWidgetAddress1">
    <input type="hidden" id="pudoWidgetTown">
    <input type="hidden" id="pudoWidgetZipCode">
  </div>
</template>

<script>
const axios = require("axios")
import $ from 'jQuery'
export default {
  data: function (){
    return{
      jQ:null
    }
  },
  mounted() {
    const script = document.createElement("script");
    script.src = "https://ws.colissimo.fr/widget-point-retrait/resources/js/jquery.plugin.colissimo.min.js";
    document.body.appendChild(script);
    this.jQ = document.createElement("script");
    this.jQ.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.js";
    this.jQ.addEventListener("load", this.callColissimo());
    document.body.appendChild(this.jQ);
  },
  methods:{
    callColissimo: function(){
      axios.get('https://stodac.fr/api/utils/token').then((response) => {
        //console.log(response.data.token)
        $('#widget-container').frameColissimoOpen({
          "ceLang" : "fr",
          "URLColissimo": " https://ws.colissimo.fr",
          "ceCountryList": "FR",
          "callBackFrame": "noCallBack",
          "ceCountry": "FR",
          "dyPreparationTime": 1,
          "token": response.data.token,
        })
      }).catch((error)=>{console.log(error)})
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
button{
  position: absolute;
}
#widget-container{
  margin-bottom: 200px;
}
#ptnrelais{
    width: 80vw;
  transform: translateX(-10vw);
}
@media (max-width: 772px) {
  #widget-container{
     margin-bottom: 600px;
  }
  #ptnrelais{
    width: 80vw;
    transform: translateX(2vw);
  }
}

 </style>