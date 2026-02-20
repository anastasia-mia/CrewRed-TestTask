import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SidebarMenu, type MenuItem } from "../components/SideBar/SidebarMenu";
import { HamburgerButton } from "../components/SideBar/HamburgerButton";

const meta: Meta<typeof SidebarMenu> = {
    title: "Components/SidebarMenu",
    component: SidebarMenu,
    parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof SidebarMenu>;

const oneLevel: MenuItem[] = [
    { id: "home", label: "Home" },
    { id: "products", label: "Products" },
    { id: "pricing", label: "Pricing" },
    { id: "about", label: "About" },
];

const twoLevel: MenuItem[] = [
    { id: "dashboard", label: "Dashboard" },
    {
        id: "catalog",
        label: "Catalog",
        items: [
            { id: "cat-products", label: "Products" },
            { id: "cat-categories", label: "Categories" },
        ],
    },
    {
        id: "settings",
        label: "Settings",
        items: [
            { id: "set-profile", label: "Profile" },
            { id: "set-security", label: "Security" },
        ],
    },
];

function Demo({
                  items,
                  startOpen,
                  defaultExpandedIds = [],
                  title = "Menu",
              }: {
    items: MenuItem[];
    startOpen: boolean;
    defaultExpandedIds?: string[];
    title?: string;
}) {
    const [open, setOpen] = useState(startOpen);

    return (
        <div className="relative min-h-screen w-screen bg-gray-50">
            <div className="relative min-h-screen w-full">
                <HamburgerButton open={open} onToggle={() => setOpen((v) => !v)} />

                <SidebarMenu
                    open={open}
                    title={title}
                    items={items}
                    onClose={() => setOpen(false)}
                    defaultExpandedIds={defaultExpandedIds}
                    onItemSelect={() => setOpen(false)}
                />
            </div>
        </div>
    );
}

export const OneLevelClosed: Story = {
    render: () => <Demo items={oneLevel} startOpen={false} title="One level" />,
};

export const OneLevelOpen: Story = {
    render: () => <Demo items={oneLevel} startOpen={true} title="One level" />,
};

export const TwoLevelClosed: Story = {
    render: () => (
        <Demo
            items={twoLevel}
            startOpen={false}
            title="Two level"
            defaultExpandedIds={["catalog"]}
        />
    ),
};

export const TwoLevelOpen: Story = {
    render: () => (
        <Demo
            items={twoLevel}
            startOpen={true}
            title="Two level"
            defaultExpandedIds={["catalog"]}
        />
    ),
};
