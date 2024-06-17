interface NoDataProps {
  text: string;
}

const NoData = ({ text }: NoDataProps) => {
  return <div className="font-semibold text-26 text-center pt-50">{text}</div>;
};
export default NoData;
