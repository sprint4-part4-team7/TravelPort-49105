import { useUserStore } from '@/utils/zustand';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: any) => {
  const { userInfo } = useUserStore();

  if (userInfo.id === 0) {
    return <Navigate to="/" />;
  }

  return children;
};
export default ProtectedRoute;
