import PartnerMainButton from '@/components/PartnerMainButton';
import Layout from '@/components/common/layout/Layout';

const PartnerMain = () => {
  return (
    <Layout noSearch category={false}>
      <div className="flex flex-col py-16 items-center">
        <div className="flex mobile:flex-col gap-12 mobile:w-full py-20 text-28 font-bold">
          <span className="mobile:text-24">판매자님,</span>
          <span className="mobile:text-22">무엇을 도와드릴까요?</span>
        </div>
        <div className="flex mobile:flex-col mobile:w-full py-20 gap-20">
          <PartnerMainButton text="내 게시물 목록 보기" />
          <PartnerMainButton text="예약 관리" />
          <PartnerMainButton text="내 사업자 등록증" />
          <PartnerMainButton text="판매자 정보 수정" />
        </div>
      </div>
    </Layout>
  );
};

export default PartnerMain;
