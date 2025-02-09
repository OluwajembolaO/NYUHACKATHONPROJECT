import React from "react";
import { motion } from "framer-motion";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="container">
      {/* Hero Section */}
      <motion.div
        className="hero"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Assess Your Heart Attack Risk Instantly
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Our AI-powered tool analyzes health and environmental factors to
          predict your risk and provide actionable insights.
        </motion.p>
        <motion.button
          className="cta-button"
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 0px 15px rgba(255, 0, 0, 0.6)",
          }}
        >
          Check Your Risk Now
        </motion.button>
      </motion.div>

      {/* Features Section */}
      <div className="features">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="feature-grid">
          <motion.div className="feature-item" whileHover={{ scale: 1.05 }}>
            <h3>🌍 Location-Based Insights (COMING SOON)</h3>
            <p>
              We analyze air quality, pollution levels, and regional risk
              factors.
            </p>
          </motion.div>
          <motion.div className="feature-item" whileHover={{ scale: 1.05 }}>
            <h3>🧠 AI-Powered Predictions</h3>
            <p>
              Our machine learning model provides accurate risk assessments.
            </p>
          </motion.div>
          <motion.div className="feature-item" whileHover={{ scale: 1.05 }}>
            <h3>💡 Personalized Advice</h3>
            <p>Get tailored recommendations to improve your heart health.</p>
          </motion.div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <ul className="steps-list">
          <motion.li className="step-item" whileHover={{ scale: 1.05 }}>
            <span className="step-number">1.</span>
            Enter your location and lifestyle information.
          </motion.li>
          <motion.li className="step-item" whileHover={{ scale: 1.05 }}>
            <span className="step-number">2.</span>
            Our AI analyzes your risk based on real health data.
          </motion.li>
          <motion.li className="step-item" whileHover={{ scale: 1.05 }}>
            <span className="step-number">3.</span>
            Receive a personalized report with actionable recommendations.
          </motion.li>
        </ul>
      </div>

      {/* Team Section */}
      <div className="team">
        <h2 className="section-title">Meet Our Team</h2>
        <div className="team-grid">
          <motion.div className="team-member" whileHover={{ scale: 1.1 }}>
            <img src="https://uploads.codesandbox.io/uploads/user/user_CnDm9PTmUfS2umeJHtjn2D/0Xz4-profilepic.jpg" alt="Team Member 1" />
            <h3>Sultan Malik</h3>
            <p>Front-End Developer</p>
          </motion.div>
          <motion.div className="team-member" whileHover={{ scale: 1.1 }}>
            <img src="https://cdn.discordapp.com/attachments/831972622492237854/1338172876909707266/IMG_0958.jpg?ex=67aa1e1b&is=67a8cc9b&hm=f0f24e3aed750436ac60bc9d73f1f94ea394c61ab33edc2c93b90055d3a0b230&" alt="Team Member 2" />
            <h3>Sean Lee</h3>
            <p>Front-End Developer</p>
          </motion.div>
          <motion.div className="team-member" whileHover={{ scale: 1.1 }}>
            <img src="https://cdn.discordapp.com/attachments/831972622492237854/1338172875655479382/IMG_2829.jpg?ex=67aa1e1b&is=67a8cc9b&hm=70596f58ce1ed400bf9f94c63223fed51e34c05290bbfa37ea5cf24c55dd39c0&" alt="Team Member 3" />
            <h3>Sam Lee</h3>
            <p>Healthcare Specialist</p>
          </motion.div>
          <motion.div className="team-member" whileHover={{ scale: 1.1 }}>
            <img src="https://cdn.discordapp.com/attachments/831972622492237854/1338172876108333148/1724005231265.png?ex=67aa1e1b&is=67a8cc9b&hm=6ad64d04e76b28aa315b03e0d1e849ee6e4fc64eb541acc5deb362b40d36fae9&" alt="Team Member 3" />
            <h3>Oluwajembola Orioke</h3>
            <p>Healthcare Specialist</p>
          </motion.div>
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        className="cta-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2>Take Control of Your Heart Health Today</h2>
        <motion.button
          className="cta-button"
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 0px 15px rgba(0, 255, 0, 0.6)",
          }}
        >
          Get Started Now
        </motion.button>
      </motion.div>
    </div>
  );
};

export default HomePage;
