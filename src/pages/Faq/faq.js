import React, { useState } from 'react';
import './faq.css';
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

const FAQ = () => {
    const [faqs, setFaqs] = useState([
        {question: "What services does Lifeline Healthcare offer?",
            answer: "Lifeline Healthcare provides a range of services including online consultations with healthcare professionals, appointment scheduling, health screenings, personalized health plans, and access to health records. For a complete list of services, please visit our Services page." ,

            isOpen: false
        },
        {    question: "How do I register for an account?",
            answer: "To register, click on the 'Sign Up' button on our homepage. Fill in your personal details, including your name, email address, and contact information. After submitting the form, you'll receive a confirmation email. Follow the instructions in the email to complete your registration." ,

            isOpen: false
        },
        {    question: "How can I reset my password?",
            answer: "If you’ve forgotten your password, click on the 'Forgot Password' link on the login page. Enter your registered email address, and we’ll send you a link to reset your password. Follow the instructions in the email to create a new password." ,

            isOpen: false
        },
        { question: "How do I schedule an appointment?",
            answer: "Log in to your account and go to the 'Appointments' section. Choose your preferred healthcare provider, date, and time. Confirm your appointment details, and you’ll receive a confirmation email with the appointment information." ,

            isOpen: false
        },
        { question: "What should I do if I need to cancel or reschedule an appointment?",
            answer: "To cancel or reschedule an appointment, log in to your account and go to the 'Appointments' section. Select the appointment you wish to modify and choose either 'Cancel' or 'Reschedule'.' Follow the prompts to complete the process'. ",

            isOpen: false
        },
        { question: "How can I contact customer support?",
            answer: "You can contact our customer support team by visiting the 'Contact Us' page on our website. You can either fill out the contact form or reach us via email at support@lifelinehealthcare.com. For urgent inquiries, please call our support hotline at 0112 333 944" ,

            isOpen: false
        },
        { question: "Is my personal information secure on Lifeline Healthcare?",
            answer: "Yes, your privacy and security are our top priorities. We use industry-standard encryption and security measures to protect your personal and medical information. For more details, please review our Privacy Policy." ,

            isOpen: false
        },
        { question: "What should I do if I encounter a technical issue with the website?",
            answer: "If you experience any technical issues, please visit our 'Help Center' for troubleshooting tips. If you need further assistance, contact our customer support team at support@lifelinehealthcare.com or call 0112698572" ,

            isOpen: false
        },
        {    question: "What do I do if I have a medical emergency?",
            answer: "For immediate medical emergencies, please call your local emergency services or go to the nearest emergency room. Lifeline Healthcare’s online services are not intended for emergency medical situations." ,

            isOpen: false
        },
        { question: "Are there any special offers or discounts available?",
            answer: "Yes, we periodically offer promotions and discounts on our services. Check the 'Offers' section of our website or subscribe to our newsletter to stay informed about the latest deals and offers." ,

            isOpen: false
        }






    ]);

    const toggleFAQ = index => {
        setFaqs(faqs.map((faq, i) => {
            if (i === index) {
                faq.isOpen = !faq.isOpen;
            } else {
                faq.isOpen = false;
            }
            return faq;
        }));
    };

    return (
        <div>
            <NavBar/>
        <div className="faq-container">
            <h1>Frequently Asked Questions</h1>
            {faqs.map((faq, index) => (
                <div key={index} className={`faq-item ${faq.isOpen ? 'open' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFAQ(index)}>
                        {faq.question}
                        <span className="faq-toggle-arrow">{faq.isOpen ? '▲' : '▼'}</span>
                    </div>
                    {faq.isOpen && (
                        <div className="faq-answer">
                            {faq.answer}
                        </div>
                    )}
                </div>
            ))}
        </div>
            <Footer/>
        </div>
    );
};

export default FAQ;
