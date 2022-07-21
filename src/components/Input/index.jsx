import React from 'react'

import classnames from 'classnames/bind'
import style from './Input.module.scss'
const cx = classnames.bind(style)

function Input(props) {
  return (
    <input
      type={props.type}
      className={cx('input-search')}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange ? (e) => props.onChange(e) : null}
    />
  )
}

export default Input
