import { UserInfo } from '@/constants/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      userInfo: {
        id: 0,
        name: '',
        email: '',
        profileImage:
          'https://i.pinimg.com/736x/53/7e/f5/537ef59499259ba707068742f91a10f8.jpg',
        isPartner: 0,
      },
      setUserInfo: (userInfo) => set({ userInfo }),
    }),
    {
      name: 'user-info',
    },
  ),
);

interface UserMypageState {
  userMypage: string;
  setUserMypage: (userMypage: string) => void;
}

export const useUserMypageStore = create(
  persist<UserMypageState>(
    (set) => ({
      userMypage: 'user',
      setUserMypage: (userMypage) => set({ userMypage }),
    }),
    {
      name: 'user-type',
    },
  ),
);

interface ReservationInfo {
  userId: number;
  productOptionId: number;
  timeTableId: number;
  reservationState: string;
  reservationPrice: number;
  ticketCount: number;
  cancelMsg?: string;
}
interface ReservationStore {
  reservationInfo: ReservationInfo;
  setReservationInfo: (reservationInfo: ReservationInfo) => void;
}
export const useReservationStore = create(
  persist<ReservationStore>(
    (set) => ({
      reservationInfo: {
        userId: 0,
        productOptionId: 0,
        timeTableId: 0,
        reservationState: '',
        reservationPrice: 0,
        ticketCount: 0,
        cancelMsg: '',
      },
      setReservationInfo: (reservationInfo) => set({ reservationInfo }),
    }),
    {
      name: 'reservation',
    },
  ),
);

interface CartInfo {
  cartId: number;
  name: string;
  option: string;
  day: any;
  count: number;
  price: number;
  maxCount: number;
  categoryId: number;
}

interface CartStore {
  cartInfo: CartInfo[];
  setCartInfo: (cartInfo: CartInfo[]) => void;
  addCartItem: (item: CartInfo) => void;
  removeCartItem: (index: number) => void;
}

export const useCartStore = create(
  persist<CartStore>(
    (set) => ({
      cartInfo: [],
      setCartInfo: (cartInfo) => set({ cartInfo }),
      addCartItem: (item) =>
        set((state) => ({ cartInfo: [...state.cartInfo, item] })),
      removeCartItem: (index) =>
        set((state) => ({
          cartInfo: state.cartInfo.filter((_, i) => i !== index),
        })),
    }),
    {
      name: 'cart',
    },
  ),
);

interface ThumbnailState {
  thumbnail: File | null;
  setThumbnail: (thumbnail: File) => void;
}
export const useThumbnailStore = create<ThumbnailState>((set) => ({
  thumbnail: null,
  setThumbnail: (thumbnail) => set({ thumbnail }),
}));

interface ProductImageState {
  productImages: File[];
  setProductImages: (productImages: File[]) => void;
}
export const useProductImageStore = create<ProductImageState>((set) => ({
  productImages: [],
  setProductImages: (productImages) => set({ productImages }),
}));