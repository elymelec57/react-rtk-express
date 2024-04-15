import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import NavMenu from './NavMenu';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { editProfile } from '../features/login/loginSlice';

const MySwal = withReactContent(Swal)

function Profile() {
    const {register,handleSubmit,formState: { errors }} = useForm();
    //const dispatch = useDispatch();
    const { loginUser } = useSelector(
        (state) => state.login
    );
    const [profile, setProfile] = useState(loginUser);

    const dispatch = useDispatch();

    const Submit = (data) => {
        

        if(data.newPassword != data.confirmPassword){
            MySwal.fire({
                position: 'top-end',
                icon: 'error',
                title: `La nueva contraseña no es igual a la confirmacion`,
                showConfirmButton: false,
                timer: 2500
            })
        }else{
            const resp = dispatch(editProfile(data));
            resp.then((data)=>{
                MySwal.fire({
                    position: 'top-end',
                    icon: data.payload.status ? 'success' : 'error',
                    title: `${data.payload.message}`,
                    showConfirmButton: false,
                    timer: 2500
                })

                
            })
            
        }
    }

    const handleChange = e => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    }

    return ( 
        <div className="w-6/6">

            <NavMenu />

            <form onSubmit={handleSubmit(Submit)} className=''>
                <div className="flex flex-row">
                    <div className="basis-1/2">
                        <div className="relative mb-6">
                            <input
                            {...register("name", { required: {
                                value: true,
                                message: 'El nombre es requerido',
                            },maxLength:{value:10, message:'10 caracteres como maximo'} })}
                            name="name"
                            type="text"
                            className="peer min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                            
                            onChange={handleChange}
                            value={profile.name}
                            placeholder="Email address" />
                            <label className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                            >Nombre
                            </label>
                            { <p className="help is-danger">{ errors.name && errors.name.message }</p>}
                        </div>
                    </div>

                    <div className="basis-1/2">
                        <div className="relative mb-6">
                            <input
                            htmlFor='email'
                            {...register("email", { required: {
                                value: true,
                                message: 'El Correo es requerido',
                                
                            },pattern:{ value: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
                                message: 'EL formato no es correcto'} 
                            })}
                            name='email'
                            type="text"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                            
                            onChange={handleChange}
                            value={profile.email}
                            placeholder="Email address" />
                            <label

                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                            >Email
                            </label>
                            { <p className="help is-danger">{ errors.email && errors.email.message }</p>}
                        </div>
                    </div>
                </div>

                <h3>Cambiar Contraseña de acceso</h3>

                <div className='flex flex-row'>
                    <div className="basis-1/2">
                        <div className="relative mb-6">
                            <input
                            htmlFor='claveActual'
                            {...register("claveActual", { required: {
                                value: false,
                                message: 'Contraseña es requerida',
                            } })}
                            name='claveActual'
                            type="password"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                            onChange={handleChange}
                            placeholder="Email address" />
                            <label
                            
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                            >Contraseña actual
                            </label>
                            { <p className="help is-danger">{ errors.claveActual && errors.claveActual.message }</p>}
                        </div>
                    </div>
                </div>

                <div className='flex flex-row'>
                    <div className="basis-1/2">
                        <div className="relative mb-6">
                            <input
                            htmlFor='newPassword'
                            {...register("newPassword", { required: {
                                value: false,
                                message: 'Contraseña es requerida',
                            } })}
                            name='newPassword'
                            type="password"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                            onChange={handleChange}
                            placeholder="Email address" />
                            <label
                            
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                            >Contraseña nueva
                            </label>
                            { <p className="help is-danger">{ errors.newPassword && errors.newPassword.message }</p>}
                        </div>
                    </div>
                </div>

                <div className='flex flex-row'>
                    <div className="basis-1/2">
                        <div className="relative mb-6">
                            <input
                            htmlFor='confirmPassword'
                            {...register("confirmPassword", { required: {
                                value: false,
                                message: 'Contraseña es requerida',
                            } })}
                            name='confirmPassword'
                            type="password"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                            onChange={handleChange}
                            placeholder="Email address" />
                            <label
                            
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                            >Confirmar Contraseña nueva
                            </label>
                            { <p className="help is-danger">{ errors.confirmPassword && errors.confirmPassword.message }</p>}
                        </div>
                    </div>
                </div>
                    

                <div className='flex gap-x-2'>
                <button className="inline-block w-full rounded bg-primary px-7 pb-2 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-success-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"> Actualizar </button>
                </div>
            </form>
        </div>
    );
}

export default Profile;