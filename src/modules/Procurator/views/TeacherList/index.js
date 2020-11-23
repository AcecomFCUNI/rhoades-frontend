import React from 'react'
import { useSelector } from 'react-redux'

import { Spinner, EnrollUsersToList } from 'components'
import { existsKeyInObject } from 'tools'
import { CreateTeacherList } from './components'

const estate = 'teachers'

const TeacherList = () => {
  const lists = useSelector(state => state.lists)
  const { auth, profile } = useSelector(state => state.firebase)

  return (
    lists.createLoading 
      ? <Spinner /> 
      : !existsKeyInObject(estate, lists.data) 
      ? <CreateTeacherList uid={auth.uid} estate={estate} faculty={profile.faculty} /> 
      : <EnrollUsersToList estate={estate} />
  )
}

export default TeacherList
