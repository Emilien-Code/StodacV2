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

          <div>
            <span>Image : </span>
            <input type="file" id="file" ref="file" name="first" @change="handleFileUploaded()"/>
          </div>

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
            <button id="ajouter" @click="create()">Ajouter</button>
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
      validationPopup: false,
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
      isFileAded: false,
      fd: null,
      msg: "Souhaitez vous ajouter l'article ?"
    }
  },
  components:{
    fileAdded,
    ValidationPopup,
  },
  mounted: function(){
    if(this.$store.state.user.userID === -1){
      this.$router.push('/login/add');
    }
    this.$store.dispatch('getUserInfos');
    axios.get('https://stodac.fr/api/stuff/manufacturer')
        .then((response)=>{
          this.manufactureList = response.data;
        })
    axios.get('https://stodac.fr/api/stuff/categories')
        .then((response)=>{
          this.categoryList = response.data;
        })
  },
  methods : {
    handleFileUploaded(){
      this.file = this.$refs.file.files[0]
    },
    create : function(){
      const fd = new FormData()
      fd.append('image', this.file)
      fd.append('name', this.item.name)
      fd.append('manufacturer', this.item.manufacturer)
      fd.append('qty', this.item.qty)
      fd.append('price', Math.round(this.item.price * 1.2 * 100) / 100)
      fd.append('poids', this.item.poids)
      fd.append('reference', this.item.reference)
      fd.append('category', this.item.category)
      fd.append('state', this.item.state)
      fd.append('description', this.item.description)
      fd.append('compatibility', JSON.stringify(this.item.compatibility))
      this.fd = fd;
      this.validationPopup = true;
    },
    addComp : function (){
      this.compatibilities++
    },
    no: function (){
      this.validationPopup=false
    },
    yes: function (){
      this.validationPopup=false

      axios.post('https://stodac.fr/api/stuff/',this.fd)
          .then(()=>{
            this.isFileAded=true
          });



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