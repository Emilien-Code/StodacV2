<template>
  <div id="manufacturer">
    <button @click="isClicked()">{{nameMarque}}</button>
    <div v-if="clicked">
      <ul>
        <li v-for="(man, index) in manufacture" @click="isSelected(index)" :key="index" :class="{'selected' : selection[index]}">{{man}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
const axios = require('axios');
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
    axios.get('http://localhost:3000/api/stuff/manufacturer')
        .then((response)=>{
          this.manufacture = response.data;
        })
  }
}
</script>

<style scoped>
@import url('http://fonts.cdnfonts.com/css/segoe-ui-4');
div{
  max-height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;

}
button{
  text-align: start;
  padding: 10px;
  width: 200px;
  border: none;
  border-radius: 10px;
  background-color: #ffffff;
  font-size: 1em;
  color: #2c3e50;
}
#manufacturer{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #ffffff;
  top: 170px;
  right : 280px;
  position: absolute;
  width: 200px;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  cursor: pointer;
  border-radius: 10px;
  transition: height 0.5s ease-out;
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
</style>