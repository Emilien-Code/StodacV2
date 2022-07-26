<template>
  <div id="bg"></div>
<div id="infoCommandeAdmin" v-clickOutside="close">
  <button id="close" @click="close()">
    <span></span>
    <span></span>
  </button>
  <div class="wrapper2">
    <div class="left">
      <div class="title">
        <h4>Utilisateur</h4>
        <p>{{commande.comande.id.slice(0, 24)}}</p>
      </div>
      <p>{{commande.comande.facture.lastname + " " + commande.comande.facture.firstname}}</p>
      <p>{{commande.comande.facture.email}}</p>
      <p>+{{commande.comande.facture.mobile}}</p>
    </div>

  <div class="right">
      <div class="title">
        <h4>Livraison <a :href="commande.comande.pdf" target="_blank"> <img style="width:16px; height: 16px" src="../../../public/80942.png" alt=""> </a></h4>

      </div>
      <p>Adresse: {{commande.comande.facture.streetNumber}} {{commande.comande.facture.street}} {{commande.comande.facture.city}} ({{commande.comande.livraison.modeDeLivraison}})</p>
      <p>Frais de ports HT: {{ commande.comande.prix.prix_ttl_fdp_HT }} €</p>
      <p>Frais de ports TTC: {{ commande.comande.prix.prix_ttl_fdp }} €</p>
      <p></p>
    </div>
  </div>
  <div class="wrapper2">
    <div class="left">
      <div class="title">
        <h4>Commande</h4>
        <p>{{commande.comande.id}}</p>

      </div>
      <div id="table_container">

        <table>
          <tbody>
          <tr v-for="el in commande.comande.materiels" :key="el">
            <td><img :src="el.obj.img" :alt="el.obj.name"/></td>
            <td>{{el.obj.name}}</td>
            <td>{{el.qty}}</td>
            <td>{{el.obj.price}} €</td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>

    <div class="right">
      <div class="title">
        <h4>État</h4>

      </div>
      <div id="state">
        <p id="edc" v-if="commande.comande.etat >= 0" :style="{backgroundColor: color[commande.comande.etat]}">{{commande.comande.nometat[commande.comande.etat]}}</p>
        <select name="etat" id="etat"  v-model="choixetat">
          <option :value="e" v-for="e in filteredArray" :key="e">{{ e }}</option>
        </select>
      </div>
      <div class="title">
        <h4>Date</h4>
      </div>
      <p>{{commande.comande.date.substring(0,10)}}</p>
    </div>
  </div>
  <div class="wrapper2">
    <div class="left">
      <div class="title">
        <h4>Total</h4>
      </div>
      <p>Total HT : {{commande.comande.prix.prix_ttl_panier_HT}} €</p>
      <p>Total TTC : {{commande.comande.prix.prix_ttl_panier}} €</p>
    </div>
    <div class="right">
      <div id="btn_container">
        <button id="save" @click="savechangement()">Enregistrer</button>
        <button id="push" @click="afficheFacture(commande.comande.id)">Voir la commande</button>
      </div>

    </div>
  </div>
</div>
</template>

<script>
let clickOutside = function(el, binding) {
  el.clickOutsideEvent = function (event) {
    if (!el.contains(event.target)) {
      binding.value()
    }
  };
  document.body.addEventListener('click', el.clickOutsideEvent)
}

export default {
  name: "infoCommandeAdmin",
  props : {
    commande: Object
  },
  data: ()=>{
    return{
      isOpen: false,
      color: ["yellow","yellow","yellow","Aquamarine","LightGreen","lightCoral","lightCoral","lightCoral"],
      choixetat: ""
    }
  },
  mounted() {
    window.scroll(0,0)
    setTimeout(()=>{
      this.isOpen = true
    },500)
  },
  computed: {
    filteredArray: function(){
      console.log(this.commande.comande.nometat)
      const newArray = new Array();
      let i = 0;
      this.commande.comande.nometat.forEach(e=>{
        if (i<6) newArray.push(e)
        i++
      })
      return newArray
    }
  },
  methods:{
    close: function (){
      if (this.isOpen){
        this.$parent.click();
        this.isOpen = false
        this.$parent.actualize();
      }
    },
    afficheFacture:function(nomFacture){
      this.$router.push({name:`factureAdm`, params:{numfacture: nomFacture}});
    },
    savechangement:function(){
      const parametre = {
        id:this.commande.comande.id,
        etat:this.commande.comande.nometat.indexOf(this.choixetat)
      }
      if(this.commande.comande.nometat[this.commande.comande.etat] != this.choixetat){
        this.$store.dispatch('changeEtat', parametre).then(()=>{
          this.choixetat=""
          this.close();
        })
      }
    }
  },
  directives:{
    clickOutside
  }
}
</script>

<style scoped>
#bg{
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: black;
  z-index: 0;
  top: 0;
  left: 0;
  opacity: .25;
}
#infoCommandeAdmin {
  position: absolute;
  left: 5%;
  top: 10%;
  height: 73%;
  z-index: 1;
  width: 90vw;
  background-color: #FFFFFF;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
}

.title{
  margin-top: 10px ;
  display: flex;
  justify-content: space-between;
}
.title p{
  color: #078A6C;
  padding-right: 20px;
}
.right, .left{
  padding: 20px;
  width: 50%;
}
.wrapper2{
  display: flex;
  justify-content: space-between;
}
img {
  object-fit: cover;
  height: 100px;
}
table{
  overflow-y: scroll;
  border-collapse: collapse;
}
#table_container{
  overflow-y: scroll;
  height: 400px;
}
td:nth-child(1){
  padding: 0;
}
td {
  padding: 30px;
  border: 2px solid #333;
}
select{
  padding: 10px;
  width: 40%;

}
#edc{
  padding: 10px;
  width: 60%;
}
#state  {
  display: flex;
  justify-content: space-between;
}
#save{
  padding: 10px;
  border-radius: 10px;
  border: #078A6C solid 2px;
  cursor: pointer;
  background-color: #FFFFFF;
}
#push{
  border: none;
  color: #078A6C;
  background-color: white;
  cursor: pointer;
margin-left: 50px;
}
#btn_container{
  display: flex;
  justify-content: flex-end;
}

#close{
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  background-color: #F1F1F1;
  border:none;
  cursor:pointer;
  transition: .4s background-color;
}
#close:hover{
  background-color: #E1E1E1;
}
#close div{
  width: 2.5px;
  height: 15px;
  background-color: #A1A1A1;
  border-radius: 2px;
  position: absolute;
  top : 5px;
  left  : 10.5px;
}
#close:hover{
  background-color: #E1E1E1;
}
#close span{
  width: 2.5px;
  height: 15px;
  background-color: #A1A1A1;
  border-radius: 2px;
  position: absolute;
  top : 5px;
  left  : 10.5px;
}
#close span:nth-child(1){
  transform:rotate(45deg);
}
#close span:nth-child(2){
  transform:rotate(-45deg);
}
</style>