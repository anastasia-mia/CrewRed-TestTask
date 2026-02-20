import {OpenEye} from "../assets/OpenEye.tsx";
import {CloseEye} from "../assets/CloseEye.tsx";
import {useState, type ChangeEvent, useMemo} from "react";

type InputType = "text" | "password" | "number";

export type InputProps = {
    label?: string;
    type?: InputType;
    value?: string;
    placeholder?: string;
    clearable?: boolean;
    onChange?: (value: string) => void;
};


export const Input = (
    {
        label,
        type = "text",
        value="",
        placeholder,
        clearable = false,
        onChange,
    }: InputProps
) => {
    const [showPassword, setShowPassword] = useState(false);
    const [innerValue, setInnerValue] = useState("");
    const canTogglePassword = type === "password";
    const isClearable = clearable && innerValue;
    const isControlled = value !== undefined;
    const actualValue = isControlled ? value : innerValue;

    const inputType = useMemo(() => {
        if (type !== "password") return type;
        return showPassword ? "text" : "password";
    }, [type, showPassword]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const clear = () => {
        if (!isControlled) setInnerValue("");
        onChange?.("");
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const next = e.target.value;

        if (!isControlled) setInnerValue(next);
        onChange?.(next);
    };

    return (
        <div className="flex flex-row gap-4 items-center">
            {label &&
                <label className="text-sm font-medium">{label}
                </label>
            }

            <div className="relative">
                <input
                    className="rounded-xl border border-gray-500 p-2 pr-5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    type={inputType}
                    value={actualValue}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    inputMode={type === "number" ? "numeric" : undefined}
                />

                {isClearable &&
                    <span onClick={clear}
                          className="text-red-500 absolute right-2 cursor-pointer top-1/2 translate-y-[-50%]"
                    >
                        x
                    </span>
                }
            </div>

            {canTogglePassword && (
                <div
                    role="button"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="m-1"
                >
                    {showPassword ? <CloseEye /> : <OpenEye />}
                </div>
            )}
        </div>
    )
}