<template>
    <div id="home">
      <BrandSlider/>
      <div id="precisions">
        <search/>
        <Category/>
        <Manufacturer/>
      </div>
      <div id="stuff-container">
        <div id="stuff-wrapper">
            <div v-for="item in $store.state.stuffs" :key="item._id" class="product" tabindex="0">
              <ProduitLite class="Products" :produit="item" @click="pushToID(item)"/>
            </div>
          <p v-if="noItems">Aucun article dans cette catégorie</p>
        </div>
      </div>

      <div id="buttons_wrapper">
        <div id="buttons">
          <button v-if="$store.state.nbStuff.nb > 20 && !recherche" @click="loadMore(1)">1</button>
          <button v-if="$store.state.nbStuff.nb > 20 && !recherche" @click="loadMore(2)">2</button>
          <button v-if="$store.state.nbStuff.nb > 40 && !recherche" @click="loadMore(3)">3</button>
          <button v-if="$store.state.nbStuff.nb > 60 && !recherche" @click="loadMore(4)">4</button>
          <button v-if="$store.state.nbStuff.nb > 80 && !recherche" @click="loadMore(5)">5</button>
          <button v-if="$store.state.nbStuff.nb > 100 && !recherche" @click="loadMore(6)">6</button>
          <button v-if="$store.state.nbStuff.nb > 120 && !recherche" @click="loadMore(7)">7</button>
        </div>
      </div>

    </div>

  <Transition>

  <loader v-if="isLoading"/>
  </Transition>

</template>

<script>
import ProduitLite from '../components/ProduitLite.vue'
import BrandSlider from '../components/BrandSlider.vue'
import Category from '../components/Category.vue'
import Manufacturer from '../components/manufacturer.vue'
import search from '../components/search.vue'
import loader from '../components/loader'
// @ is an alias to /src

export default {
  name: 'Home',
  data: function(){
    return{
      noItems: 0,
      recherche: false,
      areDataLoading:true
    }
  },
  components: {
    ProduitLite,
    Category,
    Manufacturer,
    search,
    loader,
    BrandSlider

  },
  mounted() {
    this.$store.dispatch('getStufs', 1)
      //.then(()=>{ console.log("Stuffs loaded")})
      .catch(()=>{ console.log('Impossible de charger les Stuffs')})
    this.$store.dispatch('getStuffNb')
      //.then(()=>{console.log('nbStuff chargé')})
      .catch(()=>{console.log('Impossible de charger le nombre Stuffs')})
  },
  methods:{
    pushToID : function(item){
        this.$router.push(`/produit/${item._id}`);
    },
    loadMore : function(nb){
      this.nbLoadMore++;
      this.$store.dispatch('getStufs', nb)
      //.then(()=>{console.log('Stuffs chargés')})
      .catch(()=>{console.log('Impossible de charger les Stuffs')})
    }
  },
  computed:{
    isLoading:function (){
      if(this.$store.state.stuffs!=0) {
        return false;
      }
      return true
    }
  }
}
</script>
 <style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#precision{
  height: 20px;
}
#category, #manufacturer{
  margin-top: 15px ;
}
#stuff-container{
  width: 100vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
}
#stuff-wrapper{
  width: 85vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.product{
  margin: 10px 10px ;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  border-radius: 10px;
  cursor: pointer;
  overflow:hidden;
  width: 20%;
  min-width: 250px;
  max-width: 300px;
}
@media (max-width: 1200px) {
  .product{
    margin: 5px 5px ;
  }
  #stuff-wrapper{
    margin: 0;
    padding: 0;
  }
}
#buttons_wrapper{
  width: 100vw;
  display: flex;
  align-items: center ;
  justify-content: center;
}
button{
  width: 50px;
  height: 50px;
  margin-left: 10px;
  border-radius: 10px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  background-color:#ffffff ;
  cursor: pointer;
  transition: .5s;
}
button:hover{
  background: #e3e3e3;
  transition: .5s;
}
#search{
  z-index: 1;
}
#precisions{
  width: 100vw;
  height: 10px;
}
@media (max-width: 950px){
  #stuff-wrapper{
    margin-top: 80px;
  }
  #search{
    margin-top: 50px;
    left: 10vw;
    width: 80vw;
  }
  svg{
    top: 245px;
    left : 80vw;
  }
  #category, #manufacturer{
    width: 30vw;
  }
  #category{
    left: 50%;
    transform: translateX(10%);
  }
  #manufacturer{
    left:50%;
    transform: translateX(-110%);
  }
}


/************** transitions **************/

#stuff-wrapper div:nth-child(1){
  animation-delay: .1s;
}
#stuff-wrapper div:nth-child(2){
  animation-delay: .15s;
}
#stuff-wrapper div:nth-child(3){
  animation-delay: .2s;
}
#stuff-wrapper div:nth-child(4){
  animation-delay: .25s;
}
#stuff-wrapper div:nth-child(5){
  animation-delay: .3s;
}
#stuff-wrapper div:nth-child(6){
  animation-delay: .35s;
}
#stuff-wrapper div:nth-child(7){
  animation-delay: .4s;
}
#stuff-wrapper div:nth-child(8){
  animation-delay: .45s;
}
#stuff-wrapper div:nth-child(9){
  animation-delay: .5s;
}
#stuff-wrapper div:nth-child(10){
  animation-delay: .55s;
}

#stuff-wrapper div{
  opacity: 0;
  animation: .5s apear;
  animation-fill-mode: forwards;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
@keyframes apear{
  0%{
    opacity: 0;
    transform: translateY(-30px);
  }
  100%{
    opacity: 1;
    transform: translateY(0);
  }
}
 </style>