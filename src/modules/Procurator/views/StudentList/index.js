import React from 'react'
import { useSelector } from 'react-redux'

import { Spinner, EnrollUsersToList } from 'components'
import { existsKeyInObject } from 'tools'
import { CreateStudentList } from './components'

const estate = 'students'

const StudentList = () => {
  const lists = useSelector(state => state.lists)
  const { auth, profile } = useSelector(state => state.firebase)

  return (
    lists.createLoading 
      ? <Spinner /> 
      : !existsKeyInObject(estate, lists.data) 
      ? <CreateStudentList uid={auth.uid} estate={estate} faculty={profile.faculty} /> 
      : <EnrollUsersToList estate={estate} />
  )
}

export default StudentList
