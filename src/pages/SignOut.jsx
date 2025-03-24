import { onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { pb } from "../services/pocketbase";

export default function Signout() {
  const navigate = useNavigate();

  onMount(() => {
    pb.authStore.clear(); 

    setTimeout(() => {
      navigate("/");
    }, 3000);
  });

  return (
    <div class="m-2 p-4 rounded bg-emerald-500 w-md">
      Uspješno ste se odjavili. Preusmjeravanje na naslovnicu...
    </div>
  );
}
