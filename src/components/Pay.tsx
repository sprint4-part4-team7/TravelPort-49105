import React from 'react';

const Pay = ({ requestPayment }: any) => {
  return (
    <div>
      <div className="w-full max-w-600">
        <div id="payment-method" />
        <div id="agreement" />
        <div className="w-full px-6">
          <button
            type="button"
            className="w-full py-10 text-lg font-semibold text-white border-none rounded-lg cursor-pointer btn-primary"
            onClick={requestPayment}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pay;
