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
        <button @click="saveFacture()" class="button">test</button>


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
</template>

<script>
import { mapState } from 'vuex'
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
        },
        panier: [],
      },
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      loaded: false,
      paidFor: false,
    }
  },
  mounted: function(){
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=ASOWp-_1zxWf4EXEzuc47swzhquPSB2XchEHOTMB8Ymv_KwnbQvBXRK9M6BFKqhSMTl90dMSp_qxVQxJ&currency=EUR";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);

    if(this.$store.state.user.userID === -1){
      this.$router.push('/login/');
    }

    this.$store.dispatch('getUserInfos').then(() => {
      // console.log("la je test")
      // console.log(this.$store.state.userInfos)
      // this.facture.adresse.id = this.$store.state.userInfos.id;
      // this.facture.adresse.street = this.$store.state.userInfos.street;
      // this.facture.adresse.streetNumber = this.$store.state.userInfos.streetNumber;
      // this.facture.adresse.city = this.$store.state.userInfos.city;
      // this.facture.adresse.postCode = this.$store.state.userInfos.postCode;
      // console.log("eaueueuaheuazueh")
      // console.log(this.$store.state.userInfos.pannier)
      // this.panier = this.$store.state.userInfos.pannier
      // console.log(this.panier.length)
      // console.log(this.panier[0].articleDescription)
      console.log(this.$store.state)
    })
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
                      value: this.total
                    }
                  }
                ]
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              this.data;
              this.paidFor = true;
              console.log(order); // + Créer un nouvel élément dans la collection commande
              this.saveFacture()
            },
            onError: err => {
              console.log(err);
            }
          })
          .render(this.$refs.paypal);
    },
    more : function(i, a){
      console.log(i, a)
      if(this.$store.state.pannier[i].qty<this.$store.state.pannier[i].article.qty){
        this.$store.dispatch("addOne",a);
        console.log(this.total);
      }
    },
    less : function(i, a){
      if(this.$store.state.pannier[i].qty>1){
        this.$store.dispatch("lessOne",a)
      }
    },
    saveAddress : function(){
      this.$store.dispatch('changeAddress', this.facture.adresse)
      //axios.post('http://localhost:3000/api/user/MA/' + this.userInfos.userID,this.facture.adresse, {headers:instance.defaults.headers.common['Authorization']}); //faire le lien ça race
    },
    reco : function(){
      this.$store.commit('logOut');
      this.$router.push('/login/payement');
    },
    saveFacture: function(){
      let option = {
        lastname:this.userInfos.lastName,
        firstname:this.userInfos.firstName,
        mobile:this.userInfos.mobile,
        email:this.userInfos.email,
        street:this.userInfos.street,
        city:this.userInfos.city,
        streetNumber:this.userInfos.streetNumber,
        postCode:this.userInfos.postCode
      }
      console.log(option)
      this.$store.dispatch('saveFacture', option)
      .then(()=>{
        console.log("jarrivepasla")
        this.$store.dispatch('resetpanier', this.$store.state.pannier)
        this.$router.push('/finiCommande/');
      })
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
.Payment div{
  position:relative;
  left: 50%;
  transform: translateX(-25%)
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
  width: 20vw;
  text-align: left;
}
thead th:nth-child(3), tbody td:nth-child(3){
  width: 10vw;
  text-align: right;
}
thead th:nth-child(4), tbody td:nth-child(4){
  width: 10vw;
  text-align: right;
}
thead th:nth-child(5), tbody td:nth-child(5){
  width: 10vw;
  text-align: right;
}
td, thead th{
  border-bottom: 2px solid black;
  text-align: center;
}
tfoot th{
  text-align: right;
}
 </style>
