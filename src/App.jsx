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
    <div class="flex flex-col min-h-screen bg-gray-100">
      <header class="bg-white shadow-md">
        <div class="container mx-auto px-4 py-3 flex justify-between items-center">
          <A class="text-3xl font-bold font-sans uppercase text-cyan-600 tracking-wide" href="/">
            {appName}
          </A>
          <nav class="flex gap-4">
            <Show when={user()}>
              <A class="px-4 py-2 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 transition" href="/signout">
                Odjava
              </A>
            </Show>
            <Show when={!user()}>
              <A class="px-4 py-2 bg-amber-500 text-white font-medium rounded-lg shadow-md hover:bg-amber-600 transition" href="/signup">
                Registracija
              </A>
              <A class="px-4 py-2 bg-amber-500 text-white font-medium rounded-lg shadow-md hover:bg-amber-600 transition" href="/signin">
                Prijava
              </A>
            </Show>
          </nav>
        </div>
      </header>

      <main class="flex-grow container mx-auto px-4 py-8">
        {props.children}
      </main>

      <footer class="bg-cyan-700 text-white text-center py-4 mt-8">
        <div class="container mx-auto text-sm">
          © {new Date().getFullYear()} {appName}. Sva prava pridržana.
        </div>
      </footer>
    </div>
  );
}
