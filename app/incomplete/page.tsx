'use client'

import React from 'react'
import { useGlobalState } from '../context/globalProvider'
import Tasks from '../components/Tasks/Tasks';

const page = () => {
  const {incompleteTasks} = useGlobalState();
  return (
  <Tasks title={'Incomplete Tasks'} tasks={incompleteTasks}/>
  )
}

export default page