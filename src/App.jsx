import { Route, Router } from "@solidjs/router";
import { AuthProvider, useAuth } from "./components/AuthProvider";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";
import Error from "./pages/Error";
import { Show } from "solid-js";
import { A } from "@solidjs/router";
import Signout from "./pages/SignOut";


export default function App() {
  return (
    <AuthProvider>
      <Router root={Layout}>
        <Route path="/" component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp}/>
        <Route path="/signout" component={Signout} />
        <Route path="/error" component={Error} />
        <Route path="*" component={() => <Navigate href="/error" />} />
      </Router>
    </AuthProvider>
  );
}

function Layout(props) {
  const appName = import.meta.env.VITE_APP_NAME;
  const user = useAuth();


  return (
    <>
      <header class=" flex flex-row gap-2 items-center p-2">
        <div class="flex-none">
          <A class="text-4xl font-bold font-sans uppercase text-cyan-600" href="/">{appName}</A>
        </div>
        <nav class="flex-1 pl text-right">
          <Show when={user()}>
            <A class="p-2 bg-red-500 text-gray-50 font-bold rounded hover:brightness-90" href="/signout">Odjava</A>
          </Show>
          <Show when={!user()}>
            <A class="p-2 bg-amber-500 text-gray-50 font-bold rounded hover:brightness-120" href="/signup">Registracija</A>
            <A class="p-2 bg-amber-500 text-gray-50 font-bold rounded hover:brightness-120" href="/signin">Prijava</A>
          </Show>
        </nav>
      </header>
      <main>{props.children}</main>
      <footer class="flex-none py-6 px-2 bg-cyan-700 text-white text-sm text-center">
        Copyright {appName}
      </footer>
    </>
  );
}
