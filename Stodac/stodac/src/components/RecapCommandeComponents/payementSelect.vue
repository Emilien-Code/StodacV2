<template>
  <div id="menu">
    <input type="radio" id="Paypal" @change="test('paypal')" name="payement" checked>
    <label for="Paypal" @click="setSelected(0)" @mouseenter="enter(0)" @mouseleave="leave()">
      Paypal
    </label>

    <input type="radio" id="cheque" @change="test('cheque')" name="payement">
    <label for="cheque" @click="setSelected(1 )" @mouseenter="enter(1)" @mouseleave="leave()">
      Cheque
    </label>

    <input type="radio" id="virement" @change="test('virement')" name="payement">
    <label for="virement" @click="setSelected(2)" @mouseenter="enter(2)" @mouseleave="leave()">
      Virement
    </label>
  </div>
    <span :style="{transform:`translate(${spanPosition}px,-5px)`, width:`${spanWidth}px`}" id="bar"></span>
  <div id="descriptifs">
    <div id="paypal " v-if="selected==0">
      <paypal :saveFacture="saveF" :sc="sendingCommand"></paypal>
    </div>
    <div id="Cheque " v-if="selected==1">
      La commande vous sera aussi tôt le chèque reçu.
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




</template>
<script>
import paypal from "../forms/paypal";

export default {
  name: "payementSelect",
  data: function(){
    return {
      spanPosition : 0,
      selected : 0,
      spanWidth: 58
    }
  },
  components:{ paypal },
  mounted() {
    this.spanPosition = document.querySelectorAll("label")[0].getBoundingClientRect().left
    },
  methods: {
    enter: function (i){
      const labels = document.querySelectorAll("label");
      this.spanWidth = labels[i].getBoundingClientRect().right - labels[i].getBoundingClientRect().left
      this.spanPosition = labels[i].getBoundingClientRect().left;
    },
    setSelected: function(i){
      this.selected = i;
    },
    leave: function(){
      const labels = document.querySelectorAll("label");
      this.spanWidth = labels[this.selected].getBoundingClientRect().right - labels[this.selected].getBoundingClientRect().left
      this.spanPosition = labels[this.selected].getBoundingClientRect().left;
    }
  },
  props:{
    test:Function,
    saveF:Function,
    sendingCommand:Function
  }
}
</script>

<style scoped>
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
}
span{
  display: block;
  position: absolute;
  height: 2px;
  width: 60px;
  background-color: #078A6C;
  transition: .5s ease;
  z-index: -1;
}
#menu {
  position: relative;
  left: 50%;
  transform:translateX(-50%);
  width: 50%;
  display: flex;
  justify-content: space-between;
}
#descriptifs{
  width: 50%;
  position: relative;
  left: 50%;
  transform:translateX(-50%);
}
#descriptifs > div{
  padding: 15px 0;
}
</style>