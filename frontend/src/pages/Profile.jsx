import React from 'react'
import EnrolledCourses from '../components/EnrolledCourses'

const Profile = () => {
  return (
    <div>
      <h1 className='text-center mt-25 uppercase text-3xl pb-10 text-gray-700'>Profile </h1>
      <EnrolledCourses />
    </div>
  );
}

export default Profile