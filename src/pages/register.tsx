import { ChangeEvent, ReactElement, useState } from "react";
import { FormProvider, useForm } from "@/contexts/FormContext";
import { useRouter } from "next/router";

function InputScreen(): ReactElement {
  const { form, updateForm } = useForm();

  const handleChange =
    (field: keyof typeof form) => (e: ChangeEvent<HTMLInputElement>) => {
      updateForm(field, e.target.value);
    };

  return (
    <div className="space-y-5 ">
      <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={handleChange("username")}
        className="block border border-gray-300 rounded p-2 my-2 w-full"
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange("email")}
        className="block border border-gray-300 rounded p-2 my-2 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange("password")}
        className="block border border-gray-300 rounded p-2 my-2 w-full"
      />
    </div>
  );
}

function ConfirmationScreen(): ReactElement {
  const { form } = useForm();

  return (
    <div className="space-y-5">
      <div>Username: {form.username}</div>
      <div>Email: {form.email}</div>
      <div>Password: {form.password}</div>
    </div>
  );
}

export default function Register() {
  const router = useRouter();

  // URLのクエリパラメータを確認して現在の状態を決定
  const isConfirmation = router.query.step === "confirmation";
  // 確認画面への遷移
  const goToConfirmation = () => {
    router.push("/register?step=confirmation", undefined, { shallow: true });
  };
  return (
    <FormProvider>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="max-w-3xl w-full mx-auto bg-white text-slate-900 p-10">
          {!isConfirmation && "/register" && <InputScreen />}
          {isConfirmation && "/confirmation" && <ConfirmationScreen />}
          <button
            onClick={isConfirmation ? () => router.back() : goToConfirmation}
            className={`block text-white font-bold py-2 px-4 rounded mt-4 w-full ${
              isConfirmation
                ? "bg-gray-500 hover:bg-gray-700"
                : "bg-blue-500 hover:bg-blue-700"
            }}`}
          >
            {isConfirmation ? "Back" : "Confirm"}
          </button>
          {isConfirmation && (
            <button
              onClick={() => alert("Congratulations!")}
              className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
            >
              Submit
            </button>
          )}
        </div>
      </main>
    </FormProvider>
  );
}
