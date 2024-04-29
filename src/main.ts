import { $derived, $effect, $state } from "./signals";
import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

const counterEl = document.querySelector<HTMLButtonElement>("#counter")!;

let count = $state(0);
const double = $derived(() => count.get() * 2);

// event listener
counterEl.addEventListener("click", () => {
  count.set(count.get() + 1);
});
// side effect: dom update
$effect(() => {
  counterEl.textContent = count.get().toString();
});

$effect(() => {
  console.log("double", double.get());
});
