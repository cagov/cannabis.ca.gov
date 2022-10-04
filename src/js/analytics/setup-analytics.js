export default function setupAnalytics() {
  /*
    Changed the parameter names here to better match GA docs and new requirements.
    Old-to-new mappings:
      elementType ==> eventAction
      eventString ==> eventLabel
  */
  function reportGA(eventAction, eventLabel, eventCategory = "click") {
    if (typeof gtag !== "undefined") {
      gtag("event", eventAction, {
        event_category: eventCategory,
        event_label: eventLabel,
      });
    } else {
      setTimeout(() => {
        reportGA(eventAction, eventLabel, eventCategory);
      }, 500);
    }
  }

  document.querySelectorAll("cagov-accordion").forEach((acc) => {
    acc.addEventListener("click", function () {
      if (this.querySelector(".accordion-title")) {
        reportGA(
          "accordion",
          this.querySelector(".accordion-title").textContent.trim()
        );
      }
    });
  });

  document.querySelectorAll("a").forEach((a) => {
    // look for and track offsite and pdf links
    if (a.href.indexOf(window.location.hostname) > -1) {
      if (a.href.indexOf(".pdf") > -1) {
        a.addEventListener("click", function () {
          reportGA("pdf", this.href.split(window.location.hostname)[1]);
        });
      }
      if (a.href.indexOf("#") > -1) {
        a.addEventListener("click", function () {
          reportGA("anchor", this.href.split(window.location.hostname)[1]);
        });
      }
    } else {
      // console.log("Adding offsite link handler:",window.location.hostname,a.href);
      a.addEventListener("click", function () {
        reportGA("offsite", this.href);
      });
    }
  });

  if (document.querySelector("cagov-feedback")) {
    document
      .querySelector("cagov-feedback")
      .addEventListener("ratedPage", (evt) => {
        gtag("event", "rating", {
          event_category: "helpful",
          event_label: evt.detail,
        });
      });
  }

  // Create a throttled event listener.
  const throttle = (fn, delay) => (event) => {
    let wait = false;
    if (!wait) {
      fn(event);
      wait = true;
      setTimeout(() => {
        wait = false;
      }, delay);
    }
  };

  // Check for percentageScrolled at the following percentages.
  const scrollTriggers = [25, 50, 75, 90];
  // Record percentageScrolled upon hitting triggers, so we don't record these events again.
  const scrollHits = [];

  // Generates an event listener to track scroll percentage.
  // Run this within the 'throttle' function (above) to ease performance.
  const scrollHandler = (pagename) => () => {
    const viewportHeight = document.documentElement.clientHeight;
    const pageHeight = document.documentElement.scrollHeight;
    const trackableHeight = pageHeight - viewportHeight;
    const pixelsScrolled = window.pageYOffset;
    const percentageScrolled = Math.floor(
      (pixelsScrolled / trackableHeight) * 100
    );

    scrollTriggers.forEach((trigger) => {
      if (scrollHits.indexOf(trigger) === -1 && percentageScrolled >= trigger) {
        scrollHits.push(trigger);
        const eventAction = `scroll-${trigger}`;
        const eventLabel = `scroll-${trigger}-${pagename}`;
        // console.log("Triggered scroll ",trigger,eventLabel);
        reportGA(eventAction, eventLabel, "scroll");
      }
    });
  };
  window.addEventListener("scroll", throttle(scrollHandler("homepage"), 1000));

  // Give all analytics calls a chance to finish before following the link.
  // Note this generates a function for use by an event listener.
  // const linkHandler = (href, eventAction, eventLabel, follow = true) => (event) => {
  //   // Fire off reports to Google Analytics.
  //   reportGA(eventAction, eventLabel);
  // };

  // Add 'external' to front of any supplied links, when relevant.
  // const annotateExternalLinks = (link) => (link.hostname === document.location.hostname) ? link.href : `external-${link.href}`;
}
