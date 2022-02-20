<template>
  <div id="addItem">
    <div v-if="$store.state.userInfos.admin">
      <div class="row">

      <div>
        <span>Nom :</span>
        <input type="text" v-model="item.name">
      </div>
      <div>
        <span>Référence : </span>
        <input type="text" v-model="item.reference">
      </div>
      </div>

      <div class="row">
        <span>Marque :</span>

        <select id="marque" v-model="item.manufacturer">
          <option v-for="man in manufactureList" :value="man" :key="man">{{ man }}</option>
        </select>

        OU

        nouvelle marque :<input type="text" v-model="item.manufacturer">

      </div>
      <div class="row">

      <div>
        <span>Poids :</span>
        <input type="number" v-model="item.poids">
      </div>
      <div>
        <span>État : (neuf ou occasion) :</span>
        <select id="state" v-model="item.state">
          <option value="Neuf">neuf</option>
          <option value="Occasion">Occasion</option>
        </select>
      </div>
      </div>
      <div class="row">

      <div>
        <span>Quantitée :</span>
        <input type="number" v-model="item.qty">
      </div>
      <div>
        <span>Prix :</span>
        <input type="number" v-model="item.price">
      </div>
      </div>
      <div class="row">
        <span>Compatibilités :</span>
        <input class="comps" v-for="(comp, index) in compatibilities" :key="comp" type="text" v-model="item.compatibility[index]"/>
        <button id="rond" @click="addComp()">+</button>
      </div><!-- VMODEL compatibility[0] -->
      <div class="row" id="desc">
        <span>Description : </span>
        <textarea v-model="item.description"></textarea>
      </div>
      <div class="row">
        <span>Image : </span>
        <input type="file" id="file" ref="file" name="first" @change="handleFileUploaded()"/>
      </div>


    <div class="row" >
      <button id="ajouter" @click="create()">Ajouter</button>
    </div>


    </div>
    <div v-else>Niveau d'accès trop bas pour acceder.</div>
  </div>
</template>

<script>
const axios = require('axios');
export default {
  name: "addItem",
  data : function(){
    return{
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
      compatibilities: 1
    }
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
      fd.append('price', this.item.price)
      fd.append('poids', this.item.poids)
      fd.append('reference', this.item.reference)
      fd.append('category', this.item.category)
      fd.append('state', this.item.state)
      fd.append('description', this.item.description)
      fd.append('compatibility', JSON.stringify(this.item.compatibility))
      axios.post('http://localhost:3000/api/stuff/',fd)
          .then(res=>{
            console.log(res)
          });
      console.log(this.item.compatibility)
    },
    addComp : function (){
      this.compatibilities++
      console.log(this.compatibilities)
      console.log(this.item.compatibility)
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
  border-radius: 10px;
  border: solid #078A6C 2px;
}
textarea{
  width: 500px;
  height: 200px;
  resize: none;
}
#desc{
  height: 200px;
}
.row{
  width: 100vw;
  height: 50px;
  display: flex;
  justify-content:center;
  align-items: center;
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
}
</style>