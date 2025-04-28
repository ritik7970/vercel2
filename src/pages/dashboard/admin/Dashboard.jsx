import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Ensure you have some basic CSS for styling

const Dashboard = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);
  const token = localStorage.getItem('access-token');
  const fetchPayments = async () => {
    try {
      const response = await axios.get('https://vercel-3-g71l-rajs-projects-7c9d263b.vercel.app/payments/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      const response = await axios.put(`https://vercel-3-g71l-rajs-projects-7c9d263b.vercel.app/payments/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedPayment = response.data;
      setPayments(payments.map(payment => (payment._id === id ? updatedPayment : payment)));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="Dashboard">
      <h1>Manage Bookings</h1>
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Email</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Items</th>
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
                <ul>
                  {payment.itemName.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </td>
              <td>
                <select
                  value={payment.status}
                  onChange={(e) => updateOrderStatus(payment._id, e.target.value)}
                >
                  <option value="order pending">order Pending</option>
                  <option value="order confirmed">Confirmed</option>
                  <option value="order cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
