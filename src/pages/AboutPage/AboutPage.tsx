const AboutPage = () => {
  return (
    <>
      <div className="container">
        <h1>About</h1>
        <p>This App was created by Anna Vasilevich</p>
        <div>
          Check out my
          <a
            href="https://www.linkedin.com/in/anna-vasilevich-frontend/"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            LinkedIn
          </a>
        </div>
        <div>
          And if you want to learn how to create apps like this one, check out
          <a
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            RS School React Course
          </a>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
