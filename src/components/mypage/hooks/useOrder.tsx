import { useMutation } from 'react-query'
import { useRecoilState } from 'recoil'
import { myPurchaseState } from '../../../store/myPurchase'
import { axiosInstance, getJWTToken } from '../../axiosinstance'
import useToast from '../../common/toast/hooks/useToast'
import { getStoredToken } from '../../local-storage/userStorage'

interface orderRequestType {
  email: string
  memberId: number
  orderId: number
  orderer: string
}

export interface purchaseListType {
  data: InfoType[]
}

export interface InfoType {
  orderInfo: orderInfoType
  productInfo: productInfoType[]
}
interface orderInfoType {
  address: string
  couponId: number
  detailAddress: string
  email: string
  method: number
  orderCreatedAt: string
  orderId: number
  orderer: string
  phone: string
  point: number
  postCode: number
  receiver: string
  receiverPhone: string
  shippingMessage: string
  status: number
  totalPrice: number
}
interface productInfoType {
  color: string
  colorCode: string
  degree: number
  discount: number
  graphicDiameter: number
  imageUrl: string
  pcs: number
  period: number
  price: number
  productDetailsId: number
  productId: number
  productName: string
}

const getMyOrder = async ({ email, memberId, orderId, orderer }: orderRequestType) => {
  const token = getStoredToken()

  const { data } = await axiosInstance.post<purchaseListType>(
    '/order/info',
    { email, memberId, orderId, orderer },
    {
      headers: getJWTToken(token)
    }
  )
  return data.data
}

const useOrder = () => {
  const [myPurchase, setMyPurchase] = useRecoilState(myPurchaseState)
  const { fireToast } = useToast()
  const { mutate: getMyOrders, data: orderData } = useMutation(
    (orderInfo: orderRequestType) => getMyOrder(orderInfo),
    {
      onSuccess: (data) => {
        setMyPurchase(data)
      },
      onError: () => {
        fireToast({
          id: 'getOrder',
          message: '주문 내역을 불러오는데 실패했습니다.',
          type: 'failed',
          position: 'top',
          timer: 2000
        })
      }
    }
  )

  return { getMyOrders, orderData }
}

export default useOrder
