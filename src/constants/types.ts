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

export interface PresignedUrl {
  url: string;
  uniqueFileName: string;
  originalFileName: string;
}

export interface PostData {
  items: {
    objectKey: string;
    contentType: string;
  }[];
  bucketName: string;
}

export interface UserInfo {
  id?: number;
  name: string;
  email?: string;
  isPartner?: number;
  realName?: string;
  phone?: string;
  profileImage?: string;
  description?: string;
}

export interface Reservation {
  id: number;
  userId: number;
  productOptionId: number;
  paymentId: number;
  timeTableId: number;
  reservationState: string;
  reservationPrice?: string;
  ticketCount?: number;
  cancelMsg?: string;
  createdAt: string;
  user: {
    name: string;
    realName?: string;
    phone?: string;
  };
  productOption: {
    optionName: string;
  };
  timeTable: {
    targetDate: string;
    startTimeOnly: string;
    endTimeOnly: string;
  };
}
