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
        passwordConfirm
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
    <>
      <div class="text-3xl font-mono font-bold">Registracija korisnika</div>
      <Show when={!success()}>
        <form onSubmit={formSubmit} class="w-md">
          <div class="p-2 flex flex-col gap-1">
            <label> Ime </label>
            <input class="border rounded p-2" type="text" name="name" required />
          </div>
          <div class="p-2 flex flex-col gap-1">
            <label> E-mail adresa: </label>
            <input class="border rounded p-2" type="email" name="email" required />
          </div>
          <div class="p-2 flex flex-col gap-1">
            <label> Zaporka: </label>
            <input class="border rounded p-2" type="password" name="password" required minLength="6" />
          </div>
          <div class="p-2 flex flex-col gap-1">
            <label> Potvrda zaporke </label>
            <input class="border rounded p-2" type="password" name="passwordConfirm" required />
          </div>
          <div class="p-2 flex flex-col gap-1">
            <input class="border rounded p-2 bg-gray-600 hover:brightness-120" type="submit" value="Pošalji" />
          </div>
        </form>
      </Show>

      <Show when={success()}>
        <div class="m-2 p-4 rounded bg-emerald-500 w-md">
          Uspješno ste se registrirali! Preusmjeravanje...
        </div>
      </Show>

      <Show when={error()}>
        <div class="m-2 p-4 rounded bg-red-300 w-md">
          Dogodila se greška prilikom stvaranja korisničkog računa.
        </div>
      </Show>
    </>
  );
}
