const axios = require('axios');
const querystring = require('querystring');

let expire = null
let token = null

const requetePaypal = axios.create({
    baseURL:'https://api.sandbox.paypal.com/',
    headers:{
        "Content-Type": "application/json"
    }
})

function demandeToken(){
    return new Promise((resolve, reject) => {
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
            console.log(response.data.access_token)
            token = response.data.access_token
            requetePaypal.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token
            resolve()
            return true
        }).catch(function (error) {
            console.log(error)
            reject()
            return false
        })
    })
}

exports.getFacture =(id) => {
    return new Promise((resolve, reject) => {
        if(Date.now()>=expire){
            demandeToken().then(()=>{
                requetePaypal.get(`/v2/checkout/orders/${id}`).then(function (response){
                    console.log(response.data.purchase_units)
                    resolve(response.data)
                }).catch(function (error) {
                    console.log(error)
                    reject()
                })
            })
        }else{
            requetePaypal.get(`/v2/checkout/orders/${id}`).then(function (response){
                console.log(response.data.purchase_units)
                resolve(response.data)
            }).catch(function (error) {
                console.log(error)
                reject()
            })
        }
    })
}

exports.testToken=()=>{
    if(Date.now()>=expire){
        demandeToken()
    }
    console.log("ehehe")
}
