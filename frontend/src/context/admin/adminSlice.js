import { optionGroupUnstyledClasses } from '@mui/base';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from './adminApi';


export const initialUser = {
    id: 'id',
    username: 'username',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'email',
    role: 'role',
    lastLogin: 'last logged in',
    active: 'active',
}

const initialAirline = {
    id: 0,
    userID: 'employee id',
    companyName: 'company name',
    iata: 'code',
    country: 'country',
    active: false,
}

const initialAirport = {
    id: 0,
    name: 'airport name',
    iata: 'code',
    city: 'city',
    country: 'country',
    active: false,
}

const initialCountry = {
    name: 'name',
    iata: 'code',
    flag: '',
}

const initialRole = {
    id: 100,
    name: 'name of role'
}

const initialState = {
    userRoles: [],
    userList: [],
    airlineList: [],

    role: initialRole,
    user: initialUser,
    airline: initialAirline,
    airport: initialAirport,
    country: initialCountry
}




export const fetchUsersAsync = createAsyncThunk(
    `users/all`,
    async () => {
      
        const response = await getUsers()
        return response.data
    }
)

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },


    },
    extraReducers: (builder) => {
        builder

            .addCase(fetchUsersAsync.fulfilled, (state, action) => {
                state.userList = action.payload
            })

    }
})

export const { } = adminSlice.actions;
export const selectAdmin = (state) => state.admin;

export default adminSlice.reducer