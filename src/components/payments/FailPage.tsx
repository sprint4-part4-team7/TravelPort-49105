const FailPage = () => {
  return (
    <div className="wrapper w-100">
      <div className="flex-column align-center w-100 max-w-540">
        <h2 className="title">결제를 실패했어요</h2>
        <div className="w-100 button-group">
          <a
            className="btn"
            href="https://developers.tosspayments.com/sandbox"
            target="_blank"
            rel="noreferrer noopener"
          >
            다시 테스트하기
          </a>
          <div className="flex" style={{ gap: '16px' }}>
            <a
              className="btn w-100"
              href="https://docs.tosspayments.com/reference/error-codes"
              target="_blank"
              rel="noreferrer noopener"
            >
              에러코드 문서보기
            </a>
            <a
              className="btn w-100"
              href="https://techchat.tosspayments.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              실시간 문의하기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailPage;
