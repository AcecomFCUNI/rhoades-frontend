import React, { useState } from 'react'

import { CreateList } from 'components'
import { studentEstates } from 'constants/index'

const CreateTeacherList = ({ uid, estate, faculty }) => {
  const [estateType, setEstateType] = useState('third-of-faculty')

  const handlEstateTypeSelected = (event) => setEstateType(event.target.value);

  return (
    <CreateList
      uid={uid}
      faculty={faculty}
      estate={estate}
      estateType={estateType}
      estates={studentEstates}
      handleEstateTypeSelected={handlEstateTypeSelected}
    />
  )
}

export default CreateTeacherList
