import React from 'react';
import message from '@/assets/icons/message.svg';
import facebook from '@/assets/icons/febook.svg';
import insta from '@/assets/icons/instagram.svg';

const Footer = () => {
  return (
    <footer className="w-full bg-[#F2F2F3] h-[6rem]">
      <div className="flex items-center justify-between max-w-screen-xl px-[23.8rem] mx-auto pt-[3.75rem] text-[1.5rem]">
        <div className="font-medium text-[#7D7986]">TravelPort - 2024</div>

        <div className="flex gap-8 font-normal">
          <a href="/" className="text-[#A4A1AA]">
            Privacy Policy
          </a>
          <a href="/" className="text-[#A4A1AA]">
            FAQ
          </a>
        </div>

        <div className="flex gap-[1.2rem]">
          <a aria-label="Save" href="/">
            <img src={message} alt="메세지 아이콘" />
          </a>
          <a aria-label="Save" href="/">
            <img src={facebook} alt="페이스북 아이콘" />
          </a>
          <a className="mt-[-0.2rem]" aria-label="Save" href="/">
            <img src={insta} alt="인스타그램 아이콘" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
