import { createContext, useContext, useState, ReactNode } from "react";

interface FormValues {
  username: string;
  email: string;
  password: string;
}

interface FormContextData {
  form: FormValues;
  updateForm: (field: keyof FormValues, value: string) => void;
}

const FormContext = createContext<FormContextData | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [form, setForm] = useState<FormValues>({
    username: "",
    email: "",
    password: "",
  });

  const updateForm = (field: keyof FormValues, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <FormContext.Provider value={{ form, updateForm }}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm(): FormContextData {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
}
