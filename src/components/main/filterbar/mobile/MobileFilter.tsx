import MobileBoxLayout from '../common/MobileBoxLayout'
import { graphicDiameter, series, features, period, colors } from '../../../../constants/filterData'
import Refresh from '/assets/Refresh.svg'
import { filterOptionState, FilterValue } from '../../../../store/filterVallue'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { useFilterMutation } from '../hooks/useFilter'

const MobileFilter = () => {
  const resetFilter = useResetRecoilState(filterOptionState)
  const { requstFilter } = useFilterMutation()

  const refreshHandler = () => {
    resetFilter()
  }

  return (
    <div className="bg-[#fff]">
      <MobileBoxLayout title="사용기간" contents={period} py={'py-[3px]'} w={'w-[80px]'} />
      <MobileBoxLayout
        title="그래픽 직경"
        contents={graphicDiameter}
        px={'px-[17px]'}
        py={'py-[3px]'}
        w={'w-[60px]'}
        gapX={'gap-x-2'}
        gapY={'gap-y-4'}
      />
      <MobileBoxLayout
        title="시리즈"
        contents={series}
        px={'px-[12px]'}
        py={'py-[3px]'}
        w={'w-[80px]'}
        gapX={'gap-x-2'}
        gapY={'gap-y-4'}
      />
      <MobileBoxLayout
        title="색상"
        contents={colors}
        w={'w-[25px]'}
        h={'h-[25px]'}
        gapX={'gap-x-[40px]'}
        gapY={'gap-y-[12px]'}
      />
      <MobileBoxLayout
        title="특징"
        contents={features}
        w={'w-[80px]'}
        py={'py-[3px]'}
        px={'px-[3px]'}
        gapX={'gap-x-2'}
        gapY={'gap-y-4'}
      />
      <div className="flex justify-around p-4">
        <button className="w-[290px] h-[40px] text-center bg-lenssisDark text-white rounded-[5px] font-semibold">
          적용하기
        </button>
        <div className="flex justify-center items-center">
          <img className="cursor-pointer" src={Refresh} onClick={refreshHandler} />
        </div>
      </div>
    </div>
  )
}

export default MobileFilter
