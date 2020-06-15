const jwt = require('jsonwebtoken');

//=================
// Verificar token
//=================

let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decode) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }


        req.usuario = decode.usuario;
        next();

    });

    /*   res.json({
          token: token
      }); */

};

//=================
// Verificar admin role
//=================

let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;


    if (usuario.role === 'ADMIN_ROLE') {
        next();

    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El ususairo no es administrador'
            }
        });

    }


};

module.exports = {
    verificaToken,
    verificaAdmin_Role
}