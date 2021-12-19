<template>
  <div id="category">
    <button @click="isCategoryClicked()">{{nameCategory}}</button>
    <div v-if="clicked">
      <ul>
        <li @click="isSelected(0)" :class="{'selected' : selection[0]}">Toute les categories</li>
        <li @click="isSelected(1)" :class="{'selected' : selection[1]}">Divers</li>
        <li @click="isSelected(2)" :class="{'selected' : selection[2]}">Ventilateurs</li>
        <li @click="isSelected(3)" :class="{'selected' : selection[3]}">Résistances et Bougies</li>
        <li @click="isSelected(4)" :class="{'selected' : selection[4]}">Motoréducteurs</li>
        <li @click="isSelected(5)" :class="{'selected' : selection[5]}">Creusets et Brasiers</li>
        <li @click="isSelected(6)" :class="{'selected' : selection[6]}">Cartes éléctronique</li>
        <li @click="isSelected(7)" :class="{'selected' : selection[7]}">Extracteurs de fumées</li>
        <li @click="isSelected(8)" :class="{'selected' : selection[8]}">Sondes ambiante</li>
        <li @click="isSelected(9)" :class="{'selected' : selection[9]}">Sondes fumée</li>
        <li @click="isSelected(10)" :class="{'selected' : selection[10]}">Pressostats</li>
        <li @click="isSelected(11)" :class="{'selected' : selection[11]}">Ecrans et Afficheurs</li>
        <li @click="isSelected(12)" :class="{'selected' : selection[12]}">Vitres</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name:"category",
  data : function(){
    return{
      clicked : false,
      selection: [false ,false, false, false, false, false, false, false, false, false, false],
      category: ['Catégories', 'Divers', 'Ventilateurs', 'Résistances et Bougies', 'Motoréducteur', 'Creuset et Brasier', "Carte éléctronique", "Extracteur de fumées", "Sonde ambiante", "Sonde fumée", "Pressostats", "Ecran et Afficheur", "Vitres"],
      nameCategory : 'Catégories'
    }
  },
  methods: {
    isSelected:function(index){
      for(let i = 0; i<13; i++){
        this.selection[i] = false
      }
      this.selection[index] = true;
      this.getByCategory(this.category[index]);
      this.nameCategory = this.category[index]
      this.clicked = false;
    },
    isCategoryClicked: function(){
      this.clicked = !this.clicked;
    },
    getByCategory: function(category){
      if(category != 'Catégories'){
        console.log('catégory selected', category)
        this.$store.dispatch('getStufsCategory', category)
        .then(this.noItems = 1)
        .catch(this.noItems = 0)
      }else{
        this.$store.dispatch('getStufs')
      }
    }
  }
}
</script>

<style scoped>
@import url('http://fonts.cdnfonts.com/css/segoe-ui-4');
button{
  text-align: start;
  padding: 10px;
  width: 200px;
  border: none;
  border-radius: 10px;
  background-color: #ffffff;
  font-size: 1em;
  color: #2c3e50;
}
#category{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #ffffff;
  position: absolute;
  top: 170px;
  right: 50px;
  width: 200px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
  border-radius: 10px;
  transition: height 0.5s ease-out;
}
li{
  padding: 10px;
  border-radius: 10px;
  list-style: none;
}
button:hover, li:hover{
  background-color: rgba(0, 0, 0, 0.24);
}
.selected{
  background-color: rgba(0, 0, 0, 0.24);
}
</style>