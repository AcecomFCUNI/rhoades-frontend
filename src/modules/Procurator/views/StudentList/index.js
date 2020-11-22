import React from 'react'
import { useSelector } from 'react-redux'

import { Spinner } from 'components'
import { existsKeyInObject } from 'tools'
import { CreateStudentList } from './components'

const estate = 'students'

const StudentList = () => {
  const lists = useSelector(state => state.lists)
  const auth = useSelector(state => state.firebase.auth)

  return (
    lists.createLoading 
      ? <Spinner /> 
      : !existsKeyInObject(estate, lists.data) 
      ? <CreateStudentList uid={auth.uid} estate={estate} /> 
      : <div>{JSON.stringify(lists.data.students)}</div>
  )
}

export default StudentList
