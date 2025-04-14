import { onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { pb } from "../services/pocketbase";
import AlertMessage from "../components/AlertMessage";

export default function Signout() {
  const navigate = useNavigate();

  onMount(() => {
    pb.authStore.clear(); 

    setTimeout(() => {
      navigate("/");
    }, 3000);
  });

  return (
    <AlertMessage message="Uspješno ste se odjavili." />
  );
}
