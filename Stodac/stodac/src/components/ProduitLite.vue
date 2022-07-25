<template>
  <div id="produit">
    <div class="contain-img">
      <img :src="produit.img" :alt="produit.name" id="img" class="testtest" srcset="">
      <div v-if="!isPictureLoaded" id="imgLoader"></div>
      <span id="description">{{produit.description}}</span>
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
        <p>{{produit.price}}€ <span id="ttc">TTC</span></p>
      </div>
      </div>
    </div>
</template>
<script>


export default {
  name: 'produit',
  data : ()=>{
    return{
      isPictureLoaded: false,
    }
  },
  props : {
    produit: Object,
    id : Number
  },
  mounted() {
    const img = document.getElementsByClassName("testtest")
    img[this.id].style.display = "none"
    img[this.id].addEventListener("load",()=>{
      this.isPictureLoaded = true;
      img[this.id].style.display = "block"
    })
    document.getElementById("imgLoader").style.animationDelay = this.id + 1 + 's'
    document.getElementById("imgLoader").style.webkitAnimationDelay = this.id + 1  + 's'
  }

}
</script>
<style scoped>
@import url('https://fonts.cdnfonts.com/css/segoe-ui-4');
.product-info{
  padding: 5px;
  margin-bottom: 20px;
}
.product-category{
  font-size: .8em;
}
.product-name{
  font-size: 1em;
  font-weight: bold;
  padding-right: 17px;
}
.product-price{
  display: flex;
  justify-content: space-between;
  color: #007057;
  width: 300px;
  font-weight : bold;
  padding-right: 17px;
}
#ttc  {
  font-size: .8em;
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
#imgLoader::before{
  content: " ";
  width: 100%;
  height: 250px;
  background-color: #ffffff;
}
#imgLoader{
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 250px;
  background-size: 100% 104px;
  animation: wave 3s infinite linear forwards;
  -webkit-animation:wave 3s infinite linear forwards;
  background: #f6f7f8;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
}
img{
  z-index: 0;
  width: 300px;
  height: 250px;
  object-fit: cover;
  display: inline;
  transition: .5s ease ;
}
#produit{
  width: 300px;
  height: 415px;
}
#description{
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
#produit:hover #description{
  transition: .5s ease ;
  opacity: 1;
}
#produit:hover button {
  opacity: 1;
  transition: .5s ease;
}
.disponibility{
  position: relative;
  bottom: 7px;
  font-size: .7em;
}
@keyframes wave{
  0%{
    background-position: -468px 0
  }
  100%{
    background-position: 468px 0
  }
}

@-webkit-keyframes wave{
  0%{
    background-position: -468px 0
  }
  100%{
    background-position: 468px 0
  }
}
</style>