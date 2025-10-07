(function() {
  // The URL of your Google Apps Script Web App.
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzMZ2qo5YK4SlZnRiEBNEGCT4GPUBMX08f9sVQB0_TamVBZfIFw42tXPsMHUir29Yh9/exec";
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
   * This version runs silently without updating the UI.
   * @param {string|number} cookieValue - The value to send to the script.
   */
  function sendTimestamp(cookieValue) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', SCRIPT_URL);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText);
            if (response.result === "success") {
              console.log("Timestamp successfully sent!");
            } else {
              console.error("Script error:", response.error);
            }
          } catch (e) {
              console.error("Parsing error:", e, "Response was:", xhr.responseText);
          }
        } else {
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
   * It checks for a cookie, generates one if needed, and ALWAYS sends the data.
   */
  function handlePageLoad() {
    let cookieValueToSend = getCookie(COOKIE_NAME);

    if (cookieValueToSend) {
      // If the cookie exists, we'll send its value.
      console.log(`Cookie '${COOKIE_NAME}' found with value: ${cookieValueToSend}. Sending timestamp.`);
    } else {
      // If the cookie doesn't exist, create it.
      cookieValueToSend = Math.floor(Math.random() * 100) + 1;
      setCookie(COOKIE_NAME, cookieValueToSend, 1); // Set cookie to expire in 1 hour
      console.log(`Cookie not found. Set new cookie with value: ${cookieValueToSend}. Sending timestamp.`);
    }
    
    // This now runs regardless of whether the cookie was found or newly created.
    sendTimestamp(cookieValueToSend);
  }

  // Add an event listener to run the logic once the page content has fully loaded.
  document.addEventListener("DOMContentLoaded", handlePageLoad);
})();
