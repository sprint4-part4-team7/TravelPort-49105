import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  function confirm() {
    navigate('/');
  }

  return (
    <div className="wrapper w-100">
      <div className="flex-column align-center confirm-loading w-100 max-w-540">
        <div className="flex-column align-center">
          <h2 className="text-center title">결제 요청까지 성공했어요.</h2>
          <br />
          <h4 className="text-center description">
            <div>상품이름 : 7팀의 개멋찐 여행 상품</div>
            <br />
            <div>금액: 10,000원</div>
          </h4>
          <br />
          <button type="button" className="btn primary w-100" onClick={confirm}>
            결제 승인 버튼 클릭
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
