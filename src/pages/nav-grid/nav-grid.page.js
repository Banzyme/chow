import './nav-grid.page.css';

function NavGrid(props) {
  const onaction = () => {
    console.debug("History:  ", props.history);
    props.history.push("/events");
  };
  return (
    <article className="navGrid">
      <section onClick={onaction} className="events">
        <Link to="/events">A</Link>
      </section>
      <section className="grid-cell logs">B</section>

      <section className="grid-cell venues">C</section>

      <section className="grid-cell artists">E</section>

      <section className="grid-cell logs">E</section>
    </article>
  );
}

export default NavGrid;
