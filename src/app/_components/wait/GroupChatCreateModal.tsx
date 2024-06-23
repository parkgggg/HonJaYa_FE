'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { getData, postData } from "@/app/api/api";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

type Props = {
  setOpenGroupChatCreateModal: () => void;
}
///전체 수정 필요
const GroupChatCreateModal = ({ setOpenGroupChatCreateModal }: Props) => {
  const [groupName, setGroupName] = useState<string>("")
  const [description, setDescription] = useState<string>("");
  const [createSuccess, setCreateSuccess] = useState<boolean>(false);

  const [groupChatServerUser, setGroupChatServerUser] = useState<{}>()

  const [groupInfo, setGroupInfo] = useState<{}>()
  const dispatch = useDispatch()
  const router = useRouter();

  useEffect(() => {
    const getGroupChatServerUser = async () => {
      try {
        const response = await getData(`/user/${localStorage.getItem('user_id')}`, "groupChat")
        console.log(response);
        setGroupChatServerUser(response)
      } catch (error) {
        console.log(error);
      }
    }
    const getGroup = async () => {
      try {
        const response = await getData(`/group/user/${localStorage.getItem('mongoId')}`, "groupChat")
        console.log(response);
        setGroupInfo(response)
      } catch (error) {
        console.log(error);
      }
    }

    getGroupChatServerUser();
    getGroup();
  }, []);

  useEffect(() => {
    if(createSuccess) {
        const getGroup = async () => {
            try {
                const response = await getData(`/group/user/${localStorage.getItem('mongoId')}`, "groupChat")
                console.log(response);
                if(response.roomId) router.push(`chat/${response.roomId}`)
            } catch (error) {
                console.log(error);
            }
        }
        getGroup();
    }
}, [createSuccess])

  const exitModal = () => {
    setOpenGroupChatCreateModal();
  }

  const handleClick = async () => {
    const chatRoomAndUser = {
      chatRoom: {
          chatName: groupName,
          gender: localStorage.getItem('userGender') === "남성"? "MALE" : "FEMALE",
      },
      user: groupChatServerUser,
      group: groupInfo,
  };

    console.log(chatRoomAndUser)
    try {
      await postData("/chat_room", chatRoomAndUser, "groupChat");
      setCreateSuccess(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="z-20 w-screen h-screen flex justify-center items-center fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm">
      <form className='z-30 absolute bg-white w-4/10 h-7/10 border-main-color border-4 rounded-lg flex-col justify-around'>
        <div className="w-full h-1/10 flex justify-end box-border p-1">
          <button
            type="button"
            className="w-1/10 h-1/10 bg-gray"
            onClick={exitModal}>
            <Image src={'https://www.svgrepo.com/show/499053/cancel.svg'}
              width={35}
              height={35}
              alt="cancel"
            />
          </button>
        </div>
        <div className="w-full h-9/10 flex-col flex items-center justify-around">
          <input
            type="text"
            placeholder="Title"
            required
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className=" w-1/2 h-1/10 border-main-color border-b-2 text-center outline-none  "
          ></input>
          <textarea
            placeholder="Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className=" w-8/10 h-5/10 border-main-color border-2 flex text-center justify-center items-center rounded-xl outline-none"
          ></textarea>
          <button type="button" onClick={handleClick} className="w-5/10 h-1/10 font-jua text-lg text-white shadow-sm bg-gradient-to-r from-main-color to-orange-300 rounded-md hover:ring-4 hover:ring-red-100 active:bg-gradient-to-bl">
            생성하기
          </button>
        </div>
      </form>
    </div>
  )
}

export default GroupChatCreateModal
