const EMAILJS_PUBLIC_KEY = "xaCDRHrABCOVKBO9S";
const EMAILJS_SERVICE_ID = "service_51seq9o";
const EMAILJS_TEMPLATE_ID = "template_la9mz5r";

const locationBtn = document.getElementById("locationBtn");
const status = document.getElementById("status");

// Initialize EmailJS using your public key.
emailjs.init({
  publicKey: EMAILJS_PUBLIC_KEY,
});

locationBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    status.textContent = "Geolocation is not supported by your browser.";
    return;
  }

  locationBtn.disabled = true;
  status.textContent = "Requesting location permission...";

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const templateParams = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp:
          new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          }) + " IST",
      };

      status.textContent = "Sending location details by email...";

      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
        );

        status.textContent = "Location details sent successfully.";
      } catch (error) {
        console.error("EmailJS error:", error);
        status.textContent = "Unable to send the email. Please try again.";
      } finally {
        locationBtn.disabled = false;
      }
    },
    (error) => {
      const messages = {
        1: "Location permission was denied.",
        2: "Your location is currently unavailable.",
        3: "The location request timed out.",
      };

      status.textContent =
        messages[error.code] || "Unable to retrieve your location.";

      locationBtn.disabled = false;
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    },
  );
});
