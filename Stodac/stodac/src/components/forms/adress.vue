<template>
  <div class="container">
    <p class="title">Adresse :</p>
    <div class="inputsContainer">
      <input class="small" id="num" type="number" placeholder="Numérot" v-model="streetNumber">
      <input class="big" id="rue" type="text" placeholder="Rue" v-model="street">
    </div>
    <div class="inputsContainer">
      <input class="big" id="ville" type="text" placeholder="Ville" v-model="city">
      <input class="small" id="cp" type="number" placeholder="Code postale" v-model="postCode">
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
.small,.big{
  border-radius: 10px;
  padding:8px;
  border: solid #007057 2px;
  background:#fafafa;
  font-weight: 500;
  font-size: 16px;
  color: black;
}

.title{
  color:#007057;
  margin-left: 8px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>