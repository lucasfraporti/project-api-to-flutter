const Restaurante = require('../model/restaurante');

// Listagem de todas as mesas
exports.getAll = (req, res) => {
    Restaurante.find({}, (err, result) => {
        if(err){
            return res.status(500).send(err);
        }else{
            return res.json(result);
        };
    });
};

// Listar uma mesa específica através do ID
exports.getMesaById = (req, res) => {
    const id = req.params.id;
    Restaurante.findById(id, (err, result) => {
        if(err){
            return res.status(500).send(err);
        }else if(result){
            return res.json(result);
        }else{
            return res.status(404).send('Nenhuma mesa encontrada');
        };
    });
};

// Listar uma mesa específica através do número da mesa
exports.getMesaByNumber = (req, res) => {
    const number = req.params.numberMesa;
    Restaurante.find({numberMesa: number}, (err, result) => {
        if(err){
            return res.status(500).send(err);
        }else if(result){
            return res.json(result);
        }else{
            return res.status(404).send('Nenhuma mesa encontrada');
        };
    });
};

// Listar todas as mesas que estão sendo atendidas por um certo atendente
// Se o param for Lucas e possuir mais de um atendente com esse nome, listará todas as mesas com o atendente Lucas
exports.getAtendente = (req, res) => {
    if(req.query && req.query.nomeAtendente){
        const param = req.query.nomeAtendente;
        Restaurante.find({nomeAtendente: {$regex: param}}, (err, result) => {
            if(err){
                return res.status(500).send(err);
            }else if(result){
                return res.json(result);
            }else{
                return res.status(404).send('Nenhuma mesa encontrada');
            };
        });
    };
};

// Listar todas as mesas que estão sendo ocupadas por um certo cliente
// Se o param for Larissa e possuir mais de um cliente com esse nome, listará todas as mesas com a cliente Larissa
exports.getCliente = (req, res) => {
    if(req.query && req.query.nomeCliente){
        const param = req.query.nomeCliente;
        Restaurante.find({nomeCliente: {$regex: param}}, (err, result) => {
            if(err){
                return res.status(500).send(err);
            }else if(result){
                return res.json(result);
            }else{
                return res.status(404).send('Nenhuma mesa encontrada');
            };
        });
    };
};

// Listar todas as mesas limpas ou não, dependendo do valor que o usuário passar
exports.getLimpeza = (req, res) => {
    if(req.query && req.query.mesaLimpa != null){
        const param = req.query.mesaLimpa;
        Restaurante.find({mesaLimpa: param}, (err, result) => {
            if(err){
                return res.status(500).send(err);
            }else if(result){
                return res.json(result);
            }else{
                return res.status(404).send('Nenhuma mesa encontrada');
            };
        });
    };
};

// Listar todas as mesas desocupadas ou ocupadas, dependendo do valor que o usuário passar
exports.getStatus = (req, res) => {
    if(req.query && req.query.mesaOcupada != null){
        const param = req.query.mesaOcupada;
        Restaurante.find({mesaOcupada: param}, (err, result) => {
            if(err){
                return res.status(500).send(err);
            }else if(result){
                return res.json(result);
            }else{
                return res.status(404).send('Nenhuma mesa encontrada');
            };
        });
    };
};

// Retorna a quantidade de mesas desocupadas que estão limpas
exports.getAvailability = (req, res) => {
    Restaurante.count({mesaOcupada: 0, mesaLimpa: 1}, (err, result) => {
        if(err){
            return res.status(500).send(err);
        }else if(result){
            return res.json(result);
        }else{
            return res.status(404).send('Nenhuma mesa está disponível para uso no momento');
        };
    });
};

// Atualização de uma mesa através do ID
exports.attMesa = (req, res) => {
    const id = req.params.id;
    const mesaRequest = req.body;
    if(!mesaRequest || !mesaRequest.nomeAtendente || !mesaRequest.nomeCliente || mesaRequest.numberMesa == null || mesaRequest.mesaLimpa == null || mesaRequest.mesaOcupada == null){
        return res.status(400).send('Preencha todos os campos');
    };
    Restaurante.findByIdAndUpdate(id, mesaRequest, {new: true}, (err, result) => {
        if(err){
            return res.status(500).send(err);
        }else if(result){
            return res.json(result);
        }else{
            return res.status(404).send('Nenhuma mesa encontrada');
        };
    });
};

// Inserção de uma nova mesa
exports.postMesa = (req, res) => {
    const mesaRequest = new Restaurante(req.body);
    if(mesaRequest && mesaRequest.nomeAtendente && mesaRequest.nomeCliente && mesaRequest.numberMesa != null && mesaRequest.mesaLimpa != null && mesaRequest.mesaOcupada != null){
        const mesaNova = new Restaurante(mesaRequest);
        mesaNova.save((err, result) => {
            if(err){
                returnres.status(500).send(err);
            }else{
                return res.json(result);
            };
        });
    }else{
        return res.status(400).send('Preencha todos os campos');
    };
};

// Deleção de uma mesa
exports.deleteMesa = (req, res) => {
    const id = req.params.id;
    Restaurante.findByIdAndDelete(id, (err, result) => {
        if(err){
            res.status(500).send(err);
        }else if(result){
            return res.json(result);
        }else{
            return res.status(404).send('Nenhuma mesa encontrada');
        };
    });
};