import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchEmployee, removeEmploye } from "../features/employes/employes";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import React from 'react';
import NavMenu from "./NavMenu";

const MySwal = withReactContent(Swal)

function EmployesList() {

    //const list = useSelector(state => state.employes);
    const dispatch = useDispatch()
    const { loading, employeeList, error, updateState, response } = useSelector(
        (state) => state.employes
    );

    useEffect(() => {
        dispatch(fetchEmployee());
        //console.log(employeeList);
    }, [dispatch]);

    const deleteEmploye = (id) => {
        dispatch(removeEmploye(id))
    }

    // este es un modal de confirmacion para eleiminar el empleado
    const deleteConfirmEmployee = (id) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteEmploye(id)
                MySwal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              
            }
          })
      
    }

    const verPhoto = (photo,name,job) => {
        MySwal.fire({
            title: name,
            text: `Profesión: ${job}`,
            imageUrl: `http://localhost:6001/public/images/${photo}`,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
    }

    return (
        <>
        <div className="w-6/6">
            <NavMenu />
            
            <table className="">
                        <thead className="">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Nombre
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Apellido
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Profesion
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Celular
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Corrreo
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Edad
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeeList.map(l => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={l.id}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {l.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {l.last_name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {l.job}
                                    </td>
                                    <td className="px-6 py-4">
                                        {l.phone}
                                    </td>
                                    <td className="px-6 py-4">
                                        {l.address}
                                    </td>
                                    <td className="px-6 py-4">
                                        {l.age}
                                    </td>
                                    <td className="px-6 py-4 flex gap-x-1">
                                        <Link to={`/edit/${l.id}`}>
                                            <button className="bg-indigo-500 px-2 py-1 text-xs rounded-md text-white">Editar</button>
                                        </Link>
                                        <button className="bg-red-500 px-2 py-1 text-xs rounded-md text-white" onClick={() => deleteConfirmEmployee(l.id)}>Eliminar</button>
                                        <button className="bg-green-500 px-2 py-1 text-xs rounded-md text-white" onClick={ ()=>verPhoto(l.photo,l.name,l.job)}>foto</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
            </table>
        </div>
        </>
    )
}

export default EmployesList;