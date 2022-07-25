<template>
  <div id="manufacturer" v-clickOutside="close">
    <button @click="isClicked()">{{nameMarque}}
      <span :class="{selectedArrow: clicked, unselectedArrow:!clicked}"></span>
    </button>
    <div id="test" v-if="clicked">
      <ul>
        <li v-for="(man, index) in manufacture" @click="isSelected(index)" :key="index" :class="{'selected' : selection[index]}">{{man}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
const axios = require('axios');
let clickOutside = function(el, binding) {
  el.clickOutsideEvent = function (event) {
    if (!el.contains(event.target)) {
      binding.value()
    }
  };
  document.body.addEventListener('click', el.clickOutsideEvent)
}
export default {
  name:"manufacturer",
  data : function(){
    return{
      clicked : false,
      selection: [],
      manufacture: [],
      nameMarque : 'Marques'
    }
  },
  methods: {
    isSelected:function(index){
      for(let i = 0; i<22; i++){
        this.selection[i] = false
      }
      this.selection[index] = true;
      this.getByManufacture(this.manufacture[index]);
      this.nameMarque = this.manufacture[index]
      this.clicked = false;
    },
    close: function(){
      this.clicked = false
    },
    isClicked: function(){
      this.clicked = !this.clicked;
    },
    getByManufacture: function(manufacture){
      if(manufacture !== 'Marques'){
        this.$store.dispatch('getStufsManufacture', manufacture)
            .then(this.noItems = 1)
            .catch(this.noItems = 0)
      }else{
        this.$store.dispatch('getStufs')
      }
    }
  },
  mounted() {
    axios.get('https://stodac.fr/api/stuff/manufacturer')
        .then((response)=>{
          this.manufacture = response.data;
        })
  },
  directives:{
    clickOutside
  }
}
</script>

<style scoped>
.selectedArrow{
  display: block;
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #ffffff00;
  border-bottom: #2c3e50 solid 2px ;
  border-right: #2c3e50 solid 2px ;
  top: 13px;
  left: 90%;
  transform-origin: center;
  transform: translateY(3px) rotateZ(225deg);
  transition: .5s ease;
}
.unselectedArrow{
  display: block;
  position: absolute;
  width: 10px;
  height: 10px;
  border-bottom: #2c3e50 solid 2px ;
  border-right: #2c3e50 solid 2px ;
  top: 13px;
  left: 90%;
  transform-origin: center;
  transform: rotateZ(45deg);
  transition: .5s ease;
}
@import url('https://fonts.cdnfonts.com/css/segoe-ui-4');
div{
  max-height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;

}
button{
  text-align: start;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 10px;
  background-color: #ffffff;
  font-size: 1em;
  color: #2c3e50;
  cursor: pointer;
}
#manufacturer{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #ffffffA0;
  backdrop-filter: blur(20px);
  top: 260px;
  right : 280px;
  position: absolute;
  width: 200px;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  cursor: pointer;
  border-radius: 10px;
  transition: height 0.5s ease-out;
  z-index: 2;
  user-select: none;
}
li{
  padding: 10px;
  border-radius: 10px;
  list-style: none;
}
button:hover, li:hover{
  background-color: rgba(0, 0, 0, 0.24);
}
.selected{
  background-color: rgba(0, 0, 0, 0.24);
}
#test::-webkit-scrollbar {
  width: 5px;               /* width of the entire scrollbar */
}
#manufacturer::-webkit-scrollbar {
  width: 0px;
}
#test::-webkit-scrollbar-track {
  background: none;        /* color of the tracking area */
  border-radius: 20px;       /* roundness of the scroll thumb */

}

#test::-webkit-scrollbar-thumb {
  background-color: #2c3e50;    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
}
</style>