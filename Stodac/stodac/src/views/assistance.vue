<template>
  <div id="test"></div>
<span id="separator"></span>
<div id="assistance">
  <H1>Un problème ?</H1>
  <h2>Mon poêle ne s'allume pas:</h2>
  <ul>
    <li>Les granules ne descende pas: <button @click="clicked('Motoreducteur')">Motoreducteur</button></li>
    <li>Les granules tombent mais ne s'enflamme pas: <button @click="clicked('Résistance')">Résistance</button></li>
  </ul>

  <h2>Rien ne s'affiche sur l'écran:</h2>
  <ul>
    <li>Vérifier prise, fusible:
      <ul>
        <li><button @click="clicked('Ecran | Afficheur | Display')">Écran</button></li>
        <li><button @click="clicked('Carte électronique')">Carte électronique</button></li>
      </ul>
    </li>
  </ul>

  <h2>Mon poêle fait du bruit: </h2>
  <ul>
    <li><button @click="clicked('Ventilateur')">Ventilateur centrifuge </button></li>
    <li><button @click="clicked('Ventilateur')">Ventilateur tangentiel </button></li>
    <li><button @click="clicked('Extracteur fumées')">Extracteur</button></li>
    <li><button @click="clicked('Motoreducteur')"> Motoreducteur</button></li>
  </ul>

  <h2> Vous avez un doute?</h2>
  <ul>
    <li><button>Assistance</button></li>
  </ul>




  <p class="asterisque">*Attention, ces informations vous sont données à titre indicatif et ne peuvent engager la responsabilité de Stodac.</p>
  <p class="asterisque">Pour un réel diagnostique, faites appel à un professionnel.</p>

</div>
</template>

<script>
export default {
  name: "assistance",
  methods:{
    clicked : function(el){
      this.$router.push("/").then(()=>{
        setTimeout(()=>{
          this.$store.dispatch('getStufsCategory', el)
        },100)

      })
    }
  }
}
</script>

<style scoped>
h1  {
  margin-bottom: 30px;
}
#assistance{
  width: 40vw;
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
}
h2  {
  margin: 10px 0;
}
ul{
  margin: 0 0 30px 20px;
  text-decoration: none;
  list-style: inside  ;
}
button{
  border: none;
  background-color: #FFFFFF;
  color: #078A6C;
  cursor: pointer;
}
.asterisque{
  font-size: 12px;
  font-style: italic;
}
#separator{
  display: block;
  position: absolute;
  background-color: #2c3e50;
  top: 250px;
  left: 50%;
  transform: translateX(-50%);
  width: 40vw;
  height: 2px;
}
#test {
  height: calc(70vh + (250px - 10vw));
}
@media (max-width: 780px) {
  #assistance {
    width: 80vw;
  }
  #separator{
    width: 80vw;
  }
}
</style>