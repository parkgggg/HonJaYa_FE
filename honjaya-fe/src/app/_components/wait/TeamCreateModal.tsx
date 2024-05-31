'user client'

import { useState } from "react";
import CustomNumberInput from "../customNum";

type Props = {
  setOpenTeamCreateModal: () => void;
}

const TeamCreateModal = ({ setOpenTeamCreateModal }: Props) => {
  const [title, setTitle] = useState<string>("")
  const [numOfMembers, setNumoOfMembers] = useState<number>(1);
  const [description, setDescription] = useState<string>("");

  const exitModal = () => {
    
  }

  return (
    <div className="z-20 w-screen h-screen flex justify-center items-center fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm">
      <form className='z-30 absolute bg-white w-4/10 h-7/10 border-main-color border-4 rounded-lg flex-col flex justify-center items-center'>
        <div>
          <button
            type="button"
            className="w-1/10 h-1/10 bg-gray"
            onClick={exitModal}>나가기</button>
        </div>

        <input
          type="text"
          placeholder="Title"
          required
          value={String(title)}
          onChange={(e) => setTitle(e.target.value)} //일단 이렇게 해놓고 매 타이핑마다 리렌더링 안 되도록하는 방법 적용 필요
          className=" w-1/2 h-1/10 border-main-color border-b-2 text-center outline-none  "
        ></input>
        <div className="w-1/2 h-1/10">
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
          </input>
          {/* <CustomNumberInput
            id="numofmembers"
            name="numofmembers"
            initialValue={1}
            unit="명"
            value={numOfMembers}
            onChange={(e: any) => setNumoOfMembers(Number(e.target.value))}
            max={3}
            min={1}
          /> */}
        </div>
        <input
          type="text"
          placeholder="Description"
          required
          value={String(description)}
          onChange={(e) => setDescription(e.target.value)} //일단 이렇게 해놓고 매 타이핑마다 리렌더링 안 되도록하는 방법 적용 필요
          className=" w-8/10 h-5/10 border-main-color border-2 text-center rounded-xl text-wrap text outline-none"
        ></input>
        <button className="w-5/10 h-1/10 bg-main-color rounded-lg">제출하기</button>
      </form>
    </div>
  )
}

export default TeamCreateModal