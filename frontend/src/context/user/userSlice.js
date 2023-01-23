import { ContactsOutlined } from '@mui/icons-material';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IMAGE_URL } from '../../utils/urls';
import { uploadPicture, getUserProfile, updateUserProfile } from './userAPI'
import { bookFlight } from './userAPI';
const initialState = {
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    last_login: "",
    date_joined: "",
    user_id: 0,
    avatar: null,
    role: 0,
    // Phone_No: "",
    // credit: "",
    // bookings: [],
    // flights:[],
    // Address: { street: '', state: '', city: '', postcode: '' },
    // airline_code: "",
    // airline_name: "",
};

export const initiateUserAsync = createAsyncThunk(
    "user/sign out",

    async () => {
        await initUser();
    }
);


export const uploadPictureAsync = createAsyncThunk(
    "user/uploadImage",
    async (file) => {
        const form = new FormData();
        form.append('Photo', file, file.name)
        const response = await uploadPicture(form)
        console.log(response)
        return response.data;
    }
)

export const bookFlightAsync = createAsyncThunk(
    "user/bookFlight",
    async (flight, seats) => {

        const response = await bookFlight(flight)
        console.log(response)
        return response.data;
    }
)

export const getUserAsync = createAsyncThunk(
    "user/get_profile",
    async () => {
        const response = await getUserProfile()

        return response.data;
    }
)

export const updateUserAsync = createAsyncThunk(
    "user/update",
    async (update) => {

        const update_details = {
            Address: update.Address,
            Phone_No: update.Phone_No,
            first_name: update.first_name,
            last_name: update.last_name
        }

        const response = await updateUserProfile(update_details)

        return update_details
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setBaseUser: (state, action) => {
            state.username = action.payload.username
            state.role = action.payload.role
            state.avatar = IMAGE_URL(action.payload.avatar) 
            state.profile_id = action.payload.id
            state.user_id = action.payload.user_id
            console.log('base user', action.payload)

        },
        initUser: (state) => {

            const keys = Object.keys(state);
            keys.forEach((key) => {
                state[key] = initialState[key]
            });
        },
        setAddress: (state, action) => {
            state.address = { ...action.payload.address }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(initiateUserAsync.fulfilled, (state) => {
                state.role = 0
            })
            .addCase(uploadPictureAsync.fulfilled, (state, action) => {
                state.avatar = action.payload.Photo
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                console.log(action.payload)
            })
            .addCase(getUserAsync.fulfilled, (state, action) => {

                const state_keys = Object.keys(state);
                state_keys.forEach((key) => {
                    state[key] = action.payload[key]
                });
                state.role = action.payload.Role;
                state.avatar = IMAGE_URL(action.payload.Photo) ;
                state.user_id = action.payload.User;
                if (action.payload.Role === 3) {
                    state.airline_code = action.payload.Code
                    state.airline_name = action.payload.Name
                }
            })
            .addCase(bookFlightAsync.fulfilled, (state, action) => {
                console.log(action.payload)
            })
    }


})



export const selectUser = (state) => state.user
export const { setBaseUser, initUser } = userSlice.actions;

export default userSlice.reducer