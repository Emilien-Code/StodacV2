<template>
    <div>
        <div>
            <p class="title">COMMANDES</p>
        </div>
        <div>
          <input type="text" placeholder="recherche general" v-model="rechercheGlobal">
        </div>
        <div>
          <button @click="rechercheGlobalFunc()">appliquer global</button>
          <button @click="rechercheAvancer()">appliquer cherche avancer</button>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th v-on:click="trieordre('num')">Numero de commande</th>
                        <th v-on:click="trieordre('email')">email</th>
                        <th v-on:click="trieordre('tel')">Telephone</th>
                        <th v-on:click="trieordre('np')">NOM Prenom</th>
                        <th v-on:click="trieordre('etat')">Etat de la commande</th>
                        <th v-on:click="trieordre('date')">date de commande</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                      <td><input type="text" placeholder="ID Commande" v-model="rechercheID"></td>
                      <td><input type="text" placeholder="email" v-model="rechercheemail"></td>
                      <td><input type="text" placeholder="tel" v-model="recherchetel"></td>
                      <td><input type="text" placeholder="NOM Prenom" v-model="recherchenp"></td>
                      <td><input type="text" placeholder="etat commande" v-model="rechercheetat"></td>
                      <td><input type="text" placeholder="Date de commande" v-model="recherchedate"></td>
                    </tr>
                    <tr v-for="(commande) in listCommandes" :key="commande">
                        <td><a style="cursor:pointer;color:black;" v-on:click="afficheFacture(commande.comande.id)">{{commande.comande.id}}</a></td>
                        <td>{{commande.comande.facture.email}}</td>
                        <td>{{commande.comande.facture.mobile}}</td>
                        <td>{{commande.comande.facture.lastname + " " + commande.comande.facture.firstname}}</td>
                        <td>{{commande.comande.nometat[commande.comande.etat]}}</td>
                        <td>{{commande.comande.date.substring(0,10)}}</td>
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
  name: 'allCommande',
  data: function () {
    return {
      rechercheGlobal:"",
      rechercheID:"",
      rechercheemail:"",
      recherchetel:"",
      recherchenp:"",
      rechercheetat:"",
      recherchedate:"",
      listCommandes: "",
      parametre:{
        limit:20,
        date:-1,
        num:0,
        email:0,
        tel:0,
        np:0,
        etat:0,
        typerecherche:"",
        recherche:{
          Global:"",
          id:"",
          email:"",
          tel:"",
          np:"",
          etat:"",
          date:"",
        },
        listCommandes: "",
      }
    }
  },
  mounted: function(){
    if(this.$store.state.user.userID === -1){
      this.$router.push('/login/');
    }
    this.$store.dispatch('getUserInfos').then(()=>{
        console.log("etape1")
        if(!this.userInfos.admin){
            this.$router.push('/')
        }
        else{
          let parametre = {
            parametre: ["default",""],
            limit:this.parametre.limit
          }
            this.$store.dispatch('getAllCommande', parametre).then((resul)=>{
              this.listCommandes = resul
            })
        }
    })
  },
  methods:{
    afficheFacture:function(nomFacture){
      // this.$router.push(name:`/facture/${nomFacture}/`, params:{id: nomFacture});
      this.$router.push({name:`facture`, params:{numfacture: nomFacture}});
    },
    trieordre:function(nomColone){
      let parametre = {
        parametre: [nomColone],
        limit:this.parametre.limit
      }
      switch(nomColone){
        case "num":
          this.parametre.date=0;
          this.parametre.email=0;
          this.parametre.tel=0;
          this.parametre.np=0;
          this.parametre.etat=0;
          switch(this.parametre.num){
            case 0:
              this.parametre.num=-1;
              parametre.num = this.parametre.num;
              break;
            case -1:
              this.parametre.num=1;
              parametre.num = this.parametre.num;
              break;
            case 1:
              this.parametre.num=0;
              parametre.parametre[0] = "default";
              break;
          }
          break;
        case "email":
          this.parametre.date=0;
          this.parametre.num=0;
          this.parametre.tel=0;
          this.parametre.np=0;
          this.parametre.etat=0;
          switch(this.parametre.email){
            case 0:
              this.parametre.email=-1;
              parametre.email = this.parametre.email;
              break;
            case -1:
              this.parametre.email=1;
              parametre.email = this.parametre.email;
              break;
            case 1:
              this.parametre.email=0;
              parametre.parametre[0] = "default";
              break;
            }
          break;
        case "tel":
          this.parametre.date=0;
          this.parametre.num=0;
          this.parametre.email=0;
          this.parametre.np=0;
          this.parametre.etat=0;
          switch(this.parametre.tel){
            case 0:
              this.parametre.tel=-1;
              parametre.tel = this.parametre.tel;
              break;
            case -1:
              this.parametre.tel=1;
              parametre.tel = this.parametre.tel;
              break;
            case 1:
              this.parametre.tel=0;
              parametre.parametre[0] = "default";
              break;
            }
          break;
        case "np":
          this.parametre.date=0;
          this.parametre.num=0;
          this.parametre.email=0;
          this.parametre.tel=0;
          this.parametre.etat=0;
          switch(this.parametre.np){
            case 0:
              this.parametre.np=-1;
              parametre.np = this.parametre.np;
              break;
            case -1:
              this.parametre.np=1;
              parametre.np = this.parametre.np;
              break;
            case 1:
              this.parametre.np=0;
              parametre.parametre[0] = "default";
              break;
            }
          break;
        case "etat":
          this.parametre.date=0;
          this.parametre.num=0;
          this.parametre.email=0;
          this.parametre.tel=0;
          this.parametre.np=0;
          switch(this.parametre.etat){
            case 0:
              this.parametre.etat=-1;
              parametre.etat = this.parametre.etat;
              break;
            case -1:
              this.parametre.etat=1;
              parametre.etat = this.parametre.etat;
              break;
            case 1:
              this.parametre.etat=0;
              parametre.parametre[0] = "default";
              break;
            }
          break;
        case "date":
          this.parametre.etat=0;
          this.parametre.num=0;
          this.parametre.email=0;
          this.parametre.tel=0;
          this.parametre.np=0;
          switch(this.parametre.date){
            case 0:
              this.parametre.date=-1;
              parametre.date = this.parametre.date;
              break;
            case -1:
              this.parametre.date=1;
              parametre.date = this.parametre.date;
              break;
            case 1:
              this.parametre.date=0;
              parametre.parametre[0] = "default";
              break;
            }
          break;
      }
      if(this.parametre.typerecherche == 1){
        parametre.parametre.push("global")
        parametre.recherche = this.parametre.recherche
      }
      else if(this.parametre.typerecherche == 2){
        parametre.parametre.push("avancer")
        parametre.recherche = this.parametre.recherche
      }
      else{
        parametre.parametre.push("")
      }
      console.log(parametre)
      this.$store.dispatch('getAllCommande', parametre).then((resul)=>{
        this.listCommandes = resul
      })
    },
    rechercheGlobalFunc:function(){
      this.parametre.typerecherche = 1;
      this.parametre.recherche.Global=this.rechercheGlobal;
      this.parametre.recherche.id = "";
      this.rechercheID = "";
      this.parametre.recherche.email = "";
      this.rechercheemail = "";
      this.parametre.recherche.tel = "";
      this.recherchetel = "";
      this.parametre.recherche.np = "";
      this.recherchenp = "";
      this.parametre.recherche.etat = "";
      this.rechercheetat = "";
      this.parametre.recherche.date = "";
      this.recherchedate = "";
      let parametre = {
        parametre: ["default","global"],
        limit:this.parametre.limit,
        recherche:this.parametre.recherche
      }
      this.$store.dispatch('getAllCommande', parametre).then((resul)=>{
        this.listCommandes = resul
      })
    },
    rechercheAvancer:function(){
      this.parametre.typerecherche = 2;
      this.parametre.recherche.Global="";
      this.rechercheGlobal=""
      this.parametre.recherche.id=this.rechercheID;
      this.parametre.recherche.email=this.rechercheemail;
      this.parametre.recherche.tel=this.recherchetel;
      this.parametre.recherche.np=this.recherchenp;
      this.parametre.recherche.etat=this.rechercheetat;
      this.parametre.recherche.date=this.recherchedate;
      let parametre = {
        parametre: ["default","avancer"],
        limit:this.parametre.limit,
        recherche:this.parametre.recherche
      }
      this.$store.dispatch('getAllCommande', parametre).then((resul)=>{
        this.listCommandes = resul
      })
    },
  },
  computed: {
    ...mapState(['userInfos']),
  }
}
</script>

<style scoped>

</style>