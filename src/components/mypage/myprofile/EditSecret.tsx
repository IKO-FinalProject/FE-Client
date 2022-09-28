import React, { ChangeEvent, useState } from 'react';
import ShippingCard from '../../payment/shipping/ui/ShippingCard';
import EditProfileInput from '../ui/EditProfileInput';
import SubmitButton from '../ui/SubmitButton';

interface EditPasswordFormType {
  newPassword:string,
  newPasswordConfirm:string,
  oldPassword:string
}

const EditSecret = () => {
  
  const [editFormValue,setEditFormValue] = useState<EditPasswordFormType>({
    newPassword:'',
    newPasswordConfirm:'',
    oldPassword:''
  })
  const editFormValueChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    const {target:{value,name}} = e;
    setEditFormValue(prev => ({
      ...prev,
      [name]:value
    }))
  }

  
  return (
    <div>
      <ShippingCard title="비밀번호 변경">
        <div className='flex flex-col w-full gap-2'>
        <EditProfileInput onChange={editFormValueChangeHandler} name="newPassword" value={editFormValue.newPassword} placeholder="새 비밀번호" />
        <EditProfileInput onChange={editFormValueChangeHandler} name="newPasswordConfirm" value={editFormValue.newPasswordConfirm} placeholder="새 비밀번호 확인" />
        </div>
      </ShippingCard>
      <ShippingCard title="최종비밀번호 확인" isRequired >
        <EditProfileInput name="passwordConfirm" onChange={editFormValueChangeHandler} value={editFormValue.oldPassword} placeholder="기존 비밀번호" />
      </ShippingCard>
      <SubmitButton onClick={() => {}} />
    </div>
  );
};

export default EditSecret;