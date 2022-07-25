<template>
<div id="loader">








<div class="loader-container">  <svg id="logo_stodac" width="122.505" height="50px" viewBox="0 0 122.505 118.342">
  <rect id="Rectangle_66" data-name="Rectangle 66" width="96" height="84" rx="42" transform="translate(0 41.392) rotate(-25)" fill="#078a6c"/>
  <text id="S" transform="translate(36.253 82.171)" fill="#fff" font-size="63" font-family="Poppins" font-weight="700"><tspan x="0" y="0">S</tspan></text>
  <circle id="Ellipse_6" data-name="Ellipse 6" cx="6" cy="6" r="6" transform="translate(79.253 71.171)" fill="#fff"/>
</svg><div class="loader"></div></div>

  <p>
    <span class="lettres">S</span>
    <span class="lettres">t</span>
    <span class="lettres">o</span>
    <span class="lettres">d</span>
    <span class="lettres">a</span>
    <span class="lettres">c</span>
    <span class="lettres">.</span>
    <span class="lettres">.</span>
    <span class="lettres">.</span>
  </p>
</div>
</template>

<script>
export default {
  name: "loader",
  props : {
    isLoaded: Boolean
  },
  mounted() {
    window.scrollTo(0,0)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap');
#loader {
  position: absolute;
  z-index: 10;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.25);
  backdrop-filter: blur(20px);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  transition: opacity 1s;
  font-size: 4em;
}

svg {
  top: 50%;
  transform-origin: center;
  transform: scale(3) translateY(75%) ;
}
p{
  transform: translateY(150px);
  display: flex;
  justify-content: center;
  width: 100%;
}

.loader-container{
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  width: 400px;
  height: 400px;
}
.loader{
  display: block;
  position: relative;
  width: 300px;
  height: 300px;
  border: 7px solid transparent;
  border-top-color: #078A6C;
  animation: spin 2s linear infinite;
  border-radius: 50%;
}
.loader::before, .loader::after{
  content: "";
  position: absolute;
  border-radius: 50%;
  border: 7px solid transparent;
}
.loader::before{
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border-top-color: #007057;
  animation: spin 3s linear infinite;
}
.loader::after{
  top: 25px;
  left: 25px;
  right: 25px;
  bottom: 25px;
  border-top-color: #078A6C;
  animation: spin 1.5s linear infinite;
}
@keyframes spin{
  0%{
    transform: rotate(0);
  }
  100%{
    transform: rotate(360deg);
  }
}
</style>