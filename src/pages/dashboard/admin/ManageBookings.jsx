import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageBookings = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      //const token = localStorage.getItem('token'); // Assume token is stored in localStorage
      const response = await axios.get('https://vercel1-dun-nine.vercel.app/payments/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments(response.data);
      console.log(setPayments)
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const updateOrderStatus = async (id, Status) => {
    try {
      //const token = localStorage.getItem('token');
      const response = await axios.put(`https://vercel1-dun-nine.vercel.app/payments/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedPayment = response.data;
      setPayments(payments.map(payment => (payment._id === id ? updatedPayment : payment)));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="ManageBookings">
      <h1>Manage Bookings</h1>
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Email</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment._id}>
              <td>{payment.transitionId}</td>
              <td>{payment.email}</td>
              <td>{payment.price}</td>
              <td>{payment.quantity}</td>
              <td>{payment.status}</td>
              <td>
                <select
                  value={payment.status}
                  onChange={(e) => updateOrderStatus(payment._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBookings;
