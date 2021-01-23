// used to create, sign, and verify tokens
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const token = req.header['x-access-token'];
        if(!token)
            return res.status(403).json({auth: false, message: "No token provided."});

        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId)
        {
            throw 'Failed to authenticate token.';
        }
        next();
    }
    catch (error)
    {
        res.status(401).json({error: error | 'Request not authenticated.'});
    }
}

module.exports = verifyToken;
