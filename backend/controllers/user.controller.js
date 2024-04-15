const db = require('../models');
const User = db.User;
const bcrypt = require('bcrypt');
const {createAccesToken} = require('../libs/jwt');
const jwt = require('jsonwebtoken');
const keySecret = require('../settings/keys');

async function login(req,res){
    const data = req.body
    try {
      const user = await User.findOne({where: {email:data.email}});
        if(!user) {
            return res.json({status:false, message: "Sorry this email does not exist"});
        }
    
        const validPassword = bcrypt.compareSync(data.password,  user.password);

        if(!validPassword) return res.json({status:false, message:  "Invalid Login Details"});

        // creo un token para la autenticacion
        const token = await createAccesToken({id: user.id});
        res.cookie("token", token);

        let userAccept = {
            id: user.id,
            name: user.name,
            email: user.email
        }

        return res.json({status:true, message: "login successfull", user:userAccept});

    } catch (error) {

      return  res.json("An error occured"+error)
    }
}

async function register(req, res) {
    const newUser = req.body
    console.log(newUser);

    // verifico que el email entrante no este ya registrado en la base de datos
    let userExit = await User.findOne({ where: {email: newUser.email} });

    if(userExit) return res.json({status:false, message: "El email ya esta registado"});

    const hash = bcrypt.hashSync(newUser.password, 10);
    newUser.password = hash;

    try {
        const createduser = await User.create(newUser);
        if (!createduser) return res.json({ status: false, message: "Could  not create user" });
        return res.json({ status: true, message: "User created successfull" });
    } catch (error) {
        res.json("An error occured" + error)
    }
}

async function logout(req, res){
    res.cookie("token", "", {
        expires: new Date(0)
    });
    return res.sendStatus(200);
}

async function profile(req, res){
    let userLogin = await User.findOne({where:{id: req.user.id}});

    if(!userLogin) return res.json({message:"usuario no encontrado"});

    res.json({
        id: userLogin.id,
        name: userLogin.name,
        email: userLogin.email
    });
}

async function editProfile(req, res){

    let user = await User.findOne({where:{id: req.user.id}});

    if(req.body.claveActual == '' && req.body.newPassword == ''){
        user.update({name:req.body.name,email:req.body.email}).
        then(()=>{

            let userAuth = {
                id: user.id,
                name: user.name,
                email: user.email
            }

            res.json({status:true,message:'Actualizacion completada', userAuth})
        })
        .catch((error)=>{
            res.json({e:error})
        });
    }else{
        const validPassword = bcrypt.compareSync(req.body.claveActual,  user.password);

        if(validPassword){
            const hash = bcrypt.hashSync(req.body.newPassword, 10);
            user.update({name:req.body.name,email:req.body.email,password:hash}).
            then(()=>{

                let userAuth = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }

                res.json({status:true,message:'Actualizacion completada',userAuth})
            })
            .catch((error)=>{
                res.json({e:error})
            });
        }else{
            res.json({status:false,message:'la contraseña actual es incorrecta'})
        }
    }
}

async function verify(req, res){

    const { token } = req.body;

    if(!token) return res.status(401).json({status: false,message:"no token, autorizacion denegada"});

    jwt.verify(token, keySecret.key, async (err, user)=>{
        if(err) return res.status(403).json({status: false,message: "token invalido"});
        req.user = user;
        let decode = jwt.decode(token);

        const userToken = await User.findOne({where: {id:decode.id},attributes: { exclude: ['password','createdAt','updatedAt']}});

        let userAuth = {
            id: userToken.id,
            name: userToken.name,
            email: userToken.email
        }

        return res.status(200).json({status: true, message:"token valido",userAuth});
    })
}

module.exports = {
    register,
    login,
    logout,
    profile,
    verify,
    editProfile
}