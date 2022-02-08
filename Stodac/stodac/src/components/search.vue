<template>
  <div id="search">
    <input v-model="word" type="text" placeholder="Rechercher dans notre catalogue" @click="clicked()" @keyup="results()" @keyup.enter="search()">
    <div id="print" v-if="isSearch">
      <!--<ul  >-->
      <transition-group name="result" tag="ul" v-if="resultArray[0]">
        <li  v-for="result in resultArray" :key="result" @click="pushToID(result)">
          <div class="Produit">
            <img :src="result.img" alt="">
            <div class="txts">
              <span class="product-name">{{result.name}}</span><br>
              <span class="product-category">{{result.category}}</span><br>
              <span class="product-price">{{result.price}}</span>
            </div>
          </div>
        </li>
      </transition-group>
      <!--</ul>-->
    </div>
    <button v-if="resultArray[0] && isSearch" @click="search()">
      <span>Afficher tous les résultats</span>
    </button>
    <div id="noResult" v-if="word && !resultArray[0]"> Aucuns résultats </div>
  </div>


</template>

<script>
const axios = require("axios") ;
export default {
  name : 'search',
  data: function(){
    return {
      word: '',
      isSearch : false,
      resultArray: []
    }
  },
  methods:{
    search : function () {
      if(this.word){
        this.$store.dispatch('getStuffByFirstLetters', this.word)
            .then(this.isSearch = false)
            .catch("ERREUR REQUEST")
      }else{
        this.$store.dispatch('getStufs', 1)
            .then(this.isSearch = false)
            .catch("ERREUR REQUEST")
        this.$store.dispatch('getStuffNb')
            .then(this.isSearch = false)
            .catch("ERREUR REQUEST")
      }
    },
    clicked: function(){
      this.isSearch = true;
    },
    results : function(){
      if(this.word){
        axios.get(`http://localhost:3000/api/stuff/name/${this.word}/4`)
            .then((response)=>{
              this.resultArray =  response.data
              console.log(this.resultArray)
            })
            .catch((error)=>{
              console.log(error)
            })
      }
    },
    close: function (){
      this.isSearch = false
    },
    pushToID : function(item){
      this.$router.push(`/produit/${item._id}`);
    }
  }

}
</script>

<style scoped>
.product-category{
  font-size: .8em;
}
.product-name{
  font-size: 1.2em;
}
.product-price{
  color: #007057;
  font-weight : bold;
}
* {
  font-family: 'Segoe UI', sans-serif;
}
#noResult{
  padding: 10px;
}
.Produit{
  display: flex;
  flex-direction:row;
  margin: 15px 0 15px 10px;
}
img{
  object-fit: cover;
  width: 100px;
  margin-right: 10px;
  height: 100px;
}
#search {
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  background-color: #ffffff;
  border-radius: 10px;
  width: 400px;
  position: absolute;
  top: 185px;
  left : 60px;
}
input {
  padding: 10px;
  width: 400px;
  border-radius: 10px;
  font-size: 1em;
  border: none;
  border-bottom: solid  1px #C3C3C3;
}
#print{
  overflow-y: scroll;
  max-height: 250px;
}
button{
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1em;
  padding: 10px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  margin: 10px 0;
}
button:hover{
  background-color: #C3C3C3;
}
ul{
  list-style: none;
}
li{
  cursor:pointer;
  border-radius: 10px;
  transition: .5s;
}
li:hover{
  background-color: #e3e3e3;
  transition: .5s;
}


.result-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}
.result-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.result-enter-active {
  transition: all .4s ease .4s;
}
.result-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.result-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
.result-leave-active {
  transition: all .4s ease;
}
.result-move{
  transition: all 1s ease;
}
@media(max-width: 950px){
  input{
    width: 80vw;
  }
}
</style>