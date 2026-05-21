const rootNode = document.documentElement;
const yearNode = document.querySelector("#year");
const revealNodes = document.querySelectorAll(".reveal");
const platformButtons = document.querySelectorAll(".platform-button");
const trackLinks = document.querySelectorAll(".path-track-link");

const indigoPulseTrackLinks = {
  "seventh-step": {
    spotify: "https://open.spotify.com/track/3paRXfDBitmqd4aDvvFAfF",
    apple: "https://music.apple.com/us/album/seventh-step/1895857664?i=6764631951",
    amazon: "https://music.amazon.com/tracks/B0GYYXQ2Y7",
  },
  "one-short-of-a-dozen": {
    spotify: "https://open.spotify.com/track/1oASioAD6ixoThCv0bwBWd",
    apple: "https://music.apple.com/us/album/one-short-of-a-dozen/1895857664?i=6764632236",
    amazon: "https://music.amazon.com/tracks/B0GYZ76YCX",
  },
  "digital-sanctuary": {
    spotify: "https://open.spotify.com/track/1pSSt8pyJwEds8fBghnUeN",
    apple: "https://music.apple.com/us/album/digital-sanctuary/1895857664?i=6764631961",
    amazon: "https://music.amazon.com/tracks/B0GYYYT8BB",
  },
  "your-shadow-in-every-window": {
    spotify: "https://open.spotify.com/track/45iRLK7u7wnyWnD685D5yU",
    apple: "https://music.apple.com/us/album/your-shadow-in-every-window/1895857664?i=6764631956",
    amazon: "https://music.amazon.com/tracks/B0GYYRB73C",
  },
  "blue-lullaby": {
    spotify: "https://open.spotify.com/track/6Vi4S5CpVxAfzzNwqoPQiM",
    apple: "https://music.apple.com/us/album/blue-lullaby/1895857664?i=6764631957",
    amazon: "https://music.amazon.com/tracks/B0GYYQZKG9",
  },
  "same-small-ritual": {
    spotify: "https://open.spotify.com/track/78zw2QDjWqkCTkVAFp9P49",
    apple: "https://music.apple.com/us/album/same-small-ritual/1895857664?i=6764632238",
    amazon: "https://music.amazon.com/tracks/B0GYYR3ZXP",
  },
  "the-moment-is-here": {
    spotify: "https://open.spotify.com/track/0Dw62YsoHJX328hiZiPK7I",
    apple: "https://music.apple.com/us/album/the-moment-is-here/1895857664?i=6764631952",
    amazon: "https://music.amazon.com/tracks/B0GYZFGJN5",
  },
  "maybe-love-moves-like-this": {
    spotify: "https://open.spotify.com/track/5ovUOXJSvc3flV9tj2fMd3",
    apple: "https://music.apple.com/us/album/maybe-love-moves-like-this/1895857664?i=6764631958",
    amazon: "https://music.amazon.com/tracks/B0GYZ7RJ28",
  },
  "love-will-win": {
    spotify: "https://open.spotify.com/track/3qihZqYczkapoLJyIKEi8K",
    apple: "https://music.apple.com/us/album/love-will-win/1895857664?i=6764632233",
    amazon: "https://music.amazon.com/tracks/B0GYZ8LR74",
  },
};

let selectedPlatform = "spotify";

const forceScrollTop = () => {
  window.scrollTo(0, 0);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
  if (!window.location.hash) {
    forceScrollTop();
  }

  requestAnimationFrame(() => {
    if (!window.location.hash) {
      forceScrollTop();
    }

    rootNode.classList.add("allow-smooth-scroll");
  });
});

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const updateTrackLinks = () => {
  trackLinks.forEach((link) => {
    const trackSlug = link.dataset.track;
    const platformLinks = indigoPulseTrackLinks[trackSlug];

    if (!platformLinks || !platformLinks[selectedPlatform]) {
      link.removeAttribute("href");
      link.setAttribute("aria-disabled", "true");
      return;
    }

    link.href = platformLinks[selectedPlatform];
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.removeAttribute("aria-disabled");
  });
};

const updateActiveButton = (activeButton) => {
  platformButtons.forEach((button) => {
    const isActive = button === activeButton;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
};

platformButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedPlatform = button.dataset.platform;
    updateActiveButton(button);
    updateTrackLinks();
  });
});

updateTrackLinks();

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
    }
  );

  revealNodes.forEach((node) => observer.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}
