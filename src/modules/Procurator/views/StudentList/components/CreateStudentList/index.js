import React, { useState } from 'react'

import { CreateList } from 'components'
import { studentEstates } from 'constants/index'

const CreateTeacherList = ({ uid, estate }) => {
  const [estateType, setEstateType] = useState('third-of-faculty')

  const handlEstateTypeSelected = (event) => setEstateType(event.target.value);

  return (
    <CreateList
      uid={uid}
      estate={estate}
      estateType={estateType}
      estates={studentEstates}
      handlEstateTypeSelected={handlEstateTypeSelected}
    />
  )
}

export default CreateTeacherList
