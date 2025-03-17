import { Route, Router } from "@solidjs/router";
import { AuthProvider } from "./components/AuthProvider";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Error from "./pages/Error";


export default function App() {
  return (
    <AuthProvider>
      <Router root={Layout}>
        <Route path="/" component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/error" component={Error} />
        <Route path="*" component={() => <Navigate href="/error" />} />
      </Router>
    </AuthProvider>
  );
}

function Layout(props) {



  return (
    <div>
      <div>Zaglavlje</div>
      <div>{props.children}</div>
      <div>Podnožje</div>
    </div>
  );
}
