import React from 'react'
import { useSelector } from 'react-redux'

import { Spinner } from 'components'
import { existsKeyInObject } from 'tools'
import { CreateTeacherList } from './components'

const estate = 'teachers'

const TeacherList = () => {
  const lists = useSelector(state => state.lists)
  const auth = useSelector(state => state.firebase.auth)

  return (
    lists.createLoading 
      ? <Spinner /> 
      : !existsKeyInObject(estate, lists.data) 
      ? <CreateTeacherList uid={auth.uid} estate={estate} /> 
      : <div>{JSON.stringify(lists.data.teachers)}</div>
  )
}

export default TeacherList
