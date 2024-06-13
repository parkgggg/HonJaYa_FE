import React, { useEffect, useState } from 'react'
import { partnerInfo } from './Containers'
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  object: partnerInfo;
}

const Partner = ({ object }: any) => {
  const [partnerProfile, setPartnerProfile] = useState<string>("")
  const [roomId, setRoomId] = useState<string>("")
  useEffect(() => {
    if (object.participants[0].id.toString() === localStorage.getItem("user_id")) {
      setPartnerProfile(() => object.participants[1].profileImageUrl);
    } else {
      setPartnerProfile(() => object.participants[0].profileImageUrl);
    }
  }, [object])

  return (
    <div className="w-1/5 h-2/5 mx-5 py-1 box-border ">
      <Link className="w-full h-full" href={`/chat/${object.id}`}>
        <div className="relative w-full h-full ">
          <Image
            className='shadow-lg rounded-md border-main-color border-4'
            src={partnerProfile}
            layout="fill"
            objectFit="cover"
            alt='partner_profile'
          />
        </div>
      </Link>
    </div>
  )
}

export default Partner;
