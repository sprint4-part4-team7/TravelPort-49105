import React from 'react';
import message from '@/assets/icons/message.svg';
import facebook from '@/assets/icons/febook.svg';
import insta from '@/assets/icons/instagram.svg';

const Footer = () => {
  return (
    <footer className="font-plexSans w-full mt-[2rem] bg-[#EBF1FF] flex flex-col mobile:flex-col justify-center items-center py-[2rem] px-[4rem] text-center">
      <div className="flex mobile:flex-col flex-row tablet:gap-[12rem] gap-[30rem] mobile:gap-[0.8rem] items-center">
        <div>
          <div className="text-[1.4rem] font-semibold	mobile:text-[1.3rem] mobile:font-medium	">
            ⓒTravelPort - 2024
          </div>
        </div>

        <div className="flex flex-row tablet:gap-[12rem] gap-[30rem] mobile:gap-[4.4rem] items-center">
          <div className="mobile:text-[1.1rem] mobile:font-normal	 font-medium text-[1.3rem] space-x-4 mobile:flex-col tablet:flex-row mobile:space-x-0">
            <a href="/" className="text-[#A4A1AA] px-4 py-3">
              Privacy Policy
            </a>
            <a href="/" className="text-[#A4A1AA] px-4 py-3">
              FAQ
            </a>
          </div>

          <div className="flex flex-row space-x-4 mobile:space-x-0 gap-[2rem] mobile:gap-[0.8rem] items-center">
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
