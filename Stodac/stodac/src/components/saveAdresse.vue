<template>

    <div v-if="popup" class="bloc-modale">
        <div class="overlay">
            <div class="modale-card">
                <h2>Enregistrer l'adresse?</h2>
                <button @click="jaichoisi(true)">Oui</button>
                <button @click="jaichoisi(false)">Non</button>
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
</style>