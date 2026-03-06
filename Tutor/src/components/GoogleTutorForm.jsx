import React, { useRef, useState } from "react";
import HeroTofu from "./HeroTofu";
import { formAPI, authAPI } from "../api/apiClient";

export default function GoogleTutorForm({ formType = "join", onClose }) {
  // Refs and state for local validation / UX
  const formRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showTofu, setShowTofu] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Ref to track timeout for clearing messages
  const successTimeoutRef = useRef(null);

  // Load current user on component mount
  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await authAPI.getCurrentUser();
        setCurrentUser(user);
      } catch (err) {
        console.log('User not logged in');
      }
    };
    loadUser();

    // Cleanup timeout on unmount
    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const form = formRef.current;
    const formData = new FormData(form);

    // Build request payload based on form type
    const payload = {};
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      if (input.value) payload[input.name] = input.value;
    });

    // Validation differs by form type
    if (formType === "find") {
      if (!payload.name || !payload.email || !payload.contactNumber || !payload.class) {
        setErrorMsg("Please fill required fields: Name, Email, Contact Number, and Class.");
        return;
      }
    } else {
      if (!payload.name || !payload.email || !payload.subject) {
        setErrorMsg("Please fill required fields: Name, Email, and Subject.");
        return;
      }
    }

    setSubmitting(true);
    try {
      // Determine form type for backend
      const submissionType = formType === "find" ? "tutor_search" : "tutor_application";

      // Submit to backend
      await formAPI.submitForm(
        payload.name,
        payload.email,
        payload.contactNumber || "",
        payload.subject,
        payload.message || "",
        submissionType
      );

      setSuccessMsg(
        formType === "find"
          ? "Form submitted successfully! We'll help you find a tutor soon."
          : "Thank you for applying! We'll review your application and get back to you."
      );
      form.reset();
      setShowTofu(true);

      // Clear any existing timeout
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }

      // Auto-close modal and reset form after 2.5 seconds
      successTimeoutRef.current = setTimeout(() => {
        setSuccessMsg("");
        setShowTofu(false);
        if (onClose) {
          onClose();
        }
      }, 2500);
    } catch (error) {
      setErrorMsg(`Submission failed: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 720,
        margin: "24px auto",
        padding: 20,
        border: "1px solid #eee",
        borderRadius: 8,
      }}
    >
      {/* <h2 style={{ marginBottom: 8 }}>
        {formType === "find" ? "Find a Tutor" : "Join as a Tutor"}
      </h2>
      <p style={{ marginTop: 0, color: "#555" }}>
        {formType === "find"
          ? "Search for and connect with qualified tutors. Fill this form to find a tutor that matches your learning needs."
          : "Fill this form to apply as a tutor. We'll review your application and get back to you."}
      </p> */}

      <form
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <label style={{ display: "block", marginTop: 12 }}>
          Full name *
          <input
            name="name"
            type="text"
            placeholder="Your full name"
            required
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </label>

        <label style={{ display: "block", marginTop: 12 }}>
          Email *
          <input
            name="email"
            type="email"
            placeholder="your.email@example.com"
            required
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </label>

        <label style={{ display: "block", marginTop: 12 }}>
          {formType === "find"
            ? "Contact Number *"
            : "Subject / Teaching Area *"}
          <input
            name={
              formType === "find"
                ? "contactNumber"
                : "subject"
            }
            type={formType === "find" ? "tel" : "text"}
            placeholder={
              formType === "find"
                ? "e.g., +91 9876543210"
                : "e.g., Mathematics, Physics, English"
            }
            required
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </label>

        {formType === "find" && (
          <>
            <label style={{ display: "block", marginTop: 12 }}>
              Class *
              <input
                name="class"
                type="text"
                placeholder="e.g., Class 10, Class 12, Bachelor"
                required
                style={{ width: "100%", padding: 8, marginTop: 6 }}
              />
            </label>

            <label style={{ display: "block", marginTop: 12 }}>
              Subject
              <input
                name="subject"
                type="text"
                placeholder="e.g., Mathematics, Physics, English"
                style={{ width: "100%", padding: 8, marginTop: 6 }}
              />
            </label>
          </>
        )}

        {formType === "join" && (
          <>
            <label style={{ display: "block", marginTop: 12 }}>
              Years of Experience
              <input
                name="experience"
                type="number"
                min="0"
                placeholder="e.g., 2"
                style={{ width: "100%", padding: 8, marginTop: 6 }}
              />
            </label>

            {/* <label style={{ display: "block", marginTop: 12 }}>
              CV / Portfolio Link (Google Drive, GitHub, etc.)
              <input
                name="cvLink"
                type="url"
                placeholder="https://"
                style={{ width: "100%", padding: 8, marginTop: 6 }}
              />
            </label> */}

            <label style={{ display: "block", marginTop: 12 }}>
              Availability (Days & Times)
              <input
                name="availability"
                type="text"
                placeholder="e.g., Weekdays 5pm-8pm"
                style={{ width: "100%", padding: 8, marginTop: 6 }}
              />
            </label>

            {/* <label style={{ display: "block", marginTop: 12 }}>
              A short message / teaching philosophy
              <textarea
                name="message"
                rows="5"
                placeholder="Tell us a little about your teaching approach..."
                style={{ width: "100%", padding: 8, marginTop: 6 }}
              />
            </label> */}
          </>
        )}

        <div
          style={{
            marginTop: 14,
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          <button
            type="submit"
            disabled={submitting}
            style={{
              padding: "10px 16px",
              background: "#1a73e8",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            {submitting ? "Submitting..." : "Submit Application"}
          </button>

          <button
            type="button"
            onClick={() => {
              formRef.current.reset();
              setErrorMsg("");
              setSuccessMsg("");
            }}
            style={{
              padding: "10px 12px",
              background: "#f1f3f4",
              border: "1px solid #ddd",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>

        {errorMsg && (
          <p style={{ color: "crimson", marginTop: 12 }}>{errorMsg}</p>
        )}
        {successMsg && (
          <>
            <p style={{ color: "green", marginTop: 12 }}>{successMsg}</p>
            {formType === "join" && (
              <p style={{ color: "gray", fontSize: 12, marginTop: 6 }}>
                Your application has been saved. Our team will review it and contact you via email.
              </p>
            )}
          </>
        )}
        {showTofu && (
          <HeroTofu
            message={successMsg || "Form submitted successfully"}
            onClose={() => setShowTofu(false)}
          />
        )}
      </form>
    </div>
  );
}
