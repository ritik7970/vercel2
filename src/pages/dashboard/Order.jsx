import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';


const Order = () => {
  const { user } = useAuth();
    // console.log(user.email)
    const token = localStorage.getItem('access-token')

    const { refetch, data: orders = [] } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://vercel1-dun-nine.vercel.app/payments?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            return res.json();
        },
    })
    //newDate(createdAt)
    const formatDate=(createdAt)=>{
      const createdAtDate=new Date(createdAt)
      return createdAtDate.toLocaleDateString()
    }
  return (
    <div  className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className=" bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-28 flex flex-col items-center justify-center">
          {/* content */}
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Track all your <span className="text-green"> Orders</span>
            </h2>
          </div>
        </div>
      </div>

      {/* table */}
      <div>
      {
        (orders.length > 0) ? <div>
        <div className="">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-green text-white rounded-sm">
                <tr>
                  <th>#</th>
                  <th>Order Date</th>
                  <th>transitionId</th>
                  <th>price</th>
                  <th>status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="font-medium">{item.transitionId}</td>
                    <td>
                     ${item.price}
                    </td>
                    <td>
                      {item.status}
                    </td>
                    <td>
                      <button className="btn btn-sm border-none text-red bg-transparent">
                       Contact
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* foot */}
            </table>
          </div>
        </div>
        <hr />
     
      </div> : <div className="text-center mt-20">
        <p>Cart is empty. Please add products.</p>
        <Link to="/menu"><button className="btn bg-green text-white mt-3">Back to Menu</button></Link>
      </div>
      }
      </div>
    </div>
  )
}

export default Order