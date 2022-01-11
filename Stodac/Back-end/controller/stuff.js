const Thing = require('../models/Thing')
const fs = require('fs');

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
    Thing.find({reference:req.params.ref}, (err, docs)=>{
       if(err) console.log(err);
       res.send(docs)
   });
};

exports.getById = (req, res) =>{
    Thing.find({_id:req.params.id}, (err, docs)=>{
       if(err) console.log(err);
       res.send(docs)
    });
};

exports.getByReferenceAndManufacturer = (req, res) =>{
    Thing.find({category:req.params.category, manufacturer:req.params.manufacturer}, (err, docs)=>{
        if(err) console.log(err);
        res.send(docs)
    });
};

exports.getByName = (req, res) => {
    Thing.find({name:{ $regex: req.params.id, $options: 'i' }}, (err, docs) => {
        if(err) console.log(err);
        res.send(docs);
    }).limit(parseInt(req.params.nb));
};


/**CREATE Controller */

exports.createNewStuff = (req, res)=>{
    console.log(req.body);

    const thing = new Thing({
        ...req.body, 
        //img: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    thing.save()
        .then(() => res.status(201).json({ message: "Article enregistré" }))
        .catch(() => res.status(400).json({ error }));
};


/**PUT Controller */

exports.updateStuff = (req, res) => {
    const thingObject = req.file ?
        { 
            ...JSON.parse(req.body.thing),
            img: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

        } : { ...req.body }
    Thing.updateOne({_id: req.params.id}, {...thingObject, _id: req.params.id})
        .then(() => res.status(200).json({ message: "l'artiche à bien été modifié"}))
        .catch((error) => res.status(400).json(error));
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
    Thing.deleteOne({_id:req.params.id})
        .then(() => res.status(200).json({ message : "l'article à bien été suprimé."}))
        .catch(error => res.status(400).json({ error }));
};
exports.deleteStuff = (req, res) => {
    Thing.deleteOne({_id:req.params.id})
        .then(() => res.status(200).json({ message : "l'article à bien été suprimé."}))
        .catch(error => res.status(400).json({ error }));
};


exports.getNb = (req, res) =>{
    Thing.countDocuments({}, (err, docs)=>{
       if(err) console.log(err);
       res.json({nb : docs});
   })
};
