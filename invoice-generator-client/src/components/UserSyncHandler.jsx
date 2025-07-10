import React, { useContext, useEffect } from 'react'
import {useAuth, useUser} from '@clerk/clerk-react';
import { AppContext } from './../context/Appcontext';
import axios from 'axios';
import { useState } from 'react';

function UserSyncHandler() {
    const [Synced, setSynced] = useState(false)
    const {isLoaded ,isSignedIn, getToken}= useAuth()
    const {user} = useUser()
    const {BaseURL} = useContext(AppContext)
    useEffect(() => {
        const saveUser = async () => {
            if (!isSignedIn || !isLoaded || Synced) {
             return
            }
                try {
                    const token = await getToken();
                    const userData = {
                            clerkId: user.id,
                            email: user.primaryEmailAddress.emailAddress,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            image: user.imageUrl
                        }
                        await axios.post(BaseURL+"/users",userData,{
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }) 
                  setSynced(true) 
                 }catch (error) {
                    console.error('Error syncing user:', error);
                }
            
        };
        saveUser();
        
    }, [isSignedIn, isLoaded, Synced, user, getToken, BaseURL])


  return (null)
}

export default UserSyncHandler