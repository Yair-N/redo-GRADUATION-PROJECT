import { useState } from 'react';
import { selectUser, updateUserAsync } from '../../context/user/userSlice';
import { useDispatch, useSelector } from 'react-redux/es/exports';


import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField
} from '@mui/material';


const EditCountry = ({ data }, props) => {
    const dispatch = useDispatch()
    const [values, setValues] = useState({
        ...data
    });

    const handleChange = (event) => {

        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };


    const handleSave = () => {

        const updated = {
            ...values,
        }
        // dispatch(updateUserAsync(updated))
    }


    return (
        <form
            autoComplete="off"
            noValidate
            {...props}
        >
            <Card>
                <CardHeader
                    // subheader="You can edit your  details here"
                    title={values.Name}
                />
                <Divider />
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                // fullWidth
                                // helperText="Please specify the first name"
                                label="Airline Id"
                                name="null"
                                onChange={handleChange}
                                // required
                                value={values.id}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                // fullWidth
                                // helperText="Please specify the first name"
                                label="IATA"
                                name="null"
                                onChange={handleChange}
                                // required
                                value={values.Code}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                // fullWidth
                                // helperText="Please specify the first name"
                                label="Airline Name"
                                name="Name"
                                onChange={handleChange}
                                // required
                                value={values.Name}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                // fullWidth
                                // helperText="Please specify the first name"
                                label="Owner Id"
                                name="User_Id"
                                onChange={handleChange}
                                // required
                                value={values.User_Id}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                // fullWidth
                                // helperText="Please specify the first name"
                                label="Base Country"
                                name="Country"
                                onChange={handleChange}
                                // required
                                value={values.Country}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2
                    }}
                >
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleSave}
                    >
                        Save Changes
                    </Button>
                </Box>
            </Card>
        </form>
    );
};
export default EditCountry