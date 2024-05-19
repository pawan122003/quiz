import React from 'react'
import { useLocation } from "react-router-dom";

const Result = () => {
    const location = useLocation()
    const marks = location.state
    // console.log(location)
    return (
    <>
       This is result and your marks are : {marks!==null?marks:0}
    </>
  )
}

export default Result
