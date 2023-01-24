import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signIn, register } from './authAPI';
// import jwtDecode from 'jwt-decode';


const initialState = {
    email: "",
    password: "",
    username: "",
    // accessToken: "",
    PopupState: false,
    authenticated: false,
    registered: false,
};

export const LoginAsync = createAsyncThunk(
    "user/signIn",
    async (arg, { getState }) => {
        const response = await signIn({
            email: getState().auth.email,
            password: getState().auth.password,
        });

        return response.data;
    }
);


export const registerAsync = createAsyncThunk(
    "auth/register",

    async (arg, { getState }) => {

        const response = await register({
            email: getState().auth.email,
            username: getState().auth.username,
            password: getState().auth.password,
        });

        return response.data;
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        togglePopUp: (state) => {
            state.PopupState = !state.PopupState
        },
        hidePopUp: (state) => {
            state.PopupState = false
        },
        showPopUp: (state) => {
            state.PopupState = true
        },
        logOut: (state) => {
            sessionStorage.setItem("accessToken",null)
            sessionStorage.setItem("refreshToken",null)
            let keys = Object.keys(state);
            keys.forEach((key) => {
                state[key] = initialState[key]
            });

        },
        setCredentials: (state, action) => {
            const { email, userName, password } = action.payload;

            state.email = email;
            state.password = password;
            state.username = userName;

        },

        setAuth: (state, action) => {

            state.accessToken = action.payload;
            state.authenticated = true
            // state.email = jwtDecode(action.payload).email
        },


    },
    extraReducers: (builder) => {
        builder
            .addCase(LoginAsync.rejected, (state, action) => {
                // console.log(action)
            })
            .addCase(LoginAsync.fulfilled, (state, action) => {
                sessionStorage.setItem("accessToken", action.payload.access);
                sessionStorage.setItem("refreshToken", action.payload.refresh);

                state.PopupState = false
                state.authenticated = true
                state.password = ''
                // state.accessToken = action.payload.access
                // fetchUserPermsAsync(action.payload.access)
            })
            .addCase(registerAsync.fulfilled, (state) => {
                state.registered = true
                // fetchUserPermsAsync(action.payload.access)
            })

    }
})


// export const user = (state)=> state.user.user;
export const selectAuth = (state) => state.auth
export const selectPopUpstate = (state) => state.auth.PopupState
export const { logOut, setAuth, togglePopUp, hidePopUp, showPopUp, setCredentials } = authSlice.actions;

export default authSlice.reducer