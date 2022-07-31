<template>
  <div id="container">

  <div id="menu">
    <input type="radio" id="domicile" value="domicile" v-model="selectedRadio" @change="test('Domicile')" name="livraison" checked>
    <label for="domicile" @click="setSelected(0)" :class="{selected: selectedL  === 0}">
      <img src="../../assets/Livraison/house.svg" alt="house"> Livraison à domicile
    </label>

    <input type="radio" id="pntRelais" value="pnrRelais" v-model="selectedRadio" @change="test('Point Relais')" name="livraison">
    <label for="pntRelais" @click="setSelected(1 )" :class="{selected: selectedL === 1}">
      <img src="../../assets/Livraison/pnt-relais.svg" style="width: 20px;height: 24px" alt="pnt"> Point relais
    </label>

    <input type="radio" id="retrait" value="retrait" v-model="selectedRadio" @change="test('Sur Place')" name="livraison">
    <label for="retrait" @click="setSelected(2)" :class="{selected: selectedL===2}">
      <img src="../../assets/Livraison/sur-place.svg" alt="house"> Retirer sur place
    </label>
  </div>
  <div id="descriptifsLivraison">
    <div id="ld " v-if="selectedL==0">
      <adress ref="adresse"/>
    </div>
    <div id="lpr " v-if="selectedL==1">
      <ptnrelais/>
    </div>
    <div id="sp" v-if="selectedL==2">
      Vous pouvez retirer votre commande dans nos locaux à Damelevières, 54360.
    </div>
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
      selectedL : 0,
      selectedRadio:''
    }
  },
  components:{
    adress,
    ptnrelais
  },
  mounted() {

    },
  methods: {
    setSelected: function(i){
        this.selectedL = i;
    },
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
#container{
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  width: 800px;
}
label{
  font-family: 'Poppins', sans-serif;
  padding: 9px ;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.1em;
  font-weight: bolder;
  transition: background-color .5s;
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
#descriptifsLivraison{
  width: 500px;
  padding-left: 10px;
}
img {
  height: 24px;
  width: 24px;
  object-fit: cover;
}

@media (max-width: 850px) {
  label{
    font-size: 12px;
  }
  #menu{
    width: 80vw;
    height: 24px;
    flex-direction: row;
  }
  #descriptifsLivraison{
    margin-top: 40px;

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
  #sp{
    width: 290px;
  }
}


</style>