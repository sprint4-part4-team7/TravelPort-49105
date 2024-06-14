import { useParams } from 'react-router-dom';
import Layout from '@/components/common/layout/Layout';
import ReviewRegister from '@/pages/ReviewRegister';
import Footer from '@/components/common/Footer';

const ReviewRegist = () => {
  const { optionId } = useParams();
  const oIdNum = Number(optionId);
  return (
    <>
      <Layout main={false} category noSearch={false}>
        <ReviewRegister optionId={oIdNum} />
      </Layout>
      <Footer />
    </>
  );
};

export default ReviewRegist;
