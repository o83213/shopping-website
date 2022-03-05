import { Fragment } from 'react'
import MainNavigation1 from './MainNavigation1'
import MainNavigation2 from './MainNavigation2'

const MainNavigation = (props) => {
  return (
    <Fragment>
      <MainNavigation1 />
      <MainNavigation2 onShowCart={props.onShowCart} />
    </Fragment>
  )
}

export default MainNavigation
