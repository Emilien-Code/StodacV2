<template>
  <infoCommandeAdmin :commande="commande" v-if="isClicked"></infoCommandeAdmin>

  <div id="container" @click="click">
    <div class="title">
      <h4>Utilisateur</h4>
      <p>{{commande.comande.id.slice(0, 24)}}</p>
    </div>
      <p>{{commande.comande.facture.lastname + " " + commande.comande.facture.firstname}}</p>
      <p>Mail : {{commande.comande.facture.email}}</p>
      <p>Tel : {{commande.comande.facture.mobile}}</p>


    <div class="title">
      <h4>Livraison <a :href="commande.comande.pdf" target="_blank"> <img style="width:16px; height: 16px" src="../../../public/80942.png" alt=""> </a></h4>
      <p>{{commande.comande.id}}</p>
    </div>
    <p>Mode de livraison : <b>{{commande.comande.livraison.modeDeLivraison}}</b></p>
    <p v-if="commande.comande.livraison.modeDeLivraison != 'surPlace'">Adresse: {{commande.comande.facture.streetNumber}} {{commande.comande.facture.street}} {{commande.comande.facture.city}} </p>
    <p>Frais de ports HT: {{ commande.comande.prix.prix_ttl_fdp_HT }} €</p>
    <p>Frais de ports TTC: {{ commande.comande.prix.prix_ttl_fdp }} €</p>

    <div id="bottom">
      <div id="left">
        <div class="title">
          <h4>Total</h4>
        </div>
        <p>Total HT : {{commande.comande.prix.prix_ttl_panier_HT}} €</p>
        <p>Total TTC : {{commande.comande.prix.prix_ttl_panier}} €</p>
        <p>Payé par : <b>{{commande.comande.facture.moyendepayement}}</b></p>
      </div>
      <div id="right">
        <div class="title">
          <h4>État</h4>
        </div>

      <p v-if="commande.comande.etat >= 0" :style="{backgroundColor: color[commande.comande.etat]}">{{commande.comande.nometat[commande.comande.etat]}}</p>
      <p v-else :style="{backgroundColor: color[color.length-1]}">{{commande.comande.nometat[commande.comande.nometat.length + commande.comande.etat]}}</p>

        <div class="title">
          <h4>Date</h4>
        </div>
        <p>{{commande.comande.date.substring(0,10)}}</p>
      </div>
    </div>

  </div>
</template>
<script>


import infoCommandeAdmin from "./infoCommandeAdmin";
import { mapState } from 'vuex'



export default {
  name: 'commandeMin',
  data: function () {
    return {
      color: ["yellow","Aquamarine","LightGreen","lightCoral","lightCoral","lightCoral"],
      isClicked:false
    }
  },
  mounted: function(){
  },
  props : {
    commande: Object
  },
  components:{
    infoCommandeAdmin
  },
  methods:{
    click: function (){
      if (this.isClicked){
        this.isClicked = false
      }else{
        this.isClicked = true
      }
    },
    actualize: function (){
      this.$parent.actualize();
    }
  },
  computed: {
    ...mapState(['userInfos']),
  }
}
</script>

<style scoped>
  a{
    color: #078A6C;
  }
  #bottom{
    display: flex;
    justify-content: space-between;
  }
  .title{
    margin-top: 10px ;
    display: flex;
    justify-content: space-between;
  }
  .title p{
    color: #078A6C;
  }
  #container{
    cursor: pointer;
    padding: 10px;
    width: 500px;
    border-radius: 10px;
    margin-right: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  }
  #right, #left{
    width: 50%;
  }

</style>