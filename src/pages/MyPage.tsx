import { useState } from 'react';
import Button from '@/components/common/Button';
import EditInfo from '@/components/myPage/EditUserInfo';
import EditPartnerInfo from '@/components/myPage/EditPartnerInfo';

const MyPage = () => {
  const [userType, setUserType] = useState('partner');

  const handleUserType = () => {
    if (userType === 'partner') {
      setUserType('user');
    } else {
      setUserType('partner');
    }
  };

  return (
    <div>
      <Button text={userType} onClick={handleUserType} />
      {userType === 'user' ? <EditInfo /> : <EditPartnerInfo />}
    </div>
  );
};

export default MyPage;
