(function() {
  // The URL of your Google Apps Script Web App.
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyAPK-ke1Af8m5_KZ_BrVtRMCMniQwefs7l-ldiaECKL3bxD4fqorpeLuAVFTLWLsi_/exec";
  const COOKIE_NAME = 'visitTracker';

  /**
   * Sets a cookie with a name, value, and expiration in hours.
   * @param {string} name - The name of the cookie.
   * @param {string|number} value - The value of the cookie.
   * @param {number} hours - The number of hours until the cookie expires.
   */
  function setCookie(name, value, hours) {
    let expires = "";
    if (hours) {
      const date = new Date();
      date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  /**
   * Gets a cookie's value by its name.
   * @param {string} name - The name of the cookie to retrieve.
   * @returns {string|null} The cookie value, or null if not found.
   */
  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  /**
   * Sends a POST request to the Google Apps Script to record a timestamp and cookie value.
   * @param {string|number} cookieValue - The value to send to the script.
   */
  function sendTimestamp(cookieValue) {
    const statusDiv = document.getElementById('status');
    const xhr = new XMLHttpRequest();
    xhr.open('POST', SCRIPT_URL);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText);
            if (response.result === "success") {
              statusDiv.textContent = "Timestamp successfully sent!";
              statusDiv.className = "status-message success";
            } else {
              statusDiv.textContent = "An error occurred: " + (response.error.message || "Unknown script error");
              statusDiv.className = "status-message error";
              console.error("Script error:", response.error);
            }
          } catch (e) {
              statusDiv.textContent = "Failed to parse response from server.";
              statusDiv.className = "status-message error";
              console.error("Parsing error:", e, "Response was:", xhr.responseText);
          }
        } else {
          statusDiv.textContent = "Failed to send timestamp. Server responded with status: " + xhr.status;
          statusDiv.className = "status-message error";
          console.error("HTTP error:", xhr.status, xhr.statusText);
        }
      }
    };
    
    // URL encode the data for sending as post data
    const data = { cookieValue: cookieValue };
    const encoded = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    }).join('&');
    xhr.send(encoded);
  }

  /**
   * Main function that runs when the page loads.
   * Checks for a cookie and decides whether to send a timestamp.
   */
  function handlePageLoad() {
    const statusDiv = document.getElementById('status');
    const existingCookie = getCookie(COOKIE_NAME);

    if (existingCookie) {
      // If the cookie exists, don't send anything.
      statusDiv.textContent = "You've visited recently. Timestamp not sent.";
      statusDiv.className = "status-message sending"; // A neutral-ish color
      console.log(`Cookie '${COOKIE_NAME}' found with value: ${existingCookie}. No action taken.`);
    } else {
      // If the cookie doesn't exist, create it and send the data.
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      setCookie(COOKIE_NAME, randomNumber, 1); // Set cookie to expire in 1 hour
      
      statusDiv.textContent = `Sending timestamp with value: ${randomNumber}...`;
      statusDiv.className = "status-message sending";
      sendTimestamp(randomNumber);
    }
  }

  // Add an event listener to run the logic once the page content has fully loaded.
  document.addEventListener("DOMContentLoaded", handlePageLoad);
})();

