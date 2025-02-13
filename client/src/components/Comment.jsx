import React from 'react'
import { useSelector}from 'react-redux'
import {Link}from 'react-router-dom'
export default function Comment(postId) {
    const {user}=useSelector(state=>state.user)
  return (
    <div className='w-full mx-auto p-3 max-w-2xl'>
        {user?
        (
            <div className='flex items-center space-x-2 text-gray-600 text-sm my-5'>
                <p >Signed as</p>
                <img src={user.profilephoto} arc={user.name} className='h-10 w-10 object-cover rounded-full'/>
                <Link to={'/Profile?tag==profile'}>
                @{user.name}
                </Link>
            </div>

        ):
        (
            <div>
                <p>You must be signed to comment</p>
            </div>
        )}
    </div>
  )
}
