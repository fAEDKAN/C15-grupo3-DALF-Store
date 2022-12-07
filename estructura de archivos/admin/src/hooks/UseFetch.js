import React from 'react'

const GetFetch = async (endpoint, method ="get", data) => {
    const apiUrlBase="http://localhost:4000/api"
    const url= `${apiUrlBase}${endpoint}`

    let response= await fetch(url,{method})
    let result =await response.json()

  return result
}

export {
    GetFetch
}