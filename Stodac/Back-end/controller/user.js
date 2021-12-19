const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then( hash => {
            const user = new User({
                email: req.body.email,
                userName: req.body.email,
                password: hash,
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                street:  "", 
                city:  "",
                streetNumber: -1,
                postCode: -1, 
                country: "",
                admin: false,
                mobile: req.body.mobile
            });
            user.save()
            .then(()=> res.status(201).json({ message : 'Utilisateur Créé'}))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json( { error }))
};

/** GET Controller */

exports.getAllUsers = (req, res) =>{
    User.find({}, (err, docs)=>{
       if(err) console.log(err);
       res.send(docs);
   });
};

exports.getInfos = (req, res) =>{
    User.find({_id:req.params.id}, (err, docs)=>{
       if(err) console.log(err);
       res.send(docs);
   });
};

exports.getByEmail = (req, res) =>{
    User.find({email:req.params.email}, (err, docs)=>{
       if(err) console.log(err);
       res.send(docs);
   });
};

exports.getByCity = (req, res) =>{
    User.find({city:req.params.city}, (err, docs)=>{
       if(err) console.log(err);
       res.send(docs)
   });
};

exports.loginByMail = (req, res, next) => {
    User.findOne({ email : req.body.email })
        .then(user => {
            if(!user) {
                return res.status(401).json({ error : 'Utilisateur introuvable' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => { 
                    if(!valid){
                        return res.status(401).json({ error : 'Mot de passe erroné' });
                    }
                    return res.status(200).json({
                        userID: user._id,
                        token: jwt.sign(
                            {userID : user._id},
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '1h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
};

exports.loginAdmin = (req, res, next) => {
    console.log('1');
    User.findOne({ email : req.body.email })
        .then(user => {
            console.log('2');
            if(!user) {
                return res.status(401).json({ error : 'Utilisateur introuvable' });
            }
            if(user.admin){
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    console.log(3);
                    if(!valid){
                        return res.status(401).json({ error : 'Mot de passe erroné' });
                    }
                    return res.status(200).json({
                        userID: user._id,
                        token: jwt.sign(
                            {userID : user._id},
                            'RANDOM_TOKEN_SECRET_ADMIN',
                            { expiresIn: '1h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }, console.log('test')))}
        })
        .catch(error => res.status(500).json({ error },console.log('test2')))
};
/**PATCH Controller */

exports.updateUser = (req, res) => {
    User.updateOne({_id:req.params.id}, {$set: {...req.body}}, (err,docs)=>{
        if(err) console.log(err);

        res.send(req.body);
    });
};

/**DELETE Controller */

exports.deleteUser = (req, res) => {
    User.deleteOne({_id:req.params.id})
        .then(() => res.status(200).json({ message : "l'article à bien été suprimé."}))
        .catch(error => res.status(400).json({ error }));
    };
