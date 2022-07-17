<template>
  <div id="Commande">
    <p class="title">Récapitulatif de la commande</p>

        <div class="container">

          <div class="PContainer">
            <recap/>
            <div id="totalPrices">
              <div class="info">
                <p>Frais de port HT </p>
                <p style="color:#419D79;font-weight:bold">{{ Math.round(fraisDePort/1.2 * 100)/100 }}€ </p>
              </div>
              <div class="info">
                <p>Frais de port TTC</p>
                <p style="color:#419D79;font-weight:bold">{{ fraisDePort }}€ </p>
              </div>
              <div class="info">
                <p>TOTAL HT  </p>
                <p style="color:#419D79;font-weight:bold">{{ Math.round(total/1.2 * 100)/100 }}€</p>
              </div>
              <div class="info">
                <p>TOTAL TTC  </p>
                <span style="color:#419D79;font-weight:bold">{{ Math.round(total * 100)/100 }}€</span>
              </div>
            </div>
          </div>



            <p style="text-align:center;" v-if="$store.state.pannier.length === 0">Votre pannier est vide</p>
        </div>

    <p class="title">Choisissez votre mode de livraison</p>
    <livraison :test="change" ref="livraison" />
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
      adresse: {
        adresse : '',
        city : '',
        postCode : '',
        complement: ''
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
        this.adresse.adresse = document.getElementById("pudoWidgetAddress1").value
        this.adresse.city = document.getElementById("pudoWidgetTown").value
        this.adresse.postCode = document.getElementById("pudoWidgetZipCode").value
      }
      if(this.modeDeLivraison==="domicile"){
        // this.adresse.adresse = document.getElementById("num").value + " " + document.getElementById("rue").value
        this.adresse.streetNumber = document.getElementById("num").value
        this.adresse.street = document.getElementById("rue").value
        this.adresse.city = document.getElementById("ville").value
        this.adresse.postCode = document.getElementById("cp").value
        this.adresse.complement = document.getElementById("complement").value
      }
      if(this.modeDeLivraison=="surPlace"){
        this.adresse.adresse = "11 Bis Rue de Lorraine"
        this.adresse.city = "Damelevières"
        this.adresse.postCode = "54360"
      }

      // this.$store.dispatch('saveAdress', this.adresse)
      //     .then(()=>{console.log(this.$store.state.adresse)})
      // this.$store.dispatch('saveMDL', this.modeDeLivraison)
      //     .then(()=>{console.log(this.$store.state.MDL)})

      console.log(this.adresse)
      if(this.cdv && this.modeDeLivraison=="domicile" && this.$refs.livraison.isAdressComplete
          || this.cdv && this.modeDeLivraison=="pointRelais" &&  document.getElementById("pudoWidgetAddress1").value
          || this.cdv && this.modeDeLivraison=="surPlace"){
        const parametre = [this.$store.state.pannier, this.adresse, this.modeDeLivraison]
        this.$store.dispatch('saveparametre', parametre)
        if(this.$store.state.user.userID === -1){
          this.$router.push("/login/payement")
        }else{
          this.$store.dispatch('savepanier')
            .then(()=>{this.$router.push("/payement/")})
            .catch(()=>{console.log("Error : l'utilisateur n'est pas connecté !");this.$router.push("/login/payement")})
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
    },
    saveFDP : function(prixFraisDePort){
      this.$store.dispatch('saveFDP', prixFraisDePort).then(()=>console.log("Store : " + this.$store.state.FDP))
    }
  },
  computed: {
    total: function () {
      let total = this.fraisDePort;
      for(let i = 0; i<this.$store.state.pannier.length; i++){
        total += this.$store.state.pannier[i].article.price * this.$store.state.pannier[i].qty;
      }
      return total
    },
    fraisDePort: function(){
      let poidsFraisDePort = 0
      let prixFraisDePort;


      if(this.modeDeLivraison != "surPlace"){

        this.$store.state.pannier.forEach((article) => {
          poidsFraisDePort += article.qty * article.article.poids
        })

        if (poidsFraisDePort < 100 ) prixFraisDePort = 8
        if (poidsFraisDePort >= 100 && poidsFraisDePort < 500) prixFraisDePort = 10
        if (poidsFraisDePort >= 500 && poidsFraisDePort < 1000) prixFraisDePort = 12
        if (poidsFraisDePort >= 1000 && poidsFraisDePort < 1500) prixFraisDePort = 14
        if (poidsFraisDePort >= 1500 && poidsFraisDePort < 2000) prixFraisDePort = 16
        if (poidsFraisDePort >= 2000 && poidsFraisDePort < 2500 ) prixFraisDePort = 18
        if (poidsFraisDePort >= 2500 && poidsFraisDePort < 3000) prixFraisDePort = 20
        if (poidsFraisDePort >= 3000 && poidsFraisDePort < 3500) prixFraisDePort = 22
        if (poidsFraisDePort >= 3500 ) prixFraisDePort = 24

        this.saveFDP(Math.round(prixFraisDePort * 1.2 * 100)/100)

        return Math.round(prixFraisDePort * 1.2 * 100)/100



      }else{

        return 0
      }
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
  width: 50%
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

.info{
  display: flex;
  justify-content: space-between;
}

@media (max-width: 685px) {
  /*Add some code here*/
}

 </style>