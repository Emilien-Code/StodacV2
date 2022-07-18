<template>
  <div class="container">
    <div class="inputsContainer">
      <input :class="{'small':true, 'unvalid':!verifNum}" id="num" type="number" placeholder="Numéro" v-model="streetNumber">
      <input :class="{'big':true, 'unvalid': !verifRue}" id="rue" type="text" placeholder="Rue" v-model="street">
    </div>
    <div class="inputsContainer">
      <input :class="{'big':true, 'unvalid':!verifVille}" id="ville" type="text" placeholder="Ville" v-model="city">
      <input :class="{'small':true, 'unvalid': !verifPostCode}" id="cp" type="number" placeholder="Code postale" v-model="postCode">
    </div>
    <div class="inputsContainer">
      <input type="text" id="complement" placeholder="Complement (Optionnel)">
    </div>
  </div>
</template>

<script>
export default {
  name: "adress",
  data: function () {
    return {
          street: '',
          streetNumber: '',
          city: '',
          postCode: '',
          isLoading: true
    }
  },
  computed : {
    verifNum: function(){
      const regex = /^[0-9]{1,}/
      return regex.test(String(this.streetNumber))
    },
    verifRue:function(){
      return this.street != ''
    },
    verifVille: function (){
      return this.city != ''
    },
    verifPostCode: function() {
      const regex = /^[0-9]{5}$/
      return regex.test(String(this.postCode))
    },
    isComplete : function(){
      return this.verifNum && this.verifRue && this.verifVille && this.verifPostCode
    }
  },
}
</script>

<style scoped>
.container{
  padding: 10px 0;
}
.inputsContainer{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.small{
  width: 350px;
  margin: 12.5px;
}
.big{
  margin: 12.5px;
  width : 450px;
}
#complement  {
  margin: 12.5px;
  width: calc(100% - 25px);
  max-width: 824px;
}
#complement,.small,.big{
  border-radius: 10px;
  padding:8px;
  border: solid #007057 2px;
  background:#fafafa;
  font-weight: 500;
  font-size: 16px;
  color: black;
}
.unvalid{
  border-color: #F18F01;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
textarea, select, input, button { outline: none; }

@media (max-width: 685px) {
  /*Add some code here*/
  .small  {
    width : 100px
  }
  #complement{
    width   : 100vw
  }
  .container{
    width: 80vw;
  }
}
</style>