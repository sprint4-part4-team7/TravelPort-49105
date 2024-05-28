type ButtonProps = {
  text: string;
  onClick?: () => void;
};

const Button = ({ text = '', onClick }: ButtonProps) => {
  return (
    <button
      className="flex justify-between items-center px-15 py-10
    border-1 rounded-12 border-solid border-blue-700 
    text-3xl"
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
