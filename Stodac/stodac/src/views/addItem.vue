<template>
  <div id="addItem">
    <div v-if="$store.state.userInfos.admin">
      Formulaire d'ajout d'un article trop le feu wallah







    </div>
    <div v-else>Niveau d'accès trop bas pour acceder.</div>
  </div>
</template>

<script>
export default {
  name: "addItem",
  mounted: function(){
    this.$store.dispatch('getUserInfos').then(console.log(this.$store.state.userInfos))
  },
}
</script>

<style scoped>

</style>