import { usePartnerStore } from '@/utils/zustand';
import { initPartnerInfo } from '@/mocks/InfoMock';
import { useForm } from 'react-hook-form';
import useModal from '@/hooks/useModal';
import Button from '@/components/common/Button';
import InputBox from '../common/InputBox';
import Modal from '../common/Modal';
import ChangePassword from './ChangePassword';

interface PartnerInfo {
  nickname: string;
  email: string;
  name?: string;
  phone?: string;
  introduction?: string;
}

const EditPartnerInfo = () => {
  const setPartnerInfo = usePartnerStore((state) => state.setPartnerInfo);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PartnerInfo>({
    defaultValues: initPartnerInfo,
  });

  const { isModalOpen, openModal, closeModal } = useModal();

  const handleSave = (data: PartnerInfo) => {
    setPartnerInfo(data);
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
              label="이름/법인명"
              register={register('nickname')}
              disabled
            />
            <div className="text-system-error text-12">
              {errors.nickname?.message && `${errors.nickname.message}`}
            </div>
            <InputBox label="이메일" register={register('email')} disabled />
          </div>
        </div>
        <div className="flex flex-col gap-12 w-fit">
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
          <InputBox
            label="소개"
            placeholder="소개를 입력해주세요"
            register={register('introduction')}
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

export default EditPartnerInfo;
