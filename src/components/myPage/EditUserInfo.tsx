import { useUserStore } from '@/utils/zustand';
import { initUserInfo } from '@/mocks/InfoMock';
import { useForm } from 'react-hook-form';
import useModal from '@/hooks/useModal';
import Button from '@/components/common/Button';
import InputBox from '../common/InputBox';
import Modal from '../common/Modal';
import ChangePassword from './ChangePassword';

interface UserInfo {
  nickname: string;
  email: string;
  name?: string;
  phone?: string;
}

const EditInfo = () => {
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInfo>({
    defaultValues: initUserInfo,
  });

  const { isModalOpen, openModal, closeModal } = useModal();

  const handleSave = (data: UserInfo) => {
    if (!data.nickname) {
      alert('닉네임을 입력해주세요');
      return;
    }
    setUserInfo(data);
    alert('저장되었습니다');
    console.log(data);
  };

  return (
    <div className="p-16 flex flex-col gap-12 w-767">
      <form
        className="text-16 flex flex-col gap-24"
        onSubmit={handleSubmit(handleSave)}
      >
        <div className="flex flex-row gap-24 items-center">
          <label htmlFor="profile" className="p-40 rounded-9 bg-black-7">
            프로필 사진
            <input type="file" id="profile" hidden />
          </label>
          <div className="flex flex-col gap-12">
            <InputBox
              label="닉네임"
              placeholder="닉네임을 입력해주세요"
              register={register('nickname', {
                required: '닉네임은 필수입니다',
                maxLength: {
                  value: 20,
                  message: '닉네임은 20자 이하로 입력해주세요',
                },
              })}
            />
            <div className="text-system-error text-12">
              {errors.nickname?.message && `${errors.nickname.message}`}
            </div>
            <InputBox label="이메일" register={register('email')} disabled />
          </div>
        </div>
        <div className="flex flex-col gap-12 w-fit">
          <InputBox
            label="이름"
            placeholder="이름을 입력해주세요"
            register={register('name', {
              maxLength: {
                value: 20,
                message: '이름은 20자 이하로 입력해주세요',
              },
            })}
          />
          <div className="text-system-error text-12">
            {errors.name?.message && `${errors.name.message}`}
          </div>
          <InputBox
            label="전화번호"
            placeholder="'-' 없이 입력해주세요"
            register={register('phone', {
              pattern: {
                value: /^[0-9]{10,11}$/,
                message: '전화번호 형식에 맞게 입력해주세요',
              },
            })}
          />
          <div className="text-system-error text-12">
            {errors.phone?.message && `${errors.phone.message}`}
          </div>
          <Button text="비밀번호 변경하기" onClick={openModal} />
        </div>
        <Button text="저장하기" onClick={handleSubmit(handleSave)} />
      </form>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <ChangePassword closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default EditInfo;
