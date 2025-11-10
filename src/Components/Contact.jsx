// src/Components/Contact.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../assets/css/style.css";
import { FaMicrosoft } from "react-icons/fa";
import { SiKubernetes, SiTerraform } from "react-icons/si";

const certifications = [
  {
    id: 1,
    title: "CKAD - Certified Kubernetes Application Developer",
    credential: "Certificate ID: LF-zkmt4sg87r",
    icon: <SiKubernetes className="cert-icon" />,
  },
  {
    id: 2,
    title: "Microsoft Certified: Azure Fundamentals (AZ-900)",
    credential: "Credential ID: 14AC0D6847460314",
    icon: <FaMicrosoft className="cert-icon" />,
  },
  {
    id: 3,
    title: "Microsoft Certified: Azure Administrator Associate (AZ-104)",
    credential: "Credential ID: D88FDF4DA1F5444E",
    icon: <FaMicrosoft className="cert-icon" />,
  },
  {
    id: 4,
    title: "HashiCorp Certified: Terraform Associate (003)",
    credential: "",
    icon: <SiTerraform className="cert-icon" />,
  },
];

const Contact = () => {
  const [index, setIndex] = useState(0);

  // Auto-slide every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % certifications.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="contact" className="cert-section">
      <h2>Certifications</h2>
      <div className="cert-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={certifications[index].id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            className="cert-card"
          >
            <div className="cert-icon-wrapper">{certifications[index].icon}</div>
            <h3>{certifications[index].title}</h3>
            <p>{certifications[index].credential}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Contact;
