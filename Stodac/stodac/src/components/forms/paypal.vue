<template>
  <div class="Payment">
    <div ref="paypal" id="paypal-button-container"></div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "paypal",
  data:()=>{
    return{
      paidFor: false,
    }
  },
  mounted() {
    const script = document.createElement("script");
    // script.src = "https://www.paypal.com/sdk/js?client-id=ASOWp-_1zxWf4EXEzuc47swzhquPSB2XchEHOTMB8Ymv_KwnbQvBXRK9M6BFKqhSMTl90dMSp_qxVQxJ&currency=EUR";
    script.src = "https://www.paypal.com/sdk/js?client-id=AbLPjKm4VxvJn-pTS_kWd0CFz1Gt0IxfB2FFM2Xfp-8xUT8p8hZ7lT264wZCigRhAQPesyampT4M94ni&currency=EUR";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script)
  },
  methods: {
    setLoaded: function () {
      this.loaded = true;
      window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: this.description,
                    amount: {
                      value: this.userInfos.savePrix.prix_ttl
                    }
                  }
                ]
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              this.data;
              this.paidFor = true;
              this.sc()
              this.saveFacture(order.id)
            },
            onError: err => {
              console.log(err);
            }
          })
          .render(this.$refs.paypal);
    },
  },
  computed: {
    total: function () {
      let total = 0;
      for(let i = 0; i<this.$store.state.pannier.length; i++){
        total += this.$store.state.pannier[i].article.price * this.$store.state.pannier[i].qty;
      }
      return total
    },
    ...mapState(['userInfos']),
  },
  props:{
    saveFacture:Function,
    sc:Function
  }
}
</script>

<style scoped>
#paypal-button-container{
  display: flex;
  justify-content: center;
  z-index: 10;
  background-color: #fff;
}
</style>