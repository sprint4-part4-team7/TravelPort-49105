import { useParams } from 'react-router-dom';
import Layout from '@/components/common/layout/Layout';
import ReviewRegister from '@/pages/ReviewRegister';
import Footer from '@/components/common/Footer';

const ReviewRegist = () => {
  const { optionId, reviewId } = useParams<{
    optionId: string;
    reviewId?: string;
  }>();

  const oIdNum = Number(optionId);

  return (
    <>
      <Layout>
        <ReviewRegister optionId={oIdNum} reviewId={Number(reviewId)} />
      </Layout>
      <Footer />
    </>
  );
};

export default ReviewRegist;
