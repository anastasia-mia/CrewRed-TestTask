import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Toast, type ToastProps } from "../components/Toast";

const meta: Meta<typeof Toast> = {
    title: "Components/Toast",
    component: Toast,
    parameters: { layout: "centered" },
    argTypes: {
        type: {
            control: "select",
            options: ["success", "error", "info", "warning"],
        },
        duration: { control: "number" },
        closable: { control: "boolean" },
        message: { control: "text" },
    },
};
export default meta;

type Story = StoryObj<typeof Toast>;

function Demo(args: Omit<ToastProps, "open" | "onClose">){
    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col items-center gap-3">
            <button
                type="button"
                className="rounded-lg border px-3 py-2 hover:bg-gray-50"
                onClick={() => setOpen(true)}
            >
                Show toast
            </button>

            <div className="text-sm text-gray-600">
                Toast зʼявиться внизу праворуч
            </div>

            <Toast
                {...args}
                open={open}
                onClose={() => setOpen(false)}
            />
        </div>
    )
}

export const Playground: Story = {
    render: (args) => <Demo {...args} />,
    args: {
        type: "success",
        message: "Saved successfully!",
        duration: 3000,
        closable: true,
    },
};

export const Success: Story = {
    render: () => (
        <Demo type="success" message="Profile updated" duration={2500} closable />
    ),
};

export const Error: Story = {
    render: () => (
        <Demo type="error" message="Something went wrong" duration={4000} closable />
    ),
};

export const Info: Story = {
    render: () => (
        <Demo type="info" message="New update available" duration={3000} closable/>
    ),
};

export const Warning: Story = {
    render: () => (
        <Demo type="warning" message="Connection is unstable" duration={5000} closable />
    ),
};

export const DifferentDurations: Story = {
    render: () => (
        <div className="flex gap-3">
            <Demo type="success" message="1s" duration={1000} closable />
            <Demo type="info" message="3s" duration={3000} closable />
            <Demo type="warning" message="6s" duration={6000} closable />
        </div>
    ),
};

