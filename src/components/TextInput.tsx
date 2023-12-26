export type TextInputProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  required?: boolean;
  label?: string;
  name: string;
  type?: string;
  id: string;
};

export default function TextInput({
  value,
  setValue,
  placeholder,
  required,
  label,
  name,
  type,
  id,
}: TextInputProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="text-lg font-semibold text-gray-700 block"
        >
          {label}
        </label>
      )}

      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="text-custom-black mt-1 px-4 py-3 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 block w-full rounded-md text-lg"
          placeholder={placeholder}
          required={required}
          style={{ minHeight: "300px" }}
        />
      ) : (
        <input
          type={type || "text"}
          id={id}
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="text-custom-black mt-1 px-4 py-3 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 block w-full rounded-md text-lg"
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
}
