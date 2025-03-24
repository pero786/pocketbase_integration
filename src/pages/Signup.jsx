import { createSignal, Show } from "solid-js";
import { pb } from "../services/pocketbase";
import { useNavigate } from "@solidjs/router";

export default function SignUp() {
  const [error, setError] = createSignal(false);
  const [success, setSuccess] = createSignal(false);
  const navigate = useNavigate();

  async function formSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const passwordConfirm = formData.get("passwordConfirm");

    if (password !== passwordConfirm) {
      setError(true);
      return;
    }

    try {
      await pb.collection("users").create({
        name,
        email,
        password,
        passwordConfirm,
      });
      setSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.log("Error", error);
      setError(true);
    }
  }

  return (
    <div class="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-8">
      <h2 class="text-3xl font-bold text-cyan-600 mb-6 text-center">
        Registracija korisnika
      </h2>

      <Show when={!success()}>
        <form onSubmit={formSubmit} class="space-y-4">
          <div>
            <label class="block text-gray-700 font-medium mb-1">
              Ime
            </label>
            <input
              class="w-full border rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              type="text"
              name="name"
              required
            />
          </div>

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
            <label class="block text-gray-700 font-medium mb-1">
              Potvrda zaporke
            </label>
            <input
              class="w-full border rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              type="password"
              name="passwordConfirm"
              required
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
      </Show>

      <Show when={success()}>
        <div class="mt-4 p-4 bg-emerald-500 text-white font-medium rounded-lg shadow">
          ✅ Uspješno ste se registrirali! Preusmjeravanje...
        </div>
      </Show>

      <Show when={error()}>
        <div class="mt-4 p-4 bg-red-500 text-white font-medium rounded-lg shadow">
          ❌ Dogodila se greška prilikom stvaranja korisničkog računa.
        </div>
      </Show>
    </div>
  );
}
