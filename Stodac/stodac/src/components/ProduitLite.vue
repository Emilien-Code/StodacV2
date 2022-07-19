<template>
  <div id="produit">
    <div class="contain-img">
      <img :src="produit.img" :alt="produit.name" srcset="">
      <span>{{produit.description}}</span>
    </div>
    <div class="product-info">
        <p class="product-name">{{produit.name}}</p>
        <p class="product-category">{{produit.category}}</p>
      <div class="product-price">
        <div>

        <p v-if="produit.qty>0">En stock</p>
        <p v-else style="color: #F18F01">Rupture de stock </p>

        <p v-if="produit.qty<=0" class="disponibility" style="color: #F18F01; font-weight: normal ;">Disponible sur commande (délais 7 - 10 jours)</p>

        </div>
        <p>{{produit.price}}€</p>
      </div>
      </div>
    </div>
</template>
<script>


export default {
  name: 'produit',
  props : {
    produit: Object
  },

}
</script>
<style scoped>
@import url('http://fonts.cdnfonts.com/css/segoe-ui-4');
.product-info{
  padding: 5px;
  margin-bottom: 20px;
}
.product-category{
  font-size: .8em;
}
.product-name{
  font-size: 1.2em;
}
.product-price{
  display: flex;
  justify-content: space-between;
  color: #007057;
  font-weight : bold;
  padding-right: 17px;
}
p{
  padding: 5px 0;
}
* {
  font-family: 'Segoe UI', sans-serif;
}
.contain-img{
  overflow:hidden;
  margin-bottom: 20px;
}
img{
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: inline;
  transition: .5s ease ;
}
#produit{
  width: 270px;
  height: 380px;
}
span{
  display: block;
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 250px;
  white-space: normal;
  top: 0;
  left: 0;
  padding: 1rem;
  color: black;
  font-size: calc(0.95rem + 20%);
  text-align: justify;
  opacity: 0;
  overflow: hidden;
}
#produit:hover img{
  transition: .5s ease ;
  filter: blur(1000px);
}
#produit:hover span{
  transition: .5s ease ;
  opacity: 1;
}
#produit:hover button {
  opacity: 1;
  transition: .5s ease;
}
.disponibility{
  position: absolute;
  bottom: 10px;
  font-size: .7em;
}
</style>