"use client";

import dynamic from "next/dynamic";

const ContactForm = dynamic(
  () => import("@/components/auth/contact-form"),
  { ssr: false }
);

const ContactPage = () => {
  return (
    <ContactForm />
  );
};

export default ContactPage;