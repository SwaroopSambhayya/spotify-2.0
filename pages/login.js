import React from "react";
import { getProviders, signIn } from "next-auth/react";

const Login = ({ providers }) => {
  return (
    <div className=" flex  h-screen w-full justify-center items-center flex-col bg-black ">
      <img src="https://links.papareact.com/9xl" className="w-52 mb-5 " />
      {Object.values(providers).map((provider) => (
        <button
          key={provider.name}
          className=" w-52 rounded-xl h-16 bg-green-500 text-xl"
          onClick={() =>
            signIn(provider.id, {
              callbackUrl: "/",
            })
          }
        >
          Login with {provider.name}
        </button>
      ))}
    </div>
  );
};

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
