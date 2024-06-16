import { toast } from 'react-toastify';
import Button from '@/components/common/Button';

const ToastExample = () => {
  // 사용할 토스트 옵션을 설정한 뒤, 토스트 메세지를 입력해 사용하면 된다
  // 성공 토스트 메시지
  const successToast = () => toast.success('성공 토스트 메시지');
  // 에러 토스트 메시지
  const errorToast = () => toast.error('에러 토스트 메시지');
  // 경고 토스트 메시지
  const warningToast = () => toast.warning('경고 토스트 메세지');
  // 정보 토스트 메시지
  const infoToast = () => toast.info('정보 토스트 메세지');
  return (
    <>
      {/* 토스트 함수를 onClick 이벤트로 실행 */}
      <Button onClick={successToast}>성공 토스트</Button>
      <Button onClick={errorToast}>에러 토스트</Button>
      <Button onClick={warningToast}>경고 토스트</Button>
      <Button onClick={infoToast}>정보 토스트</Button>
    </>
  );
};

export default ToastExample;
