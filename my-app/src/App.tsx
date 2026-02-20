import './App.css'
import {Input} from "./components/Input.tsx";
import {Toast} from "./components/Toast.tsx";
import {SidebarMenu, type MenuItem} from "./components/SideBar/SidebarMenu.tsx";
import {useState} from "react";
import {HamburgerButton} from "./components/SideBar/HamburgerButton.tsx";

const items: MenuItem[] = [
    { id: "home", label: "Home" },
    {
        id: "catalog",
        label: "Catalog",
        items: [
            { id: "products", label: "Products" },
            { id: "categories", label: "Categories" },
        ],
    },
    { id: "about", label: "About" },
];

function App() {
    const [open, setOpen] = useState(false);

    return (
        <div className="p-6 w-full h-full flex justify-end">
            <HamburgerButton open={open} onToggle={() => setOpen((v) => !v)} />

            <SidebarMenu
                open={open}
                title="Menu"
                items={items}
                onClose={() => setOpen(false)}
                defaultExpandedIds={["catalog"]}
                onItemSelect={() => setOpen(false)}
            />
        </div>
    );
}

export default App
