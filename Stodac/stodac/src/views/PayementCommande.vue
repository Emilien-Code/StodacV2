<template>
  <div id="Commande" v-if="userInfos.firstName">
      <div class="container">
        <p class="title">Détails de Livraison</p>
        <div class="infoLivraison">
          <p v-if="userInfos.saveLivraison.modeDeLivraison == 'surPlace' ">Retrait dans nos locaux au <b>{{ userInfos.saveLivraison.adresse.adresse }} à {{ userInfos.saveLivraison.adresse.city }}, {{ userInfos.saveLivraison.adresse.postCode }}</b> </p>
          <p v-else-if="userInfos.saveLivraison.modeDeLivraison == 'domicile' ">Livraison à domicile au <b>{{ userInfos.saveLivraison.adresse.streetNumber + " " +  userInfos.saveLivraison.adresse.street }} à {{ userInfos.saveLivraison.adresse.city }}, {{ userInfos.saveLivraison.adresse.postCode }}</b> </p>
          <p v-else-if="userInfos.saveLivraison.modeDeLivraison == 'pointRelais'">Livraison en point relais au <b>{{ userInfos.saveLivraison.adresse.adresse }} à {{ userInfos.saveLivraison.adresse.city }}, {{ userInfos.saveLivraison.adresse.postCode }}</b> </p>
        </div>
      </div>
      <MaModale v-bind:popup="popup" v-bind:jaichoisi="jaichoisi"/>
        <div class="container">
          <p class="title">Récapitulatif de la commande</p>
          <div class="PContainer">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Nom</th>
                  <th>Prix unité</th>
                  <th>Quantité</th>
                  <th>Prix TTC</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th> <div class="footContainer"><p>Frais de port TTC </p> <p> {{fdp}}€ </p>  </div></th>
                </tr>
                <tr>
                  <th> <div class="footContainer"><p>TOTAL TTC  </p> <p> {{userInfos.savePrix.prix_ttl}}€</p></div> </th>
                </tr>
              </tfoot>
              <tbody>
                <tr v-for="(article) in userInfos.pannier" :key="article">
                  <td><img :src="article.articleImg" alt=""></td>
                  <td>{{article.articleName}}</td>
                  <td>{{article.articlePrice}}€</td>
                  <td>{{article.qty}}</td>
                  <td>{{Math.round(article.prix_ttl *100)/100}}€</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      <p class="title" >Adresse de facturation</p>
    <div id="box">

        <adress ref="test"/>
    </div>
      <p class="title" style="margin-bottom:50px">Finaliser la commande</p>
<PayementSelect :test="changeMDP" :saveF="saveFacture" :sendingCommand="sc"/>
 

</div>
<div id="commandelse" v-else>
  <p style="text-align: center">Votre connexion à éxpirée. Reconnectez vous afin d'acceder a ces informations</p>
  <div class="inputsContainer">
  <button @click="reco()" class="button">Reconnection</button>
  </div>
</div>


  <loader v-if="isLoading"/>

</template>

