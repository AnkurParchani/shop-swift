import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";

type AuthFormTemplateType = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  heading: string;
};

// Template for Auth Forms (login and signup)
const AuthFormTemplate = ({
  children,
  heading,
  onSubmit,
  handleSubmit,
}: AuthFormTemplateType) => {
  return (
    <div className="flex min-h-screen justify-center ">
      <div className="p-8 sm:w-96">
        <h2 className="mb-4 text-2xl font-bold">{heading}</h2>
        <form
          className="flex flex-col gap-5"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          {children}
        </form>
      </div>
    </div>
  );
};

export default AuthFormTemplate;
