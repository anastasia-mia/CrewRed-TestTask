import { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

export type ToastProps = {
    open: boolean;
    message: string;
    type?: ToastType;
    duration?: number;
    closable: boolean;
    onClose?: () => void;
};

const base =
    "fixed bottom-4 right-4 z-50 w-[320px] rounded-xl border px-4 py-3 shadow-lg";
const motionBase =
    "transition-all duration-200 ease-out will-change-transform will-change-opacity";

const typeStyles: Record<ToastType, string> = {
    success: "bg-green-200 border-green-400",
    error: "bg-red-200 border-red-400",
    info: "bg-blue-200 border-blue-400",
    warning: "bg-yellow-200 border-yellow-400",
};

const titleByType: Record<ToastType, string> = {
    success: "Success",
    error: "Error",
    info: "Info",
    warning: "Warning",
};

export const Toast = (
    {
        open,
        message,
        type = "info",
        duration = 3000,
        closable = true,
        onClose,
    }: ToastProps
) => {
    const [mounted, setMounted] = useState(open);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (open) {
            setMounted(true);
            requestAnimationFrame(() => setVisible(true));
            return;
        }
        setVisible(false);
        const t = window.setTimeout(() => setMounted(false), 200);
        return () => window.clearTimeout(t);
    }, [open]);

    useEffect(() => {
        if (!open) return;
        if (duration <= 0) return;

        const t = window.setTimeout(() => {
            onClose?.();
        }, duration);

        return () => window.clearTimeout(t);
    }, [open, duration, onClose]);

    if (!mounted) return null;

    return(
        <div
            role="status"
            aria-live="polite"
            className={[
            base,
            motionBase,
            typeStyles[type],
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        ].join(" ")}>
            <div className="flex items-start gap-3">
                <div className="flex-1">
                    <div className="text-sm font-semibold">{titleByType[type]}</div>
                    <div className="text-sm text-gray-700">{message}</div>
                </div>

                {closable && (<span
                    role="button"
                    className="ml-2 text-gray-500 hover:text-black cursor-pointer"
                    onClick={onClose}
                    aria-label="Close toast"
                    title="Close"
                >
                    x
                </span>)}
            </div>
        </div>
    )
}