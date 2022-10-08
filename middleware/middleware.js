const jwt = require('jsonwebtoken');

exports.trataLog = (req, res, next) => {
    console.log("Método ", req.method);
    console.log("URI ", req.originalUrl);
    console.log("Status ", res.statusCode);
    next();
};

exports.validaToken = (req, res, next) => {
    const token = req.get('x-auth-token');
    if(!token){
        return res.status(401).json({error: "Token inválido"});
    }else{
        jwt.verify(token, 'Sen@c-RS', (err, payload) => {
            if(err){
                return res.status(401).json({error: "Token inválido"});
            }else{
                console.log('Payload: ', JSON.stringify(payload));
                next();
            };
        });
    };
};