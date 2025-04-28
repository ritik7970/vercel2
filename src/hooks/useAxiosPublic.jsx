import axios from 'axios'
import React from 'react'


const axiosPublic =  axios.create({
    baseURL: 'https://vercel-3-g71l-rajs-projects-7c9d263b.vercel.app',
  })

const useAxiosPublic = () => {
  return axiosPublic
}

export default useAxiosPublic;

  