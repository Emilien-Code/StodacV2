<template>
    <div v-if="commande">
        <div class="recappetit">
            <p>numero de commande : {{commande.id.substr(-6)}}</p>
            <p>etat de la commande : {{commande.etat}}</p>
            <p>date de commande : {{commande.date}}</p>
        </div>
        <div class="info">
            <title>Information personnel</title>
            <p>nom : {{commande.facture.lastname}}</p>
            <p>prenom : {{commande.facture.firstname}}</p>
            <p>adresse : {{commande.facture.streetNumber}} {{commande.facture.street}}, {{commande.facture.city}}, {{commande.facture.postCode}}</p>
            <p>adresse mail : {{commande.facture.email}}</p>
            <p>numero de téléphone : {{commande.facture.mobile}}</p>
        </div>
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
                  <th colspan="5">TOTAL : {{commande.prix_ttl}}</th>
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
      this.$router.push('/login/');
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
