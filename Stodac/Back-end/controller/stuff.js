const Thing = require('../models/Thing')
const fs = require('fs');
const jwt = require('jsonwebtoken');
const User = require('../models/User')

/** GET Controller */

exports.getAllStuff = (req, res) =>{
    Thing.find({}, (err, docs)=>{
       if(err) console.log(err);
       res.send(docs);
   }).limit(parseInt(req.params.nb)).skip(parseInt(req.params.sk))
};


exports.getByManufacturer = (req, res) =>{
    Thing.find({manufacturer:req.params.manufacturer}, (err, docs)=>{
       if(err) console.log(err);
       res.send(docs);
   });
};

exports.getManufacturer = (req, res) =>{
    Thing.distinct("manufacturer", {},(err,docs)=>{
        if(err) console.log(err);
        res.send(docs)
    })
}

exports.getByCategories = (req, res) =>{
    Thing.find({category:req.params.category}, (err, docs)=>{
       if(err) console.log(err);
       res.send(docs);
   });
};

exports.getCategories = (req, res) =>{
    Thing.distinct("category", {},(err, docs)=>{
        if(err) console.log(err);
        res.send(docs);
    });
};

exports.getByReference = (req, res) =>{
    console.log(req.params.ref)
    Thing.find({reference:{ $regex: req.params.ref, $options: 'i' }}, (err, docs)=>{
       if(err) console.log(err);
       console.log(docs)
       res.send(docs)
   }).limit(parseInt(req.params.nb));
};

exports.getById = (req, res) =>{
    Thing.find({_id:req.params.id}, (err, docs)=>{
       if(err) console.log(err);
       res.send(docs)
    });
};

exports.getByReferenceAndManufacturer = (req, res) =>{
    console.log(req.body)
    if (req.body.category != '' && req.body.manufacturer != ''){
        Thing.find({category:req.body.category, manufacturer:req.body.manufacturer}, (err, docs)=>{
            if(err) console.log(err);
            return res.send(docs)
        });
    }else{
        if (req.body.category != ''){
                Thing.find({category:req.body.category}, (err, docs)=>{
                    if(err) console.log(err);
                    return res.send(docs)
                });
        }
        if (req.body.manufacturer != ''){
            Thing.find({manufacturer:req.body.manufacturer}, (err, docs)=>{
                if(err) console.log(err);
                return res.send(docs)
            });
        }
    }
};

exports.getByName = (req, res) => {
    Thing.find({name:{ $regex: req.params.id, $options: 'i' }}, (err, docs) => {
        if(err) console.log(err);
        res.send(docs);
    }).limit(parseInt(req.params.nb));
};


/**CREATE Controller */

exports.createNewStuff = (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT);
    const userId = decodedToken.userID

    const thing = new Thing({
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        qty: req.body.qty,
        price: req.body.price,
        poids: req.body.poids,
        reference: req.body.reference,
        category: req.body.category,
        state: req.body.state,
        description: req.body.description,
        compatibility: JSON.parse(req.body.compatibility),
        img: `https://stodac.fr/api/images/${req.file.filename}`
    })

    User.find({_id: userId}, (err, docs) => {
        if (docs[0].admin === true){
            thing.save()
                .then(() => res.status(201).json({ message: "Article enregistré" }))
                .catch(() => res.status(400).json({ error }));
        }
    })
};


/**PUT Controller */

exports.updateStuff = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT);
    const userId = decodedToken.userID

    const thingObject = {
           name: req.body.name,
           manufacturer: req.body.manufacturer,
           qty: req.body.qty,
           price: req.body.price,
           poids: req.body.poids,
           reference: req.body.reference,
           category: req.body.category,
           state: req.body.state,
           description: req.body.description,
           compatibility: JSON.parse(req.body.compatibility),
           img: req.body.image,
       }
        /*?{
            //...JSON.parse(req.body.thing),
            //img: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            compatibility: JSON.parse(req.body.compatibility)
        } : { ...req.body.parse }*/


    User.find({_id: userId}, (err, docs) => {
        if (docs[0].admin === true){
            Thing.updateOne({_id: req.params.id}, {...thingObject, _id: req.params.id})
                .then(() => res.status(200).json({ message: "l'artiche à bien été modifié"}))
                .catch((error) => res.status(400).json(error));
        }
    })
};


/**DELETE Controller */
/*
exports.deleteStuff = (req, res) => {
    Thing.findOne({ _id : req.body._id })
        .then(thing => {
            const filename = thing.imageUrl.split('/image/')[1];
            fs.unlink(`images.${filename}`, () => {
                    Thing.deleteOne({_id:req.params.id})
        .then(() => res.status(200).json({ message : "l'article à bien été suprimé."}))
        .catch(error => res.status(400).json({ error }));
        })
    })
};*/
exports.deleteStuff = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT);
    const userId = decodedToken.userID

    User.find({_id: userId}, (err, docs) => {
        Thing.deleteOne({_id: req.params.id})
            .then(() => res.status(200).json({message: "l'article à bien été suprimé."}))
            .catch(error => res.status(400).json({error}));
    })
};


exports.getNb = (req, res) =>{
    Thing.countDocuments({}, (err, docs)=>{
       if(err) console.log(err);
       res.json({nb : docs});
   })
};
