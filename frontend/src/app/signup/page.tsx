import { HiUserPlus } from "react-icons/hi2";
import Button from "../components/events/Button";
import FormInput from "../components/FormInput";

const page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full rounded bg-white p-8 shadow-md sm:w-96">
        <h2 className="mb-4 text-2xl font-bold">Sign Up</h2>
        <form>
          <div className="mb-5 flex justify-center">
            <HiUserPlus className="rounded-full bg-blue-500 p-3 text-6xl text-white" />
          </div>
          <FormInput
            label="Name"
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            required
          />
          <FormInput
            label="Email"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
          />
          <FormInput
            label="Password"
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
          />
          <FormInput
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            required
          />

          <Button type="submit" text="Sign Up" />
        </form>
      </div>
    </div>
  );
};

export default page;
