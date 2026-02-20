import { useEffect, useState } from "react";
import {MenuList} from "./MenuList.tsx";

export type MenuItem = {
    id: string;
    label: string;
    href?: string;
    items?: MenuItem[];
};

export type SidebarMenuProps = {
    open: boolean;
    title?: string;
    items: MenuItem[];
    onClose: () => void;
    onItemSelect?: (item: MenuItem) => void;
    defaultExpandedIds?: string[];
    widthClassName?: string;
};

export const SidebarMenu = (
    {
        open = false,
        title = "Menu",
        items,
        onClose,
        onItemSelect,
        defaultExpandedIds = [],
        widthClassName = "w-80",
    }: SidebarMenuProps
) => {
    const [mounted, setMounted] = useState(open);
    const [visible, setVisible] = useState(false);

    const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
        const init: Record<string, boolean> = {};
        for (const id of defaultExpandedIds) init[id] = true;
        return init;
    });

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
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, onClose]);

    const toggle = (id: string) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    if (!mounted) return null;

    return(
        <div className="fixed inset-0 z-50">
            <div
                className={[
                    "absolute inset-0 bg-black/40 transition-opacity duration-200",
                    visible ? "opacity-100" : "opacity-0",
                ].join(" ")}
                onMouseDown={onClose}
                aria-hidden="true"
            />

            <aside
                className={[
                    "absolute right-0 top-0 h-full bg-white shadow-xl",
                    "transition-transform duration-200 ease-out",
                    widthClassName,
                    visible ? "translate-x-0" : "translate-x-full",
                    "flex flex-col",
                ].join(" ")}
                role="dialog"
                aria-modal="true"
                aria-label={title}
                onMouseDown={(e) => e.stopPropagation()}
            >
                <header className="flex items-center justify-between border-b px-4 py-4">
                    <div className="text-2xl font-semibold">{title}</div>
                </header>

                <nav className="flex-1 overflow-auto px-2 py-2">
                    <MenuList
                        items={items}
                        level={0}
                        expanded={expanded}
                        onToggle={toggle}
                        onItemSelect={onItemSelect}
                    />
                </nav>
            </aside>
        </div>
    )
}