<template>
    <div id="merci" v-if="userInfos.comande[0]">
        <p class="title">Merci pour votre commande</p>
        <div>

          <div id="table-container">


          <table>
            <thead>
            <tr>
              <th>Informations de facturation</th>
              <th>Adresse de livraison</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td class="left">{{userInfos.comande[userInfos.comande.length - 1].facture.email}}</td>
              <td class="right">{{userInfos.comande[userInfos.comande.length - 1].livraison.modeDeLivraison}}</td>
            </tr>
            <tr>
              <td class="left">{{userInfos.comande[userInfos.comande.length - 1].facture.lastname}} {{userInfos.comande[userInfos.comande.length - 1].facture.firstname}} - {{userInfos.comande[userInfos.comande.length - 1].facture.entreprise}}</td>
              <td class="right">{{userInfos.comande[userInfos.comande.length - 1].livraison.adresse.adresse}}</td>
            </tr>
            <tr>
              <td class="left">{{userInfos.comande[userInfos.comande.length - 1].facture.postCode}} {{userInfos.comande[userInfos.comande.length - 1].facture.streetNumber}} {{userInfos.comande[userInfos.comande.length - 1].facture.street}} {{userInfos.comande[userInfos.comande.length - 1].facture.city}}</td>
              <td class="right">{{userInfos.comande[userInfos.comande.length - 1].livraison.adresse.postCode}} {{userInfos.comande[userInfos.comande.length - 1].livraison.adresse.city}}</td>
            </tr>
            <tr>
              <td class="left">{{userInfos.comande[userInfos.comande.length - 1].livraison.adresse.complement}}</td>
              <td class="right">{{userInfos.comande[userInfos.comande.length - 1].livraison.adresse.complement}}</td>
            </tr>
            <tr>
              <td class="left">FRANCE</td>
              <td class="right">FRANCE</td>
            </tr>
            <tr>
              <td class="left">{{userInfos.comande[userInfos.comande.length - 1].facture.mobile}}</td>
              <td class="right">{{userInfos.comande[userInfos.comande.length - 1].facture.mobile}}</td>
            </tr>
            </tbody>
          </table>
          <table>
            <thead>
            <tr>
              <th>Ref.</th>
              <th>Nom de produit</th>
              <th>Prix unitaire</th>
              <th>Qté</th>
              <th>TVA 20%</th>
              <th>Remise</th>
              <th>Total TTC</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="el in userInfos.comande[userInfos.comande.length - 1].materiels" :key="el">
              <td>
                {{el.obj.reference}}
              </td>
              <td>
                {{el.obj.name}}
              </td>
              <td>
                {{Math.round( el.obj.price / 1.2 * 100) / 100}} €
              </td>
              <td>
                {{el.qty}}
              </td>
              <td>
                {{(Math.round( el.obj.price / 1.2 * .2 * 100) / 100 ) }} €
              </td>
              <td>0 €</td>
              <td>{{el.obj.price * el.qty}} €</td>
            </tr>
            <tr>
              <td></td>
              <td>Frais de ports</td>
              <td>{{userInfos.comande[userInfos.comande.length - 1].prix.prix_ttl_fdp_HT}} €</td>
              <td></td>
              <td>{{Math.round(userInfos.comande[userInfos.comande.length - 1].prix.prix_ttl_fdp_HT * 0.2 * 100) / 100}} €</td>
              <td>0 €</td>
              <td>{{userInfos.comande[userInfos.comande.length - 1].prix.prix_ttl_fdp}} €</td>
            </tr>
            </tbody>
          </table>
          <table>
            <tr>
              <td> Payé via <bold>{{userInfos.comande[userInfos.comande.length - 1].facture.moyendepayement}}</bold></td>
              <td> Total TTC</td>
              <td>  <bold> {{userInfos.comande[userInfos.comande.length - 1].prix.prix_ttl_panier}}  € </bold>  </td>
            </tr>
          </table>


          </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
//const axios = require('axios');
export default {
  name: 'Commande',
  data: function () {
    return {

    }
  },
  mounted: function(){
    if(this.$store.state.user.userID === -1){
      this.$router.push('/login/');
    }
    this.$store.dispatch('getUserInfos').then(()=>{
      //console.log("la c le user info bg")
      //console.log(this.userInfos)
    })
  },
  methods:{
    afficheFacture:function(nomFacture){
      // this.$router.push(name:`/facture/${nomFacture}/`, params:{id: nomFacture});
      this.$router.push({name:`facture`, params:{numfacture: nomFacture}});
    },
    test:function(){
      //console.log("capasse")
    }
  },
  computed: {
    ...mapState(['userInfos']),
  }
}
</script>

<style scoped>
#merci  {
  margin-top: 80px;
  height: calc(100vh - 320px);
}
.title{
    margin-top: 20px;;
    text-align: center;
    font-size: 2em;
    color:#007057;
    margin-bottom: 20px;
}
table{
  width: 80%;
}
#table-container{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
table,
td,th {
  padding: 4px;
  border-collapse: collapse;
  border: 1px solid #333;
}
thead,
tfoot {
  background-color: #D9D9D9;
}
.left{
  width: 50%;
}

.right{
  width: 50%;
}

@media (max-width: 840px) {
  thead th:nth-child(1), tbody td:nth-child(1){
    width: 33vw;
    text-align: center;
  }
  thead th:nth-child(2), tbody td:nth-child(2){
    width: 33vw;
    text-align: center;
  }
  thead th:nth-child(3), tbody td:nth-child(3){
    width: 33vw;
    text-align: center;
  }
}
</style>