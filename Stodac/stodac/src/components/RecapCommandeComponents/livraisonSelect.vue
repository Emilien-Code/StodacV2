<template>
  <div id="menu">
    <input type="radio" id="domicile" value="domicile" v-model="selectedRadio" @change="test('domicile')" name="livraison" checked>
    <label for="domicile" @click="setSelected(0)" @mouseenter="enter(0)" @mouseleave="leave()">
      Livraison à domicile
    </label>

    <input type="radio" id="pntRelais" value="pnrRelais" v-model="selectedRadio" @change="test('pointRelais')" name="livraison">
    <label for="pntRelais" @click="setSelected(1 )" @mouseenter="enter(1)" @mouseleave="leave()">
      Point relais
    </label>

    <input type="radio" id="retrait" value="retrait" v-model="selectedRadio" @change="test('surPlace')" name="livraison">
    <label for="retrait" @click="setSelected(2)" @mouseenter="enter(2)" @mouseleave="leave()">
      Retirer sur place
    </label>
  </div>
    <span :style="{transform:`translate(${spanPositionL}px,-5px)`, width:`${spanWidthL}px`}"></span>
  <div id="descriptifsLivraison">
    <div id="ld " v-if="selectedL==0">
      <adress ref="adresse"/>
    </div>
    <div id="lpr " v-if="selectedL==1">
      <ptnrelais/>
    </div>
    <div id="sp " v-if="selectedL==2">
      Vous pouvez retirer votre commande dans nos locaux à Damelevières, 54360.
    </div>
  </div>




</template>
<script>
import adress from "../forms/adress";
import ptnrelais from "../forms/ptnrelais";
export default {
  name: "payementSelect",
  data: function(){
    return {
      spanPositionL : 0,
      selectedL : 0,
      spanWidthL: 182,
      selectedRadio:''
    }
  },
  components:{
    adress,
    ptnrelais
  },
  mounted() {
    this.spanPositionL = document.querySelectorAll("label")[0].getBoundingClientRect().left
    },
  methods: {
    enter: function (i){
        const labels = document.querySelectorAll("label");
        this.spanWidthL = labels[i].getBoundingClientRect().right - labels[i].getBoundingClientRect().left
        this.spanPositionL = labels[i].getBoundingClientRect().left;
    },
    setSelected: function(i){
        this.selectedL = i;
    },
    leave: function(){
        const labels = document.querySelectorAll("label");
        this.spanWidthL = labels[this.selectedL].getBoundingClientRect().right - labels[this.selectedL].getBoundingClientRect().left
        this.spanPositionL = labels[this.selectedL].getBoundingClientRect().left;
    }
  },
  computed:{
    isAdressComplete:function(){
      return this.$refs.adresse.isComplete;
    }
  },
  props:{
    test:Function
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
  font-size: 1.1em;
  font-weight: bolder;
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
#descriptifsLivraison{
  width: 50%;
  position: relative;
  left: 50%;
  transform:translateX(-50%);
}
#descriptifsLivraison > div{
  padding: 15px 0;
}
</style>