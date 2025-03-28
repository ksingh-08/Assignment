import { useState, useTransition } from "react";
import { SignupInput } from "@ksingh08/common-intern";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { toast } from "sonner";

function LoginPage() {
  const navigate = useNavigate();
  const [isPending , startTransition] = useTransition();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    email: "",
    password: "",
  });

  function sendRequest() {

    startTransition(async() => {
      try {
        const response = await axios.post<{ token: string }>(
          `${BACKEND_URL}/api/v1/signup`,
          postInputs
        );
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        navigate('/dashboard');
        console.log(response.status)
      } catch (e:any) {
        if(e.response.status === 411){
        toast("User already exists! Create a new one"); 
        console.log(e.response.status)}
      else{
        toast("Inputs incorrect!");
        console.log(e.response.status)
      }
      }
    })
    
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-xs flex flex-col items-center space-y-6">
        <h2 className="text-center text-2xl font-medium">Welcome back!</h2>
        <form
          className="w-full flex flex-col space-y-4"
          onSubmit={(e) => {
            e.preventDefault(); 
            sendRequest();
          }}
        >
          <input
            type="text"
            placeholder="UID"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            onChange={(e) =>
              setPostInputs((c) => ({
                ...c,
                email: e.target.value,
              }))
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            onChange={(e) =>
              setPostInputs((c) => ({
                ...c,
                password: e.target.value,
              }))
            }
          />
          <Button
            type="submit"
            disabled={isPending}
            className={`w-full py-2 text-white bg-[#1E2A53] rounded-md hover:bg-opacity-90 transition`}
          >
            {isPending ? "Logging in" : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
