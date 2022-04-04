<template>
    <div v-if="popup" class="bloc-modale">
        <div class="overlay">
            <div class="modale-card">
              <h2>Enregistrer l'adresse?</h2>
              <p>Nous avons remarqués un changement d'adresse depuis votre dernière commande.<br> Souhaitez vous l'enregistrer ? </p>
              <div class="btn_cntr">
                <button @click="jaichoisi(true)">Oui</button>
                <button @click="jaichoisi(false)">Non</button>
              </div>
            </div>
        </div>
    </div>

</template>

<script>

export default {
    name:"MaModale",
    props:['popup', 'jaichoisi']
}

</script>

<style scoped>
    .bloc-modale {
        position: fixed;
        z-index: 11;
        top:0;
        bottom:0;
        right:0;
        left:0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .overlay{
        background: rgba(0,0,0,0.5);
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .modale-card{
        background: white;
        color: #333;
        padding:50px;
        position: fixed;
        top:30%;
    }
    p{
      margin-top: 10px;
    }
    button{
      margin-top: 25px;
      padding: 10px;
      width: 250px;
      background-color: #078A6C;
      color: #F1F1F1;
      border: none;
      border-radius: 15px;
      cursor: pointer;
    }
    .btn_cntr{
      display: flex;
      flex-direction: row;
     justify-content: space-around;
    }
</style>