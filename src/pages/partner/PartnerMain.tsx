import { useNavigate } from 'react-router-dom';
// import PartnerMainButton from '@/components/reservation/PartnerMainButton';
import { useUserStore } from '@/utils/Zustand';
import partner1 from '@/assets/images/partner1.svg';
import partner2 from '@/assets/images/partner2.svg';
import Layout from '@/components/common/layout/Layout';
import PartnerMainBanner from '@/components/main/PartnerMainBanner';

const PartnerMain = () => {
  const navigate = useNavigate();
  const userInfo = useUserStore((state) => state.userInfo);

  const handleProductRegister = () => {
    navigate('/partner/product-register');
  };
  const handlePostingManage = () => {
    navigate('/partner/mypage/posting-manage');
  };

  return (
    <Layout noSearch category={false}>
      <div className="flex flex-col items-center py-16">
        <div className="w-full max-w-1120 flex flex-col relative gap-24 tablet:gap-16 mobile:gap-14">
          <div className="w-full flex gap-12 py-20 font-bold mobile:flex-col mobile:w-full text-28">
            {`${userInfo.name}님, 어서오세요!`}
          </div>
          <PartnerMainBanner
            title="추억은 함께할수록 크니까!"
            img={partner1}
            onClick={handlePostingManage}
          >
            <div>상품을 등록하고</div>
            <div>파트너님의 추억을 공유해주세요</div>
          </PartnerMainBanner>
          <PartnerMainBanner
            title="숙소와 체험 관리를 한 번에!"
            img={partner2}
            onClick={handleProductRegister}
          >
            <div>효율적이고 빠르게 상품을 관리해보세요</div>
          </PartnerMainBanner>
        </div>
      </div>
    </Layout>
  );
};

export default PartnerMain;
