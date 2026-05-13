const rootNode = document.documentElement;
const yearNode = document.querySelector("#year");
const revealNodes = document.querySelectorAll(".reveal");

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
