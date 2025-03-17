export default function SignIn() {
    function formSubmit() { };

    return (
        <>
            <div class=" text-3xl font-mono font-bold">Prijava korisnika</div>
            <form onSubmit={formSubmit} class="w-md">
                <div class="p-2 flex flex-col gap-1">
                    <label> E-mail adresa: </label>
                    <input class="border rounded p-2" type="email" name="email" required="true" />
                </div>

                <div class="p-2 flex flex-col gap-1">
                    <label> Zaporka: </label>
                    <input class="border rounded p-2" type="password" name="password" required="true" min="6" />
                </div>

                <div class="p-2 flex flex-col gap-1">
                    <input class="border rounded p-2 bg-slate-600 hover:brightness-120" type="submit" value="Pošalji" />
                </div>
            </form>
        </>
    )
}