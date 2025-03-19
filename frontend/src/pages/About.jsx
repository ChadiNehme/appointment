import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1 className="title">ABOUT US</h1>
      <p className="intro-text">
        Taktik Lab is a dynamic hub designed for the technology, engineering, and science community.
        This innovative space fosters creativity and collaboration, offering a variety of resources to
        professionals, students, and enthusiasts alike.
      </p>

      <div className="section">
        <h2>Our Facilities</h2>
        <ul>
          <li>
            <strong>Co-Working Space:</strong> A vibrant and flexible workspace equipped with high-speed internet
            and comfortable seating, perfect for freelancers, startups, and small businesses.
          </li>
          <li>
            <strong>Meeting Space:</strong> Fully equipped meeting areas ideal for workshops, brainstorming sessions,
            and presentations, designed to inspire creativity and effective communication.
          </li>
          <li>
            <strong>Virtual Offices:</strong> Professional address, mail handling, and remote work capabilities with
            access to our facilities on an as-needed basis.
          </li>
        </ul>
      </div>

      <div className="section">
        <h2>Education Programs</h2>
        <ul>
          <li>
            <strong>Programming:</strong> Courses covering various languages and frameworks for all skill levels,
            from beginners to advanced coders.
          </li>
          <li>
            <strong>Robotics:</strong> Hands-on workshops and courses to design, build, and program robots
            using the latest technology.
          </li>
          <li>
            <strong>Electronics:</strong> In-depth knowledge on circuit design, microcontrollers, and electronic
            systems for hobbyists and professionals.
          </li>
        </ul>
      </div>

      <div className="section">
        <h2>3D Printing Lab</h2>
        <p>
          Our state-of-the-art 3D printing lab is open to all members. Whether you're prototyping a new product,
          creating custom parts, or experimenting with 3D design, our lab provides the tools and expertise to
          bring your ideas to life.
        </p>
      </div>

      
    </div>
  );
};

export default About;