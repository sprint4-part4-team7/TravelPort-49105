import { useUserMypageStore } from '@/utils/zustand';
import EditInfo from '@/components/myPage/EditUserInfo';
import EditPartnerInfo from '@/components/myPage/EditPartnerInfo';
import MyPageSideBar from '@/components/myPage/MyPageSideBar';

const MyPage = () => {
  const { userMypage } = useUserMypageStore();

  return (
    <div>
      <MyPageSideBar>
        {userMypage === 'user' && <EditInfo />}
        {userMypage === 'partner' && <EditPartnerInfo />}
      </MyPageSideBar>
    </div>
  );
};

export default MyPage;
