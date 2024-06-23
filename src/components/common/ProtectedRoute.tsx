import { useUserStore } from '@/utils/Zustand';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface ProtectedRouteProps {
  children: any;
  partner?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  partner = false,
}) => {
  const { userInfo } = useUserStore();

  if (userInfo.id === 0) {
    toast.error('로그인이 필요한 서비스입니다.');
    return <Navigate to="/" />;
  }
  if (partner !== !!userInfo.isPartner) {
    if (userInfo.isPartner) toast.error('사용자 전용 서비스입니다.');
    else toast.error('파트너 전용 서비스입니다.');
    return <Navigate to="/" />;
  }

  return children;
};
export default ProtectedRoute;
