<template>
  <div id="produit">
    <div class="contain-img">
      <img :src="produit.img" :alt="produit.name" srcset="">
    </div>
    <div class="product-info">
        <p class="product-name">{{produit.name}}</p>
        <p class="product-category">{{produit.category}}</p>
        <p class="product-price">{{produit.price}}€</p>
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
  padding-left: 5px;
  margin-bottom: 20px;
}
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
.contain-img{
  width: 250px;
  overflow:hidden;
  margin-bottom: 20px;
}
img{
  width: 250px;
  object-fit: cover;
  height: 190px;
  display: inline;
}
</style>