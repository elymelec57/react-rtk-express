import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getEmployes, agregarEmployes, updateEmployes, eliminarEmployes } from '../../api/api';
// const initialState = [
//     {
//         id: "1",
//         name: "ely jose",
//         profesion: "desarrollador",
//         edad: "24"
//     },
//     {
//         id: "2",
//         name: "elymelec jose",
//         profesion: "ingeniero",
//         edad: "24"
//     },
// ]
const initialState = {
    updateState: false,
    loading: false,
    employeeList: [],
    error: "",
    response: "",
};

// consultar todos los empleados
export const fetchEmployee = createAsyncThunk(
    "employes/fetchEmployee",
    async () => {
      const response = await getEmployes();
      return response.data;
    }
);

// insertar empleados en la base de datos
export const insertEmployes = createAsyncThunk(
    "employes/insertEmployes",
    async (data) => {

    const response = await agregarEmployes({ 
        name: data.name, 
        last_name: data.last_name, 
        job: data.job, 
        phone: data.phone, 
        address: data.address, 
        age: data.age, 
        fileimg: data.photo
    });
      return response.data;
    }
);

// metodo para eliminar()
export const removeEmploye = createAsyncThunk(
    "employes/removeEmployee",
    async (data) => {
      const response = await eliminarEmployes(data);
      //return response.data; // esta respuesta trae un mensaje de exito, pero no trae el id
      return data; // retorno el id de una vez para que funcione el filter
    }
);

// editar usuarios
export const modifiedEmployee = createAsyncThunk(
    "employee/modifiedEmployee",
    async (data) => {

      const response = await updateEmployes(data,
        {
            name: data.name, 
            last_name: data.last_name, 
            job: data.job, 
            phone: data.phone, 
            address: data.address, 
            age: data.age,
            fileimg: data.photo,
        }
      );
      return response.data;
    }
  );

export const employesSlice = createSlice({
  name: 'employes',
  initialState,
    reducers: {
        addEmployes:(state,action)=>{
            //console.log(state,action)
            state.push(action.payload)
        },
        deleteEmployes:(state,action)=>{
            const employes = state.find(empleado => empleado.id === action.payload)
            if(employes){
                state.splice(state.indexOf(employes),1)
            }
        },
        updateEmploye:(state,action)=>{
            const {id, name, profesion, edad} = action.payload
            const empleadoEdit = state.find(e => e.id === id)

            if(empleadoEdit){
                empleadoEdit.name = name
                empleadoEdit.profesion = profesion
                empleadoEdit.edad = edad
            }
        },
        // loginUser:(state,action)=>{
        //   console.log(state,action)
        // }
    },
    extraReducers: (builder) => {
        builder
        // .addCase(addEmployee.pending, (state) => {
        //   state.loading = true;
        // })
        .addCase(insertEmployes.fulfilled, (state, action) => {
          state.loading = false;
        //   state.employeeList.push(action.payload.data);
          state.response = "add";
        })
        // .addCase(addEmployee.rejected, (state, action) => {
        //   state.loading = false;
        //   state.error = action.error.message;
        // });

        builder.addCase(removeEmploye.fulfilled, (state, action) => {
            state.employeeList = state.employeeList.filter(
              (item) => item.id != action.payload
            );
            state.response = "delete";
        });

        builder
        .addCase(fetchEmployee.fulfilled, (state, action) => {
            state.employeeList = action.payload;
        })
        // .addCase(fetchEmployee.rejected, (state, action) => {
        //     state.error = action.error.message;
        // });
        builder.addCase(modifiedEmployee.fulfilled, (state, action) => {
            // const updateItem = action.payload;
            // console.log(updateItem);
            // const index = state.employeeList.findIndex(
            //   (item) => item._id === updateItem._id
            // );
            // if (index!==-1) {
            //   state.employeeList[index] = updateItem;
            // }
            state.response = "update";
          });
    }
})

export const {addEmployes,deleteEmployes,updateEmploye} = employesSlice.actions

export default employesSlice.reducer 