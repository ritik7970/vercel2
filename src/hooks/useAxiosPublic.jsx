import axios from 'axios'
import React from 'react'


const axiosPublic =  axios.create({
    baseURL: 'https://vercel1-dun-nine.vercel.app',
  })

const useAxiosPublic = () => {
  return axiosPublic
}

export default useAxiosPublic;

  