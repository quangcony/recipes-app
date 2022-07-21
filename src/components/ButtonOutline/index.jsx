import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import classnames from 'classnames/bind'
import style from './ButtonOutline.module.scss'

const cx = classnames.bind(style)

function ButtonOutline({ onClick, icon = false, text = '', className = '' }) {
  return (
    <button
      type="button"
      className={cx('btn', 'btn-outline', className)}
      onClick={onClick}
    >
      {text}
      {icon && <FontAwesomeIcon icon={faMagnifyingGlass} />}
    </button>
  )
}

export default ButtonOutline
