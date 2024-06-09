import { useUserMypageStore } from '@/utils/zustand';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import EditInfo from '@/components/myPage/EditInfo';
import MyPageSideBar from '@/components/myPage/MyPageSideBar';
import MyResevation from '@/components/myPage/MyResevation';
import Layout from '@/components/common/layout/Layout';

const MyPage = () => {
  const { status } = useParams();
  const { userMypage, setUserMypage } = useUserMypageStore();

  useEffect(() => {
    if (status !== userMypage && !!status) {
      setUserMypage(status);
    }
  }, [status]);

  return (
    <Layout>
      <MyPageSideBar>
        {status === 'user' && <EditInfo userType="user" />}
        {status === 'partner' && <EditInfo userType="partner" />}
        {status === 'reservation' && <MyResevation />}
      </MyPageSideBar>
    </Layout>
  );
};

export default MyPage;
