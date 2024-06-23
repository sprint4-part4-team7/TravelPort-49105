import React from 'react';
import message from '@/assets/icons/message.svg';
import facebook from '@/assets/icons/febook.svg';
import insta from '@/assets/icons/instagram.svg';

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center w-full px-40 mt-20 text-center py-30 font-plexSans bg-black-2 mobile:flex-col">
      <div className="flex flex-row items-center mobile:flex-col tablet:gap-120 gap-300 mobile:gap-8">
        <div>
          <div className="font-normal text-14 mobile:text-13 mobile:font-medium ">
            ⓒTravelPort - 2024
          </div>
        </div>

        <div className="flex flex-row items-center tablet:gap-120 gap-300 mobile:gap-44">
          <div className="space-x-4 font-medium mobile:text-11 mobile:font-normal text-13 mobile:flex-col tablet:flex-row mobile:space-x-0">
            <a href="/" className="px-4 py-3 text-black-7">
              Privacy Policy
            </a>
            <a href="/" className="px-4 py-3 text-black-7">
              FAQ
            </a>
          </div>

          <div className="flex flex-row items-center gap-20 space-x-4 mobile:space-x-0 mobile:gap-8">
            <a aria-label="Save" href="/">
              <img src={message} alt="메세지 아이콘" />
            </a>
            <a aria-label="Save" href="/">
              <img src={facebook} alt="페이스북 아이콘" />
            </a>
            <a aria-label="Save" href="/">
              <img src={insta} alt="인스타그램 아이콘" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
