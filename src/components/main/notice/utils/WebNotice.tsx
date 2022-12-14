import { useNavigate } from 'react-router'

interface PropsType {
  id: number
  title: string | undefined
}

function WebNotice({ id, title }: PropsType) {
  const navigate = useNavigate()
  return (
    <>
      <div className="   hidden  xs:block">
        <div className="flex items-center text-center py-3 border-t-[1px] border-solid border-lenssisStroke">
          <div className="w-[145px]  ml-[10px] font-[400] text-[13px] text-lenssisDark text-center">{id}</div>
          <div
            className="ml-[60px] hover:cursor-pointer hover:underline"
            onClick={() => navigate(`/notice/${id}`, { state: id })}
          >
            {title}
          </div>
        </div>
      </div>
    </>
  )
}

export default WebNotice
