<template>
  <div id="NotFound">
    <div id="container">
      <div id="left_pannel">
        <div id="top">
          <h1>404</h1>
          <p>La page demandée n'a pas pu être trouvée</p>
          <div id="button_container">
            <button @click="pushTo()"> Retour à la boutique </button>
          </div>
        </div>
        <div id="bottom">
          <h2>Stodac</h2>
          <p>Spécialiste des pièces d'entretien et dépannage de poêles à granulés.</p>
          <div id="arrow-container">
            <div @click="previousImg()" :class="{'arrow': true}" id="left_arrow">
              <div :class="{'leftArrowClicked': leftArrow}">
                <svg width="88.354" height="38.707" viewBox="0 0 88.354 38.707">
                  <line id="Ligne_11" data-name="Ligne 11" x2="88" transform="translate(0 19.354)" fill="none" stroke="#fff" stroke-width="1"/>
                  <line id="Ligne_12" data-name="Ligne 12" x2="19" y2="19" transform="translate(69 0.354)" fill="none" stroke="#fff" stroke-width="1"/>
                  <line id="Ligne_13" data-name="Ligne 13" x1="19" y2="19" transform="translate(69 19.354)" fill="none" stroke="#fff" stroke-width="1"/>
                </svg>
              </div>
              <div :class="{'leftArrowClicked': leftArrow}">
                <svg width="88.354" height="38.707" viewBox="0 0 88.354 38.707" >
                  <line id="Ligne_11" data-name="Ligne 11" x2="88" transform="translate(0 19.354)" fill="none" stroke="#fff" stroke-width="1"/>
                  <line id="Ligne_12" data-name="Ligne 12" x2="19" y2="19" transform="translate(69 0.354)" fill="none" stroke="#fff" stroke-width="1"/>
                  <line id="Ligne_13" data-name="Ligne 13" x1="19" y2="19" transform="translate(69 19.354)" fill="none" stroke="#fff" stroke-width="1"/>
                </svg>
              </div>
            </div>
            <div @click="nextImg()" :class="{'arrow': true}" id="right_arrow">
              <div :class="{'rightArrowClicked': rightArrow}">
                <svg width="88.354" height="38.707" viewBox="0 0 88.354 38.707">
                  <line id="Ligne_11" data-name="Ligne 11" x2="88" transform="translate(0 19.354)" fill="none" stroke="#fff" stroke-width="1"/>
                  <line id="Ligne_12" data-name="Ligne 12" x2="19" y2="19" transform="translate(69 0.354)" fill="none" stroke="#fff" stroke-width="1"/>
                  <line id="Ligne_13" data-name="Ligne 13" x1="19" y2="19" transform="translate(69 19.354)" fill="none" stroke="#fff" stroke-width="1"/>
                </svg>
              </div>
              <div :class="{'rightArrowClicked': rightArrow}">
                <svg width="88.354" height="38.707" viewBox="0 0 88.354 38.707">
                  <line id="Ligne_11" data-name="Ligne 11" x2="88" transform="translate(0 19.354)" fill="none" stroke="#fff" stroke-width="1"/>
                  <line id="Ligne_12" data-name="Ligne 12" x2="19" y2="19" transform="translate(69 0.354)" fill="none" stroke="#fff" stroke-width="1"/>
                  <line id="Ligne_13" data-name="Ligne 13" x1="19" y2="19" transform="translate(69 19.354)" fill="none" stroke="#fff" stroke-width="1"/>
                </svg>
              </div>
            </div>
          </div>
          <div id="avance"><span :style="{width: `${spanWidth}px`}" ></span></div>
        </div>
      </div>
      <div id="images_container" :style="{transform: `translate(${translate}%)`}">
        <img src="../assets/PHOTO-2022-02-26-14-23-17.jpg" alt="Illustration random">
        <img src="../assets/PHOTO-2022-02-26-14-33-01.jpg" alt="Illustration random">
        <img src="../assets/PHOTO-2022-02-26-14-24-53.jpg" alt="Illustration random">
        <img src="../assets/PHOTO-2022-02-26-14-31-00.jpg" alt="Illustration random">
        <img src="../assets/PHOTO-2022-02-26-14-32-36.jpg" alt="Illustration random">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notFound',
  data: function () {
    return {
      spanWidth : 288*20/100,
      translate : 0,
      leftArrow : false,
      rightArrow : false
    }
  },
  methods: {
    pushTo : function(){
        this.$router.push('/')
    },
    nextImg: function(){
      if(this.spanWidth<288){
        this.spanWidth+=288*20/100;
        this.translate-=20;
        this.rightArrow = true;
        setTimeout(()=>{
          this.rightArrow = false;
        },1000);

      }
    },
    previousImg: function(){
      if(this.spanWidth>100){
        this.spanWidth-=288*20/100;
        this.translate+=20;
        this.leftArrow = true;
        setTimeout(()=>{
          this.leftArrow = false;
        },500);
      }
    }
  }
}
</script>

<style scoped>
  #left_arrow svg{
    transform-origin: center;
    transform: rotate(180deg)
  }
  .leftArrowClicked{
    transition: .5s ease;
    transform: translateX(-100%);
  }
  .rightArrowClicked{
    transition: .5s ease;
    transform: translateX(100%);
  }
  #right_arrow{
    flex-direction: row-reverse;
  }
  #button_container{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  #left_pannel{
    position: absolute;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 400px;
    backdrop-filter: blur(10px);
    background-color: #000000A0;
  }
  h1 {
    margin: 10px 0;
    text-align: center;
    font-size: 80px;
    font-weight: bold;
    font-family: 'Poppins', sans-serif;
    color: #078A6C;
  }
  h2  {
    width: 100%;
    color: #ffffff;
    font-weight: lighter;
    font-size:40px;
    margin-bottom: 10px;
  }
  #bottom{
    margin: 10px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #bottom p{
    text-align: left;
    font-weight: lighter;
  }
  p{
    text-align: center;
    color: #ffffff;
  }
  button {
    padding: 10px;
    background: #419D79;
    color:white;
    border-radius: 8px;
    width: 150px;
    border: none;
    margin-left: 5px ;
    font-weight: bold;
    cursor: pointer;
  }
  button:hover  {
    background: #078A6C;
  }
  img {
    height: 100vh;
    width: 100vw;
    object-fit: cover ;
  }
  img:nth-child(2){
    object-position: center -1150px ;
  }
  img:nth-child(4){
    object-position: center -1250px;
  }
  img:nth-child(5){
    object-position: center -1550px;
  }
  @media (max-width: 1521px) {
    img:nth-child(5){
      object-position: center bottom   ;
    }
  }
  @media (max-width: 1521px) {
    img:nth-child(4){
      object-position: center bottom   ;
    }
  }
  @media (max-width: 1511px) {
    img:nth-child(2){
      object-position: center bottom   ;
    }
  }
  #NotFound{
    position: fixed;
    top: 0;
    z-index: 15;
    height: 100vh;
  }
  #arrow-container{
    margin: 25px 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .arrow{
    width: 88.354px;
    display: flex;
    overflow: hidden;
  }
  .arrow:hover{
    cursor: pointer;
  }
  #avance{
    margin-bottom: 10px;
    width:80%;
    height: 1px;
    background-color: #9a9a9a;
  }
  #avance span{
    display: block;
    position: absolute;
    background-color: #ffffff;
    height: 1px;
    transition: .5s ease;
  }
  #images_container{
    position: relative;
    z-index: 0;
    display: flex;
    flex-direction: row;
    transition: .5s ease-in-out ;
  }
</style>