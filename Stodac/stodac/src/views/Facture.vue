<template>
    <div id="facture" v-if="commande">
        <div class="recappetit">
            <p class="petittext">Numéro de commande : {{commande.id.substr(-6)}}</p>
            <p v-if="commande.etat >= 0" class="petittext">{{commande.nometat[commande.etat]}}</p>
            <p v-else class="petittext">{{commande.nometat[commande.nometat.length + commande.etat]}}</p>
            <p class="petittext">Date de commande : {{commande.date}}</p>
        </div>
        <div class="info">
            <p class="title">Informations personnelles</p>
            <div class="infoPerso">
              <p class="nom">{{commande.facture.lastname}} {{commande.facture.firstname}}</p>
              <p class="adresse">{{commande.facture.streetNumber}} {{commande.facture.street}}, {{commande.facture.city}}, {{commande.facture.postCode}}</p>
              <p class="email">{{commande.facture.email}}</p>
              <p class="tel">{{commande.facture.mobile}}</p>
            </div>
        </div>
        <div class="recapcommande">
          <p class="title">Commande</p>
          <div class="commande">
            <table>
              <thead>
                <tr>
                  <th>&nbsp;</th>
                  <th>Nom</th>
                  <th>Prix unité</th>
                  <th>Quantité</th>
                  <th>Prix</th>
                </tr>
              </thead>
              <tfoot>
              <tr>
                <th colspan="5">Frais de ports HT : {{commande.prix.prix_ttl_fdp_HT}}</th>
              </tr>
              <tr>
                <th colspan="5">Frais de ports TTC : {{commande.prix.prix_ttl_fdp}}</th>
              </tr>
                <tr>
                  <th colspan="5">TOTAL HT : {{commande.prix.prix_ttl_HT}}</th>
                </tr>
                <tr>
                  <th colspan="5">TOTAL TTC : {{commande.prix.prix_ttl}}</th>
                </tr>
              </tfoot>
              <tbody>
                <tr v-for="(article) in commande.materiels" :key="article">
                  <td><img :src="article.obj.img" alt=""></td>
                  <td><a style="cursor:pointer;color:black;" v-on:click="afficheArticle(article.obj.id)">{{article.obj.name}}</a></td>
                  <td>{{article.obj.price}}</td>
                  <td>{{article.qty}}</td>
                  <td>{{article.prix_ttl}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p class="payement">Payer par {{commande.facture.moyendepayement}}</p>
    </div>
</template>

<script>
import { mapState } from 'vuex'
//const axios = require('axios');
export default {
  name: 'Facture',
  data: function () {
    return {
      commande: "",
    }
  },
  mounted: function(){
    if(this.$store.state.user.userID === -1){
      this.$router.push(`/login/mesCommandes`);
    }
    this.$store.dispatch('getUserInfos').then(()=>{
      this.$store.dispatch('getFacture', this.$route.params.numfacture).then((resul)=>{
        this.commande = resul.comande[0]
        console.log(this.commande)
      })
    })
  },
  methods:{
    afficheArticle:function(id){
      this.$router.push(`/produit/${id}/`);
    }
  },
  computed: {
    ...mapState(['userInfos']),
  }
}
</script>

<style scoped>
  .recappetit{
    width: 80%;
    margin-left: 10%;
    padding-top: 25px;
    padding-bottom: 75px;
    /* flex-direction: row;
    justify-content: space-between; */
  }
  .petittext{
    width: 33%;
    float: left;
    text-align: center;
    font-size: 18px;
  }
  .info{
    width: 80%;
    margin-left:10%;
    padding-bottom: 100px;
  }
  .title{
    color:#007057;
    font-size: 25px;
    text-align: center;
    width: 100%;
  }
  .infoPerso{
    padding-top: 15px;
    font-size: 17px;
  }
  .nom{
    width: 100%;
    padding-bottom: 10px;
  }
  .adresse{
    width: 100%;
    padding-bottom: 10px;
  }
  .email{
    width:60%;
    float:left;
    padding-bottom: 10px;
  }
  .tel{
    width:40%;
    float:left;
    text-align: right;
    padding-bottom: 10px;
  }
  .recapcommande{
    width: 80%;
    margin-left:10%;
    padding-bottom: 50px;
  }
  .commande{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .payement{
    margin-left: 10%;
    font-size: 17px;
  }
  img{
    object-fit: cover;
    width: 200px;
    margin-right: 10px;
    height: 150px;
  }
  table{
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
    /* border-bottom: ; */
  }
  thead th:nth-child(1), tbody td:nth-child(1){
    width: 220px;
  }
  thead th:nth-child(2), tbody td:nth-child(2){
    width: 290px;
  }
  thead th:nth-child(3), tbody td:nth-child(3){
    width: 125px;
  }
  thead th:nth-child(4), tbody td:nth-child(4){
    width: 125px;
  }
  thead th:nth-child(5), tbody td:nth-child(5){
    width: 125px;
  }
  td, thead th{
    border-bottom: 2px solid black;
    text-align: center;
  }
  tfoot {
    text-align: right;
  }
  #facture{
    margin: 80px;
  }

  @media (max-width: 940px) {
    thead th:nth-child(1), tbody td:nth-child(1){
      display: none;
    }
    thead th:nth-child(2), tbody td:nth-child(2){
      width: 25vw;
    }
    thead th:nth-child(3), tbody td:nth-child(3){
      width: 20vw;
    }
    thead th:nth-child(4), tbody td:nth-child(4){
      width: 20vw;
    }
    thead th:nth-child(5), tbody td:nth-child(5){
      width: 20vw;
    }
    .tel {
      margin-top: 20px;
    }
  }
</style>