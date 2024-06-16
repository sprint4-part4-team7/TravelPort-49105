import { useNavigate } from 'react-router-dom';

import failIcon from '@/assets/icons/noPay.svg';
import Layout from '@/components/common/layout/Layout';
import './Payments.css';
import Button from '@/components/common/Button';

const FailPage = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="w-full">
        <div className="flex flex-col items-center w-full max-w-xl mx-auto">
          <div className="flex flex-col items-center">
            <img
              className="mobile:w-48"
              src={failIcon}
              alt="결제 실패 아이콘"
            />
            <div className="flex items-center justify-center mt-32 font-bold text-32 w-564 tablet:flex-col mobile:flex-col">
              <div>결제가 정상적으로</div>
              <div>처리되지 않았습니다</div>
            </div>
            <div className="flex gap-28 mt-100 mobile:flex-col">
              <div className="flex items-center w-320 ">
                <Button
                  outlined
                  buttonStyle="w-full h-48 text-16 font-normal "
                  onClick={() => navigate(-2)}
                >
                  다시 결제하기
                </Button>
              </div>
              <div className="flex items-center w-320 ">
                <Button
                  buttonStyle="w-full  h-48 text-16 font-normal"
                  onClick={() => navigate('/')}
                >
                  더 둘러보기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FailPage;
