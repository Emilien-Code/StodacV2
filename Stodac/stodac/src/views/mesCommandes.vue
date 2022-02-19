<template>
    <div id="mesCommandes">
        <div>
            <p class="title">VOS COMMANDES</p>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Numero de commande</th>
                        <th>Etat de la commande</th>
                        <th>date de commande</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(commande) in userInfos.comande" :key="commande">
                        <td><a style="cursor:pointer;color:black;" v-on:click="afficheFacture(commande.id.substr(-6))">{{commande.id.substr(-6)}}</a></td>
                        <!-- <td v-on:click="afficheFacture(userInfos.comande[userInfos.comande.length - 1].id.substr(-6))"> {{userInfos.comande[userInfos.comande.length - 1].id.substr(-6)}}</td> -->
                        <td>{{commande.nometat[commande.etat]}}</td>
                        <td>{{commande.date.substring(0,10)}}</td>
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
    this.$store.dispatch('getUserInfos').then(
      console.log(this.userInfos)
    )
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
#mesCommandes{
  margin-top: 80px;
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
}

td, thead th{
  border-bottom: 2px solid black;
  padding: 30px;
  text-align: center;
  width : 30vw;
}
</style>