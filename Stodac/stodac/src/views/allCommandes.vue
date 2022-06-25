<template>
    <div id="AllCommandes">
            <p class="title">COMMANDES</p>
        <div>
          <input type="text" placeholder="recherche general" v-model="rechercheGlobal">
          <button @click="rechercheGlobalFunc()">appliquer global</button>
        </div>
        <div id="advanced">
          <div class="flechecote" id="flecheavancer" v-on:click="rechercheavancer()"></div>
          <p v-on:click="rechercheavancer()">Recherche avancer</p>
          <div id="textAdvanced" v-if="ouvertavancer">
            <input type="text" placeholder="ID Commande" v-model="rechercheID">
            <input type="text" placeholder="email" v-model="rechercheemail">
            <input type="text" placeholder="tel" v-model="recherchetel">
            <input type="text" placeholder="NOM Prenom" v-model="recherchenp">
            <input type="text" placeholder="Date de commande" v-model="recherchedate">
            <button @click="rechercheAvancer()">appliquer cherche avancer</button>
          </div>
        </div>
        <div>
          <button @click="choix(0)">en attente de payement</button>
          <button @click="choix(1)">traitement en cours</button>
          <button @click="choix(2)">en preparation</button>
          <button @click="choix(3)">envoyer</button>
          <button @click="choix(4)">recu</button>
          <button @click="choix(5)">annulé</button>
          <button @click="choix(6)">tout</button>
        </div>

          <table id="tableCommandes">
            <thead>
              <tr>
                <th>&nbsp;</th>
                <th v-on:click="trieordre('num')">Numero de commande</th>
                <th v-on:click="trieordre('email')">email</th>
                <th v-on:click="trieordre('np')">NOM Prénom</th>
                <th v-on:click="trieordre('etat')">État commande</th>
                <th v-on:click="trieordre('date')">Date commande</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(commande, index) in listCommandes" :key="commande" >
                <tr v-on:click="ajouteici(index)">
                  <td><div class="flechecoteTableau"></div></td>
                  <td><a v-on:click="afficheFacture(commande.comande.id)">{{commande.comande.id}}</a></td>
                  <td>{{commande.comande.facture.email}}</td>
                  <td>{{commande.comande.facture.lastname + " " + commande.comande.facture.firstname}}</td>
                  <td v-if="commande.comande.etat >= 0" :style="{backgroundColor: color[commande.comande.etat]}">{{commande.comande.nometat[commande.comande.etat]}}</td>
                  <td v-else :style="{backgroundColor: color[color.length-1]}">{{commande.comande.nometat[commande.comande.nometat.length + commande.comande.etat]}}</td>
                  <td>{{commande.comande.date.substring(0,10)}}</td>
                </tr>

                <!--  Dans un composant -->
                <tr class="tablesCntr" v-if="ouvert==index">
                  <table>
                    <thead>
                      <tr>
                        <th>Adresse</th>
                        <th>Prix HT</th>
                        <th>Prix TTC</th>
                        <th>État commande</th>
                        <th>PDF</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{{commande.comande.facture.streetNumber}} {{commande.comande.facture.street}}, {{commande.comande.facture.city}}, {{commande.comande.facture.postCode}}</td>
                        <td>{{Math.round((commande.comande.prix_ttl/1.2)*100)/100}}€</td>
                        <td>{{commande.comande.prix_ttl}}€</td>
                        <td>
                          <select class="selectEtat" v-model="choixetat">
                            <option>{{commande.comande.nometat[0]}}</option>
                            <option>{{commande.comande.nometat[1]}}</option>
                            <option>{{commande.comande.nometat[2]}}</option>
                            <option>{{commande.comande.nometat[3]}}</option>
                            <option>{{commande.comande.nometat[4]}}</option>
                            <option>{{commande.comande.nometat[5]}}</option>
                          </select>
                        </td>
                        <td><a :href="commande.comande.pdf" target="_blank"> <img style="width:25px;" src="../../public/80942.png" alt=""> </a></td>
                      </tr>
                    </tbody>
                  </table>
                    <table>
                      <thead>
                      <tr>
                        <th>Nom</th>
                        <th>quantité</th>
                        <th>prix HT</th>
                        <th>prix TTC</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="article in commande.comande.materiels" :key="article.id">
                        <td>{{article.obj.name}}</td>
                        <td>{{article.qty}}</td>
                        <td>{{Math.round((article.obj.price/1.2)*100)/100}}€</td>
                        <td>{{article.obj.price}}€</td>
                      </tr>
                      </tbody>
                    </table>

                    <!--  Dans un composant -->

                  <div>
                    <button v-if="commande.comande.nometat[commande.comande.etat] != choixetat" @click="savechangement()">Enregistrer</button>
                  </div>


                </tr>
              </template>
            </tbody>
          </table>
        </div>
</template>

