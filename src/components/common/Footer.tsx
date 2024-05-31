import React from 'react';
import message from '@/assets/icons/message.svg';
import facebook from '@/assets/icons/febook.svg';
import insta from '@/assets/icons/instagram.svg';

const Footer = () => {
  return (
    <footer className="w-full bg-[#EBF1FF] h-[6rem] flex items-center">
      <div className="md:gap-[12rem] xl:gap-[30rem] flex items-center px-16 md:px-8 py-8 justify-between max-w-screen-xl mx-auto text-[1.5rem] w-full ">
        <div className="font-medium text-[#7D7986] text-right">
          ©TravelPort - 2024
        </div>

        <div
          className="flex font-normal gap-[1.2rem]"
          style={{
            margin: '0 auto',
          }}
        >
          <a href="/" className="text-[#A4A1AA] p-[1.2rem]">
            Privacy Policy
          </a>
          <a href="/" className="text-[#A4A1AA] p-[1.2rem]">
            FAQ
          </a>
        </div>

        <div className="flex gap-[1.2rem] mt-[-0.8rem] justify-start">
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
