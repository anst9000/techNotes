import WelcomeLink from "./WelcomeLink"

const Welcome = () => {
  const date = new Date()
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date)

  return (
    <section className="welcome">
      <p>{today}</p>

      <h1>Welcome!</h1>
      <WelcomeLink linkRoute="/dash/notes" linkText="View techNotes" />
      <WelcomeLink linkRoute="/dash/users" linkText="View User Settings" />
    </section>
  )
}

export default Welcome
