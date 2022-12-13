import React, { useState, useEffect } from 'react'
import { useLocation, Redirect, useHistory } from 'react-router-dom'

import InviteTable from './partials/Table'
import useInvite from '@hooks/useInvite'
import { useSearchParams } from '@src/navigation'
import { INVITE_SORT_KEY } from '@const/invite'
const Invitation = () => {
  const { invitesList, getInvites, isLoading } = useInvite()
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()

  useEffect(() => {
    fetchData()
  }, [location])
  const fetchData = () => {
    const limit = parseInt(searchParams.get('limit'))
    const page = parseInt(searchParams.get('page'))
    const query = {
      limit,
      page,
      filter: {},
    }
    if (searchParams.get('search')) {
      query.filter['search'] = searchParams.get('search')
    }
    INVITE_SORT_KEY.forEach((key) => {
      if (searchParams.get(key)) {
        query.filter[key] = searchParams.get(key)
      }
    })
    try {
      getInvites({
        ...query,
        filter: { ...query.filter },
      })
    } catch (error) {
      history.push('/not-authorized')
    }
  }
  if (searchParams.get('limit') === null || searchParams.get('page') === null) {
    searchParams.set('limit', 10)
    searchParams.set('page', 1)
    return <Redirect to={`${location.pathname}?${searchParams.toString()}`} />
  }
  if (searchParams.get('limit') === null || searchParams.get('page') === null)
    return null
  else
    return (
      <>
        <InviteTable invites={invitesList} isLoading={isLoading} />
      </>
    )
}

export default Invitation
