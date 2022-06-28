<template>
    <div id="merci" v-if="userInfos.comande[0]">
        <p class="title">Merci d'avoir commandé chez nous !</p>
        <div>
        <table>
            <thead>
                <tr>
                    <th>Numéro de commande</th>
                    <th>Etat de la commande</th>
                    <th>Date de commande</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><a style="cursor:pointer;color:black;" v-on:click="afficheFacture(userInfos.comande[userInfos.comande.length - 1].id.substr(-6))">{{userInfos.comande[userInfos.comande.length - 1].id.substr(-6)}}</a></td>
                    <!-- <td v-on:click="afficheFacture(userInfos.comande[userInfos.comande.length - 1].id.substr(-6))"> {{userInfos.comande[userInfos.comande.length - 1].id.substr(-6)}}</td> -->
                    <td v-if="userInfos.comande[userInfos.comande.length - 1].etat >= 0">{{userInfos.comande[userInfos.comande.length - 1].nometat[userInfos.comande[userInfos.comande.length - 1].etat]}}</td>
                    <td v-else>{{userInfos.comande[userInfos.comande.length - 1].nometat[userInfos.comande[userInfos.comande.length - 1].nometat.length + userInfos.comande[userInfos.comande.length - 1].etat]}}</td>
                    <td>{{userInfos.comande[userInfos.comande.length - 1].date}}</td>
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
      console.log("la c le user info bg")
      console.log(this.userInfos)
    })
  },
  methods:{
    afficheFacture:function(nomFacture){
      // this.$router.push(name:`/facture/${nomFacture}/`, params:{id: nomFacture});
      this.$router.push({name:`facture`, params:{numfacture: nomFacture}});
    },
    test:function(){
      console.log("capasse")
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
  margin: auto;
  table-layout: fixed;
  width: 60%;
  border-collapse: collapse;
  /* border-bottom: ; */
}
thead th:nth-child(1), tbody td:nth-child(1){
  width: 250px;
  text-align: center;
}
thead th:nth-child(2), tbody td:nth-child(2){
  width: 300px;
  text-align: center;
}
thead th:nth-child(3), tbody td:nth-child(3){
  width: 250px;
  text-align: center;
}
td, thead th{
  border-bottom: 2px solid black;
  padding: 30px
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