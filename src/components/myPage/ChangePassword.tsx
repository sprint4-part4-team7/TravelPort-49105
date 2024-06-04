import { useForm } from 'react-hook-form';
import Button from '@/components/common/Button';
import InputBox from '@/components/common/InputBox';

interface Password {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

const ChangePassword = ({ closeModal }: { closeModal: () => void }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Password>();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  const handleSave = (data: any) => {
    console.log(data);
    closeModal();
  };

  return (
    <div className="flex flex-col gap-48">
      <div className="flex flex-col gap-24">
        <div className="text-20 font-bold">비밀번호 변경하기</div>
        <div className="text-16 flex flex-col gap-32">
          <InputBox
            label="기존 비밀번호"
            inputType="password"
            width="flex-row"
            placeholder="현재 비밀번호를 입력해주세요"
            register={register('currentPassword', {
              required: '현재 비밀번호는 필수입니다',
              validate: (value) =>
                value === 'travel49105' || '비밀번호가 일치하지 않습니다',
            })}
            error={errors.currentPassword}
          />
          <InputBox
            label="새 비밀번호"
            inputType="password"
            placeholder="새 비밀번호를 입력해주세요"
            register={register('newPassword', {
              required: '새 비밀번호는 필수입니다',
              pattern: {
                value: passwordRegex,
                message:
                  '비밀번호는 최소 8자 이상이며, 영문 대소문자와 숫자를 포함해야 합니다',
              },
              validate: (value) =>
                value !== 'travel49105' ||
                '기존 비밀번호와 다른 비밀번호를 입력해주세요',
            })}
            error={errors.newPassword}
          />
          <InputBox
            label="새 비밀번호 확인"
            inputType="password"
            placeholder="새 비밀번호를 다시 입력해주세요"
            register={register('newPasswordConfirm', {
              required: '새 비밀번호 확인은 필수입니다',
              validate: (value) =>
                value === getValues('newPassword') ||
                '비밀번호가 일치하지 않습니다',
            })}
            error={errors.newPasswordConfirm}
          />
        </div>
      </div>
      <div className="flex justify-between gap-16">
        <Button text="취소" isCancel onClick={closeModal} />
        <Button text="비밀번호 변경하기" onClick={handleSubmit(handleSave)} />
      </div>
    </div>
  );
};
export default ChangePassword;
