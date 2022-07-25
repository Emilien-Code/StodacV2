<template>
    <div v-if="commande">
        <div class="recappetit">
            <p class="petittext">numero de commande : {{commande.id.substr(-6)}}</p>
            <!-- <p class="petittext">{{commande.nometat[commande.etat]}}</p> -->
            <select v-if="modifier" class="selectEtat" v-model="etatcommande">
                <option>{{commande.nometat[0]}}</option>
                <option>{{commande.nometat[1]}}</option>
                <option>{{commande.nometat[2]}}</option>
                <option>{{commande.nometat[3]}}</option>
                <option>{{commande.nometat[4]}}</option>
            </select>
            <p v-if="!modifier & commande.etat >= 0" class="petittext">{{commande.nometat[commande.etat]}}</p>
            <p v-if="!modifier & commande.etat < 0" class="petittext" >{{commande.nometat[commande.nometat.length + commande.etat]}}</p>
            <p class="petittext">date de commande : {{commande.date}}</p>
        </div>
        <div class="info" v-if="modifier">
            <p class="title">Information personnel</p>
            <div class="infoPerso">
              <div class="nom">
                  <input type="text" placeholder="Nom" v-model="testnom">
                  <input type="text" placeholder="Prenom" v-model="testpernom">
                </div>
              <div class="adresse">
                  <input type="text" placeholder="Numero rue" v-model="testnumrue">
                  <input type="text" placeholder="Nom rue" v-model="testrue">
                  <input type="text" placeholder="Ville" v-model="testville">
                  <input type="text" placeholder="Code postal" v-model="testcp">
                </div>
              <div class="email">
                  <input type="text" placeholder="email" id="mail" v-model="testemail">
                </div>
              <div class="tel">
                  <input type="text" placeholder="Numero mobile" v-model="testtel">
                </div>
            </div>
        </div>
        <div v-if="!modifier" class="info">
            <p class="title">Information personnel</p>
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
                  <th colspan="5">PRIX Pannier TTC : {{commande.prix.prix_ttl_panier}} €</th>
                </tr>
                <tr>
                  <th colspan="5">PRIX FDP TTC : {{commande.prix.prix_ttl_fdp}} €</th>
                </tr>
                <tr>
                  <th colspan="5">TOTAL HT : {{commande.prix.prix_ttl_HT}} €</th>
                </tr>
                <tr>
                  <th colspan="5">TOTAL TTC : {{commande.prix.prix_ttl}} €</th>
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
        <div>
            <p v-if="commande.facture.moyendepayement=='paypal'" class="payement">Payé : {{commande.paypal_info.prix_payer}} € par {{commande.facture.moyendepayement}}</p>
            <p  v-else-if="commande.etat==0" class="payement">Pas encore payé : {{commande.prix.prix_ttl}} € par {{commande.facture.moyendepayement}}</p>
            <p  v-else class="payement">Payé : {{commande.prix.prix_ttl}} € par {{commande.facture.moyendepayement}}</p>
        </div>
        <div v-if="commande.etat == 5 || commande.etat == 6" class="err">
          <p v-if="commande.etat == 5">L'id paypal est le meme que la commande {{commande.paypal_info.doublon}}</p>
          <p v-if="commande.etat == 6">Le prix payé n'est pas le même que celui du pannier</p>
        </div>
        <div v-if="!modifier">
            <button @click="modifie()">modifier</button>
        </div>
      <div>


        <a v-if="commande.pdf" :href="commande.pdf" target="_blank"> Télécharger pdf colissimo </a>
        <p v-else>erreur colissimo : {{commande.errorColissimo}}</p>
      </div>
        <div v-if="modifier">
            <span></span>
            <button @click="modifie()">annuler</button>
            <button @click="savethat()" v-if="etatcommande != commande.nometat[commande.etat] || testnom != commande.facture.lastname || testpernom != commande.facture.firstname || testnumrue != commande.facture.streetNumber || testrue != commande.facture.street || testville != commande.facture.city || testcp != commande.facture.postCode || testemail != commande.facture.email || testtel != commande.facture.mobile">Enregistrer</button>
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
      etatcommande:"",
      testnom:"",
      testpernom:"",
      testnumrue:"",
      testrue:"",
      testville:"",
      testcp:"",
      testemail:"",
      testtel:"",
      modifier:false,
    }
  },
  mounted: function(){
    if(this.$store.state.user.userID === -1){
      this.$router.push('/login/');
    }
    this.$store.dispatch('getUserInfos').then(()=>{
        if(!this.userInfos.admin){
            this.$router.push('/')
        }
        else{
            this.$store.dispatch('getFactureAdm', this.$route.params.numfacture).then((resul)=>{
                this.commande = resul.comande[0]
                this.etatcommande = this.commande.nometat[this.commande.etat]
                this.testnom = this.commande.facture.lastname
                this.testpernom = this.commande.facture.firstname
                this.testnumrue = this.commande.facture.streetNumber
                this.testrue = this.commande.facture.street
                this.testville = this.commande.facture.city
                this.testcp = this.commande.facture.postCode
                this.testemail = this.commande.facture.email
                this.testtel = this.commande.facture.mobile
                //console.log("Facture :",this.commande)
            })
        }
    })
    //console.log(this.commande.prix)
  },
  methods:{
    afficheArticle:function(id){
      this.$router.push(`/produit/${id}/`);
    },
    savethat:function(){
        this.modifier = false
        const newetat = this.commande.nometat.indexOf(this.etatcommande)
        const parametre={
            id:this.commande.id,
            parametre: [newetat, this.testnom, this.testpernom, this.testnumrue, this.testrue, this.testville, this.testcp, this.testemail, this.testtel]
        }
        this.$store.dispatch("changeFacture", parametre).then(() => {
            this.$store.dispatch('getFactureAdm', this.$route.params.numfacture).then((resul)=>{
                this.commande = resul.comande[0]
                this.etatcommande = this.commande.nometat[this.commande.etat]
                this.testnom = this.commande.facture.lastname
                this.testpernom = this.commande.facture.firstname
                this.testnumrue = this.commande.facture.streetNumber
                this.testrue = this.commande.facture.street
                this.testville = this.commande.facture.city
                this.testcp = this.commande.facture.postCode
                this.testemail = this.commande.facture.email
                this.testtel = this.commande.facture.mobile
            })
        })
    },
    modifie:function(){
        this.modifier = !this.modifier
        if (this.modifier){
            this.etatcommande = this.commande.nometat[this.commande.etat]
            this.testnom = this.commande.facture.lastname
            this.testpernom = this.commande.facture.firstname
            this.testnumrue = this.commande.facture.streetNumber
            this.testrue = this.commande.facture.street
            this.testville = this.commande.facture.city
            this.testcp = this.commande.facture.postCode
            this.testemail = this.commande.facture.email
            this.testtel = this.commande.facture.mobile
        }
        //console.log(this.modifier)
    },
  },
  computed: {
    ...mapState(['userInfos']),
  }
}
</script>

<style scoped>
.recappetit:nth-child(1){
  margin-top: 80px;
}
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
    text-align: center;
  }
  thead th:nth-child(2), tbody td:nth-child(2){
    width: 290px;
    text-align: left;
  }
  thead th:nth-child(3), tbody td:nth-child(3){
    width: 125px;
    text-align: right;
  }
  thead th:nth-child(4), tbody td:nth-child(4){
    width: 125px;
    text-align: right;
  }
  thead th:nth-child(5), tbody td:nth-child(5){
    width: 125px;
    text-align: right;
  }
  td, thead th{
    border-bottom: 2px solid black;
  }
  tfoot th{
    text-align: right
  }
  input{
    padding: 5px;
    border: #078A6C solid 2px;
    border-radius: 10px;
    margin-right: 10px;
  }
  #mail {
    width: 326px;
  }
  a {
    color: #078A6C;
  }
</style>