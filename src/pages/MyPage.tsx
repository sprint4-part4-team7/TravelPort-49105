import { useUserMypageStore } from '@/utils/zustand';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import EditInfo from '@/components/myPage/EditInfo';
import MyPageSideBar from '@/components/myPage/MyPageSideBar';
import MyResevation from '@/components/myPage/MyResevation';
import Layout from '@/components/common/layout/Layout';
import ReservationManagement from './ReservationManagement';

const MyPage = ({ isPartner = false }: { isPartner?: boolean }) => {
  const { status } = useParams();
  const { userMypage, setUserMypage } = useUserMypageStore();

  useEffect(() => {
    if (status !== userMypage && !!status) {
      setUserMypage(status);
    }
  }, [status]);

  return (
    <Layout>
      <MyPageSideBar isPartner={isPartner}>
        {status === 'edit-info' && <EditInfo isPartner={isPartner} />}
        {status === 'reservation' && <MyResevation />}
        {isPartner && status === 'manage' && <ReservationManagement />}
      </MyPageSideBar>
    </Layout>
  );
};

export default MyPage;
