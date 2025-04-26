import { Link } from "react-router-dom"

const WelcomeLink = ({ linkRoute, linkText }) => {
  return (
    <p>
      <Link to={linkRoute}>{linkText}</Link>
    </p>
  )
}

export default WelcomeLink
