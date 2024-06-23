import changeDateForm from '@/utils/changeDateForm';
import useModal from '@/hooks/useModal';
import { useNavigate } from 'react-router-dom';
import RESERV_STATUS from '@/constants/reserv';
import ReservButtonOutlined from '@/components/myPage/button/ReservButtonOutlined';
import DeletePosting from '@/components/myPage/modal/DeletePosting';
import PostingSwitch from '@/components/myPage/PostingSwitch';

interface PostingCardProps {
  id: number;
  title: string;
  postingDate: string;
  postingState: boolean;
  salePeriod?: {
    startDate: string;
    endDate: string;
  };
  option?: string;
}

const PostingCard = ({
  id = 0,
  title,
  postingDate,
  postingState,
  salePeriod,
  option,
}: PostingCardProps) => {
  const navigate = useNavigate();
  const { isModalOpen, openModal, closeModal } = useModal();

  const duration =
    salePeriod?.startDate && salePeriod?.endDate
      ? `${changeDateForm(salePeriod?.startDate)} ~ ${changeDateForm(salePeriod?.endDate)}`
      : salePeriod?.startDate || salePeriod?.endDate || '';
  const salePeriodStr = `판매 기간 : ${duration}`;
  const postingDateStr = `게시일 : ${changeDateForm(postingDate)}`;

  return (
    <div
      id={id ? id.toString() : 'undefined'}
      className="flex flex-col w-full gap-32 p-16 cursor-pointer border-1 border-black-5 rounded-8 hover:bg-black-2 active:bg-black-1 moblie:w-full"
      onClick={() => navigate('/partner/product-register')}
    >
      <div className="flex flex-col justify-between gap-32">
        <div className="flex flex-col gap-12">
          <div className="flex flex-row justify-between font-semibold">
            <div className="font-semibold text-20">상품명 : {title}</div>
            <div
              className="font-semibold text-16"
              onClick={(e) => e.stopPropagation()}
            >
              <PostingSwitch id={id} state={postingState} />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {option && (
              <div className="text-14 text-black-10">옵션명 : {option}</div>
            )}
            {salePeriod && (
              <div className="text-14 text-black-10">{salePeriodStr}</div>
            )}
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="text-16">{postingDateStr}</div>
          <div onClick={(e) => e.stopPropagation()}>
            <ReservButtonOutlined
              status={RESERV_STATUS.DELETED}
              onClick={openModal}
            />
            <DeletePosting
              id={id}
              closeModal={closeModal}
              isOpen={isModalOpen}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostingCard;
