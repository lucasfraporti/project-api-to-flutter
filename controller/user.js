const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/user');

exports.validarUser = (req, res) => {
    if(req.body && req.body.username && req.body.password){
        const usernameUser = req.body.username;
        const passwordUser = req.body.password;
        User.findOne({username: usernameUser}, (err, userEncontrado) => {
            if(err){
                return res.status(500).json({error: err});
            }else if(userEncontrado && bcrypt.compareSync(passwordUser, userEncontrado.password)){
                const token = jwt.sign({id: userEncontrado.id}, 'Sen@c-RS', {expiresIn: '1h'});
                res.status(201).json({token: token});
            }else{
                res.status(401).json({error: "Usuário não encontrado"});
            };
        });
    };
};

exports.listarUsers = (req, res) => {
    User.find({}, (err, users) => {
        if(err){
            return res.status(500).json({error: err});
        }else{
            res.status(200).json(users);
        };
    });
};

exports.listarUsersById = (req, res) => {    
    const id = req.params.id;
    User.findById(id, (err, userEncontrado) => {
        if(err){
            res.status(500).send(err);
        }else if(userEncontrado){
            return res.status(200).json(userEncontrado);
        }else{
            return res.status(404).json({message: 'Nenhum usuário encontrado'});
        };
    });
};

exports.buscarUser = (req, res) => {
    if(req.query && req.query.username){
        const param = req.query.username;
        User.findOne({username: param}, (err, userEncontrado) => {
            if(err){
                res.status(500).send(err);
            }else if(userEncontrado){
                return res.json(userEncontrado);
            }else{
                return res.status(404).json({message: 'Nenhum usuário encontrado'});
            }
        });
    }else{
        return res.status(400).json({error: 'O parâmetro não foi preenchido'});
    };
};

exports.postUser = (req, res) => {
    const userRequest = new User(req.body);
    if(userRequest && userRequest.name && userRequest.username && userRequest.password){
        const userNovo = new User(userRequest);
        // Aplicação da hash para a password
        userNovo.password = bcrypt.hashSync(userRequest.password, 10);
        userNovo.save((err, userSalvo) => {
            if(err){
                res.status(500).send(err);
            }else{
                return res.status(201).json(userSalvo);
            };
        });
    };
};

exports.attUser = (req, res) => {
    const id = req.params.id;
    const userRequest = req.body;
    if(!userRequest || !userRequest.name || !userRequest.username){
        return res.status(400).json({error: 'Nome e/ou nome de usuário são obrigatórios'});
    };
    // Aplicando a password de hash caso o usuário passe a password
    if(userRequest.password){
        userRequest.password = bcrypt.hashSync(userRequest.password, 10);
        console.log(userRequest.password);
    };
    User.findByIdAndUpdate(id, userRequest, {new: true}, (err, userAtualizado) => {
        if(err){
            res.status(500).send(err);
        }else if(userAtualizado){
            res.status(200).json(userAtualizado);
        }else{
            res.status(404).json({error: 'Usuário não encontrado'});
        };
    });
};

exports.changePassword = (req, res) => {
    const id = req.params.id;
    const new_password = bcrypt.hashSync(req.body.new_password, 10);

    if(!userRequest.password || !new_password){
        return res.status(400).json({error: 'Você deverá informar a senha atual e digitar uma nova senha'});
    };
    User.updateOne({_id: id}, {$set:{"password": new_password}}, (err, result) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).json(result);
        };
    });
};

exports.deleteUser = (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id, (err, userEncontrado) => {
        if(err){
            res.status(500).send(err);
        }else if(userEncontrado){
            return res.status(200).json(userEncontrado);
        }else{
            return res.status(404).json({message: `Não foi encontrado nenhum usuário com o ID: ${id}`});
        };
    });
};