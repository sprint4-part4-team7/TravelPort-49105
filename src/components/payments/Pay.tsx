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
            className="w-full h-40 font-semibold text-white border-none cursor-pointer rounded-12 text-15 btn-primary"
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
