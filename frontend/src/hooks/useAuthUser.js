import React from 'react'
import { getAuthUser } from '../lib/api';
import { useQuery } from '@tanstack/react-query';
const useAuthUser = () => {
    const authUser = useQuery({
        queryKey: ["authUser"],

        queryFn: getAuthUser,
        retry: false,
    });

  return { isLoading: authUser.isLoading, authUser: authUser.data?.user };   
  // from "/auth/me" i am sending user data as user 
  // I am importing isloading and authUser from this file 
}

export default useAuthUser

