<template>
  <div id="category">
    <button @click="isCategoryClicked()">{{nameCategory}}</button>
    <div v-if="clicked">
      <ul>
        <li v-for="(cat,index) in category" :key="index" @click="isSelected(index)" :class="{'selected' : selection[index]}">{{cat}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
const axios = require('axios');
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
    }
  },
  mounted() {
    axios.get('http://localhost:3000/api/stuff/categories').then((response)=>{this.category = response.data;})
  }
}
</script>

<style scoped>
@import url('http://fonts.cdnfonts.com/css/segoe-ui-4');
div{
  max-height: 500px;
  overflow-y: scroll;
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
#category{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #ffffff;
  position: absolute;
  top: 170px;
  right: 50px;
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