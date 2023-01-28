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
    role: 1,
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
        console.log('signed out')

    }
);

export const getUserAsync = createAsyncThunk(
    "user/get_profile",
    async () => {
        const response = await getUserProfile()
        console.log(response.data)
        return response.data;
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
            let keys = Object.keys(state);
            keys.forEach((key) => {
                state[key] = action.payload[key]
                console.log(state[key])
            });
            state.avatar = IMAGE_URL(action.payload.avatar)

        },
        initUser: (state) => {

            let keys = Object.keys(state);
            keys.forEach((key) => {
                state[key] = initialState[key]
            });
            state = { ...initialState }
        },
        setAddress: (state, action) => {
            state.address = { ...action.payload.address }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(initiateUserAsync.fulfilled, (state) => {
                let keys = Object.keys(state);
                keys.forEach((key) => {
                    state[key] = initialState[key]
                });
            })
            .addCase(uploadPictureAsync.fulfilled, (state, action) => {
                state.avatar = action.payload.Photo
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                console.log(action.payload)
            })
            .addCase(getUserAsync.fulfilled, (state, action) => {

                let state_keys = Object.keys(state);
                state_keys.forEach((key) => {
                    state[key] = action.payload[key]
                });
                state.avatar = IMAGE_URL(action.payload.avatar);
            })
            .addCase(bookFlightAsync.fulfilled, (state, action) => {
                console.log(action.payload)
            })
    }


})



export const selectUser = (state) => state.user
export const { setBaseUser, initUser } = userSlice.actions;

export default userSlice.reducer