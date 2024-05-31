import React from 'react';
import message from '@/assets/icons/message.svg';
import facebook from '@/assets/icons/febook.svg';
import insta from '@/assets/icons/instagram.svg';

const Footer = () => {
  return (
    <footer className="mobile:flex-col mobile:gap-[0.8rem] tablet:gap-[12rem] gap-[30rem] mt-[2rem] bg-[#EBF1FF] flex flex-row items-center justify-center py-[2rem] px-[4rem] space-y-4 text-center">
      <div>
        <div>©TravelPort - 2024</div>
      </div>

      <div className="flex tablet:gap-[12rem] gap-[30rem] mobile:gap-[4.4rem]">
        <div className="flex space-x-4">
          <a href="/" className="text-[#A4A1AA] px-4 py-3">
            Privacy Policy
          </a>
          <a href="/" className="text-[#A4A1AA] px-4 py-3">
            FAQ
          </a>
        </div>

        <div className="flex space-x-4 gap-[2rem] mobile:gap-[0.8rem]">
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
    </footer>
  );
};

export default Footer;
