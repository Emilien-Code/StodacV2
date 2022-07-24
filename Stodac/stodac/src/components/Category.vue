<template>
  <div id="category" v-clickOutside="close">
    <button @click="isCategoryClicked()">{{nameCategory}}
      <span :class="{selectedArrow: clicked, unselectedArrow:!clicked}"></span>
    </button>
    <div id="test" v-if="clicked">
      <ul>
        <li v-for="(cat,index) in category" :key="index" @click="isSelected(index)" :class="{'selected' : selection[index]}">{{cat}}</li>
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
  name:"category",
  data : function(){
    return{
      clicked : false,
      selection: [],
      category: [],
      nameCategory : 'Catégories'
    }
  },
  methods: {
    isSelected:function(index){
      for(let i = 0; i<13; i++){
        this.selection[i] = false
      }
      this.selection[index] = true;
      this.getByCategory(this.category[index]);
      this.nameCategory = this.category[index]
      this.clicked = false;
    },
    isCategoryClicked: function(){
      this.clicked = !this.clicked;
    },
    getByCategory: function(category){
      if(category !== 'Catégories'){
        console.log('catégory selected', category)
        this.$store.dispatch('getStufsCategory', category)
            .then(this.noItems = 1)
            .catch(this.noItems = 0)
      }else{
        this.$store.dispatch('getStufs')
      }
    },
    close: function(){
      this.clicked = false
    }
  },
  mounted() {
    axios.get('http://192.168.1.51:3000/api/stuff/categories').then((response)=>{this.category = response.data;})
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
@import url('http://fonts.cdnfonts.com/css/segoe-ui-4');
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
#category{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #ffffffA0;
  backdrop-filter: blur(20px);
  position: absolute;
  top: 260px;
  right: 50px;
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
#category::-webkit-scrollbar {
  width: 0px;               /* width of the entire scrollbar */
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