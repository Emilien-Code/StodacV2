<template>
  <div id="addItem">
    <div v-if="$store.state.userInfos.admin">
      <div>
        <span>Nom :</span>
        <input type="text" v-model="item.name">
      </div>
      <div>
        <span>Référence : </span>
        <input type="text" v-model="item.reference">
      </div>
      <div>
        <span>Marque :</span>
        <input type="text" v-model="item.manufacturer">
      </div>
      <div>
        <span>État : (neuf ou occasion) :</span>
        <input type="text" v-model="item.state">
      </div>
      <div>
        <span>Quantitée :</span>
        <input type="number" v-model="item.qty">
      </div>
      <div>
        <span>Prix :</span>
        <input type="number" v-model="item.price">
      </div>
      <div>
        <span>Poids :</span>
        <input type="number" v-model="item.poids">
      </div>
      <div>
        <span>Compatibilités :</span>
        <input type="text" v-model="item.compatibility[0]">
      </div><!-- VMODEL compatibility[0] -->
      <div>
        <span>Description : </span>
        <textarea v-model="item.description"></textarea>
      </div>
      <div>
        <span>Image : </span>
        <input type="file">
      </div>



      <button @click="create()">Ajouter</button>


    </div>
    <div v-else>Niveau d'accès trop bas pour acceder.</div>
  </div>
</template>

<script>
const axios = require('axios');
export default {
  name: "addItem",
  data : function(){
    return{
      item : {
        compatibility: [],
        name: "",
        manufacturer: "",
        qty: 0,
        price: 0,
        poids: 0,
        reference: "",
        category: "",
        img: "",
        state: "",
        description: "",
      }
    }
  },
  mounted: function(){
    this.$store.dispatch('getUserInfos');
  },
  methods : {
    create : function(){
      axios.post('http://localhost:3000/api/stuff/',this.item);
    }
  }
}
</script>

<style scoped>

</style>