<template>
  <div id="fileAdded">

    <div id="popup">
      <h1>L'article a bien été enregistré</h1>
      <button @click="push">Continuer</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "fileAdded",
  methods:{
    push: function (){
      console.log("efjslkdj")
      this.$parent.$data.isFileAded=false
    }
  }
}
</script>

<style scoped>
  #popup{
    width: 500px;
    height: 250px;
    background-color: #ffffff;
    border-radius: 10px;
  }
  #fileAdded{
    width: 100vw;
    height: 100vh;
    z-index: 11;
    background-color: #000000a0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
    display: flex;
    justify-content: center ;
    align-items: center;
  }
  h1{
    text-align: center;
    font-size: 1.4em;
    transform: translateY(50px);
  }
  button  {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
    width: 100px;
    border-radius: 5px;
    border: solid #078A6C 1px;
    background-color: #078A6C;
    cursor: pointer;
    color: #ffffff;
  }
</style>