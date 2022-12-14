import React, { useCallback, useEffect, useState } from 'react'
import Counter from './Counter'
import CheckBox from '../common/ui/CheckBox'
import { CartItemsType } from './hooks/useCart'
import useDeleteCart from './hooks/useDeleteCart'

interface CartItemProps {
  isTotalChecked: boolean
  setIsTotalChecked: React.Dispatch<React.SetStateAction<boolean>>
  item: CartItemsType
  selectedProduct: CartItemsType[]
  selectProductHandler: (cart: CartItemsType, checked: boolean) => void
  setSelectedProduct: React.Dispatch<React.SetStateAction<CartItemsType[]>>
  products: CartItemsType[]
  setProducts: React.Dispatch<React.SetStateAction<CartItemsType[]>>
}

const CartItem = ({
  setProducts,
  products,
  isTotalChecked,
  item,
  selectedProduct,
  selectProductHandler,
  setIsTotalChecked,
  setSelectedProduct
}: CartItemProps) => {
  const [isChecked, setIsChecked] = useState(false)
  const { deleteCart } = useDeleteCart()
  const onClick = useCallback(() => {
    setIsTotalChecked(false)
    setIsChecked((prev) => !prev)
  }, [])

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/assets/errorImage.png'
  }

  const productDeleteHandler = (cId: number) => {
    // 해당 카트 상품 삭제

    deleteCart(cId)
    setSelectedProduct((prev) => prev.filter((selectProduct) => selectProduct.cartId !== cId))
    setProducts((prev) => prev.filter((product) => product.cartId !== cId))
  }

  useEffect(() => {
    if (!isTotalChecked) {
      setIsChecked(false)
    }
    selectProductHandler(item, isTotalChecked)
  }, [isTotalChecked])

  useEffect(() => {
    selectProductHandler(item, isChecked)
  }, [isChecked])

  useEffect(() => {
    const pcsChangeProduct = products.find((product) => product.cartId === item.cartId)
    if (!pcsChangeProduct) return
    setSelectedProduct((prev) => {
      return prev.map((selectProduct) => {
        if (selectProduct.cartId === item.cartId) {
          return { ...selectProduct, pcs: pcsChangeProduct.pcs }
        } else {
          return { ...selectProduct }
        }
      })
    })
  }, [products])

  return (
    <li className="flex my-6 text-sm xs:text-base items-center h-[90px] xs:h-[110px] ">
      {/* selectedProduct에 내 cartId가 있으면 true 없으면 false로 작동하게 만든다. */}
      <CheckBox
        isChecked={selectedProduct.some((product) => product.cartId === item.cartId)}
        onClick={onClick}
        bgColor="bg-lenssisDark"
      />
      <img
        className="w-[90px] xs:w-[120px] h-[100px] xs:h-[120px]"
        onError={(e) => handleImgError(e)}
        src={item.imageUrl}
        alt=""
      />
      <div className="ml-[6px] xs:ml-4 grow flex flex-col">
        <div className="mb-2 text-xs xs:text-sm">
          {item.name} - {item.color}
        </div>

        <div className="mb-3 xs:mb-0">
          <p className="line-through text-[10px] xs:text-sm">{item.price.toLocaleString()}円</p>
          <p className="font-bold text-xs xs:text-lg text-black pb-1 xs:pb-4">
            {(item.price - item.price * (item.discount / 100)).toLocaleString()}円
          </p>
        </div>
        <div>
          <Counter item={item} pcs={item.pcs} products={products} setProducts={setProducts} />
        </div>
      </div>
      <div className=" min-w-[30px] xs:min-w-[40px]">
        <button className="underline text-lenssisStroke" onClick={() => productDeleteHandler(item.cartId!)}>
          삭제
        </button>
      </div>
    </li>
  )
}

export default CartItem
