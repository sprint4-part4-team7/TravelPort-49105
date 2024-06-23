import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/icons/lastLogo.svg';
import Category from '@/pages/partner/productRegister/Category';
import Description from '@/pages/partner/productRegister/Description';
import Location from '@/pages/partner/productRegister/Location';
import DateCheck from '@/pages/partner/productRegister/DateCheck';
import Option from '@/pages/partner/productRegister/Option';

const ProductRegister = () => {
  const [page, setPage] = useState<React.ReactNode>();
  const [activeStep, setActiveStep] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setPage(<Category setPage={setPage} setActiveStep={setActiveStep} />);
  }, []);

  const steps = [
    {
      id: 1,
      title: '상품 유형',
      component: <Category setPage={setPage} setActiveStep={setActiveStep} />,
    },
    {
      id: 2,
      title: '제목, 상세설명, 사진',
      component: (
        <Description setPage={setPage} setActiveStep={setActiveStep} />
      ),
    },
    {
      id: 3,
      title: '위치',
      component: <Location setPage={setPage} setActiveStep={setActiveStep} />,
    },
    {
      id: 4,
      title: '날짜',
      component: <DateCheck setPage={setPage} setActiveStep={setActiveStep} />,
    },
    { id: 5, title: '상품 옵션', component: <Option /> },
  ];

  const handleStepClick = (stepId: number, component: React.ReactNode) => {
    setActiveStep(stepId);
    setPage(component);
  };
  const handleHome = () => {
    navigate('/');
  };

  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-284 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <button
          type="button"
          onClick={handleHome}
          className="p-60 border-none bg-none"
        >
          <img src={logo} alt="Main Logo" style={{ cursor: 'pointer' }} />
        </button>
        <div className="h-full px-5 py-10 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium flex flex-col gap-15">
            {steps.map((step) => (
              <li key={step.id}>
                <div
                  className={`flex gap-16 items-center p-2 rounded-lg group cursor-pointer ${
                    activeStep === step.id
                      ? 'text-blue-600 bg-blue-100 dark:text-white dark:bg-blue-800'
                      : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => handleStepClick(step.id, step.component)}
                >
                  <div
                    className={`step-number w-32 h-32 flex items-center justify-center rounded-full ${
                      activeStep === step.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {activeStep > step.id ? '✔' : step.id}
                  </div>
                  <span className="text-16 ms-3">{step.title}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <main>
        <div className="p-4 sm:ml-284">{page}</div>
      </main>
    </>
  );
};

export default ProductRegister;
