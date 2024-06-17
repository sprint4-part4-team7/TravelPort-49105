import { useForm } from 'react-hook-form';
import { putPassword } from '@/apis/editInfo';
import { PASSWORD_REGEX } from '@/constants/InputType';
import Button from '@/components/common/Button';
import InputBox from '@/components/common/InputBox';

interface Password {
  prevPassword: string;
  newPassword: string;
  newPasswordConfirm?: string;
}

const ChangePassword = ({ closeModal }: { closeModal: () => void }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Password>();

  const handleSave = async (data: Password) => {
    const { prevPassword, newPassword } = data;
    try {
      const response = await putPassword({
        prevPassword,
        newPassword,
      });
      if (response.status === 200) {
        // alert(response.data.message);
        closeModal();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      // alert('비밀번호 변경에 실패했습니다');
      // console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-48">
      <div className="flex flex-col gap-24">
        <div className="text-20 font-bold">비밀번호 변경하기</div>
        <div className="text-16 flex flex-col gap-32 w-full max-w-475">
          <InputBox
            id="oldPW"
            label="기존 비밀번호"
            inputType="password"
            direction="row"
            placeholder="********"
            register={register('prevPassword', {
              required: '기존 비밀번호를 입력해주세요',
            })}
            error={errors.prevPassword}
          />
          <InputBox
            id="newPW"
            label="새 비밀번호"
            inputType="password"
            direction="row"
            placeholder="********"
            register={register('newPassword', {
              required: '새 비밀번호를 입력해주세요',
              pattern: {
                value: PASSWORD_REGEX,
                message:
                  '비밀번호는 최소 8자 이상이며, 영문 또는 숫자로 이루어져야 합니다',
              },
              validate: (value) =>
                value !== getValues('prevPassword') ||
                '기존 비밀번호와 같은 비밀번호를 입력했습니다',
            })}
            error={errors.newPassword}
          />
          <InputBox
            id="newPWCheck"
            label="새 비밀번호 확인"
            inputType="password"
            direction="row"
            placeholder="********"
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
        <Button isCancel onClick={closeModal}>
          취소
        </Button>
        <Button onClick={handleSubmit(handleSave)}>비밀번호 변경하기</Button>
      </div>
    </div>
  );
};
export default ChangePassword;
