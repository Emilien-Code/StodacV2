<template>

    <div  v-for="(article, i) in $store.state.pannier" :key="article" :data-index="index">
      <div class="Produit">
        <img :src="article.article.img" alt="">
        <div class="txts">

          <span class="product-name"  style="color:#419D79;font-weight:bold">{{article.article.name}}</span><br>

          <p class="desc">{{$store.state.pannier[i].article.description}}</p>
        </div>

        <div class="qty">
          <div class="qty_button" id=plus @click="more(i, article.article._id)">
            <div id="plus_vertical"></div>
            <div class="plus_horizontal"></div>
          </div>
          <input type="number" v-model="$store.state.pannier[i].qty" id="qty" min="1" :max="article.article.qty" @keyup="majLS()"/>
          <div class="qty_button" @click="less(i, article.article._id)">
            <div class="plus_horizontal"></div>
          </div>
        </div>
        <div id="price">
          <span class="product-price">HT  : <span style="color:#419D79;font-weight:bold">{{Math.round( article.article.price/1.2* article.qty * 100) / 100}}€</span></span>
          <span class="product-price">TTC : <span style="color:#419D79;font-weight:bold">{{Math.round( article.article.price* article.qty * 100) / 100}}€</span></span>
        </div>

        <div class="supr" @click="supr(article.article)">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "recap",
  methods: {
    more: function (i, a) {
        this.$store.dispatch("addOne", a);
    },
    less: function (i, a) {
      if (this.$store.state.pannier[i].qty > 1) {
        this.$store.dispatch("lessOne", a)
      }
    },
    supr: function (a) {
      this.$store.dispatch("suprPannier", a)
      console.log(a)
    },
    majLS: function () {
      localStorage.setItem('pannier', JSON.stringify(this.$store.state.pannier));
    },
  }
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap');

*{
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.inputsContainer span{
  margin-left: 15px;
}




.Produit{
  display: flex;
  flex-direction:row;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0 ;
  margin-left: 10px;
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
.supr div{
  width: 2.5px;
  height: 15px;
  background-color: #A1A1A1;
  border-radius: 2px;
  position: absolute;
}
.supr div:nth-child(1){
  transform:rotate(45deg);
}
.supr div:nth-child(2){
  transform:rotate(-45deg);
}
#qty  {
  font-family: 'Segoe UI', sans-serif;
  margin: 10px;
  width: 40px;
  height: 40px;
  border: solid #419D79 2px;
  border-radius: 10px;
  font-size: 1.5em;
  text-align: center;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
img{
  object-fit: cover;
  width: 200px;
  margin-right: 10px;
  height: 150px;
}
ul,li{
  list-style: none;
}
.desc{
  width: 300px;
  font-size: smaller;
}
.product-price{
  margin: 0 10px;
}
.PContainer li{
  margin-bottom: 15px;
}
.product-price:nth-child(1) span{
  margin-left: 9px;
}

#price{
  display: flex;
  flex-direction: column;
}

@media (max-width: 685px) {
  .Produit {
    flex-direction: column;
  }

  .qty {
    flex-direction: row-reverse;
  }
}
</style>