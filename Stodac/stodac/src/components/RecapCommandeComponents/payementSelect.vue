<template>
  <div id="menu">
    <input type="radio" id="Paypal" name="payement" checked>
    <label for="Paypal" @click="setSelected(3)" @mouseenter="enter(3)" @mouseleave="leave()">
      Paypal
    </label>

    <input type="radio" id="cheque" name="payement">
    <label for="cheque" @click="setSelected(4 )" @mouseenter="enter(4)" @mouseleave="leave()">
      Cheque
    </label>

    <input type="radio" id="virement" name="payement">
    <label for="virement" @click="setSelected(5)" @mouseenter="enter(5)" @mouseleave="leave()">
      Virement
    </label>
  </div>
    <span :style="{transform:`translate(${spanPosition}px,-5px)`, width:`${spanWidth}px`}" id="bar"></span>
  <div id="descriptifs">
    <div id="paypal " v-if="selected==3">
      La commande vous sera envoyée aussitôt le payement effectué.
    </div>
    <div id="Cheque " v-if="selected==4">
      La commande vous sera aussi tôt le chèque reçu.
    </div>
    <div id="virement " v-if="selected==5">
      La commande vous sera envoyée aussitôt le virement effectué.
    </div>
  </div>




</template>
<script>
export default {
  name: "payementSelect",
  data: function(){
    return {
      spanPosition : 0,
      selected : 3,
      spanWidth: 65
    }
  },
  mounted() {
    this.spanPosition = document.querySelectorAll("label")[3].getBoundingClientRect().left
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
  }
}
</script>

<style scoped>
input[type="radio"]{
  display: none;
}
label{
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  font-size: 1.2em;
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