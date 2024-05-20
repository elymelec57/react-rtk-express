const db = require('../models');
const User = db.User;
const Employes = db.Employe;
const bcrypt = require('bcrypt');
const {createAccesToken} = require('../libs/jwt');

async function viewLogin(req,res){
    const { admin } = req.cookies;
    if(admin){
        res.redirect('/dahsboard');
    }else{
        res.render('login');
    }
}

async function viewRegister(req,res){
    const { admin } = req.cookies;
    if(admin){
        res.redirect('/dahsboard');
    }else{
        res.render('register', { status:false });
    } 
}

async function index(req,res){
    const { admin } = req.cookies;
    res.render('dahsboard',{admin})
}

async function registerAdmin(req,res){

    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.psw,
    }
    
    const newAdmin = data;
    // verifico que el email entrante no este ya registrado en la base de datos
    let Exit = await User.findOne({ where: {email: newAdmin.email} });

    if(Exit) return res.render('register',{status:true, message: "El email ya esta registado"}); 

    const hash = bcrypt.hashSync(newAdmin.password, 10);
    newAdmin.password = hash;
    newAdmin.rol = 'admin';

    try {
        const createdadmin = await User.create(newAdmin);
        if (!createdadmin) return res.render('register',{ status: true, message: "Could  not create user" }); 
        
        res.redirect('/login');
    } catch (error) {
        return {status:false, message: error}
    }
}

async function loginAdmin(req,res){

    const data = {
        email: req.body.email,
        password: req.body.psw,
    }

    if(data.email && data.password){
        try {
            const admin = await User.findOne({where: {email:data.email}});
              if(!admin) {
                  return res.render('login',{status:true, message: "Sorry this email does not exist"});
              }

              if(admin.rol == null) {
                return res.render('login',{status:true, message: "Solo administradores pueden iniciar sesion"});
              }
          
              const validPassword = bcrypt.compareSync(data.password,  admin.password);
      
              if(!validPassword) return res.render('login',{status:true, message:  "Invalid Login Details"});
      
              let adminAccept = {
                  id: admin.id,
                  name: admin.name,
                  email: admin.email
              }

            // creo un token para la autenticacion
            const createtoken = await createAccesToken({id: admin.id});
    
            res.cookie("token", createtoken);
            res.cookie("admin",adminAccept);
            res.redirect('/dahsboard');
      
          } catch (error) {
      
            return  {status:false, message: error}
          }
    }else{
        return res.render('login',{status:true, message: "Debe ingresar datos"});
    }

}

async function logout(req,res){
    res.cookie("token", "", {
        expires: new Date(0)
    });
    res.cookie("admin", "",{
        expires: new Date(0)
    });
    res.redirect('/login');
}

async function getUsers(req,res){
    const { admin } = req.cookies;
    let usuarios = await User.findAll();
    res.render('usuarios',{admin, usuarios})
}

async function deleteUser(req,res){
    await User.destroy({
        where:{id: req.params.id}
    }).then((resul)=>{
        res.redirect('/usuarios');
    }).catch((err)=>{
        console.log(err);
    })
}

async function deleteEmployes(req,res){
    await Employes.destroy({
        where:{id: req.params.id}
    }).then((resul)=>{
        res.redirect('/empleados');
    }).catch((err)=>{
        console.log(err);
    })
}

async function EditUser(req,res){
    const user = await User.findByPk(req.params.id)
    return res.json({u:user});
}

async function editEmploye(req,res){
    const e = await Employes.findByPk(req.params.id)
    return res.json({e});
}

async function updateUser(req,res){

    const user = await User.findByPk(req.body.id)
    user.update({
        name: req.body.nameUser,
        email: req.body.emailUser,
        rol: req.body.rolUser
    });
    res.redirect('/usuarios');
}

async function updateEmploye(req,res){
    let data = {
        name: req.body.name, 
        last_name: req.body.last_name, 
        job: req.body.job, 
        phone: req.body.phone, 
        address: req.body.address, 
        age: req.body.age,
    }

    Employes.update(data,{
        where: { id: req.body.id}
    }).
        then((data)=>{
            res.redirect('/empleados');
        })
        .catch((error)=>{
            res.json({e:error})
        })
}

async function getEmployes(req,res){
    const { admin } = req.cookies;
    let empleados = await Employes.findAll();
    res.render('empleados',{admin, empleados})
}

module.exports = {
    viewLogin,
    viewRegister,
    index,
    registerAdmin,
    loginAdmin,
    deleteUser,
    logout,
    getUsers,
    getEmployes,
    EditUser,
    updateUser,
    deleteEmployes,
    editEmploye,
    updateEmploye
}
