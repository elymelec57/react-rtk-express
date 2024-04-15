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
import NavMenu from './NavMenu';

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

        navigate('/employes')
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
        <div className="w-6/6">

            <NavMenu />

            <form onSubmit={handleSubmit(Submit)} className=''>
                <div className=''>
                <div className="flex flex-row">
                    <div className="basis-1/2">
                        <div className="relative mb-6" data-twe-input-wrapper-init>
                            <input
                            htmlFor='name'
                            {...register("name", { required: {
                                value: true,
                                message: 'El nombre es requerido',
                            },maxLength:{value:10, message:'10 caracteres como maximo'} })}
                            name='name'
                            type="text"
                            className="peer min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleFormControlInput2"
                            onChange={handleChange}
                            value={empleado.name}
                            placeholder="Email address" />
                            <label
                            for="exampleFormControlInput2"
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                            >Nombre
                            </label>
                            { <p className="help is-danger">{ errors.name && errors.name.message }</p>}
                        </div>
                    </div>

                    <div className="basis-1/2">
                        <div className="relative mb-6" data-twe-input-wrapper-init>
                            <input
                            htmlFor='last_name'
                            {...register("last_name", { required: {
                                value: true,
                                message: 'El apellido es requerido',
                            }, maxLength:{value:20, message:'20 caracteres como maximo'} })}
                            name='last_name'
                            type="text"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleFormControlInput2"
                            onChange={handleChange}
                            value={empleado.last_name}
                            placeholder="Email address" />
                            <label
                            for="exampleFormControlInput2"
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                            >Apellido
                            </label>
                            { <p className="help is-danger">{ errors.last_name && errors.last_name.message }</p>}
                        </div>
                    </div>
                </div>

                <div className='flex flex-row'>
                    <div className="basis-1/2">
                        <div className="relative mb-6" data-twe-input-wrapper-init>
                            <input
                            htmlFor='job'
                            {...register("job", { required: {
                                value: true,
                                message: 'Profesión es requerida',
                            } })}
                            name='job'
                            type="text"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleFormControlInput2"
                            onChange={handleChange}
                            value={empleado.job}
                            placeholder="Email address" />
                            <label
                            for="exampleFormControlInput2"
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                            >Profesion
                            </label>
                            { <p className="help is-danger">{ errors.job && errors.job.message }</p>}
                        </div>
                    </div>

                    <div className="basis-1/2">
                        <div className="relative mb-6" data-twe-input-wrapper-init>
                            <input
                            htmlFor='phone'
                            {...register("phone", { required: {
                                value: true,
                                message: 'El celular es requerido',
                            }, maxLength:{value:11, message:'11 caracteres como maximo'},
                            minLength: { value: 11, message:'11 caracteres como minimo'} 
                            })}
                            name='phone'
                            type="text"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleFormControlInput2"
                            onChange={handleChange}
                            value={empleado.phone}
                            placeholder="Email address" />
                            <label
                            for="exampleFormControlInput2"
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                            >Celular
                            </label>
                            { <p className="help is-danger">{ errors.phone && errors.phone.message }</p>}
                        </div>
                    </div>
                </div>
                    
                <div className='flex flex-row'>
                    <div className="basis-1/3">
                        <div className="relative mb-6" data-twe-input-wrapper-init>
                            <input
                            htmlFor='address'
                            {...register("address", { required: {
                                value: true,
                                message: 'El Correo es requerido',
                                
                            },pattern:{ value: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
                                message: 'EL formato no es correcto'} 
                            })}
                            name='address'
                            type="text"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleFormControlInput2"
                            onChange={handleChange}
                            value={empleado.address}
                            placeholder="Email address" />
                            <label
                            for="exampleFormControlInput2"
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                            >Correo electronico
                            </label>
                            { <p className="help is-danger">{ errors.address && errors.address.message }</p>}
                        </div>
                    </div>

                    <div className="basis-1/3">
                        <div className="relative mb-6" data-twe-input-wrapper-init>
                            <input
                            htmlFor='age'
                            {...register("age", { required: {
                                value: true,
                                message: 'La edad es requerida',
                            } })}
                            name='age'
                            type="text"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleFormControlInput2"
                            onChange={handleChange}
                            value={empleado.age}
                            placeholder="Email address" />
                            <label
                            for="exampleFormControlInput2"
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                            >Edad
                            </label>
                            { <p className="help is-danger">{ errors.age && errors.age.message }</p>}
                        </div>
                    </div>
                    <div className="basis-1/3">
                        <div className="relative mb-6" data-twe-input-wrapper-init>
                            <input
                            type="file"
                            onChange={onFileChange}
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleFormControlInput2"
                            placeholder="Email address" />
                            <label
                            for="exampleFormControlInput2"
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                            >
                            </label>
                        </div>
                    </div>
                </div>
                    
                </div>

                <div className='flex gap-x-2'>
                <button className="inline-block w-full rounded bg-primary px-7 pb-2 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-success-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"> save </button>
              
                </div>
            </form>
        </div>
    )
}

export default EmployesForm;