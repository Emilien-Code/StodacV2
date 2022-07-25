const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'i1q*J!np3a%HH9$7qXwS9ar6EVNzls3$bXA&B$ZtDNzfxbrAZX');
        const userId = decodedToken.userId
        if(req.body.userId && req.body.userId !== userId){
            throw 'User ID non valide';
        } else {
            next();
        }
    } catch(error) {
        res.status(401).json({error: error | 'requête non authentifié'});
    }
}