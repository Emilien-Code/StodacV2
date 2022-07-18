<template>
  <div>
    <div v-for="item in $store.state.stuffs" :key="item._id" id="product">
      <test :produit="item"/>
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
</template>

<script>
import produitAdminLite from "../components/produitAdminLite";
export default {
  name: "produitAdminLite",
  mounted() {
      if(!this.$store.state.userInfos.admin){
        this.$router.push('/')
      }
      if(this.$store.state.user.userID === -1){
        this.$router.push('/login/gestionstocks');
      }
    this.$store.dispatch('getStufs', 1)
        .then(()=>{ console.log("Stuffs loaded")})
        .catch(()=>{ console.log('Impossible de charger les Stuffs')})
    this.$store.dispatch('getStuffNb')
        .then(()=>{console.log('nbStuff chargé')})
        .catch(()=>{console.log('Impossible de charger le nombre Stuffs')})
  },
  methods:{
    loadMore : function(nb){
      this.nbLoadMore++;
      this.$store.dispatch('getStufs', nb)
          .then(()=>{console.log('Stuffs chargés')})
          .catch(()=>{console.log('Impossible de charger les Stuffs')})
    }
  },
  components:{
    test : produitAdminLite
  }
}
</script>

<style scoped>
#buttons_wrapper{
  width: 100vw;
  display: flex;
  align-items: center ;
  justify-content: center;
}
#product{
  margin-top: 70px;
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
</style>