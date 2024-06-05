const getDate = (timestamp: string) => {
  return timestamp.split('T')[0];
};

export default getDate;
