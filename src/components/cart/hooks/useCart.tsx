import { getStoredToken } from '../../local-storage/userStorage'
import { getJWTToken } from '../../axiosinstance/index'
import { AxiosResponse } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { axiosInstance } from '../../axiosinstance'
import { queryKeys } from '../../react-query/queryKeys'
import useToast from '../../common/toast/hooks/useToast'

export interface CartItemsType {
  cartId?: number
  color: string
  colorCode: string

  degree: number
  discount: number
  graphicDiameter: number
  imageUrl: string
  name: string
  period: number
  price: number
  productDetailsId: number
  stock: number
  pcs: number
}

const getCartItems = async (): Promise<CartItemsType[]> => {
  const { data } = await axiosInstance.get<AxiosResponse<CartItemsType[]>>('/cart/list')
  return data.data
}

const useCart = () => {
  const fallback: CartItemsType[] = []
  const { data: cartItems = fallback, isLoading } = useQuery(queryKeys.cart, () => getCartItems(), {})

  return { cartItems, isLoading }
}

const addCart = async (id: number) => {
  const token = getStoredToken()
  const data = await axiosInstance({
    url: `/cart/add`,
    method: 'POST',
    headers: getJWTToken(token),
    data: {
      productDetailsId: id
    }
  })
  return data
}

export const useAddCart = () => {
  const { fireToast } = useToast()
  const { data, mutate: addCartMutate } = useMutation(addCart, {
    onSuccess: (data) => {
      console.log(data)
      fireToast({
        id: 'addCartCompleted',
        message: '장바구니 추가에 성공하였습니다.',
        position: 'bottom',
        timer: 2000,
        type: 'complete'
      })
    },
    onError: () => {
      fireToast({
        id: 'addCartFailed',
        message: '장바구니 추가에 실패하였습니다. 다시 시도해주세요.',
        position: 'bottom',
        timer: 2000,
        type: 'failed'
      })
    }
  })
  return { addCartMutate }
}

export default useCart
