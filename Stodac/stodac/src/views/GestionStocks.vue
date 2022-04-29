<template>
  <div>
    <div v-for="item in $store.state.stuffs" :key="item._id" id="product">
      <test :produit="item"/>
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

  },
  components:{
    test : produitAdminLite
  }
}
</script>

<style scoped>
#product{
  margin-top: 70px;
}
</style>