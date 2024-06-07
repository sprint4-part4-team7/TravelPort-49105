import { useUserMypageStore } from '@/utils/zustand';
import EditInfo from '@/components/myPage/EditInfo';
import MyPageSideBar from '@/components/myPage/MyPageSideBar';
import MyResevation from '@/components/myPage/MyResevation';
import Layout from '@/components/common/layout/Layout';

const MyPage = () => {
  const { userMypage } = useUserMypageStore();

  return (
    <Layout>
      <MyPageSideBar>
        {userMypage === 'user' && <EditInfo userType="user" />}
        {userMypage === 'partner' && <EditInfo userType="partner" />}
        {userMypage === 'reservation' && <MyResevation />}
      </MyPageSideBar>
    </Layout>
  );
};

export default MyPage;
