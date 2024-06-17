// import { useForm } from 'react-hook-form';
import TextBox from '@/components/common/TextBox';
import Button from '@/components/common/Button';

// interface Reject {
//   cancelMsg: string;
// }

const RejectReservation = ({ closeModal }: { closeModal: () => void }) => {
  //   const { register, handleSubmit } = useForm<Reject>();

  //   const handleSave = async (cancelMsg: string | null) => {
  //     console.log(cancelMsg);
  //     // try {
  //     //   const response = await putPassword({
  //     //     prevPassword,
  //     //     newPassword,
  //     //   });
  //     //   if (response.status === 200) {
  //     //     // alert(response.data.message);
  //     //     closeModal();
  //     //   } else {
  //     //     throw new Error(response.data.message);
  //     //   }
  //     // } catch (error) {
  //     //   // alert('비밀번호 변경에 실패했습니다');
  //     //   // console.error(error);
  //     // }
  //   };

  return (
    <div>
      <TextBox
        id="rejectReservation"
        labelName="거절 사유"
        textSize={16}
        mb={10}
        textLimit={100}
        placeholder="거절 사유를 작성해주세요"
        value="10"
        // register={register('cancelMsg', {
        //   required: '거절 사유를 작성해주세요',
        // })}
      />
      <div className="flex justify-between gap-16">
        <Button isCancel onClick={closeModal}>
          취소
        </Button>
        <Button>거절 사유 보내기</Button>
      </div>
    </div>
  );
};

export default RejectReservation;
