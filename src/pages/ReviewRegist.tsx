import Layout from '@/components/common/layout/Layout';
import ReviewRegister from '@/pages/ReviewRegister';
import Footer from '@/components/common/Footer';

const ReviewRegist = () => {
  return (
    <>
      <Layout main={false} category noSearch={false}>
        <ReviewRegister />
      </Layout>
      <Footer />
    </>
  );
};

export default ReviewRegist;
