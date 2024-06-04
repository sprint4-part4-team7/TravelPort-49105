import { useForm } from 'react-hook-form';
import Button from '../common/Button';
import InputBox from '../common/InputBox';

const ChangePassword = ({ closeModal }: { closeModal: () => void }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const handleSave = (data: any) => {
    console.log(data);
    closeModal();
  };

  return (
    <div className="flex flex-col gap-12">
      <InputBox
        label="현재 비밀번호"
        inputType="password"
        placeholder="현재 비밀번호를 입력해주세요"
        width="100%"
        register={register('currentPassword', {
          required: '현재 비밀번호는 필수입니다',
          validate: (value) =>
            value === 'travel49105' || '비밀번호가 일치하지 않습니다',
        })}
      />
      <div className="text-red-600 text-12">
        {errors.currentPassword?.message && `${errors.currentPassword.message}`}
      </div>
      <InputBox
        label="새 비밀번호"
        inputType="password"
        placeholder="새 비밀번호를 입력해주세요"
        width="100%"
        register={register('newPassword', {
          required: '새 비밀번호는 필수입니다',
          minLength: {
            value: 8,
            message: '비밀번호는 8자 이상으로 입력해주세요',
          },
        })}
      />
      <div className="text-red-600 text-12">
        {errors.newPassword?.message && `${errors.newPassword.message}`}
      </div>
      <InputBox
        label="새 비밀번호 확인"
        inputType="password"
        placeholder="새 비밀번호를 다시 입력해주세요"
        width="100%"
        register={register('newPasswordConfirm', {
          required: '새 비밀번호 확인은 필수입니다',
          validate: (value) =>
            value === getValues('newPassword') ||
            '비밀번호가 일치하지 않습니다',
        })}
      />
      <div className="text-red-600 text-12">
        {errors.newPasswordConfirm?.message &&
          `${errors.newPasswordConfirm.message}`}
      </div>
      <Button text="비밀번호 변경하기" onClick={handleSubmit(handleSave)} />
    </div>
  );
};
export default ChangePassword;
