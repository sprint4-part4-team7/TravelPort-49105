import React from 'react';

const Skeleton = () => {
  return (
    <div className="flex mr-10 ml-10 flex-col w-265 h-400 overflow-hidden rounded-xl shadow-[0_0_4px_0_rgba(0,0,0,0.25)] tablet:w-229 tablet:h-350 mobile:w-335 mobile:h-198 mobile:flex-row animate-pulse">
      <div className="flex items-center justify-center bg-gray-300 w-265 h-267 tablet:h-217 mobile:w-158 mobile:h-198">
        <svg
          className="w-8 h-8 stroke-gray-400"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        />
      </div>
      <div className="flex flex-col gap-10 px-16 py-20 bg-white w-265 h-133 tablet:w-229 mobile:w-177 mobile:h-198">
        <div className="py-4 mb-5 font-semibold truncate text-black-12 text-20 h-28 leading-20">
          <div className="w-full h-full bg-gray-300 rounded-full" />
        </div>
        <div className="flex flex-row items-center mb-16 mobile:flex-col mobile:items-start">
          <div className="flex flex-row items-center pr-8 mobile:mb-8">
            <div className="flex flex-row w-full">
              <div className="h-10 bg-gray-300 rounded-full w-80" />
            </div>
            <div className="pl-4 text-black-6 text-11">
              <div className="h-10 bg-gray-300 rounded-full w-50" />
            </div>
          </div>
          <div className="leading-3 text-black-6 text-11 mobile:mt-10">
            <div className="h-10 bg-gray-300 rounded-full w-50" />
          </div>
        </div>
        <div className="flex justify-end font-semibold leading-5 text-12 mobile:mt-45">
          <div className="bg-gray-300 rounded-full w-100 h-15" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
