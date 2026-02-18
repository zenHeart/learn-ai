import { defineAppSetup } from "@slidev/types";

export default defineAppSetup(({ app, router }) => {
  // Load Twitter widgets script when the app is mounted
  router.afterEach(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.head.appendChild(script);
  });
});
