<template>
  <div id="Commande" v-if="userInfos.firstName">
          <!-- <h1 style="text-align:center ; margin:40px 0;" >Commande</h1> -->

        <div class="container">
          <p class="title">Commanditaire</p>
          <div class="inputsContainer">
            <p class="petit">{{userInfos.lastName}}</p>
            <p class="grand">{{userInfos.firstName}}</p>
          </div>
          <div class="inputsContainer">
            <p class="grand">{{userInfos.email}}</p>
            <p class="petit">{{userInfos.mobile}}</p>
          </div>
        </div>

        <div class="container">
          <p class="title">Adresse</p>
          <div class="inputsContainer">
            <input class="numerot" type="number" placeholder="Numérot" v-model="facture.adressestreetNumber">
            <input class="rue" type="text" placeholder="Rue" v-model="facture.adressestreet">
          </div>
          <div class="inputsContainer">
            <input class="ville" type="text" placeholder="Ville" v-model="facture.adressecity">
            <input class="postal" type="number" placeholder="Code postale" v-model="facture.adressepostCode">
          </div>
          <div class="inputsContainer">
          <div id="remember_adresse" @click="saveAddress()" class="button">Se souvenir de l'adresse</div>
          </div>
        </div>


        <div class="container">
          <p class="title">Récapitulatif de la commande</p>
          <div class="PContainer">
            <div  v-for="(article, i) in $store.state.pannier" :key="article" ><!--:data-index="index" pour supr le warning remettre en cas de probleme-->
              <div class="Produit">
                <img :src="article.article.img" alt="">
                <div class="txts">

                  <span class="product-name"  style="color:#419D79;font-weight:bold">{{article.article.name}}</span><br>

                  <p class="desc">{{$store.state.pannier[i].article.description}}</p>
                </div>

                <div class="qty">
                  <div class="qty_button" id=plus @click="more(i, article.article._id)">
                    <div id="plus_vertical"></div>
                    <div class="plus_horizontal"></div>
                  </div>
                  <input type="number" v-model="$store.state.pannier[i].qty" id="qty" min="1" :max="article.article.qty" @keyup="majLS()"/>
                  <div class="qty_button" @click="less(i, article.article._id)">
                    <div class="plus_horizontal"></div>
                  </div>
                </div>
                  <span class="product-price" style="color:#419D79;font-weight:bold">{{Math.round( article.article.price* article.qty * 100) / 100}}</span>
                <div class="supr" @click="supr(article.article)">
                  <div></div>
                  <div></div>
                </div>
          </div>
      </div>
            <p class="title" style="margin-left: 40%">TOTAL : {{ Math.round(total * 100)/100 }}</p>
            <p style="text-align:center;" v-if="$store.state.pannier.length === 0">Votre pannier est vide</p>

          </div>
        </div>

        <p class="title" style="margin-bottom:50px">Finaliser la commande</p>


  <div class="Payment">
        <div ref="paypal"></div>
  </div>


</div>
<div v-else>
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
        panier: '',
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
    script.src =
        "https://www.paypal.com/sdk/js?client-id=test";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
    if(this.$store.state.user.userID === -1){
      this.$router.push('/login/commande');
      return;
    }
    this.$store.dispatch('getUserInfos').then(() => {
      this.facture.adresse.id = this.$store.state.userInfos.id;
      this.facture.adresse.street = this.$store.state.userInfos.street;
      this.facture.adresse.streetNumber = this.$store.state.userInfos.streetNumber;
      this.facture.adresse.city = this.$store.state.userInfos.city;
      this.facture.adresse.postCode = this.$store.state.userInfos.postCode;
      console.log(this.$store.state)
    })
  },
  methods:{
    setLoaded: function() {
      this.loaded = true;
      window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              //ici faut tester qu'on est bien co ça race mais a faire une fois qu'on aura le token eheh
              return actions.order.create({
                purchase_units: [
                  {
                    description: this.product.description,
                    amount: {
                      currency_code: "EUR",
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
    supr : function(a){
      this.$store.dispatch("suprPannier", a)
      console.log(a)
    },
    majLS : function(){
      localStorage.setItem('pannier', JSON.stringify(this.$store.state.pannier));
    },
    saveAddress : function(){
      this.$store.dispatch('changeAddress', this.facture.adresse)
      //axios.post('http://localhost:3000/api/user/MA/' + this.userInfos.userID,this.facture.adresse, {headers:instance.defaults.headers.common['Authorization']}); //faire le lien ça race
    },
    reco : function(){
      console.log('je suis la')
      this.$store.commit('logOut');
      this.$router.push('/login/');
    },
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
*{
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container{
  margin-bottom: 100px;
}
.numerot,.postal,.petit{
  width: 350px;
  margin: 12.5px;
}
.numerot,.postal,.rue,.ville{
  border-radius: 2px;
  padding:8px;
  border: solid #007057 2px;
  background:#fafafa;
  font-weight: 500;
  font-size: 16px;
  color: black;
}
.petit,.grand{
  border-radius: 2px;
  padding:8px;
  border: solid #007057 2px;
  background:#dddddd;
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
.rue,.ville,.grand{
  margin: 12.5px;
  width : 450px
}

.Produit{
    display: flex;
    flex-direction:row;
    justify-content: space-between;
    align-items: center;
    margin: 15px 0 15px 10px;
}
.qty{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items:center;
  width: 50px;
}
.qty_button{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  background-color: #419D78;
  border: none;
  border-radius: 5px;
  transition: .4s background-color;
  cursor: pointer;
}
#plus_vertical{
  height: 17px;
  width: 2.5px;
  background-color: #FFFFFF;
  border-radius: 5px;
  position: absolute;
}
.plus_horizontal{
  height: 2.5px;
  width: 17px;
  background-color: #FFFFFF;
  border-radius: 5px;
}
.supr{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  background-color: #fff;
  border-radius: 5px;
  transition: .4s background-color;
  border: solid 2px #A1A1A1;
  cursor: pointer;
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
#qty  {
  font-family: 'Segoe UI', sans-serif;
  margin: 10px;
  width: 40px;
  height: 40px;
  border: solid #419D79 2px;
  border-radius: 10px;
  font-size: 1.5em;
  text-align: center;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
img{
    object-fit: cover;
    width: 200px;
    margin-right: 10px;
    height: 150px;
}
ul,li{
    list-style: none;
}
.desc{
  width: 300px;
  font-size: smaller;
}
.product-price{
  margin: 0 10px;
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
#remember_adresse{
  position: absolute;
  width: 300px;
  text-align: center;
  top : 600px;
  right: 19%;

}
 </style>