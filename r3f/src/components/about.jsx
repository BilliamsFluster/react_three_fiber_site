const About = ({hideOverlay}) => {
    return (
      <div className="about">
        <button onClick={hideOverlay}>Back to Scene</button>
        <h1>About Sections</h1>
        <section>
          Section Content 1
        </section>
        <section>
          Section Content 2<br/> hffh <br/>fefe <br />efefef<br />fefe<br />effe<br />
        </section>
        <section>
          Section Content 2<br/> hffh <br/>fefe <br />efefef<br />fefe<br />effe<br />
        </section>
      </div>
    );
  }
  

export default About;