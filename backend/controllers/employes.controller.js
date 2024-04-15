const fs = require('fs');
const employe = require('../models').Employe;

async function getEmployes(req,res){
    employe.findAll({ where: {userId: req.user.id} }).
        then((data)=>{
            res.json(data)
        })
        .catch((error)=>{
            res.json({e:error})
        })
}

async function createEmployes(req,res){

    let nameImg;

    if(req.body.fileimg != ''){
        nameImg = Date.now()+'.jpg';
        let imageData = req.body.fileimg;
        let path = './public/images/';
        let base64Data = imageData.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        fs.writeFileSync(path + nameImg, base64Data,  {encoding: 'base64'});
    }else{
        nameImg = 'avatar-user.png';
    }

    let data = {
        name: req.body.name, 
        last_name: req.body.last_name, 
        job: req.body.job, 
        phone: req.body.phone, 
        address: req.body.address, 
        age: req.body.age,
        userId: req.user.id,
        photo: nameImg
    }

    await employe.create(data).
        then((data)=>{
            res.json(data)
        })
        .catch((error)=>{
            res.json({e:error})
        });
}

async function updateEmployes(req,res){

    let path = './public/images/';
    
    if(req.body.fileimg != null){

        const e = await employe.findByPk(req.params.id);

        //elimino la foto que va hacer reemplazada
        fs.unlink(path+e.photo,(err)=>{
            if(err){
                console.log({e: err});
            }else{
                console.log(e.photo+' Eliminada');
            }
        })

        let nameImg = Date.now()+'.jpg';
        let imageData = req.body.fileimg;
        let base64Data = imageData.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        fs.writeFileSync(path + nameImg, base64Data,  {encoding: 'base64'});

        let data = {
            name: req.body.name, 
            last_name: req.body.last_name, 
            job: req.body.job, 
            phone: req.body.phone, 
            address: req.body.address, 
            age: req.body.age,
            photo: nameImg
        }

        employe.update(data,{
            where: { id: req.params.id}
        }).
            then((data)=>{
                res.json(data)
            })
            .catch((error)=>{
                res.json({e:error})
            })

    }else{
        let data = {
            name: req.body.name, 
            last_name: req.body.last_name, 
            job: req.body.job, 
            phone: req.body.phone, 
            address: req.body.address, 
            age: req.body.age,
        }

        employe.update(data,{
            where: { id: req.params.id}
        }).
            then((data)=>{
                res.json(data)
            })
            .catch((error)=>{
                res.json({e:error})
            })
    }
}

async function deleteEmployes(req,res){
    let path = './public/images/';
    // optengo el objeto del empleado para sacar el nombre de la imagen para luego eliminar
    const e = await employe.findByPk(req.params.id);

    employe.destroy({
        where: {id: req.params.id}
    }).
        then((data)=>{
            fs.unlink(path+e.photo,(err)=>{
                if(err){
                    console.log({e: err});
                }else{
                    res.json(data);
                    console.log(e.photo+' Eliminada');
                }
            })
        })
        .catch((error)=>{
            res.json({e:error})
        })
}

module.exports = {
    createEmployes,
    getEmployes,
    updateEmployes,
    deleteEmployes
}