// api/payments.ts
import instance from '@/utils/Axios';

const putPayment = async (
  paymentId: number,
  paymentKey: string,
  orderId: string,
  amount: number,
) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await instance.put(`/payment/${paymentId}`, {
      paymentKey,
      orderId,
      amount,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default putPayment;
