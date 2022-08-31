import * as React from 'react';
import { uploadPictureAsync } from '../../context/user/userSlice';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { selectUser } from '../../context/user/userSlice';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  Input,
} from '@mui/material';



export const AccountProfile = (props) => {

  const dispatch = useDispatch()
  const [selectedFile, setSelectedFile] = React.useState(null)
  const user = useSelector(selectUser)

  const uploadHandler = (e) => {
    setSelectedFile(e.target.files[0])
  }

  React.useEffect(() => {

    if (selectedFile !== null)
      dispatch(uploadPictureAsync(selectedFile))
  }, [selectedFile])
  const {
    avatar,
    username,
    first_name,
    last_name,
    email,
    airline_name,
  } = user

  return (<Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={avatar}
          sx={{
            height: 64,
            mb: 2,
            width: 64
          }}
        />
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h5"
        >
          {username}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {email}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {`${first_name} ${last_name}`}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {airline_name &&`${airline_name}`}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        component='label'
        color="primary"
        fullWidth
        variant="text"
        type='file'
      >
        {avatar ? 'change photo' : 'Upload picture'}
        <input onChange={uploadHandler} hidden accept="image/*" multiple type="file" />      </Button>
    </CardActions>
  </Card>)
};

AccountProfile.defaultProps = {
  user: {
    avatar: '/static/images/avatars/avatar_6.png',
    city: 'Los Angeles',
    country: 'USA',
    jobTitle: 'Senior Developer',
    name: 'Katarina Smith',
    timezone: 'GTM-7'
  }
}