import React, { useState } from 'react'

import { CreateList } from 'components'
import { studentEstates } from 'constants/index'

const CreateTeacherList = (props) => {
  const { uid, condition, faculty } = props
  const [estateType, setEstateType] = useState(studentEstates[0].value)

  const handlEstateTypeSelected = (event) => setEstateType(event.target.value);

  return (
    <CreateList
      uid={uid}
      faculty={faculty}
      condition={condition}
      estateType={estateType}
      estates={studentEstates}
      handleEstateTypeSelected={handlEstateTypeSelected}
    />
  )
}

export default CreateTeacherList
