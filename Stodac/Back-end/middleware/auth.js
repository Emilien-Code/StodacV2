const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT);
        const userId = decodedToken.userID
        console.log('AUTH' , userId)
        if(req.body.userId && req.body.userId !== userId){
            throw 'User ID non valide';
        } else {
            next();
        }
    } catch(error) {
        res.status(401).json({error: error | 'requête non authentifié'});
    }
}