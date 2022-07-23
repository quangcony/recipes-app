import RecipeGrid from '../../components/RecipeGrid'
import classnames from 'classnames/bind'
import style from './Home.module.scss'
import ScrollButton from '../../components/ScrollButton'

const cx = classnames.bind(style)

function Home() {
  return (
    <div className="container">
      <RecipeGrid />
      <ScrollButton />
    </div>
  )
}

export default Home
