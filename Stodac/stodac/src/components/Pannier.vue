<template>
  <div class="card">
    <button id="close" @click="croix()">
      <div></div>
      <div></div>
    </button>
    <h1 style="text-align:center">Panier</h1>
      <li  v-for="(article, i) in $store.state.pannier" :key="article">
          <div class="Produit">
              <img :src="article.article.img" alt="">
              <div class="txts">
                  <span class="product-name">{{article.article.name}}</span><br>
                  <span class="product-price" style="color:#419D79;font-weight:bold">{{Math.round( article.article.price* article.qty * 100) / 100}}€</span>
              </div>
              <div class="qty">
                <button class="qty_button" id=plus @click="more(i, article.article._id)">
                  <div id="plus_vertical"></div>
                  <div class="plus_horizontal"></div>
                </button>
                <input type="number" v-model="$store.state.pannier[i].qty" id="qty" min="1" :max="article.article.qty" @keyup="majLS()"/>
                <button class="qty_button" @click="less(i, article.article._id)">
                  <div class="plus_horizontal"></div>
                </button>
              </div>
                <button class="supr" @click="supr(article.article)">
                  <div></div>
                  <div></div>
                </button>
          </div>
      </li>
    <div id="total">
      <div>
        Sous total :
      </div>
      <div>
       {{ countTTL }} €
      </div>
    </div>
    <div id="actions" v-if="$store.state.pannier.length !== 0">
          <a href="/">Continuer mes achats</a>
          <button class="button" @click="push()">Commander</button>
    </div>
    <p style="text-align:center;" v-if="$store.state.pannier.length === 0">Votre panier est vide</p>

  </div>
</template>

<script>
export default {
  name: 'pannier',
  data: function () {
    return {
      articles: [],
      qty: [],
      ttl: 0
    }
  },
  methods: {
    croix: function(){
      this.$parent.closePannier();
    },
    more : function(i, a){
      console.log(i, a)
      if(this.$store.state.pannier[i].qty<this.$store.state.pannier[i].article.qty){
        this.$store.dispatch("addOne",a)
      }
    },
    less : function(i, a){
      if(this.$store.state.pannier[i].qty>1){
        this.$store.dispatch("lessOne",a)
      }
    },
    supr : function(a){
      this.$store.dispatch("suprPannier", a)
      console.log(a)
    },
    majLS : function(){
      localStorage.setItem('pannier', JSON.stringify(this.$store.state.pannier));
    },
    push : function(){
      this.$router.push('/commande');
      this.$parent.closePannier();
    }
  },
  computed : {
    countTTL: function() {
      let buffer = 0;
      this.$store.state.pannier.forEach(e => {
        buffer += e.article.price * e.qty
      })
      return Math.round(buffer * 100) / 100
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap');
#total {
  display: flex;
  justify-content: space-between;
  font-weight: 800;
  font-size: 15px;
  padding: 10px 0;
}
#actions .button{
  width: 40%;
}
#actions a{
  color: #078A6C;
  cursor: pointer;
}
#actions{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#qty  {
  font-family: 'Segoe UI', sans-serif;
  width: 40px;
  height: 40px;
  border: solid #419D79 2px;
  border-radius: 10px;
  font-size: 1.5em;
  text-align: center;
}
.qty{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items:center;
  width: 50px;
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
  cursor: pointer;
}
.supr{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  background-color: #fff;
  border-radius: 5px;
  transition: .4s background-color;
  border: solid 2px #A1A1A1;
  cursor: pointer;
}
#plus_vertical{
  height: 17px;
  width: 2.5px;
  background-color: #FFFFFF;
  border-radius: 5px;
  position: absolute;
}
.plus_horizontal{
  height: 2.5px;
  width: 17px;
  background-color: #FFFFFF;
  border-radius: 5px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.Produit{
    display: flex;
    flex-direction:row;
    justify-content: space-between;
    align-items: center;
    margin: 15px 0 ;
    margin-left: 10px;
  opacity: 0;
    animation: apearItem .4s ease-out 0s 1 forwards;
}
.Produit:nth-child(1){
  animation-delay: .2s;
}
img{
    object-fit: cover;
    width: 120px;
    margin-right: 10px;
    height: 100px;
}
ul{
    list-style: none;
}
li{
     border-radius: 10px;
    transition: .5s;
  list-style: none;
}
li:hover{
    background-color: #e3e3e3;
    transition: .5s;
}
  .form-row {
    display: flex;
    margin: 16px 0;
    gap:16px;
    flex-wrap: wrap;
  }

  .form-row__input {
    padding:8px;
    border: none;
    border-radius: 8px;
    background:#f2f2f2;
    font-weight: 500;
    font-size: 16px;
    flex:1;
    min-width: 100px;
    color: black;
  }

  .form-row__input::placeholder {
    color:#aaaaaa;
  }

* {
  font-family: 'Poppins', sans-serif;
  margin:0;
  padding: 0;
  box-sizing: border-box;
}
#close{
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  background-color: #F1F1F1;
  border:none;
  cursor:pointer;
  transition: .4s background-color;
}
#close:hover{
  background-color: #E1E1E1;
}
#close div{
  width: 2.5px;
  height: 15px;
  background-color: #A1A1A1;
  border-radius: 2px;
  position: absolute;
  top : 5px;
  left  : 10.5px;
}
.supr div{
  width: 2.5px;
  height: 15px;
  background-color: #A1A1A1;
  border-radius: 2px;
  position: absolute;
}
#close div:nth-child(1){
  transform:rotate(45deg);
}
#close div:nth-child(2){
  transform:rotate(-45deg);
}
.supr div:nth-child(1){
  transform:rotate(45deg);
}
.supr div:nth-child(2){
  transform:rotate(-45deg);
}

.card {
  position:fixed;
  z-index: 4;
  top: 70px;
  right: 25px;
  max-width: 100%;
  width: 400px;
  background:#ffffffA0;
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding:32px;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  transform-origin: top;
  animation: apearCard .5s ease;
}

.card__title {
  text-align:center;
  font-weight: 800;
}

.card__subtitle {
  text-align: center;
  color:#666;
  font-weight: 500;
}

.button {
  background: #419D79;
  color:white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 100%;
  padding: 16px;
  transition: .4s background-color;
}

  .card__action {
    color:#419D79;
    text-decoration: underline;
  }

  .card__action:hover {
    cursor:pointer;
  }

  .button:hover {
    cursor:pointer;
    background: #078A6C;
  }

  .button--disabled {
    background:#cecece;
    color:#ececec
  }
  .button--disabled:hover {
    cursor:not-allowed;
    background:#cecece;
  }


@keyframes apearItem {
  from{
  opacity: 0;
  transform: translateX(-30px);
  }
  to  {
  opacity: 1;
  transform: translateY(0px);
  }
}
@keyframes apearCard {
  0%{
    transform: scaleY(0);
  }
  100%{
    transform: scaleY(1);
  }
}
@media (max-width: 650px) {
  .card{
    right:0;
    width: 100vw;
  }
}
</style>