<script>
import { mapState } from 'vuex'
import MaModale from '../components/saveAdresse.vue'
import loader from "../components/loader";
import PayementSelect from "../components/RecapCommandeComponents/payementSelect";
import adress from "../components/forms/adress";
import Adress from '../components/forms/adress.vue';
export default {
  name: 'Commande',
  data: function () {
    return {
      facture:{
        adresse: {
          street: '',
          streetNumber: '',
          city: '',
          postCode: '',
        },
        panier: [],
      },
      isLoading: true,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      popup: false,
      MDP:'paypal'
    }
  },
  components: {
    PayementSelect,
    MaModale,
    loader,
    adress,
    Adress
  },
  mounted: function(){
    if(this.$store.state.user.userID === -1){
      this.$router.push('/login/');
    }

    this.$store.dispatch('getUserInfos').then(() => {
      // this.facture.adresse.street = this.$store.state.userInfos.street;
      // this.facture.adresse.streetNumber = this.$store.state.userInfos.streetNumber;
      // this.facture.adresse.city = this.$store.state.userInfos.city;
      // this.facture.adresse.postCode = this.$store.state.userInfos.postCode;
      if(this.$store.state.userInfos.streetNumber != -1){
      this.$refs.test.streetNumber  = this.$store.state.userInfos.streetNumber
        this.$refs.test.street = this.$store.state.userInfos.street
        this.$refs.test.city  = this.$store.state.userInfos.city
        this.$refs.test.postCode  = this.$store.state.userInfos.postCode
      }else if(this.$store.state.userInfos.saveLivraison.modeDeLivraison === "domicile"){
        this.$refs.test.streetNumber = this.$store.state.userInfos.saveLivraison.adresse.streetNumber
        this.$refs.test.street = this.$store.state.userInfos.saveLivraison.adresse.street
        this.$refs.test.city = this.$store.state.userInfos.saveLivraison.adresse.city
        this.$refs.test.postCode = this.$store.state.userInfos.saveLivraison.adresse.postCode
        document.getElementById("complement").value = this.$store.state.userInfos.saveLivraison.adresse.complement
      }
      this.isLoading = false
      console.log(this.userInfos)
    })

    if(this.$store.state.pannier.length === 0){
      this.$router.push('/');
    }

  },
  methods:{
    saveAddress : function(){
      this.$store.dispatch('changeAddress', this.facture.adresse)
    },
    changeMDP: function(e){
      this.MDP = e
      console.log(this.MDP)
    },
    reco : function(){
      this.$store.commit('logOut');
      this.$router.push('/login/payement');
    },
    saveFacture: function(Factureid){
      // console.log(changementadresse)
      let option = {
        lastname:this.userInfos.lastName,
        firstname:this.userInfos.firstName,
        mobile:this.userInfos.mobile,
        email:this.userInfos.email,
        mdp: this.MDP,
        street:document.getElementById("rue").value,
        city:document.getElementById("ville").value,
        streetNumber:document.getElementById("num").value,
        postCode:document.getElementById("cp").value,
        idp:Factureid
      }
      //console.log(option)
      this.$store.dispatch('saveFacture', option)
      .then(()=>{
        if(document.getElementById("num").value != this.$store.state.userInfos.streetNumber || document.getElementById("rue").value != this.$store.state.userInfos.street || document.getElementById("ville").value != this.$store.state.userInfos.city || document.getElementById("cp").value != this.$store.state.userInfos.postCode){
          this.popup = true
        }else{
          this.$router.push('/finiCommande/');
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    sc : function(){
      console.log("OnEnvoies : print loader")
      this.isLoading = true
    },
    jaichoisi: function(lechoix){
      if(lechoix){
        this.facture.adresse.street = document.getElementById("rue").value;
        this.facture.adresse.streetNumber = document.getElementById("num").value;
        this.facture.adresse.city = document.getElementById("ville").value;
        this.facture.adresse.postCode = document.getElementById("cp").value;
        this.$store.dispatch('changeAddress', this.facture.adresse)
      }
      this.$router.push('/finiCommande/')
    }
  },
  computed: {
    fdp: function(){
      let sum = 0
      this.userInfos.pannier.forEach((a)=>{
        sum += a.prix_ttl
      })
      return Math.round((this.userInfos.savePrix.prix_ttl - sum)*100)/100
    },
    total: function () {
      let total = 0;
      for(let i = 0; i<this.$store.state.pannier.length; i++){
        total += this.$store.state.pannier[i].article.price * this.$store.state.pannier[i].qty;
      }
      return total
    },
    ...mapState(['userInfos']),
  },
}

</script>





 <style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap');
#Commande{
  margin-top: 80px;
}
#commandelse{
  margin-top: 80px;
}
.infoLivraison{
  display: flex;
  justify-content: center;
}
.infoLivraison > p{
  width: 50%;
}
*{
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#box{
  width: 60%;
  position: relative;
  left: 50%;
  transform:translateX(-50%);
}
.container{
  margin-bottom: 100px;
}

.inputsContainer, .PContainer{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.PContainer{
  flex-direction: column;
}
.title{
  color:#007057;
  margin-left: 21.4%;
}
.supr div{
  width: 2.5px;
  height: 15px;
  background-color: #A1A1A1;
  border-radius: 2px;
  position: absolute;
}
.supr div:nth-child(1){
  transform:rotate(45deg);
}
.supr div:nth-child(2){
  transform:rotate(-45deg);
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
img{
    object-fit: cover;
    width: 20vw;
    margin-right: 10px;
}
ul,li{
    list-style: none;
}
.PContainer li{
  margin-bottom: 15px;
}

.button {
  background: #419D79;
  color:white;
  border-radius: 8px;
  font-weight: 400;
  font-size: 15px;
  border: none;
  width: 400px;
  padding: 12px;
  transition: .4s background-color;
}
.button:hover {
  cursor:pointer;
  background: #078A6C;
}
table{
  table-layout: fixed;
  width: 60%;
  border-collapse: collapse;
  margin: 0;
}
td{
  padding: 10px 0 ;
}
thead th:nth-child(1), tbody td:nth-child(1){
  width: 20vw;
  text-align: center;
}
thead th:nth-child(2), tbody td:nth-child(2){
  width: 10vw;
  text-align: center;
}
thead th:nth-child(3), tbody td:nth-child(3){
  width: 10vw;
  text-align: center;
}
thead th:nth-child(4), tbody td:nth-child(4){
  width: 10vw;
  text-align: center;
}
thead th:nth-child(5), tbody td:nth-child(5){
  width: 10vw;
  text-align: center;
}
td, thead th{
  border-bottom: 2px solid black;
  text-align: center;
}
footer  {
  margin: 0;
}
.footContainer{
  display: flex;
  justify-content: space-between;
  text-align: left;
  width: 60vw;
}
@media (max-width: 660px) {
  thead th:nth-child(1), tbody td:nth-child(1){
    display: none;
  }
  thead th:nth-child(2), tbody td:nth-child(2){
    width: 20vw;
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
  .footContainer {
    width: 80vw;
  }
  }

 </style>