<script>
import { mapState } from 'vuex'
//const axios = require('axios');
export default {
  name: 'allCommande',
  data: function () {
    return {
      choixetat:"",
      ouvert:-1,
      color: ["yellow","Aquamarine","LightGreen","lightCoral","red"],
      ouvertavancer:false,
      rechercheGlobal:"",
      rechercheID:"",
      rechercheemail:"",
      recherchetel:"",
      recherchenp:"",
      recherchedate:"",
      listCommandes: "",
      parametre:{
        type:["default","global"],
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
          etat:[0,0,0,0,0,0,1],
          date:"",
        },
        listCommandes: "",
      }
    }
  },
  mounted: function(){
    if(this.$store.state.user.userID === -1){
      this.$router.push('/login/allCommandes');
    }
    this.$store.dispatch('getUserInfos').then(()=>{
        console.log("etape1")
        if(!this.userInfos.admin){
            this.$router.push('/')
        }
        else{
          const parametre = {
            parametre: this.parametre.type,
            limit:this.parametre.limit,
            recherche:this.parametre.recherche
          }
          console.log(parametre)
          this.$store.dispatch('getAllCommande', parametre).then((resul)=>{
            this.listCommandes = resul
            this.choixetat=""
            this.ouvert=-1
          })
        }
    })
  },
  methods:{
    afficheFacture:function(nomFacture){
      // this.$router.push(name:`/facture/${nomFacture}/`, params:{id: nomFacture});
      this.$router.push({name:`factureAdm`, params:{numfacture: nomFacture}});
    },
    trieordre:function(nomColone){
      const parametre = {
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
        parametre.recherche = this.parametre.recherche
      }
      console.log(parametre)
      this.$store.dispatch('getAllCommande', parametre).then((resul)=>{
        this.listCommandes = resul
        this.choixetat=""
        this.ouvert=-1
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
      this.parametre.recherche.date = "";
      this.recherchedate = "";
      const parametre = {
        parametre: this.parametre.type,
        limit:this.parametre.limit,
        recherche:this.parametre.recherche
      }
      this.$store.dispatch('getAllCommande', parametre).then((resul)=>{
        this.listCommandes = resul
        this.choixetat=""
        this.ouvert=-1
      })
    },
    rechercheAvancer:function(){
      console.log(this.rechercheID)
      this.parametre.typerecherche = 2;
      this.parametre.recherche.Global="";
      this.rechercheGlobal=""
      this.parametre.recherche.id=this.rechercheID;
      this.parametre.recherche.email=this.rechercheemail;
      this.parametre.recherche.tel=this.recherchetel;
      this.parametre.recherche.np=this.recherchenp;
      this.parametre.recherche.date=this.recherchedate;
      this.parametre.type = ["default","avancer"]
      const parametre = {
        parametre: this.parametre.type,
        limit:this.parametre.limit,
        recherche:this.parametre.recherche
      }
      this.$store.dispatch('getAllCommande', parametre).then((resul)=>{
        this.listCommandes = resul
        this.choixetat=""
        this.ouvert=-1
      })
    },
    ajouteici:function(place){
      if(place === this.ouvert){
        document.getElementsByClassName("flechebasTableau")[0].className = 'flechecoteTableau'
        this.choixetat = ""
        this.ouvert = -1
      }
      else{
        console.log(this.listCommandes[place])
        this.choixetat = this.listCommandes[place].comande.nometat[this.listCommandes[place].comande.etat]
        if(this.ouvert !== -1){
          document.getElementsByClassName("flechebasTableau")[0].className = 'flechecoteTableau'
        }
        console.log(document.getElementsByClassName("flechecoteTableau")[place].className)
        document.getElementsByClassName("flechecoteTableau")[place].className = 'flechebasTableau'
        this.ouvert = place
        console.log(this.choixetat)
      }
    },
    rechercheavancer:function(){
      if(this.ouvertavancer){
        document.getElementById("flecheavancer").className = "flechecote"
      }
      else{
        document.getElementById("flecheavancer").className = "flechebas"
      }
      this.ouvertavancer = !this.ouvertavancer
    },
    choix:function(num){
      this.parametre.recherche.etat[num] =  !this.parametre.recherche.etat[num]
      if (num === 6){
        this.parametre.recherche.etat = [0,0,0,0,0,0,1]
      }
      else{
        this.parametre.recherche.etat[6] = 0
      }
      const parametre = {
        parametre: this.parametre.type,
        limit:this.parametre.limit,
        recherche:this.parametre.recherche
      }
      this.$store.dispatch('getAllCommande', parametre).then((resul)=>{
        this.listCommandes = resul
        this.choixetat=""
        this.ouvert=-1
      })
    },
    savechangement:function(){
      let parametre = {
        id:this.listCommandes[this.ouvert].comande.id,
        etat:this.listCommandes[this.ouvert].comande.nometat.indexOf(this.choixetat)
      }
      this.$store.dispatch('changeEtat', parametre).then(()=>{
        parametre = {
          parametre: this.parametre.type,
          limit:this.parametre.limit,
          recherche:this.parametre.recherche
        }
        this.$store.dispatch('getAllCommande', parametre).then((resul)=>{
          this.listCommandes = resul
          this.choixetat=""
          this.ouvert=-1
        })
      })
    }
  },
  computed: {
    ...mapState(['userInfos']),
  }
}
</script>

<style scoped>
#AllCommandes{
  margin-top: 80px;
}
#advanced{
  display: flex;
  width: 100vw;
}
#textAdvanced{
  width: 80vw;
  display: flex;
  justify-content: space-between;
}
input, button  {
  padding: 5px;
  border-radius: 5px;
  border: solid 2px #a3a3a3;

}
.tableContainer{
  display: flex;
  justify-content: center;
  align-items: center;
}
td{
  padding: 10px;
  text-align: center;
}
th{
  padding: 10px;
  text-align: center;
  cursor: pointer;
}
.flechecoteTableau, .flechecote{
  width: 15px;
  height: 20px;
  background-color: #a3a3a3;
  -webkit-clip-path: polygon(0 0, 0 100%, 100% 50%);
}
.flechebasTableau, .flechebas{
  width: 20px;
  height: 15px;
  background-color: #a3a3a3;
  -webkit-clip-path: polygon(100% 0, 0 0, 50% 100%);
}
a{
  color: #078A6C;
  cursor: pointer;
}
.tablesCntr{
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>