<template>
  <div class="produit">
    <div class="contain-img">
      <img :src="produit.img" :alt="produit.name">
    </div>
    <div class="product-info">
      <p class="product-name">{{produit.name}}</p>
      <p class="product-category">{{produit.category}}</p>
      <div class="product-price">
        <p v-if="produit.qty>0">En stock : {{ produit.qty }} pièces</p>
        <p v-else style="color: #F18F01">Rupture de stock</p>
        <p>{{produit.price}}€</p>
      </div>
    </div>
    <div class="btns">
      <button @click="change">Modifier</button>
      <button @click="remove">Supprimer</button>
    </div>
    <div v-if="isDelete" class="del"> <p> l'article à été suprimé</p></div>
    <!--<div v-if="isDelete" class="del"> <p> Une erreur est survenue</p></div>-->
  </div>
</template>

<script>
export default {
  name: "produitAdminLite",
  data:()=>{
    return{
      isDelete : false,
      error: false
    }
  },
  props : {
    produit: Object
  },
  methods:{
    change : function (){
      this.$router.push(`/modifier/${this.produit._id}`)
    },
    remove : function(){
      this.$store.dispatch('removeProduct', this.produit._id)
          .then(()=>{
            this.isDelete = true
          })
          .catch(()=>{
            this.error = true
          })

    }
  }
}
</script>

<style scoped>
img {
  height: 150px;
}
.product-category{
  font-size: 1em;
}
.product-name{
  font-size: 1.4em;
}
.product-price{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 50px;
  color: #007057;
  font-weight : bold;
}
.product-info{
margin-left: 10px;
}
button {
  margin-right: 20px;
}
.del{
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  width : 100%;
  height: 100%;
  background-color: #aaaaaa55;
}
.del>p{
  background-color:#f08080;
  padding: 5px;
}
.produit{
  display: flex;
  position: relative  ;
  align-items: center;
  justify-content: space-between;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width : 80%
}

</style>