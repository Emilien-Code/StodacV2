<template>
  <div id="addItem">
    <div v-if="$store.state.userInfos.admin" >
      <div id="left-right-container">
        <div id="left">
          <div>
            <span>Nom :</span>
            <input type="text" v-model="item.name">
          </div>
          <div>
            <span>Marque :</span>

            <select id="marque" v-model="item.manufacturer">
              <option v-for="man in manufactureList" :value="man" :key="man">{{ man }}</option>
            </select>

            <span>OU</span>
            <input type="text" placeholder="nouvelle marque" v-model="item.manufacturer">

          </div>


          <div>
            <span>Poids :</span>
            <input type="number" v-model="item.poids"><span>grammes</span>
          </div>



          <div>
            <span>Quantitée :</span>
            <input type="number" v-model="item.qty">
          </div>

          <!--<div>
            <span>Image : </span>
            <input type="file" id="file" ref="file" name="first" @change="handleFileUploaded()"/>
          </div>-->

        </div>
        <div id="right">
          <div>
            <span>Référence : </span>
            <input type="text" v-model="item.reference">
          </div>

          <div>
            <span>Catégorie :</span>

            <select id="category" v-model="item.category">
              <option v-for="man in categoryList" :value="man" :key="man">{{ man }}</option>
            </select>
            <span>OU</span>
            <input type="text" v-model="item.category" placeholder="nouvelle catégorie"/>
          </div>
          <div>
            <span>État : (neuf ou occasion) :</span>
            <select id="state" v-model="item.state">
              <option value="Neuf">neuf</option>
              <option value="Occasion">Occasion</option>
            </select>
          </div>

          <div>
            <span>Prix :</span>
            <input type="number" v-model="item.price">
            <span>€, avec TVA : {{ Math.round(item.price * 1.2 * 100) / 100 }} €</span>
          </div>

        </div>
      </div>
      <div id="middle">
        <div id="cmp">
          <input class="comps" v-for="(comp, index) in compatibilities" :key="comp" type="text" v-model="item.compatibility[index]" placeholder="Compatibilitées"/>
          <button id="rond" @click="addComp()">+</button>
        </div>
        <div id="desc">
          <textarea v-model="item.description" placeholder="Description">></textarea>
        </div>
        <div >
          <button id="ajouter" @click="create()">Enregistrer</button>
        </div>

      </div>




    </div>
    <div v-else>Niveau d'accès trop bas pour acceder.</div>
    <fileAdded v-if="isFileAded"/>
    <validation-popup :message="msg" :yes="yes" :no="no" v-if="validationPopup"/>

  </div>
</template>

<script>
import fileAdded from "../components/addFileComponents/fileAdded";
import ValidationPopup from "../components/addFileComponents/validationPopup";
const axios = require('axios');
export default {
  name: "addItem",
  data : function(){
    return{
      msg: "Voulez vous modifier cet article",
      validationPopup:false,
      articleId: this.$route.params.id,
      item : {
        compatibility: [],
        name: "",
        manufacturer: "",
        qty: 0,
        price: 0,
        poids: 0,
        reference: "",
        category: "",
        img: "",
        state: "",
        description: "",
      },
      file : '',
      manufactureList : [],
      categoryList : [],
      compatibilities: 1,
      isFileAded: false
    }
  },
  components:{
    ValidationPopup,
    fileAdded
  },
  mounted: function(){
    if(this.$store.state.user.userID === -1){
      this.$router.push('/login/add');
    }
    this.$store.dispatch('getUserInfos');
    axios.get('http://localhost:3000/api/stuff/manufacturer')
        .then((response)=>{
          this.manufactureList = response.data;
        })
    axios.get('http://localhost:3000/api/stuff/categories')
        .then((response)=>{
          this.categoryList = response.data;
        })
    axios.get(`http://localhost:3000/api/stuff/product/${this.articleId}`)
        .then((response)=>{
          let i = 0
          this.item.name =  response.data[0].name
          response.data[0].compatibility.forEach(e=>{
            this.item.compatibility[i] = e
            i++
          })
          this.item.description =  response.data[0].description
          this.item.img =  response.data[0].img
          //console.log(response.data[0].img)
          this.item.manufacturer =  response.data[0].manufacturer
          this.item.poids =  response.data[0].poids
          this.item.price =  response.data[0].price / 1.20
          this.item.qty =  response.data[0].qty
          this.item.reference =  response.data[0].reference
          this.item.state =  response.data[0].state
          this.compatibilities = response.data[0].compatibility.length
        })
        .catch((error)=>{
          console.log(error)
        })

  },
  methods : {
    handleFileUploaded(){
      this.file = this.$refs.file.files[0]
    },
    create : function(){
      this.validationPopup = true
    },
    yes: function(){
      this.validationPopup = false
      axios.put(`https://stodac.fr/api/stuff/${this.articleId}`,{
        image: this.item.img,
        name: this.item.name,
        manufacturer: this.item.manufacturer,
        qty: this.item.qty,
        price: Math.round(this.item.price * 120)/100,
        poids: this.item.poids,
        reference: this.item.reference,
        category: this.item.category,
        state: this.item.state,
        description: this.item.description,
        compatibility: JSON.stringify(this.item.compatibility),
      })
          .then(()=>{
            this.$router.push("/gestionstocks")

          });
    },
    no : function (){
      this.validationPopup = false
    },
    addComp : function (){
      this.compatibilities++
    }
  }
}
</script>
<style scoped>
#addItem{
  margin-top: 80px;
}
input, select, textarea, button{
  padding: 5px;
  border-radius: 5px;
  border: solid #E1E1E1 1px;
  width: 35%;
  font-family:  sans-serif;
}
textarea{
  width: 100%;
  height: 200px;
  resize: none;
}
#desc{
  height: 200px;
  width: 80%;

}
span{
  margin: 0 10px;
}
button  {
  background-color: #078A6C;
  cursor: pointer;
}
#ajouter  {
  width: 250px;
  height: 50px;
}

#rond{
  border-radius: 10px;
  width: 30px;
  height: 30px;
  margin-left: 10px;
}
.comps  {
  margin-left: 2px;
  width: 19%;
}
#cmp  {
  width: 80%;
}
#right, #left{
  width: 40%;
}
#left-right-container{
  position: relative;
  width: 80%;
  display: flex;
  justify-content: space-between;
  left: 50%;
  transform:translateX(-50%);
}
#middle{
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
#middle > div, #right > div, #left > div {
  margin-top: 20px;
}
#file{
  width: 50%;
}
</style>