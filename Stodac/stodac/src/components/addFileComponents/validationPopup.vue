<template>
  <div id="fileAdded">

    <div id="popup">
      <h1>{{ message }}</h1>
      <div class="btn_container">
        <button @click="no">non</button>
        <button @click="yes">oui</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "fileAdded",
  props:{
    message: String,
    yes: Function,
    no: Function
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
  height: 150vh;
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
.btn_container{
  display: flex;
  justify-content: space-between;
  width: 250px;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
}
button  {
  padding: 10px;
  width: 100px;
  border-radius: 5px;
  cursor: pointer;
  color: #ffffff;

}
button:nth-child(2){
  border: solid #078A6C 1px;
  background-color: #078A6C;
}
button:nth-child(1){
  border: solid #F18F01 1px;
  background-color: #F18F01;
}
</style>