<template>
  <div id="Commande">
    <p class="title">Récapitulatif de la commande</p>

        <div class="container">

          <div class="PContainer">
            <recap/>
            <div id="totalPrices">
              <p  style="margin-left: 40%">TOTAL HT : <span style="color:#419D79;font-weight:bold">{{ Math.round(total/1.2 * 100)/100 }}€</span></p>
              <p  style="margin-left: 40%">TOTAL TTC : <span style="color:#419D79;font-weight:bold">{{ Math.round(total * 100)/100 }}€</span></p>
            </div>
          </div>



            <p style="text-align:center;" v-if="$store.state.pannier.length === 0">Votre pannier est vide</p>
        </div>

    <p class="title">Choisissez votre mode de livraison</p>
    <livraison :test="change" />
        <div class="inputsContainer">
          <div>
            <input id="checkbox" type="checkbox" v-model="cdv">
            <span id="CDV" @click="pushToCDV">J'accepte les conditions générales de vente</span>
          </div>
          <button  @click="command()" class="button">Commander</button>
        </div>

</div>

</template>




<script>
import { mapState } from 'vuex'
import recap from "../components/RecapCommandeComponents/recap";
import livraison from "../components/RecapCommandeComponents/livraisonSelect"

export default {
  name: 'Commande',
  data: function () {
    return {
      panier: '',
      cdv:false,
      adress: {
        adress : '',
        city : '',
        postCode : '',
      },
        modeDeLivraison : 'domicile'
    }
  },
  components:{
    recap,
    livraison
  },
  mounted: function(){
    if(this.$store.state.pannier.length === 0){
      this.$router.push('/');
    }
  },
  methods:{
    command: function(){
      if (this.modeDeLivraison==="pointRelais"){
        this.adress.adress = document.getElementById("pudoWidgetAddress1").value
        this.adress.city = document.getElementById("pudoWidgetTown").value
        this.adress.postCode = document.getElementById("pudoWidgetZipCode").value
      }
      if(this.modeDeLivraison==="domicile"){
        this.adress.adress = document.getElementById("num").value + " " + document.getElementById("rue").value
        this.adress.city = document.getElementById("ville").value
        this.adress.postCode = document.getElementById("cp").value
      }
      if(this.modeDeLivraison=="surPlace"){
        this.adress.adress = "11 Bis Rue de Lorraine"
        this.adress.city = "Damelevières"
        this.adress.postCode = "54360"
      }
      this.$store.dispatch('saveAdress', this.adress)
          .then(()=>{
            console.log(this.$store.state.adress)
          })
      this.$store.dispatch('saveMDL', this.modeDeLivraison)
          .then(()=>{console.log(this.$store.state.MDL)})
      if(this.cdv){
        if(this.$store.state.user.userID === -1){
          this.$router.push("/login/payement")
        }else{
          this.$store.dispatch('savepanier', this.$store.state.pannier)
            .then(()=>{
              this.$router.push("/payement/")
            })
            .catch(()=>{
              console.log("Error : l'utilisateur n'est pas connecté !")
            })
        }
      }
    },
    change: function(e){
      this.modeDeLivraison = e
    },
    reset: function(){
      this.$store.dispatch('resetpanier', this.$store.state.pannier)
    },
    pushToCDV : function (){
      let routeData = this.$router.resolve({name: 'conditionsGeneralesDeVente', query: {data: "someData"}});
      window.open(routeData.href, '_blank');
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
  margin-top: 130px;
}
*{
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#totalPrices{
  width: 300px
}
.container{
  margin-bottom: 50px;
}
.title{
  color:#007057;
  margin: 60px 0 20px 21.4%;
}
.inputsContainer{
  margin-top: 25px;
}
.inputsContainer, .PContainer{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.inputsContainer span{
  margin-left: 15px;
}
#checkbox {
  -webkit-appearance: none;
  background-color: #acacac;
  border: none;
  padding: 7px;
  border-radius: 3px;
  display: inline-block;
  position: relative;
}
#checkbox:checked {
   background-color: #078A6C;
   color: #99a1a7;
 }

#checkbox:checked:after {
  content: '\2714';
  font-size: 10px;
  position: absolute;
  top: 0px;
  left: 3px;
  color: #fff;
}
#CDV  {
  margin-top: 10px;
  cursor: pointer;
  color: #078A6C;
}

.PContainer{
  flex-direction: column;
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

@media (max-width: 685px) {
  /*Add some code here*/
}

 </style>