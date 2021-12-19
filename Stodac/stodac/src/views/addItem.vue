<template>
  <div id="addItem">
    <div v-if="$store.state.userInfos.isAdmin">
      j'aime le sexe
    </div>
    <div v-else>Niveau d'accès trop bas pour acceder.</div>
  </div>
</template>

<script>
export default {
  name: "addItem"
}
</script>

<style scoped>

</style>