import Layout from '@/components/common/layout/Layout';
import ReviewRegister from './ReviewRegister';
import Footer from '@/components/common/Footer';

const ReviewRegist = () => {
  return (
    <>
      <Layout userType="user" main={false} category noSearch={false}>
        <ReviewRegister />
      </Layout>
      <Footer />
    </>
  );
};

export default ReviewRegist;
