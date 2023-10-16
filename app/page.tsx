import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contract Bridger",
  description:
    "a tool for taking a contract already existing on one chain and deploying it to another chain",
  icons: {
    icon: "images/icon.png",
  },
};

export default function Home() {
  return (
    <section className="bg-primary flex flex-col items-center justify-evenly py-10 h-screen"></section>
  );
}
