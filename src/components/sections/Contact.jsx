import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-contnet: center;
  position: rlative;
  z-index: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;
const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 32px;
  border-radius: 12px;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;
const ContactTitle = styled.div`
  font-size: 28px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;
const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;
const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;
const ContactButton = styled.button`
  width: 100%;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  padding: 12px 16px;
  border-radius: 8px;
  background-color: transparent;
  border: 2px solid ${({ theme }) => theme.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 70, 209, 0.2);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const Contact = () => {
  const form = useRef();

  useEffect(() => {
    emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);
  }, []);

  const handelSubmit = (e) => {
    e.preventDefault();
    
    // Get the email input value
    const emailInput = form.current.querySelector('input[name="from_email"]');
    const email = emailInput.value;
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Show sending state
    const submitButton = form.current.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = "Sending...";
    submitButton.disabled = true;

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current
      )
      .then(
        (result) => {
          alert("Message sent successfully! I will get back to you soon.");
          form.current.reset();
          submitButton.innerHTML = originalText;
          submitButton.disabled = false;
        },
        (error) => {
          alert("Failed to send message. Please try again later.");
          console.error("EmailJS Error:", error);
          submitButton.innerHTML = originalText;
          submitButton.disabled = false;
        }
      );
  };

  return (
    <Container id="contact">
      <Wrapper>
        <Title>Contact</Title>
        <Desc
          style={{
            marginBottom: "40px",
          }}
        >
          Feel free to reach out to me for any questions or opportunities!
        </Desc>
        <ContactForm ref={form} onSubmit={handelSubmit}>
          <ContactTitle>CONTACT ME</ContactTitle>
          <ContactInput 
            type="email" 
            placeholder="Your Email" 
            name="from_email" 
            required 
            pattern="[^\s@]+@[^\s@]+\.[^\s@]+" 
            title="Please enter a valid email address"
          />
          <ContactInput 
            type="text" 
            placeholder="Your Name" 
            name="from_name" 
            required 
          />
          <ContactInput 
            type="text" 
            placeholder="Subject" 
            name="subject" 
            required 
          />
          <ContactInputMessage 
            placeholder="Message" 
            name="message" 
            rows={4} 
            required 
          />
          <ContactButton type="submit">
            Send Message
          </ContactButton>
        </ContactForm>
      </Wrapper>
    </Container>
  );
};

export default Contact;