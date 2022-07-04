import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';


function Profile(props) {
    const { profile, currentUser } = props;
    const [updateProfileView, setUpdateProfileView] = useState(false)

    const handleChange = (event) => {
        setUpdateProfileView(event.target.checked)
    }

    return (
        <section>
            <Stack spacing={2}>
                {profile.username === currentUser?.username
                    ?
                    <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant='body2'>
                            This is your profile and the route is protected
                        </Typography>
                        <FormGroup>
                            <FormControlLabel
                                label='Edit Profile'
                                control={
                                    <Switch
                                        checked={updateProfileView}
                                        onChange={handleChange}
                                    />
                                }
                            />
                        </FormGroup>
                    </Stack>
                    : <Typography variant='body2'>This is the profile route and it is protected</Typography>
                }
                <Divider />
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Stack spacing={2}>
                        <Stack direction='row' spacing={1} sx={{ alignItems: 'center' }}>
                            <Avatar
                                alt={`${profile?.username}'s Profile Picture`}
                                src={profile?.profile_picture_url}
                                sx={{ width: 100, height: 100, marginRight: '1rem' }}
                            />
                            <Typography variant='h6'>{profile?.username}</Typography>
                        </Stack>
                        {profile.username === currentUser?.username && updateProfileView &&
                            <TextField size='small' label='Update Profile Picture' variant='outlined' />
                        }
                    </Stack>
                </Box>
            </Stack>
        </section>
    )
}

export default Profile