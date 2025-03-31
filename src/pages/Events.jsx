import { createSignal, Show } from "solid-js";
import { pb } from "../services/pocketbase";
import { useAuth } from "../components/AuthProvider";
import AlertMessage from "../components/AlertMessage";

export default function Events(props) {
    const user = useAuth();
    const [success, setSuccess] = createSignal(false);
    const [error, setError] = createSignal(false);

    async function formSubmit(event) {
        event.preventDefault();

        setError(false);
        setSuccess(false);

        const formData = new FormData(event.target);

        const name = formData.get("name");
        const details = formData.get("details");
        const start = formData.get("start"); 
        const maxSeats = formData.get("maxSeats");
        
        try {
            const data = {
                name: name,
                details: details,
                start: new Date(start), 
                maxSeats: maxSeats, 
                author: user().id
            }
            console.log(data);
            
            const record = await pb.collection('events').create(data);
            setSuccess(true);
            event.target.reset();
        } catch (error) {
            setError(true);
        }
    }

    return (
        <>
            <h2 class="text-3xl font-bold text-cyan-600 mb-6 text-center">Događaji</h2>
            <Show when={success()}>
                <AlertMessage message="Uspješno ste dodali događaj" />
            </Show>
            <Show when={error()}>
                <AlertMessage message="Dogodila se greška! Provjerite podatke." />
            </Show>
            <form onSubmit={formSubmit} class="space-y-4">
                <div>
                    <label class="block text-gray-700 font-medium mb-1">Naziv događaja</label>
                    <input class="w-full border rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-400" type="text" name="name" minLength="3" maxLength="100" required />
                </div>
                <div>
                    <label class="block text-gray-700 font-medium mb-1">Opis</label>
                    <textarea class="border rounded p-2 h-40" name="details" required></textarea>
                </div>
                <div>
                    <label class="block text-gray-700 font-medium mb-1">Početak</label>
                    <input class="border rounded p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-400" type="datetime-local" name="start" required />
                </div>
                <div>
                    <label class="block text-gray-700 font-medium mb-1">Maksimalni broj mjesta</label>
                    <input class="w-full border rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-400" type="number" name="maxSeats" step="1" min="1" required />
                </div>
                <div>
                    <button class="w-full bg-amber-500 text-white font-medium py-3 rounded-lg shadow-md hover:bg-amber-600 transition" type="submit">Pošalji</button>
                    <button class="w-full bg-slate-500 text-white font-medium py-3 rounded-lg shadow-md hover:bg-slate-600 transition" type="reset">Reset</button>
                </div>
            </form>
        </>
    );
}