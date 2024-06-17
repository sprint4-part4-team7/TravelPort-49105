/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useUserStore } from '@/utils/zustand';
import { useForm } from 'react-hook-form';
import useModal from '@/hooks/useModal';
import uploadIcon from '@/assets/icons/upload.svg';
import { putUserInfo } from '@/apis/editInfo';
import { PHONE_NUMBER_REGEX } from '@/constants/InputType';
import { UserInfo } from '@/constants/types';
import { ChangeEventHandler, useState } from 'react';
import postImages from '@/apis/image';
import BUCKER_NAME from '@/constants/bucket';
import { ReactComponent as Delete } from '@/assets/icons/x-circle-custom.svg';
import useProfileImage from '@/utils/randomProfile';
import { toast } from 'react-toastify';
import Button from '@/components/common/Button';
import InputBox from '@/components/common/InputBox';
import Modal from '@/components/common/Modal';
import ChangePassword from '@/components/myPage/ChangePassword';

const EditInfo = ({ isPartner = false }: { isPartner?: boolean }) => {
  const { userInfo, setUserInfo } = useUserStore();
  const image = useProfileImage(userInfo);
  const { isModalOpen, openModal, closeModal } = useModal();
  const [instantImg, setInstantImg] = useState<string | undefined>(
    userInfo.profileImage,
  );
  const [img, setImg] = useState<File[]>([]);
  const isUser = !isPartner;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInfo>({
    defaultValues: { ...userInfo },
  });

  const handleImgUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast.warning('10mb 이하의 파일만 업로드 가능합니다');
      return;
    }
    const instantUrl = URL.createObjectURL(file);
    setInstantImg(instantUrl);
    setImg([file]);
  };

  const handleSave = async (data: UserInfo) => {
    if (img.length) {
      const response = await postImages(img, BUCKER_NAME.PRODUCT_OPTION);
      data = { ...data, profileImage: response[0] };
    } else {
      data = { ...data, profileImage: '' };
    }
    const newData = { ...data };
    delete newData.isPartner;
    delete newData.email;
    if (newData.isPartner) delete newData.realName;
    else delete newData.description;
    try {
      await putUserInfo(newData);
      toast.success('저장되었습니다');
      setUserInfo({ ...userInfo, ...newData });
    } catch (error) {
      toast.error('저장에 실패했습니다');
    }
  };

  return (
    <div className="flex flex-col w-full gap-12 p-24">
      <form
        className="flex flex-col gap-24 text-16"
        onSubmit={handleSubmit(handleSave)}
      >
        <div className="flex flex-row items-center gap-24">
          <div className="relative">
            <img
              src={instantImg || image}
              className="object-cover rounded-full w-140 h-140"
              alt="profile"
            />
            {!!instantImg && (
              <button
                type="button"
                className="absolute bg-white rounded-full top-12 right-12"
                onClick={() => {
                  setInstantImg(undefined);
                  setImg([]);
                }}
              >
                <Delete stroke="#000000" />
              </button>
            )}
          </div>
          <div className="flex flex-col gap-12">
            <label
              htmlFor="profileImg"
              className="flex flex-row gap-8 p-16 font-normal cursor-pointer rounded-30 w-fit border-1 border-blue-6 text-16 text-blue-6"
            >
              <img src={uploadIcon} alt="upload" />
              프로필 사진 업로드
              <input
                id="profileImg"
                hidden
                type="file"
                accept="image/*"
                onChange={handleImgUpload}
              />
            </label>
            <div>최대 10mb까지 업로드 가능합니다.</div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-32">
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
                  className="p-12 rounded outline-none resize-none h-72 text-16 border-1 border-black-5 focus:border-blue-6"
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
              className="flex flex-row gap-4 p-12 font-normal text-16 text-blue-6"
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
