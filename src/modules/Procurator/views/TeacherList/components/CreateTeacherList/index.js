import React, { useState } from 'react'

import { CreateList } from 'components'
import { teacherEstates } from 'constants/index'

const CreateTeacherList = ({ uid, condition, faculty }) => {
  const [estateType, setEstateType] = useState('rector')

  const handlEstateTypeSelected = (event) => setEstateType(event.target.value);

  return (
    <CreateList
      uid={uid}
      faculty={faculty}
      condition={condition}
      estateType={estateType}
      estates={teacherEstates}
      handleEstateTypeSelected={handlEstateTypeSelected}
    />
  )
}

export default CreateTeacherList
