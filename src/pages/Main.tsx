import HeaderBar from '@/components/common/headerBar/HeaderBar';
import Layout from '@/components/common/layout/Layout';

const Main = () => {
  return (
    <Layout>
      <HeaderBar userType="user" />
      <h1 className="text-3xl font-bold underline">여긴메인페이지</h1>
    </Layout>
  );
};

export default Main;
