import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';

const useCart = () => {
    const { user } = useContext(AuthContext);
    // console.log(user.email)
    const token = localStorage.getItem('access-token')

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://vercel1-dun-nine.vercel.app/carts?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            return res.json();
        },
    })

    return [cart, refetch]

}
export default useCart;