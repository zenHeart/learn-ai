import { defineMarkdownSetup } from "@slidev/types";
import Comark from "@comark/markdown-it";

export default defineMarkdownSetup((md) => {
  md.use(Comark);
});
