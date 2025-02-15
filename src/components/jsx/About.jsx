import "../css/about.css"; 

function AboutUs() {


  const fetchapi = async() => {
    try {
      const response = await fetch("https://ish.onrender.com/users");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching API data:", error);
    }
  }


  return (
    <div className="about-us-container">

      <h1>About Us</h1>
      <p className="intro-text">
        Welcome to <strong>Explore It</strong>! A unique platform where you can discover exciting
        resources—from financial tools to cocktail recipes, meal inspiration, and themed entertainment.
        Our mission is to provide engaging and useful content for your everyday needs.
      </p>

      
      <h2>Our Mission</h2>
      <p>
        At <strong>Explore It</strong>, we aim to make exploration easy, fun, and accessible. 
        Whether you're planning finances, searching for drinks, cooking meals, or diving into themed 
        content, we bring it all together in one place.
      </p>

     
      <h2>What You Can Explore</h2>
      <ul className="explore-list">
        <li>
          <strong>💼 Bank:</strong> Simple tools and ideas to manage finances effectively.
        </li>
        <li>
          <strong>🍹 Cocktail:</strong> Discover cocktail recipes that are refreshing and creative.
        </li>
        <li>
          <strong>🍽️ MealDB:</strong> Get inspired with a variety of meal recipes for any occasion.
        </li>
        <li>
          <strong>✨ Potter:</strong> Enjoy themed content inspired by magic and adventures.
        </li>
      </ul>


      <h2>Join Us</h2>
      <p>
        We believe in creating experiences that inspire and empower you. Join us on this journey 
        as we continue to explore and grow together!
      </p>
      <button className="contact-button" onClick={fetchapi}>Get in Touch</button>
    </div>
  );
}

export default AboutUs;


