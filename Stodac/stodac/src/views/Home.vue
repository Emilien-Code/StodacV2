<template>
  <div id="home">    
      <div id="precisions">
        <search/>
            <svg
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


        <Category/>
        <Manufacturer/>
      </div>
      <div id="stuff-container">
        <div v-for="item in $store.state.stuffs" :key="item._id" class="product">
          <ProduitLite :produit="item" @click="pushToID(item)"/>
        </div>
        <p v-if="noItems">Aucun article dans cette catégorie</p>
      </div>

      <div id="buttons_wrapper">
        <div id="buttons">
          <button v-if="$store.state.nbStuff.nb > 20 && !recherche" @click="loadMore(1)">1</button>
          <button v-if="$store.state.nbStuff.nb > 20 && !recherche" @click="loadMore(2)">2</button>
          <button v-if="$store.state.nbStuff.nb > 40 && !recherche" @click="loadMore(3)">3</button>
          <button v-if="$store.state.nbStuff.nb > 60 && !recherche" @click="loadMore(4)">4</button>
          <button v-if="$store.state.nbStuff.nb > 80 && !recherche" @click="loadMore(5)">5</button>
          <button v-if="$store.state.nbStuff.nb > 100 && !recherche" @click="loadMore(6)">6</button>
          <button v-if="$store.state.nbStuff.nb > 120 && !recherche" @click="loadMore(7)">7</button>
        </div>
      </div>

  </div>
</template>

<script>
import ProduitLite from '../components/ProduitLite.vue'
import Category from '../components/Category.vue'
import Manufacturer from '../components/manufacturer.vue'
import search from '../components/search.vue'
// @ is an alias to /src

export default {
  name: 'Home',
  data: function(){
    return{
      noItems: 0,
      recherche: false,
    }
  },
  components: {
    ProduitLite,
    Category,
    Manufacturer,
    search
  },
  mounted() {
    this.$store.dispatch('getStufs', 1)
    .then(()=>{console.log('Stuffs chargés')})
    .catch(()=>{console.log('Impossible de charger les Stuffs')})
    this.$store.dispatch('getStuffNb')
    .then(()=>{console.log('nbStuff chargé')})
    .catch(()=>{console.log('Impossible de charger le nombre Stuffs')})
  },
  methods:{
    pushToID : function(item){
        this.$router.push(`/produit/${item._id}`);
    },
    loadMore : function(nb){
      this.nbLoadMore++;
      this.$store.dispatch('getStufs', nb)
      .then(()=>{console.log('Stuffs chargés')})
      .catch(()=>{console.log('Impossible de charger les Stuffs')})
    }
  }
}
</script>
 <style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

svg{
  width: 25px;
  height: 25px;
  position: absolute;
  top: 192px;
  left: 420px;
}
#precision{
  height: 20px;
}
#category, #manufacturer{
  margin-top: 15px ;
}
#stuff-container{
  width: 90vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 50px;
}
.product{
  margin: 25px 25px ;
 cursor: pointer;
  border-radius: 15px;
 overflow:hidden;
 box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
}
#buttons_wrapper{
  width: 100vw;
  display: flex;
  align-items: center ;
  justify-content: center;
}
button{
  width: 50px;
  height: 50px;
  margin-left: 10px;
  border-radius: 10px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  background-color:#ffffff ;
  cursor: pointer;
  transition: .5s;
}
button:hover{
  background: #e3e3e3;
  transition: .5s;
}
 </style>