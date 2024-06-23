import { useUserMypageStore } from '@/utils/Zustand';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import EditInfo from '@/components/myPage/EditInfo';
import MyPageSideBar from '@/components/myPage/MyPageSideBar';
import MyReservation from '@/components/myPage/MyReservation';
import ReservationManagement from '@/pages/ReservationManagement';
import Layout from '@/components/common/layout/Layout';
import PostingManagement from './PostingManagement';

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
        {status === 'reservation-status' && <MyReservation />}
        {status === 'reservation-history' && <MyReservation isExpired="true" />}
        {status === 'posting-manage' && <PostingManagement />}
        {status === 'reserve-manage' && <ReservationManagement />}
      </MyPageSideBar>
    </Layout>
  );
};

export default MyPage;
