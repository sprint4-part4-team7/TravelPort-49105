// api/payments.ts
import instance from '@/utils/axios';

const putPayment = async (
  paymentId: number,
  paymentKey: string,
  orderId: string,
  amount: number,
) => {
  try {
    const response = await instance.put(`/payment/${paymentId}`, {
      paymentKey,
      orderId,
      amount,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default putPayment;
