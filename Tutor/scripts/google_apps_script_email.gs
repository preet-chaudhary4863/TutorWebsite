/**
 * Google Apps Script: send email on Form submit
 *
 * Install: Open the Google Sheet that collects Form responses -> Extensions -> Apps Script
 * Create a new script and paste this file. Then set up an installable trigger: On form submit -> sendFormResponseByEmail
 * Replace RECIPIENT_EMAIL with your email if needed.
 */

const RECIPIENT_EMAIL = "rajatgamerzexpert@gmail.com";

function sendFormResponseByEmail(e) {
  // e.values is an array: [timestamp, answer1, answer2, ...]
  const values = e.values || [];
  if (!values.length) return;

  const timestamp = values[0];
  const bodyLines = [];
  bodyLines.push("New Tutor Application Submitted");
  bodyLines.push("Submitted at: " + timestamp);
  bodyLines.push("");

  // include all fields
  for (let i = 1; i < values.length; i++) {
    bodyLines.push("Field " + i + ": " + values[i]);
  }

  const subject = "TutorConnect - New Application - " + timestamp;
  const body = bodyLines.join("\n");

  MailApp.sendEmail(RECIPIENT_EMAIL, subject, body);
}
