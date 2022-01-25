import Head from "next/head";
import SideBar from "../components/SideBar";
import MainComponent from "../components/MainComponent";
import Player from "../components/Player";
export default function Home() {
  return (
    <div className="bg-black flex flex-col flex-1 h-screen">
      <Head>
        <title>Spotify 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-black flex  ">
        {/*Sidebar*/}
        <SideBar />
        <MainComponent />
      </main>
      <Player />
    </div>
  );
}
