<template>
    <div>
        <div>
            <p class="title">COMMANDES</p>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Numero de commande</th>
                        <th>nom prenom</th>
                        <th>Etat de la commande</th>
                        <th>date de commande</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(commande) in userInfos.comande" :key="commande">
                        <td><a style="cursor:pointer;color:black;" v-on:click="afficheFacture(commande.id.substr(-6))">{{commande.id.substr(-6)}}</a></td>
                        <!-- <td v-on:click="afficheFacture(userInfos.comande[userInfos.comande.length - 1].id.substr(-6))"> {{userInfos.comande[userInfos.comande.length - 1].id.substr(-6)}}</td> -->
                        <td>{{}}</td>
                        <td v-if="commande.etat === 0">En préparation</td>
                        <td>{{commande.date}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>