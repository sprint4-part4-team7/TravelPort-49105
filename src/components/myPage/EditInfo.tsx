import { useUserStore } from '@/utils/zustand';
import { useForm } from 'react-hook-form';
import useModal from '@/hooks/useModal';
import uploadIcon from '@/assets/icons/upload.svg';
import { putUserInfo } from '@/apis/editInfo';
import { PHONE_NUMBER_REGEX } from '@/constants/InputType';
import { UserInfo } from '@/constants/types';
import Button from '@/components/common/Button';
import InputBox from '@/components/common/InputBox';
import Modal from '@/components/common/Modal';
import ChangePassword from '@/components/myPage/ChangePassword';

const EditInfo = ({ isPartner = false }: { isPartner?: boolean }) => {
  const { userInfo, setUserInfo } = useUserStore();
  const isUser = !isPartner;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInfo>({
    defaultValues: { ...userInfo },
  });

  const { isModalOpen, openModal, closeModal } = useModal();

  const handleSave = async (data: UserInfo) => {
    const newData = { ...data };
    delete newData.isPartner;
    delete newData.email;
    if (newData.isPartner) delete newData.realName;
    else delete newData.description;
    try {
      await putUserInfo(newData);
      alert('저장되었습니다');
      setUserInfo({ ...userInfo, ...newData });
    } catch (error) {
      console.error(error);
      alert('저장에 실패했습니다');
    }
  };

  return (
    <div className="flex flex-col gap-12 p-24 w-full">
      <form
        className="text-16 flex flex-col gap-24"
        onSubmit={handleSubmit(handleSave)}
      >
        <div className="flex flex-row gap-24 items-center">
          {userInfo?.profileImage?.length ? (
            <img
              src={userInfo.profileImage}
              className="rounded-full w-140 h-140 object-cover"
              alt="profile"
            />
          ) : (
            <div className="w-140 h-140 rounded-full relative bg-black-6">
              <div className="absolute text-64 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {userInfo.name[0]}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-12">
            <label
              htmlFor="profileImg"
              className="flex flex-row gap-8 rounded-30 w-fit border-1 border-blue-6 p-16 text-16 text-blue-6 font-normal"
            >
              <img src={uploadIcon} alt="upload" />
              프로필 사진 업로드
              <input
                id="profileImg"
                hidden
                type="text"
                accept="image/*"
                {...register('profileImage')}
              />
            </label>
            <div>최대 10mb까지 업로드 가능합니다.</div>
          </div>
        </div>
        <div className="flex flex-col gap-32 w-full">
          <InputBox
            id="nickname"
            label={isUser ? '닉네임' : '이름/법인명'}
            placeholder="닉네임을 입력해주세요"
            register={register('name', {
              required: '닉네임은 필수입니다',
              maxLength: {
                value: 20,
                message: '닉네임은 20자 이하로 입력해주세요',
              },
            })}
            disabled={!isUser}
            error={errors.name}
          />
          <InputBox
            id="email"
            label="이메일"
            placeholder={userInfo.email}
            disabled
          />
          {isUser && (
            <InputBox
              id="name"
              label="이름"
              placeholder="이름을 입력해주세요"
              register={register('realName', {
                maxLength: {
                  value: 20,
                  message: '이름은 20자 이하로 입력해주세요',
                },
              })}
              error={errors.realName}
            />
          )}
          <InputBox
            id="phone"
            label="전화번호"
            placeholder="010-****-****"
            register={register('phone', {
              pattern: {
                value: PHONE_NUMBER_REGEX,
                message: '전화번호 형식에 맞게 입력해주세요',
              },
            })}
            error={errors.phone}
          />
          {!isUser && (
            <div className="flex flex-col gap-8">
              <label
                className="flex flex-col gap-8 text-16"
                htmlFor="description"
              >
                소개글
                <textarea
                  id="description"
                  className="p-12 h-72 rounded text-16 resize-none outline-none border-1 border-black-5 focus:border-blue-6"
                  placeholder="간단한 소개를 입력해주세요"
                  {...register('description')}
                />
              </label>
            </div>
          )}
          <div>
            <InputBox
              id="password"
              inputType="password"
              label="비밀번호"
              placeholder="********"
              disabled
            />
            <button
              type="button"
              className="p-12 text-16 text-blue-6 font-normal flex flex-row gap-4"
              onClick={openModal}
            >
              비밀번호 변경하기
            </button>
          </div>
        </div>
      </form>
      <Button onClick={handleSubmit(handleSave)}>저장하기</Button>
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        modal="w-full max-w-536"
      >
        <ChangePassword closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default EditInfo;
