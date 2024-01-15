import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addEmployes, updateEmploye, insertEmployes, modifiedEmployee} from '../features/employes/employes'
import {v4 as uuid } from 'uuid'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';

import { useForm } from 'react-hook-form'
import 'bulma/css/bulma.css'

const MySwal = withReactContent(Swal)
const file = 'http://localhost:3000/programming-languages/uploadimg'

function EmployesForm() {

    const [empleado, setEmpleado] = useState({
        name:'',
        last_name:'',
        job:'',
        address:'',
        phone:'',
        photo:'',
        age:'',
        id:''
    })

    const {register,handleSubmit,formState: { errors }} = useForm()

    const dispatch = useDispatch()

    const { loading, employeeList, error, updateState, response } = useSelector(
        (state) => state.employes
    );

    const navigate = useNavigate()

    const params = useParams()

    const handleChange = e => {
        setEmpleado({
            ...empleado,
            [e.target.name]: e.target.value,
        });
    }

    const onFileChange = (e) => {
        let files = e.target.files;
        let fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);
 
        fileReader.onload = (event) => {
            setEmpleado({
                ...empleado,
                photo: event.target.result,
            })
        }
    }

    const Submit = () => {
        //e.preventDefault()

        if(params.id){
            if(empleado.photo.length > 17){
                dispatch(modifiedEmployee(empleado))
            }else{
                dispatch(modifiedEmployee({
                    name: empleado.name,
                    last_name: empleado.last_name,
                    job: empleado.job,
                    address: empleado.address,
                    phone: empleado.phone,
                    age: empleado.age,
                    photo: null,
                    id: empleado.id
                }))
            }
        }else{
            dispatch(insertEmployes(empleado))
        }

        setEmpleado({
            name:'',
            last_name:'',
            job:'',
            address:'',
            phone:'',
            photo:'',
            age:'',
        })

        MySwal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 2500
        })

        navigate('/')
    }

    useEffect(()=>{
        if(params.id){
            employeeList.forEach(e => {
                if(e.id == params.id){
                    setEmpleado({
                        name: e.name,
                        last_name: e.last_name,
                        job: e.job,
                        address: e.address,
                        phone: e.phone,
                        photo:e.photo,
                        age: e.age,
                        id: e.id
                    })
                }
            });
        }
    },[employeeList,params.id])

    return (
        <div>
            <div>
                <h1>Registra empleados</h1>
            </div>
            <form onSubmit={handleSubmit(Submit)} className='bg-zinc-800 max-w-sm p-4'>
                <div className='flex gap-x-1'>
                    <div>
                        <label htmlFor='name' className='block text-sm font-bold'>Name</label>
                        <input type="text" {...register("name", { required: {
                            value: true,
                            message: 'El nombre es requerido',
                        },maxLength:{value:10, message:'10 caracteres como maximo'} })}
                        name="name" className='w-full p-2 rounded-md bg-zinc-600 mb-2' onChange={handleChange} value={empleado.name}/>
                        <p class="help is-danger">{ errors.name && errors.name.message }</p>
                    </div>
                    
                    <div>
                        <label htmlFor='last_name' className='block text-sm font-bold'>apellido</label>
                        <input type="text" {...register("last_name", { required: {
                            value: true,
                            message: 'El apellido es requerido',
                        }, maxLength:{value:20, message:'20 caracteres como maximo'} })} name='last_name' className='w-full p-2 rounded-md bg-zinc-600 mb-2' onChange={handleChange} value={empleado.last_name}/>
                        <p class="help is-danger">{ errors.last_name && errors.last_name.message }</p>
                    </div>
                </div>

                <label htmlFor='job' className='block text-sm font-bold'>Profesion</label>
                <input type="text" {...register("job", { required: {
                            value: true,
                            message: 'Profesión es requerida',
                        } })} name='job' className='w-full p-2 rounded-md bg-zinc-600 mb-2' onChange={handleChange} value={empleado.job}/>
                        <p class="help is-danger">{ errors.job && errors.job.message }</p>

                <div className='flex gap-x-1'>
                    <div>
                        <label htmlFor='phone' className='block text-sm font-bold'>Celular</label>
                        <input type="text" {...register("phone", { required: {
                            value: true,
                            message: 'El celular es requerido',
                        }, maxLength:{value:11, message:'11 caracteres como maximo'},
                        minLength: { value: 11, message:'11 caracteres como minimo'} 
                        })} name='phone' className='w-full p-2 rounded-md bg-zinc-600 mb-2' onChange={handleChange} value={empleado.phone}/>
                        <p class="help is-danger">{ errors.phone && errors.phone.message }</p>
                    </div>
                    <div>
                        <label htmlFor='address' className='block text-sm font-bold'>Email</label>
                        <input type="text" {...register("address", { required: {
                            value: true,
                            message: 'El Correo es requerido',
                            
                        },pattern:{ value: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
                            message: 'EL formato no es correcto'} 
                        })} name='address' className='w-full p-2 rounded-md bg-zinc-600 mb-2' onChange={handleChange} value={empleado.address}/>
                        <p class="help is-danger">{ errors.address && errors.address.message }</p>
                    </div>
                </div>

                <div className='flex gap-x-1'>
                    <div>
                        <label htmlFor='age' className='block text-sm font-bold'>Edad</label>
                        <input type="text" {...register("age", { required: {
                            value: true,
                            message: 'La edad es requerida',
                        } })} name='age' className=' p-2 rounded-md bg-zinc-600 mb-2' onChange={handleChange} value={empleado.age} />
                        <p class="help is-danger">{ errors.age && errors.age.message }</p>
                    </div>
                    <div>
                        <label htmlFor='photo' className='block text-sm font-bold'>Foto</label>
                        <input type="file" onChange={onFileChange} name='photo' className='w-full p-2 rounded-md bg-zinc-600 mb-2'/>
                        <p class="help is-danger">{ errors.photo && errors.photo.message }</p>
                    </div>
                </div>

                <div className='flex gap-x-2'>
                <button className="bg-green-500 px-2 py-1 text-xs rounded-md"> save </button>
                <Link to='/'>
                    <button className="bg-indigo-500 px-2 py-1 text-xs rounded-md">Atras</button>
                </Link>
                </div>
            </form>
        </div>
    )
}

export default EmployesForm;