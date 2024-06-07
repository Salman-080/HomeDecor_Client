import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from '../Pages/Provider/Provider';
import useAxiosPrivate from './useAxiosPrivate';

const useCart = () => {
    const {user}=useContext(AuthContext);
    const axiosPrivate = useAxiosPrivate();
    const { data: cartList=[], refetch } = useQuery({
        queryKey: ['cartList', user?.email],
        queryFn: async () => {

            const res = await axiosPrivate.get(`/cartProducts/${user?.email}`);
            console.log(cartList)
            return res.data;

        }
    });
   
    console.log(cartList);

    return [cartList,refetch];
};

export default useCart;