const axios = require('axios');
const querystring = require('querystring');
//require('dotenv').config();

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
                username:process.env.PAYPAL_USER,
                password:process.env.PAYPAL_MDP,
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
    let expire = Date.now()
    const demandedetoken = axios.create({
        method: 'post',
        headers: {
            "Accept": "application/json",
            "Accept-Language": "en_US",
            "content-type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
        auth: {
            username:process.env.PAYPAL_USER,
            password:process.env.PAYPAL_MDP,
        },
    })
}

exports.getFacture =(mdp,id) => {
    return new Promise((resolve, reject) => {
        if (mdp==="paypal"){
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
        }else{
            resolve({id:0000})
        }
    })
}

exports.testToken=()=>{
    if(Date.now()>=expire){
        demandeToken()
    }
    console.log("ehehe")
}