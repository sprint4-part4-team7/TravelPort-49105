import { useUserMypageStore } from '@/utils/zustand';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import EditInfo from '@/components/myPage/EditInfo';
import MyPageSideBar from '@/components/myPage/MyPageSideBar';
import MyResevation from '@/components/myPage/MyResevation';
import ReservationManagement from '@/pages/ReservationManagement';
import Footer from '@/components/common/Footer';
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
    <>
      <Layout>
        <MyPageSideBar isPartner={isPartner}>
          {status === 'edit-info' && <EditInfo isPartner={isPartner} />}
          {status === 'reservation-status' && <MyResevation />}
          {status === 'reservation-history' && (
            <MyResevation isExpired="true" />
          )}
          {status === 'posting-manage' && <PostingManagement />}
          {status === 'reserve-manage' && <ReservationManagement />}
        </MyPageSideBar>
      </Layout>
      <Footer />
    </>
  );
};

export default MyPage;
