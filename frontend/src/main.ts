import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import type { AppRouter } from "../../backend/src/server";
import { createTRPCClient } from "@trpc/client";

createApp(App).mount("#app");

const client = createTRPCClient<AppRouter>({
  url: "http://localhost:5000/trpc",
});

async function main() {
  const bilbo = await client.query("getUser", "id_bilbo");
  console.log(bilbo);

  // => { id: 'id_bilbo', name: 'Bilbo' };

  const frodo = await client.mutation("createUser", { name: "Frodo" });
  // => { id: 'id_frodo', name: 'Frodo' };
  console.log(frodo);
}

main();
