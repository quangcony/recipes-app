import React, { useEffect, useState } from 'react'

import classnames from 'classnames/bind'
import style from './ScrollButton.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

const cx = classnames.bind(style)

const ScrollButton = () => {
  const [visible, setVisible] = useState(false)

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop
      if (scrolled > 300) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisible)
    return () => {
      window.removeEventListener('scroll', toggleVisible)
    }
  }, [])

  return (
    visible && (
      <button className={cx('btn-gototop')} onClick={ScrollToTop}>
        <FontAwesomeIcon icon={faChevronUp} />
      </button>
    )
  )
}

export default ScrollButton
