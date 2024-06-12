'use client'

import ShopNavbar from '@/app/_components/shop/ShopNavbar';
import ZemShop from '@/app/_components/shop/ZemShop';
import { useDispatch, useSelector } from "react-redux";
import { approve, deny } from "@/state/actions";
import { RootState } from "@/state/reducers/rootReducer";
import { verifyUser } from "@/app/utils/verifyUser";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ShopPage = () => {
  const dispatch = useDispatch();
  const isLogined = useSelector((state: RootState) => state.loginCheck.isLogined)
  const router = useRouter();


  useEffect(() => {
    if (!isLogined) {
      if (verifyUser()) {
        dispatch(approve());
      } else {
        router.push("/")
      }
    }
  });

  return (
    <>
      <ShopNavbar />
      <ZemShop />
    </>
  );
};

export default ShopPage;
