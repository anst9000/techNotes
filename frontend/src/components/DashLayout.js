import { Fragment } from "react"
import { Outlet } from "react-router-dom"
import DashFooter from "./DashFooter"
import DashHeader from "./DashHeader"

const DashLayout = () => {
  return (
    <Fragment>
      <DashHeader />
      <div className="dash-container">
        <Outlet />
      </div>
      <DashFooter />
    </Fragment>
  )
}

export default DashLayout
