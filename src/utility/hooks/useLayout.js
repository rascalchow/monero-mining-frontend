//** React Imports
import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getUserData } from '@utils'

export const useLayout = () => {
  // ** States
  const userData = useSelector((state) => state.auth.userData)
  const [lastLayout, setLastLayout] = useState('vertical');

  useEffect(() => {
    const varLayout = userData?.role == 'publisher' ? 'horizontal' : 'vertical';
    setLastLayout(varLayout)
    setLayout(varLayout)
  }, [userData])

  const [layout, setLayout] = useState('vertical')

  // ** Return a wrapped version of useState's setter function
  const setValue = (value) => {
    try {
      // ** Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(layout) : value

      // ** Set state
      setLayout(valueToStore)
    } catch (error) {
      // ** A more advanced implementation would handle the error case
      console.log(error)
    }
  }

  const handleLayout = useCallback(() => {
    // ** If layout is horizontal & screen size is equals to or below 1200
    if (layout === 'horizontal' && window.innerWidth <= 1200) {
      setLayout('vertical')
    }
    // ** If lastLayout is horizontal & screen size is equals to or above 1200
    if (lastLayout === 'horizontal' && window.innerWidth >= 1200) {
      setLayout('horizontal')
    }
  }, [layout, lastLayout])

  // ** ComponentDidMount
  useEffect(() => {
    window.addEventListener('resize', handleLayout)
    handleLayout();
  }, [lastLayout])

  return [layout, setValue]
}
