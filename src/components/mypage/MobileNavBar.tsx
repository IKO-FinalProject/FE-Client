import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';





const navMenuArray = [
  {
  title:'주문 내역',
  path:'myorder'
  },
  {
    title:'배송 조회',
    path:'mytracking'
  },
  {
    title:'취소/교환/반품 내역',
    path:'myafter'
  },
  {
    title:'리뷰 관리',
    path:'myreview'
  },
  {
    title:'회원 정보 수정',
    path:'myprofile'
  },
  {
    title:'회원 등급',
    path:'mygrade'
  },
  {
    title:'쿠폰함',
    path:'mycoupon'
  },
  ]


const MobileNavBar = () => {
  const [isOpen,setIsOpen] = useState(false);
  const [selectedOption,setSelectedOption] = useState<string | null>(null);
  
  const selectMenuHandler = () => {
    setIsOpen((prev) => !prev)
  }
  const setOptionHandler = (item:string) => {
    setIsOpen((prev) => !prev)
    setSelectedOption(item)
  }
  return (
    <>
    <div className="w-full pb-1 border-b border-solid border-lenssisDark" onClick={selectMenuHandler}>
      <button className='text-lenssisDark font-bold w-fit flex items-center gap-2'>
        <span>{selectedOption || '메뉴선택'}</span>
        <img width={8} src="/assets/arrowtobottom.png" alt="" />
        </button>
    </div>
    <div className='relative mt-6'>
    {isOpen && (
          <ul className='absolute flex flex-col items-start justify-start text-base text-lenssisGray bg-white z-50 px-2 pb-2 w-[65%] shadow-[0_0_6px] shadow-gray-400'>
          {navMenuArray.map((item) => (
            <li key={item.title} className=" p-1 py-[6px] border-b border-solid border-lenssisGray w-[90%]"><NavLink className={({isActive}) => (isActive ? 'text-[#1B304A] font-bold' : 'text-inherit')} to={item.path} onClick={() => setOptionHandler(item.title)}>{item.title}</NavLink></li>
          ))}
            </ul>
    )}
    </div>
    </>
  );
};

export default MobileNavBar;