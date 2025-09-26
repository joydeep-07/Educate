import React from 'react'

const Error = () => {
  return (
    <div className=" text-center mt-25  text-red-700 font-medium">
      <h1 className="text-3xl p-2 animate-pulse">Something Went Wrong !</h1>
      <p className="text-md text-gray-600 font-medium">
        Check Your Internet connection or Please try again later.
      </p>
    </div>
  );
}

export default Error