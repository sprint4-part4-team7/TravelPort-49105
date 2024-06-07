export type DetailData = {
  id: number;
  categoryId: number;
  name: string;
  productDesc: string;
  productSiteLat: number;
  productSiteLng: number;
  productAddress: string;
  buildingName: string;
  productImages: string[];
  startDate: string;
  endDate: string;
  closedDay: string[];
  thumbnail: string;
};

export type OptionData = {
  id: number;
  productId: number;
  optionName: string;
  optionPrice: number;
  optionImages: string[];
  userCount: number;
  createdAt: string;
};

export type ReviewInfoType = {
  reviewContent: string;
  reviewScore: number;
};

export type GetReviewType = {
  review: ReviewData;
  productId: number;
};

export type DefaultOptionType = {
  optionName: string;
  productName: string;
};

export type ReviewData = {
  id: number;
  userId: number;
  productOptionId: number;
  score: number;
  reviewImages: string[];
  reviewContent: string;
  partnerAnswer: string;
  createdAt: string;
};

export type CardListsType = {
  id: number;
  productId: number;
  optionPrice: number;
  optionName: string;
  userCount: number;
  product: {
    id: string;
    buildingName: string;
    name: string;
    productAddress: string;
    productDesc: string;
    productImages: string[];
  };
};
