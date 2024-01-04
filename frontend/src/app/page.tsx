import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <div className="flex ">
        <Link className="m-4 rounded-md bg-blue-800 px-3 py-1" href="/login">
          Login
        </Link>
        <Link className="m-4 rounded-md bg-blue-800 px-3 py-1" href="/signup">
          Signup
        </Link>

        <Button color="primary" variant="solid">
          Solid
        </Button>
        <Button color="primary" variant="faded">
          Faded
        </Button>
        <Button color="primary" variant="bordered">
          Bordered
        </Button>
        <Button color="primary" variant="light">
          Light
        </Button>
        <Button color="primary" variant="flat">
          Flat
        </Button>
        <Button color="primary" variant="ghost">
          Ghost
        </Button>
        <Button color="primary" variant="shadow">
          Shadow
        </Button>
      </div>
      <h1>Helloworld</h1>
      <h1>Helloworld</h1>
      <h1>Helloworld</h1>
      <h1>Helloworld</h1>
      <h1>Helloworld</h1>
      <h1>Helloworld</h1>
      <h1>Helloworld</h1>
    </div>
  );
}
