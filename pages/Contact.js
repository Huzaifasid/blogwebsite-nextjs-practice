import React, { useState } from "react";
import styles from "../styles/Contact.module.css";
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [desc, setDesc] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(name, email, phone, desc);
    const data = { name, email, phone, desc };
    try {
      let apiData = await fetch("http://localhost:3000/api/postcontact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let response = await apiData.json();
      console.log(response);
      setName("");
      setEmail("");
      setPhone("");
      setDesc("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "desc") {
      setDesc(e.target.value);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.mb3}>
          <label htmlFor="name" className={styles.formlabel}>
            Enter Your Name
          </label>
          <input
            type="text"
            className={styles.input}
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            required
            aria-describedby="emailHelp"
          />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="email" className={styles.formlabel}>
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={handleChange}
            className={styles.input}
            id="email"
            name="email"
            required
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className={styles.formtext}>
            we will never share your email with anyone else.
          </div>
        </div>
        <div className={styles.mb3}>
          <label htmlFor="phone" className={styles.formlabel}>
            Enter Your Phone Number
          </label>
          <input
            type="phone"
            value={phone}
            onChange={handleChange}
            className={styles.input}
            id="phone"
            name="phone"
            required
          />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="desc" className={styles.formlabel}>
            Your Feedback
          </label>
          <textarea
            className={styles.input}
            value={desc}
            onChange={handleChange}
            id="desc"
            required
            name="desc"
          />
        </div>

        <button type="submit" className={styles.btn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
