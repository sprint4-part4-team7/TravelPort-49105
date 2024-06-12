const CancelMessage = ({ cancelMsg }: { cancelMsg: string }) => {
  return (
    <div>
      <div>거절 사유</div>
      <h1>{cancelMsg}</h1>
    </div>
  );
};

export default CancelMessage;
