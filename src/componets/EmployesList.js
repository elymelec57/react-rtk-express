import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchEmployee, removeEmploye } from "../features/employes/employes";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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
        <div className="w-4/6">
            <header className="flex justify-between items-center py-4">
                <h1>
                    Lista de Empleados
                    <Link to='/create'>
                        <button className="bg-indigo-600 px-2 py-1 rounded-sm text-sm ml-10">Crear empleados</button>
                    </Link>
                </h1>
            </header>

            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Nombre
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Apellido
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Profesion
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Celular
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Corrreo
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Edad
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeList.map(l => (
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={l.id}>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {l.name}
                                </th>
                                <td class="px-6 py-4">
                                    {l.last_name}
                                </td>
                                <td class="px-6 py-4">
                                    {l.job}
                                </td>
                                <td class="px-6 py-4">
                                    {l.phone}
                                </td>
                                <td class="px-6 py-4">
                                    {l.address}
                                </td>
                                <td class="px-6 py-4">
                                    {l.age}
                                </td>
                                <td class="px-6 py-4 flex gap-x-1">
                                    <Link to={`edit/${l.id}`}>
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

        </div>
    )
}

export default EmployesList;