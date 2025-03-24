import { createSignal, Show } from "solid-js";
import { pb } from "../services/pocketbase";
import { useNavigate } from "@solidjs/router";

export default function SignIn() {
  const navigate = useNavigate();
  const [error, setError] = createSignal(false);

  async function formSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await pb.collection("users").authWithPassword(email, password);
      navigate("/");
    } catch (error) {
      console.log("Error", error);
      setError(true);
    }
  }

  return (
    <div class="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-8">
      <h2 class="text-3xl font-bold text-cyan-600 mb-6 text-center">
        Prijava korisnika
      </h2>

      <form onSubmit={formSubmit} class="space-y-4">
        <div>
          <label class="block text-gray-700 font-medium mb-1">
            E-mail adresa
          </label>
          <input
            class="w-full border rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            type="email"
            name="email"
            required
          />
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-1">
            Zaporka
          </label>
          <input
            class="w-full border rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            type="password"
            name="password"
            required
            minLength="6"
          />
        </div>

        <div>
          <button
            class="w-full bg-amber-500 text-white font-medium py-3 rounded-lg shadow-md hover:bg-amber-600 transition"
            type="submit"
          >
            Pošalji
          </button>
        </div>
      </form>

      <Show when={error()}>
        <div class="mt-4 p-4 bg-red-500 text-white font-medium rounded-lg shadow">
          ❌ Dogodila se greška prilikom prijave, provjerite svoju e-mail adresu i/ili zaporku.
        </div>
      </Show>
    </div>
  );
}
