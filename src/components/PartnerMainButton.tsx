interface PartnerMainButtonProps {
  text: string;
  onClick?: () => void;
}

const PartnerMainButton = ({
  text,
  onClick = undefined,
}: PartnerMainButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex mobile:justify-center p-12 rounded-4 items-center bg-blue-10 text-white text-17 font-semibold"
    >
      {text}
    </button>
  );
};

export default PartnerMainButton;
