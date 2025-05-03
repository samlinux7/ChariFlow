import React from 'react';
import './AboutUsPage.css';

const AboutUsPage = () => {
    return (
        <div className="about-us-page">
            <header className="about-us-header">
                <h1>About Us</h1>
            </header>
            <section className="about-us-content">
                <p>
                    Welcome to ChariFlow! We are dedicated to making the world a better place by connecting people with causes they care about.
                </p>
                <p>
                    Our mission is to empower individuals and organizations to create meaningful change through innovative solutions and collaboration.
                </p>
            </section>
            <footer className="about-us-footer">
                <p>Contact us at: support@chariflow.com</p>
            </footer>
        </div>
    );
};

export default AboutUsPage;