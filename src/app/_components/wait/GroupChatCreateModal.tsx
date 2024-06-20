'use client'

import { useEffect, useState } from "react";
import CustomNumberInput from "../customNum";
import Image from "next/image";
import { getData, postData } from "@/app/api/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/reducers/rootReducer";
import { joinGroup } from "@/state/actions";

type Props = {
  setOpenGroupChatCreateModal: () => void;
}
///전체 수정 필요
const GroupChatCreateModal = ({ setOpenGroupChatCreateModal }: Props) => {
  const [title, setTitle] = useState<string>("")
  const [numOfMembers, setNumoOfMembers] = useState<number>(1);
  const [description, setDescription] = useState<string>("");
  const [groupChatServerId, setGroupChatServerId] = useState<string>("");
  const onGroup = useSelector((state:RootState) => state.onGroup.onGroup)
  const dispatch = useDispatch()

  useEffect(() => {
    const getGroupChatServerUser = async () => {
      try {
        const response = await getData(`/user/${localStorage.getItem('user_id')}`, "groupChat")
        console.log(response);
        setGroupChatServerId(response.id)
      } catch (error) {
        console.log(error);
      }
    }
    getGroupChatServerUser();
  }, []);

  const exitModal = () => {
    setOpenGroupChatCreateModal();
  }

  const handleClick = async () => {
    const groupData = {
      title: title,
      content: description,
      gender: (localStorage.getItem("userGender")),
      status: "모집중",
      members: [groupChatServerId, ],
      profileImages: ["방장프로필url", ]
    }

    console.log(groupData)
    try {
      await postData("/group", groupData, "groupChat");
      setOpenGroupChatCreateModal();
      dispatch(joinGroup())
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className=" w-1/2 h-1/10 border-main-color border-b-2 text-center outline-none  "
          ></input>
          <div className="w-1/2 h-2/10 flex justify-center items-center">
            <input
              type="number"
              id="numofmembers"
              name="numofmembers"
              min={1}
              max={3}
              value={numOfMembers}
              onChange={(e: any) => setNumoOfMembers(Number(e.target.value))}
              className="outline-none w-full h-full text-center"
            >
            </input><span>명</span>
          </div>
          <textarea
            placeholder="Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className=" w-8/10 h-5/10 border-main-color border-2 flex text-center justify-center items-center rounded-xl outline-none"
          ></textarea>
          <button type="button" onClick={handleClick} className="w-5/10 h-1/10 font-jua text-lg text-white shadow-sm bg-gradient-to-r from-main-color to-orange-300 rounded-md hover:ring-4 hover:ring-red-100 active:bg-gradient-to-bl">제출하기</button>
        </div>
      </form>
    </div>
  )
}

export default GroupChatCreateModal
