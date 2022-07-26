<template>
  <div id="verification">
    <div v-if="response.status==200">
      <p>Votre inscription à étée validée avec <b style="color: #078A6C">succès</b>.</p>
      <p>Merci de votre confiance.</p>
      <p>Vous allez être redirigés dans {{ timeLeft }} secondes.</p>
    </div>
    <div v-else>
      <p><b style="color: #F18F01">Impossible</b> de valider l'inscription.</p>
      <p>Veuillez réessayer ulterieurement.</p>
      <p>Vous allez être redirigés dans {{ timeLeft }} secondes.</p>
    </div>
  </div>
  <loader v-if="isLoading"></loader>
</template>
<script>
import axios from 'axios'
import loader from "../components/loader";
export default {
  name: 'verification',
  data: function () {
    return {
      response: "",
      isLoading: true,
      timeLeft : 10
    }
  },
  mounted() {
    axios.get(`https://stodac.fr/api/user/verify/${this.$route.params.mail}/${this.$route.params.hash}`).then(response => {
      this.response = response
      this.isLoading = false
      this.time()
    }).catch(err => {
      this.response = err
      this.isLoading = false
      this.time()
    })
  },
  methods:{
    time : function (){
      setTimeout(()=>{
        this.timeLeft--
        if(this.timeLeft<=0){
          this.$router.push("/")
          return
        }
        return this.time()
      },1000)
    }
  },
  components:{
    loader
  }
}
</script>
<style scoped>
#verification{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  margin-top: 70px;
  height: calc(100vh - 370px);
}
p{
  font-size: 1em;
  margin: 0 0 10px 20px;
}
</style>