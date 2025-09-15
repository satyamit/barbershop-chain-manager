// import React from 'react'
// import './CSS/Home.css'
// const Home = () => {
// //   return (
// //     <div className="star-container">
// //       {/* Header */}
// //       <header className="star-header">
// //         <img src="/shop_name.png" alt="Star Logo" className="star-logo" />
// //         <h1 className="star-title">Star Mens Parlour</h1>
// //       </header>

// //       {/* Hero Section with Background */}
// //       <section className="star-hero">
// //         <div className="overlay">
// //           <h2>Welcome to Star Mens Parlour</h2>
// //           <p>Professional grooming & style at your fingertips</p>
// //         </div>
// //       </section>

// //       {/* Actions */}
// //       <div className="star-actions">
// //         <button className="star-btn">Add Service</button>
// //         <button className="star-btn">View Reports</button>
// //         <button className="star-btn">Manage Employees</button>
// //       </div>

// //       {/* Footer */}
// //       <footer className="star-footer">
// //         © 2025 Star Mens Parlour. All Rights Reserved.
// //       </footer>
// //     </div>
// //   );
//     // return(
//     //     <div>
//     //         <header>
//     //             <div>
//     //                 <h1>Star Mens Salon</h1>
//     //                 <p>Your style, Our Passion</p>
//     //                 <button>Book Appointment</button>
//     //             </div>
//     //         </header>

//     //     </div>
//     // )
// }

// export default Home
import React from "react";
import "./CSS/Home.css";

const Home = () => {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <header className="hero">
        <h1>Star Salon & Spa</h1>
        <p>Look Good. Feel Confident. Be Yourself.</p>
        <button className="book-btn">Book Now</button>
      </header>

      {/* About */}
      <section className="about">
        <h2>About Us</h2>
        <p>
          At Star Salon, we believe grooming is an art. From haircuts to facials,
          our experienced team ensures you look and feel your best.
        </p>
      </section>

      {/* Services */}
      <section className="services">
        <h2>Our Services</h2>
        <div className="service-grid">
          <div className="service-card">
            <h3>Hair Cut</h3>
            <p>₹150 onwards</p>
          </div>
          <div className="service-card">
            <h3>Hair Color</h3>
            <p>₹500 onwards</p>
          </div>
          <div className="service-card">
            <h3>Facial</h3>
            <p>₹800 onwards</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="contact">
        <h2>Contact Us</h2>
        <p>📍 Professor Chowk, Pune</p>
        <p>📞 +91 98765 43210</p>
        <a
          href="https://wa.me/919876543210?text=Hi%20Star%20Salon,%20I%20want%20to%20book%20an%20appointment."
          className="whatsapp-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chat on WhatsApp
        </a>
      </section>
    </div>
  );
};

export default Home;
