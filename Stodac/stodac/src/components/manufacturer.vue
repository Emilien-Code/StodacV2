<template>
  <div id="manufacturer">
    <button @click="isClicked()">{{nameMarque}}</button>
    <div v-if="clicked">
      <ul>
        <li @click="isSelected(0)" :class="{'selected' : selection[0]}">Toute les marques</li>
        <li @click="isSelected(1)" :class="{'selected' : selection[1]}">CADEL</li>
        <li @click="isSelected(2)" :class="{'selected' : selection[2]}">CHAZELLES</li>
        <li @click="isSelected(3)" :class="{'selected' : selection[3]}">CMG</li>
        <li @click="isSelected(4)" :class="{'selected' : selection[4]}">COLA</li>
        <li @click="isSelected(5)" :class="{'selected' : selection[5]}">CSTHERMOS</li>
        <li @click="isSelected(6)" :class="{'selected' : selection[6]}">DOMUSA</li>
        <li @click="isSelected(7)" :class="{'selected' : selection[7]}">ECOFOREST</li>
        <li @click="isSelected(8)" :class="{'selected' : selection[8]}">EDILKAMIN</li>
        <li @click="isSelected(9)" :class="{'selected' : selection[9]}">EXTRAFLAME</li>
        <li @click="isSelected(10)" :class="{'selected' : selection[10]}">FREEPOINT</li>
        <li @click="isSelected(11)" :class="{'selected' : selection[11]}">JOLLYMEC</li>
        <li @click="isSelected(12)" :class="{'selected' : selection[12]}">JOTUL</li>
        <li @click="isSelected(13)" :class="{'selected' : selection[13]}">MCZ</li>
        <li @click="isSelected(14)" :class="{'selected' : selection[14]}">PALAZZETTI</li>
        <li @click="isSelected(15)" :class="{'selected' : selection[15]}">PIAZZETTA</li>
        <li @click="isSelected(16)" :class="{'selected' : selection[16]}">RAVELLI</li>
        <li @click="isSelected(17)" :class="{'selected' : selection[17]}">RED</li>
        <li @click="isSelected(18)" :class="{'selected' : selection[18]}">RIKA</li>
        <li @click="isSelected(19)" :class="{'selected' : selection[19]}">SUPERIOR</li>
        <li @click="isSelected(20)" :class="{'selected' : selection[20]}">THERMOROSSI</li>
        <li @click="isSelected(21)" :class="{'selected' : selection[21]}">ZIBRO</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name:"manufacturer",
  data : function(){
    return{
      clicked : false,
      selection: [false ,false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      manufacture: ['Marques', 'CADEL', 'CHAZELLES', 'CMG', 'COLA', 'CSTHERMOS', "DOMUSA", "ECOFOREST", "EDILKAMIN", "EXTRAFLAME", "FREEPOINT", "JOLLYMEC", "JOTUL", "MCZ", "PALAZZETTI", "PIAZZETTA", "RAVELLI", "RED", "RIKA", "SUPERIOR", "THERMOROSSI", "ZIBRO" ],
      nameMarque : 'Marques'
    }
  },
  methods: {
    isSelected:function(index){
      for(let i = 0; i<22; i++){
        this.selection[i] = false
      }
      this.selection[index] = true;
      this.getByManufacture(this.manufacture[index]);
      this.nameMarque = this.manufacture[index]
      this.clicked = false;
    },
    isClicked: function(){
      this.clicked = !this.clicked;
    },
    getByManufacture: function(manufacture){
      if(manufacture !== 'Marques'){
      this.$store.dispatch('getStufsManufacture', manufacture)
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
#manufacturer{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #ffffff;
  top: 170px;
  right : 280px;
  position: absolute;
  width: 200px;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
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