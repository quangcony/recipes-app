import classnames from 'classnames/bind'
import style from './LoadingSkeleton.module.scss'

const cx = classnames.bind(style)
const LoadingSkeleton = ({ className = '', height = 10 }) => {
  return (
    <div className={cx('skeleton', className)} style={{ height: height }}></div>
  )
}

export default LoadingSkeleton
