<template>
  <div id="Commande" v-if="userInfos.firstName">
      <div class="container">
        <p class="title">Commanditaire</p>
        <div class="inputsContainer">
          <input class="small" type="text" placeholder="Nom" v-model="userInfos.lastName">
          <input class="big" type="text" placeholder="Prénom" v-model="userInfos.firstName">
        </div>
        <div class="inputsContainer">
          <input class="big" type="email" placeholder="Email" v-model="userInfos.email">
          <input class="small" type="tel" placeholder="Numérot de téléphone" v-model="userInfos.mobile">
        </div>
      </div>
      <MaModale v-bind:popup="popup" v-bind:jaichoisi="jaichoisi"/>
        <div class="container">
          <p class="title">Adresse</p>
          <div class="inputsContainer">
            <input class="small" type="number" placeholder="Numérot" v-model="userInfos.streetNumber">
            <input class="big" type="text" placeholder="Rue" v-model="userInfos.street">
          </div>
          <div class="inputsContainer">
            <input class="big" type="text" placeholder="Ville" v-model="userInfos.city">
            <input class="small" type="number" placeholder="Code postale" v-model="userInfos.postCode">
          </div>
          <div class="inputsContainer">
          <!--<div id="remember_adresse" @click="saveAddress()" class="button">Se souvenir de l'adresse</div>-->
          </div>
        </div>
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
                  <th>Prix</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th colspan="5">TOTAL : {{userInfos.prix_ttl_panier}}€ </th>
                </tr>
              </tfoot>
              <tbody>
                <tr v-for="(article) in userInfos.pannier" :key="article">
                  <td><img :src="article.articleImg" alt=""></td>
                  <td>{{article.articleName}}</td>
                  <td>{{article.articlePrice}}</td>
                  <td>{{article.qty}}</td>
                  <td>{{Math.round(article.prix_ttl *100)/100}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p class="title" style="margin-bottom:50px">Finaliser la commande</p>


  <div class="Payment">
        <div ref="paypal" id="paypal-button-container"></div>
  </div>
 

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
//const axios = require('axios');
export default {
  name: 'Commande',
  data: function () {
    return {
      facture:{
        adresse: {
          //id: '',
          street: '',
          streetNumber: '',
          city: '',
          postCode: '',
          isLoading: true
        },
        panier: [],
      },
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      loaded: false,
      paidFor: false,
      popup: false,
    }
  },
  components: {
    MaModale,
    loader
  },
  mounted: function(){
    const script = document.createElement("script");
    // script.src = "https://www.paypal.com/sdk/js?client-id=ASOWp-_1zxWf4EXEzuc47swzhquPSB2XchEHOTMB8Ymv_KwnbQvBXRK9M6BFKqhSMTl90dMSp_qxVQxJ&currency=EUR";
    script.src = "https://www.paypal.com/sdk/js?client-id=AcEtnb29bqEV3TrgU7d17CLOZdn6ic6WttgSXV4uRZBog32B02eGZDFGNiLkAwhJOAplxRhU3EMtgykQ&currency=EUR";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);

    if(this.$store.state.user.userID === -1){
      this.$router.push('/login/');
    }

    this.$store.dispatch('getUserInfos').then(() => {

      this.facture.adresse.street = this.$store.state.userInfos.street;
      this.facture.adresse.streetNumber = this.$store.state.userInfos.streetNumber;
      this.facture.adresse.city = this.$store.state.userInfos.city;
      this.facture.adresse.postCode = this.$store.state.userInfos.postCode;

      this.isLoading = false;
    })

    if(this.$store.state.pannier.length === 0){
      this.$router.push('/');
    }

  },
  methods:{
    setLoaded: function() {
      this.loaded = true;
      window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: this.description,
                    amount: {
                      value: this.userInfos.prix_ttl_panier
                    }
                  }
                ]
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              this.data;
              this.paidFor = true;
              console.log("la c la facture de paypal bg")
              console.log(order); // + Créer un nouvel élément dans la collection commande
              if(this.facture.adresse.street != this.$store.state.userInfos.street || this.facture.adresse.streetNumber != this.$store.state.userInfos.streetNumber || this.facture.adresse.city != this.$store.state.userInfos.city || this.facture.adresse.postCode != this.$store.state.userInfos.postCode){
                this.saveFacture(true, order.id)
              }
              else{
                this.saveFacture(false, order.id)
              }
            },
            onError: err => {
              console.log(err);
            }
          })
          .render(this.$refs.paypal);
    },
    saveAddress : function(){
      this.$store.dispatch('changeAddress', this.facture.adresse)
      //axios.post('http://localhost:3000/api/user/MA/' + this.userInfos.userID,this.facture.adresse, {headers:instance.defaults.headers.common['Authorization']}); //faire le lien ça race
    },
    reco : function(){
      this.$store.commit('logOut');
      this.$router.push('/login/payement');
    },
    saveFacture: function(changementadresse, Factureid){
      let option = {
        lastname:this.userInfos.lastName,
        firstname:this.userInfos.firstName,
        mobile:this.userInfos.mobile,
        email:this.userInfos.email,
        street:this.userInfos.street,
        city:this.userInfos.city,
        streetNumber:this.userInfos.streetNumber,
        postCode:this.userInfos.postCode,
        idp:Factureid
      }
      console.log(option)
      this.$store.dispatch('saveFacture', option)
      .then(()=>{
        console.log("jarrivepasla")
        // this.$store.dispatch('resetpanier', this.$store.state.pannier)
        if(changementadresse){
          this.popup = true
        }else{
          this.$router.push('/finiCommande/');
        }
      })
    },
    jaichoisi: function(lechoix){
      if(lechoix){
        this.facture.adresse.street = this.$store.state.userInfos.street;
        this.facture.adresse.streetNumber = this.$store.state.userInfos.streetNumber;
        this.facture.adresse.city = this.$store.state.userInfos.city;
        this.facture.adresse.postCode = this.$store.state.userInfos.postCode;
        this.$store.dispatch('changeAddress', this.facture.adresse)
      }
      this.$router.push('/finiCommande/')
    }
  },
  computed: {
    total: function () {
      let total = 0;
      for(let i = 0; i<this.$store.state.pannier.length; i++){
        total += this.$store.state.pannier[i].article.price * this.$store.state.pannier[i].qty;
      }
      return total
    },
    ...mapState(['userInfos']),
  }
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
*{
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container{
  margin-bottom: 100px;
}
.small{
  width: 350px;
  margin: 12.5px;
}
.big{
  margin: 12.5px;
  width : 450px;
}
.small,.big{
  border-radius: 10px;
  padding:8px;
  border: solid #007057 2px;
  background:#fafafa;
  font-weight: 500;
  font-size: 16px;
  color: black;
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
.Payment{
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
  z-index: 10;
  background-color: #fff;
}
#paypal-button-container{
  width: 750px;
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
tfoot th{
  text-align: right;
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
}
footer  {
  margin: 0;
}
 </style>
