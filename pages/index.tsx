import { useEffect, useState, FC, createContext } from "react";
import { useRouter } from "next/router";

import Records from "./records";
import { Alert, Loading, alertVariants } from "../components";

import supabase from "../services/dbConfig";

/*
Misty Blue
#AEB8C4

Dark Blue
#05263B

Blue Grotto
#163B50

Slate
#9CA6B8
*/

export const UserContext = createContext({});

const Login: FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<unknown>();

  const getUserDetails = async () => {
    const {
      data: { user: authUser },
      error,
    } = await supabase.auth.getUser();
    if (!error) {
      setUser(authUser);
      setIsAuthenticated(authUser?.role === "authenticated" ? true : false);
      localStorage.setItem("supabase", JSON.stringify(authUser));
      router.push("/records");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signinWithMagicLink = async () => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
    });
    if (!error) {
      setEmailSent(true);
    }
  };

  return (
    <UserContext.Provider value={{ isAuthenticated, user }}>
      {isLoading ? (
        <Loading />
      ) : (
        <main className="container">
          <div className="col-sm-12 col-md-6 col-lg-6 mx-auto p-5">
            <h1>Login Page</h1>
            {emailSent && (
              <Alert message="Email Sent!" variant={alertVariants.INFO} />
            )}

            <form>
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="form-control"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </form>
            <button
              className="btn btn-primary mt-4"
              onClick={signinWithMagicLink}
              disabled={emailSent}
            >
              Sign in
            </button>
          </div>
        </main>
      )}
    </UserContext.Provider>
  );
};

export default function Home() {
  return <Login />;
}
