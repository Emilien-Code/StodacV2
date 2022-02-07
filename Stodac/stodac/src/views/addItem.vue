<template>
  <div id="addItem">
    <div v-if="$store.state.userInfos.admin">
      <div>
        <span>Nom :</span>
        <input type="text" v-model="item.name">
      </div>
      <div>
        <span>Référence : </span>
        <input type="text" v-model="item.reference">
      </div>
      <div>
        <span>Marque :</span>

        <select id="marque" v-model="item.manufacturer">
          <option v-for="man in manufactureList" :value="man" :key="man">{{ man }}</option>
        </select>

        OU

        nouvelle marque :<input type="text" v-model="item.manufacturer">

      </div>
      <div>
        <span>État : (neuf ou occasion) :</span>
        <select id="state" v-model="item.state">
          <option value="Neuf">neuf</option>
          <option value="Occasion">Occasion</option>
        </select>
      </div>
      <div>
        <span>Quantitée :</span>
        <input type="number" v-model="item.qty">
      </div>
      <div>
        <span>Prix :</span>
        <input type="number" v-model="item.price">
      </div>
      <div>
        <span>Poids :</span>
        <input type="number" v-model="item.poids">
      </div>
      <div>
        <span>Compatibilités :</span>
        <input v-for="(comp, index) in compatibilities" :key="comp" type="text" v-model="item.compatibility[index]"/>
        <button @click="addComp()">+</button>
      </div><!-- VMODEL compatibility[0] -->
      <div>
        <span>Description : </span>
        <textarea v-model="item.description"></textarea>
      </div>
      <div>
        <span>Image : </span>
        <input type="file" id="file" ref="file" name="first" @change="handleFileUploaded()"/>
      </div>



      <button @click="create()">Ajouter</button>


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

</style>