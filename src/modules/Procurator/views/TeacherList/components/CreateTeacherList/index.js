import React, { useState } from 'react'

import { CreateList } from 'components'
import { teacherEstates } from 'constants/index'

const CreateTeacherList = ({ uid, estate }) => {
  const [estateType, setEstateType] = useState('rector')

  const handlEstateTypeSelected = (event) => setEstateType(event.target.value);

  return (
    <CreateList
      uid={uid}
      estate={estate}
      estateType={estateType}
      estates={teacherEstates}
      handlEstateTypeSelected={handlEstateTypeSelected}
    />
  )
}

export default CreateTeacherList
