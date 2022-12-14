import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { selectProduct, shippingFeeState, totalPriceState } from '../../store/selectProduct'
import { useUser } from '../auth/hooks/useUser'
import Card from '../common/Card'
import CardTemplate from '../common/ui/CardTemplate'
import PageLayout from '../common/ui/PageLayout'
import { getStoredToken } from '../local-storage/userStorage'
import { useGetProductRandom } from '../main/hooks/useProductLists'
import CartItem from './CartItem'
import useCart, { CartItemsType } from './hooks/useCart'
import CartButtonGroup from './ui/CartButtonGroup'
import CartBuyInfo from './ui/CartBuyInfo'
import CartPriceTable from './ui/CartPriceTable'
import CartStatusBar from './ui/CartStatusBar'
import CartStatusLine from './ui/CartStatusLine'

const Cart = () => {
  const [isTotalChecked, setIsTotalChecked] = useState(false)
  const { user } = useUser()
  const { cartItems, isLoading } = useCart()
  const [selectedProduct, setSelectedProduct] = useRecoilState(selectProduct)
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState)
  const [shippingFee, setShippingFee] = useRecoilState(shippingFeeState)
  const [products, setProducts] = useState<CartItemsType[]>([])
  const navigate = useNavigate()
  const selectProductHandler = (cart: CartItemsType, checked: boolean) => {
    if (checked) {
      setSelectedProduct((prev) => [...prev, cart])
      setSelectedProduct((prev) => Array.from(new Set(prev)))
    } else {
      setSelectedProduct((prev) => prev.filter((item) => item.cartId !== cart.cartId))
    }
  }

  const totalCheckedHandler = useCallback(() => {
    setSelectedProduct([])
    setIsTotalChecked((prev) => !prev)
  }, [])

  const buyAllHandler = () => {
    setIsTotalChecked(true)
    setSelectedProduct(() => [...products])
  }

  const includeVerifyHandler = useCallback(() => {
    alert('선택된 상품이 없습니다. 구입하시려는 상품을 체크해주세요')
  }, [])

  useEffect(() => {
    const token = getStoredToken()
    if (!token) {
      navigate('/signin')
    }
  }, [])

  useEffect(() => {
    setProducts(cartItems)
  }, [isLoading])

  useEffect(() => {
    if (!isTotalChecked) {
      setSelectedProduct([])
    }
    products.map((item) => selectProductHandler(item, isTotalChecked))
  }, [isTotalChecked])

  useEffect(() => {
    setTotalPrice(0)
    let totalP = 0
    let totalDiscount = 0
    selectedProduct.map((item) => (totalP += item.price * item.pcs))
    selectedProduct.map((item) => (totalDiscount += item.discount))
    setTotalPrice(totalP - totalP * ((totalDiscount / selectedProduct.length || 0) / 100))
    setShippingFee(totalPrice >= 3000 ? 0 : 500)
  }, [selectedProduct, totalPrice, products])

  const data = useGetProductRandom(user?.memberId!, products[0]?.cartId || 1)

  return (
    <PageLayout layoutWidth="w-[90%]" innerTop="top-[30%]">
      <CardTemplate title="장바구니" isTitleVisible={true}>
        <CartStatusLine />
        <div className="flex flex-col items-center xs:flex-row xs:items-start text-lenssisGray mt-4 xs:mt-10">
          {/* cartList(left-section) */}
          <div className="grow flex flex-col px-0 xs:px-2 w-full">
            <CartStatusBar
              isTotalChecked={isTotalChecked}
              products={products}
              totalCheckedHandler={totalCheckedHandler}
            />
            <ul className="pl-4">
              {products.map((item) => (
                <CartItem
                  setProducts={setProducts}
                  key={item.productDetailsId}
                  products={products}
                  item={item}
                  isTotalChecked={isTotalChecked}
                  setIsTotalChecked={setIsTotalChecked}
                  selectedProduct={selectedProduct}
                  selectProductHandler={selectProductHandler}
                  setSelectedProduct={setSelectedProduct}
                />
              ))}
            </ul>
          </div>

          {/* priceBox(right-section) */}
          <div className="w-full xs:w-2/5 xs:max-w-[440px] text-base">
            <div className="flex flex-col">
              <CartPriceTable />
              <CartButtonGroup buyAllHandler={buyAllHandler} includeVerifyHandler={includeVerifyHandler} />
            </div>
            <CartBuyInfo />
          </div>
        </div>
      </CardTemplate>

      <div className="hidden xs:block">
        <CardTemplate title="2번" marginTop="mt-12">
          <h3 className="text-[20px] font-bold text-lenssisDark pb-2 border-b border-solid border-lenssisGray">
            이런 상품도 있어요!
          </h3>
          <div className="flex items-start gap-4 mt-12">
            {data &&
              data.map((item: any, idx: number) => (
                <Card
                  key={`${item.productId}-${idx}`}
                  idx={idx}
                  colorAndImage={item.colorAndImage}
                  productId={item.productId}
                  series={item.series}
                  price={item.price}
                  discount={item.discount}
                  graphicDiameter={item.graphicDiameter}
                />
              ))}
          </div>
        </CardTemplate>
      </div>
    </PageLayout>
  )
}

export default Cart
