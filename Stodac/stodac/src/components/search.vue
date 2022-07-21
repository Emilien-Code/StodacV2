<template>
  <div id="search" v-clickOutside="close">
    <svg @click="search"
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        xmlns:cc="http://creativecommons.org/ns#"
        xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
        xmlns:svg="http://www.w3.org/2000/svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
        xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
        width="500"
        height="500"
        viewBox="0 0 500.00001 500.00001"
        id="svg4162"
        version="1.1"
        inkscape:version="0.92.3 (2405546, 2018-03-11)"
        sodipodi:docname="Search_Icon.svg">
      <defs
          id="defs4164" />
      <sodipodi:namedview
          id="base"
          pagecolor="#ffffff"
          bordercolor="#666666"
          borderopacity="1.0"
          inkscape:pageopacity="0.0"
          inkscape:pageshadow="2"
          inkscape:zoom="0.954"
          inkscape:cx="250"
          inkscape:cy="250"
          inkscape:document-units="px"
          inkscape:current-layer="layer1"
          showgrid="false"
          units="px"
          inkscape:window-width="1366"
          inkscape:window-height="706"
          inkscape:window-x="-8"
          inkscape:window-y="-8"
          inkscape:window-maximized="1" />
      <metadata
          id="metadata4167">
        <rdf:RDF>
          <cc:Work
              rdf:about="">
            <dc:format>image/svg+xml</dc:format>
            <dc:type
                rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
            <dc:title />
          </cc:Work>
        </rdf:RDF>
      </metadata>
      <g
          inkscape:label="Layer 1"
          inkscape:groupmode="layer"
          id="layer1"
          transform="translate(0,-552.36216)">
        <g
            id="g1400"
            transform="translate(-4.3609793,-7.6704785)">
          <path
              inkscape:connector-curvature="0"
              id="path4714"
              d="M 232.83952,614.96702 A 154.04816,154.04794 0 0 0 78.79153,769.01382 154.04816,154.04794 0 0 0 232.83952,923.06184 154.04816,154.04794 0 0 0 386.88751,769.01382 154.04816,154.04794 0 0 0 232.83952,614.96702 Z m 0,26.77613 A 129.95832,127.2707 0 0 1 362.79832,769.01382 129.95832,127.2707 0 0 1 232.83952,896.28449 129.95832,127.2707 0 0 1 102.88194,769.01382 129.95832,127.2707 0 0 1 232.83952,641.74315 Z"
              style="opacity:1;fill:#2b0000;fill-opacity:1;stroke:none;stroke-opacity:1" />
          <rect
              ry="18.08342"
              rx="33.249443"
              transform="matrix(0.65316768,0.7572133,-0.60689051,0.79478545,0,0)"
              y="319.55432"
              x="794.8775"
              height="36.16684"
              width="173.02675"
              id="rect4721"
              style="opacity:1;fill:#2b0000;fill-opacity:1;stroke:none;stroke-opacity:1" />
        </g>
      </g>
    </svg>

    <input v-model="word" type="text" placeholder="Rechercher dans notre catalogue" @click="clicked()" @keyup="results()" @keyup.enter="search()">
    <div id="print" v-if="isSearch">
      <!--<ul  >-->
      <transition-group name="res" tag="ul" v-if="resultArray[0]">
        <li  v-for="result in resultArray" :key="result" @click="pushToID(result)">
          <div class="Produit">
            <img :src="result.img" alt="">
            <div class="txts">
              <span class="product-name">{{result.name}}</span><br>
              <span class="product-category">{{result.category}}</span><br>
              <span class="product-price">{{result.price}}</span>
            </div>
          </div>
        </li>
      </transition-group>
      <!--</ul>-->
    </div>
    <button v-if="resultArray[0] && isSearch" @click="search()">
      <span>Afficher tous les résultats</span>
    </button>
    <div id="noResult" v-if="word && !resultArray[0] && isSearch"> Aucuns résultats </div>
  </div>


</template>

<script>
const axios = require("axios") ;
let clickOutside = function(el, binding) {
  el.clickOutsideEvent = function (event) {
    if (!el.contains(event.target)) {
      binding.value()
    }
  };
  document.body.addEventListener('click', el.clickOutsideEvent)
}
export default {
  name : 'search',
  data: function(){
    return {
      word: '',
      isSearch : false,
      resultArray: [],
    }
  },
  methods:{
    search : function () {
      if(this.word){
        this.$store.dispatch('getStuffByFirstLetters', this.word)
            .then(this.isSearch = false)
            .catch("ERREUR REQUEST")
      }else{
        this.$store.dispatch('getStufs', 1)
            .then(this.isSearch = false)
            .catch("ERREUR REQUEST")
        this.$store.dispatch('getStuffNb')
            .then(this.isSearch = false)
            .catch("ERREUR REQUEST")
      }
    },
    clicked: function(){
      this.isSearch = true;
    },
    results : function(){
      if(this.word){
        axios.get(`http://localhost:3000/api/stuff/name/${this.word}/4`)
            .then((response)=>{
              this.resultArray =  response.data
             // console.log(this.resultArray)
            }).then(()=>{
          axios.get(`http://localhost:3000/api/stuff/reference/${this.word}/4`)
              .then((response)=>{
                response.data.forEach(el=>{
                  this.resultArray[this.resultArray.length]=el
                })
                console.log(response.data)
              })
              .catch((error)=>{
                console.log(error)
              })
        })
            .catch((error)=>{
              console.log(error)
            })
      }

    },
    close: function (){
      this.isSearch = false
    },
    pushToID : function(item){
      this.$router.push(`/produit/${item._id}`);
    }
  },
  directives:{
    clickOutside
  }

}
</script>

<style scoped>
.product-category{
  font-size: .8em;
}
.product-name{
  font-size: 1.2em;
}
svg{
  width: 25px;
  height: 25px;
  position: absolute;
  top: 20px;
  left: 92%;
  transform: translateY(-50%);
  cursor : pointer  ;
}
.product-price{
  color: #007057;
  font-weight : bold;
}
* {
  font-family: 'Segoe UI', sans-serif;
}
#noResult{
  padding: 10px;
}
.Produit{
  display: flex;
  flex-direction:row;
  margin: 15px 0 15px 10px;
}
img{
  object-fit: cover;
  width: 100px;
  margin-right: 10px;
  height: 100px;
}
#search {
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  background-color: #ffffffA0;
  backdrop-filter: blur(20px);
  border-radius: 10px;
  width: 400px;
  position: absolute;
  top: 275px;
  left : 60px;
  overflow: hidden;
}
input {
  padding: 10px;
  width: 400px;
  border-radius: 10px;
  font-size: 1em;
  border: none;
  border-bottom: solid  1px #C3C3C3;
}
#print{
  overflow-y: scroll;
  max-height: 250px;
}
button{
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1em;
  padding: 10px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  margin: 10px 0;
}
button:hover{
  background-color: #C3C3C3;
}
ul{
  list-style: none;
}
li{
  overflow: hidden;
  cursor:pointer;
  border-radius: 10px;
}
li:hover{
  background-color: #e3e3e3;
  transition: .5s;
}
textarea, select, input, button { outline: none; }

.res-enter-active,
.res-leave-active {
  transition: all 0.5s ease;
  animation-delay: .5s;
}
.res-enter-from{
  opacity: 0;
  transform: translateX(-300px);
}
.res-leave-to {
  opacity: 0;
  transform: translateX(300px);
  position: absolute;
  z-index: -1;
}
@media(max-width: 950px){
  input{
    width: 80vw;
  }
}
</style>