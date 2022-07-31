<template>
  <div id="container">

  <div id="menu">
    <input type="radio" id="Paypal" @change="test('paypal')" name="payement" checked>
    <label for="Paypal" @click="setSelected(0)" :class="{selected: selected  === 0}">
      Paypal / Carte bancaire
    </label>

    <input type="radio" id="cheque" @change="test('cheque')" name="payement">
    <label for="cheque" @click="setSelected(1 )" :class="{selected: selected  === 1}">
      Cheque
    </label>

    <input type="radio" id="virement" @change="test('virement')" name="payement">
    <label for="virement" @click="setSelected(2)" :class="{selected: selected  === 2}">
      Virement
    </label>
  </div>
    <span :style="{transform:`translate(${spanPosition}px,-5px)`, width:`${spanWidth}px`}" id="bar"></span>
  <div id="descriptifs">
    <div id="paypal " v-if="selected==0">
      <paypal :saveFacture="saveF" :sc="sendingCommand"></paypal>
    </div>
    <div id="Cheque " v-if="selected==1">
      La commande vous sera envoyée aussi tôt le chèque reçu. <p>Ce dernier sera envoyé au 11 Bis Rue de Lorraine, 54360 Damelevières et sera à l'ordre d'AMC EST.</p>
      <div class="btn-ctnr">
        <button @click="saveF(-1); sendingCommand();"> Commander </button>
      </div>
    </div>
    <div id="virement " v-if="selected==2">
      La commande vous sera envoyée aussitôt le virement effectué. <br> IBAN : FR7614707090263112192565018
      <br>BIC : CCBPFRPPMTZ
      <div class="btn-ctnr">
        <button @click="saveF(-1); sendingCommand();"> Commander </button>
      </div>
    </div>
  </div>
  </div>

</template>
<script>
import paypal from "../forms/paypal";

export default {
  name: "payementSelect",
  data: function(){
    return {
      selected : 0,
    }
  },
  components:{ paypal },
  mounted() {
    },
  methods: {
    setSelected: function(i){
      this.selected = i;
    },
  },
  props:{
    test:Function,
    saveF:Function,
    sendingCommand:Function
  }
}
</script>

<style scoped>
#container{
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  width: 800px;
}

.btn-ctnr{
  padding-top: 25px;
  display: flex;
  justify-content: center;
}
button {
  background: #419D79;
  color:white;
  cursor: pointer;
  border-radius: 8px;
  font-weight: 400;
  font-size: 15px;
  border: none;
  width: 400px;
  padding: 12px;
  transition: .4s background-color;
}

button:hover {
  background: #078A6C;
}
input[type="radio"]{
  display: none;
}
label{
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  font-size: 1em;
  font-weight: bolder ;
  transition: background-color .5s;
  padding: 9px ;
  border-radius: 10px;
}
.selected, label:hover {
  background-color: #00705779;
  transition: background-color .5s;
}
#menu {
  width: 300px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#descriptifs{
  width: 500px;
  padding-left: 10px;
}

@media (max-width: 685px) {
  label{
    font-size: 12px;
  }
  #menu{
    width: 80vw;
    height: 24px;
    flex-direction: row;
    margin-bottom: 40px;
  }
  .selected, label:hover {
    background-color: #00705700;
    transition: background-color .5s;
  }
  #container{
    flex-direction: column;
    width: 90%;
    padding-left: 5%;
  }
  #descriptifsLivraison{
    left: 35vw;
  }
}
</style>