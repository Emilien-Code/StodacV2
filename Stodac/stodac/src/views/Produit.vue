<template>
  <div id="Produit">
    <h1 id="name">{{ article.name }}</h1>
    <section id="Un">
      <img :src="article.img" alt="Image d'illustration">
      <div class="PriceAndInfos">
        <p class="title">Description</p>
        <p>{{article.description}}</p>
        <p><span class="title">Prix : </span>{{article.price}}€</p>
        <div class="container">
          <input type="number" v-model="qty" id="qty" min="1" :max="article.qty"/>
          <div class="more_less">
            <button class="qty_button" id=plus @click="more()">
              <span id="plus_vertical"></span>
              <span class="plus_horizontal"></span>
              </button>
            <button class="qty_button" @click="less()">
              <span class="plus_horizontal"></span>
            </button>
          </div>
          <button class="button" @click="addToPannier()">Ajouter au pannier</button>
        </div>
            <p v-if="this.qty > this.article.qty">{{article.qty}} article(s) en stock</p>
      </div>
    </section>
    <section id="deux">
      <p><span class="title">Modèles compatibles</span></p>
      <ul>
        <li v-for="compatibility in article.compatibility" :key="compatibility" ><p>{{compatibility}}</p></li>
      </ul>
    </section>
    <section id="trois">
      <p class="title">Fiche technique</p>
      <table style="font-size:1.4em">
        <tr>
          <td>Article</td>
          <td>{{article.name}}</td>
        </tr>
        <tr>
          <td>Fabriquant</td>
          <td>{{article.manufacturer}}</td>
        </tr>
        <tr>
          <td>Référence</td>
          <td>{{article.reference}}</td>
        </tr>
        <tr>
          <td>État du produit</td>
          <td>{{article.state}}</td>
        </tr>
      </table>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
const axios = require('axios')

export default {
  name: 'Produit',
  data: function(){ 
    return {
      articleId: this.$route.params.id,
      article: {},
      qty : 1
    }
  },
  methods:{
    more : function(){
      if(this.qty<this.article.qty){
        this.qty+=1;
      }
    },
    less : function(){
      if(this.qty>1){
        this.qty--;
      }
    },
    addToPannier : function(){
      const a = {'article' : this.article,'qty' : this.qty};
      this.$store.dispatch('addPannier', a)
    }
  },
  mounted(){
    window.top.scrollY = 0;
    axios.get(`http://localhost:3000/api/stuff/product/${this.articleId}`)
      .then((response)=>{
        this.article =  response.data[0]
      })
      .catch((error)=>{
        console.log(error)
      })
  }
}
</script>

<style scoped>
@import url('http://fonts.cdnfonts.com/css/segoe-ui-4');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap');
#Produit{
  margin-top: 80px;
}
li{
  list-style: none;
  margin-left: 50px;
}
#trois{
  padding: 10vw;
}
#deux{
  margin-top: 150px;
  padding: 10vw;
  background-color: #EFEFEF;
}
table{
  width: 80vw;
  min-width: 50%;
}

#qty  {
  font-family: 'Segoe UI', sans-serif;
  width: 55px;
  height: 55px;
  border: solid #419D79 2px;
  border-radius: 17.5px;
  margin-right: 10px;
  font-size: 1.5em;
  text-align: center;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
.container{
  display: flex;
}
#plus_vertical{
  height: 17px;
  width: 2.5px;
  background-color: #FFFFFF;
  border-radius: 10px;
  position: absolute;
}
.plus_horizontal{
  height: 2.5px;
  width: 17px;
  background-color: #FFFFFF;
  border-radius: 5px;
}
.more_less{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 55px;
  width: 25px;
  margin-right: 30px;
}
.qty_button{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  background-color: #419D78;
  border: none;
  border-radius: 5px;
  transition: .4s background-color;
}
.title{
  font-weight: bold;
  color: #007057;
}
p{
  margin-bottom : 30px;
  font-size: 1.4em;
}
h1{
  color: #007057;
  margin: 20px 0 20px 10vw;
}
*{
  font-family: 'Segoe UI', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
img{
  width: 40vw;
  max-height: 450px;
  object-fit: contain;
}
.PriceAndInfos{
  padding-left: 50px;
  width: 40vw;
}
section#Un{
  display: flex;
  justify-content: center;
}
.button {
  font-family: 'poppins', sans-serif;
  background: #419D79;
  color:white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 250px;
  padding: 16px;
  transition: .4s background-color;
}
button:hover {
  cursor:pointer;
  background: #078A6C;
}
@media(max-width: 800px ) {
  section#Un {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
  }

  .PriceAndInfos {
    width: 80vw;
    padding: 0;
    text-justify: inter-word;
  }
  #name{
    text-align: center;
  }

  img {
    width: 80vw;
  }
  li{
    margin:0;
  }
}
</style>