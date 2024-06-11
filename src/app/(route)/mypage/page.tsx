'use client'

import Navigationbar from '@/app/_components/common/Navigationbar'
import { getData } from '@/app/api/api'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { FormData } from '../signup/page';


type Props = {}

const MyPage = (props: Props) => {

  const [profileImage, setProfileImage] = useState<string>("")
  const [userInfo, setUserInfo] = useState<FormData>({

  });

  useEffect(() => {
    const getProfileImage = async () => {
      try {
        const userInfo = await getData(`/users/${localStorage.getItem("user_id")}/profile-images`, "honjaya")
        setProfileImage(userInfo.data[0].imageUrl);
      } catch (e) {
        console.error(e);
      }
    }
    getProfileImage();
  }
  )
  
  const getUserInfo = async () => {
    try {
      const userInfo = await getData(`/users/${localStorage.getItem("user_id")}/profiles`, "honjaya")
      console.log(userInfo);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-between bg-white">
      <Navigationbar />

      <div className='w-8/10 h-full flex justify-around items-center'>
        <div className='w-4/10 h-full flex flex-col justify-around items-center'>
          <div className='w-full h-8/10 border-main-color border-8 rounded-xl'>
            <div className='relative w-full h-full'>
            <Image
              src={profileImage}
              fill={true}
              alt='profileImage'
              className='rounded-md'
            />
            </div>
          </div>
        </div>
        <div className='w-5/10 h-full flex-col flex justify-center items-center'>
          <div className='w-full h-8/10 border-main-color border-4 rounded-xl'>

          </div>

        </div>
      </div>
    </div>
  )
}

export default MyPage;