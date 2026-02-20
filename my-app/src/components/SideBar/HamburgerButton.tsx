type HamburgerButtonProps = {
    open: boolean;
    onToggle: () => void;
};

export const HamburgerButton = ({ open=true, onToggle }: HamburgerButtonProps) => {
    return (
        <div
            onClick={onToggle}
            aria-label={open ? "Close menu" : "Open menu"}
            className="absolute top-4 right-5 z-110 inline-flex h-10 w-10 items-center
            justify-center rounded-lg border hover:bg-gray-50 cursor-pointer"
        >
      <span className="relative block h-5 w-6">
          <span
              className={[
                  "absolute left-0 top-0 block w-full h-0.25 bg-black transition-all duration-200",
                  open ? "top-2.5 rotate-45" : "rotate-0",
              ].join(" ")}
          />
          <span
              className={[
                  "absolute left-0 top-2.5 block w-full h-0.25 bg-black transition-all duration-200",
                  open ? "opacity-0" : "opacity-100",
              ].join(" ")}
          />
          <span
              className={[
                  "absolute left-0  block w-full h-0.25 bg-black transition-all duration-200",
                  open ? "top-2.5 -rotate-45" : "rotate-0 top-5",
              ].join(" ")}
          />
      </span>
        </div>
    );
};