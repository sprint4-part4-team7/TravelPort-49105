import { useUserMypageStore } from '@/utils/zustand';
import EditInfo from '@/components/myPage/EditInfo';
// import EditPartnerInfo from '@/components/myPage/EditPartnerInfo';
import MyPageSideBar from '@/components/myPage/MyPageSideBar';
import MyResevation from '@/components/myPage/MyResevation';
import Layout from '@/components/common/layout/Layout';

const MyPage = () => {
  const { userMypage } = useUserMypageStore();

  return (
    <Layout userType="user">
      <MyPageSideBar>
        {userMypage === 'user' && <EditInfo userType="user" />}
        {userMypage === 'partner' && <EditInfo userType="partner" />}
        {/* {userMypage === 'partner' && <EditPartnerInfo />} */}
        {userMypage === 'reservation' && <MyResevation />}
      </MyPageSideBar>
    </Layout>
  );
};

export default MyPage;
