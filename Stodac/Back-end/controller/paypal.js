const axios = require('axios');
const querystring = require('querystring');

const expire = null

const requetePaypal = axios.create({
    baseUrl:'https://api.sandbox.paypal.com/',
    headers:{
        "Content-Type": "application/json"
    }
})
// const instance = axios.create({
//   baseURL : 'https://api.sandbox.paypal.com/'
// })

// exports.demandeToken = () => {
//     test = qss.stringify({ grant_type:"authorization_code", code:"{authorization_code}" })
//     console.log(test)
//     const demandedetoken = axios.create({
//         // url:"https://api.sandbox.paypal.com/v1/stodac/token",
//         method: 'post',
//         headers:{
//             "Accept-Language":"en_US",
//             "Accept":"application/json"
//         },
//         auth:{
//             username: '7UK65ATWLGFXL',
//             password: 'AF+x0B-A'
//         },
//         data:{test}
//     })
//     demandedetoken.request("https://api.sandbox.paypal.com/v1/identity/openidconnect/tokenservice").then(function (response){
//         console.log(response)
//     }).catch(function (error) {
//         console.log(error)
//     })


exports.demandeToken = () => {
    expire = Date.now()
    const demandedetoken = axios.create({
        method: 'post',
        headers: {
            "Accept": "application/json",
            "Accept-Language": "en_US",
            "content-type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
        auth: {
            username:'AbLPjKm4VxvJn-pTS_kWd0CFz1Gt0IxfB2FFM2Xfp-8xUT8p8hZ7lT264wZCigRhAQPesyampT4M94ni',
            password:'EJNWLVRuugN2C_mkbXucI8DymKiDTBtAMLKMr8lNZm5lPDti4j3icn9Y8rP5X_YiAWMeGcOSMBuujtti',
        },
    })
    demandedetoken.post("https://api.sandbox.paypal.com/v1/oauth2/token", 'grant_type=client_credentials').then(function (response){
        console.log(response)
        expire += response.data.expires_in*1000
        requetePaypal.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token
        return true
    }).catch(function (error) {
        console.log(error)
        return false
    })
}

exports.getFacture = (id) => {
    if(Date.now()>=expire){
        redemandeToken()
    }
    requetePaypal.get(`/v2/checkout/orders/${id}`).then(function (response){
        console.log(response)
        return response.data
    }).catch(function (error) {
        console.log(error)
    })
}

function redemandeToken(){}