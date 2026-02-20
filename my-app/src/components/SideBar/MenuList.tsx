import {type MenuItem} from "./SidebarMenu.tsx";

type MenuListProps = {
    items: MenuItem[];
    level: number;
    expanded: Record<string, boolean>;
    onToggle: (id: string) => void;
    onItemSelect?: (item: MenuItem) => void;
};

export const MenuList = ({
                      items,
                      level,
                      expanded,
                      onToggle,
                      onItemSelect,
                  }: MenuListProps) => {
    const leftPad = 8 + level * 16;

    return (
        <ul className="space-y-1">
            {items.map((item) => {
                const hasChildren = !!item.items?.length;
                const isOpen = !!expanded[item.id];

                return (
                    <li key={item.id}>
                        <div
                            className="flex items-center justify-between rounded-lg hover:bg-gray-50 relative"
                            style={{ paddingLeft: leftPad }}
                        >
                            {hasChildren ? (
                                <button
                                    type="button"
                                    className="flex flex-1 items-center gap-2 px-2 py-2 text-left"
                                    onClick={() => onToggle(item.id)}
                                    aria-expanded={isOpen}
                                >
                                    <span className="text-sm">{item.label}</span>
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="flex flex-1 items-center px-2 py-2 text-left"
                                    onClick={() => onItemSelect?.(item)}
                                >
                                    <span className="text-sm">{item.label}</span>
                                </button>
                            )}

                            {hasChildren && (
                                <span
                                    role="button"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 mr-2 font-bold"
                                    onClick={() => onToggle(item.id)}
                                    aria-label={isOpen ? "Collapse submenu" : "Expand submenu"}
                                    title={isOpen ? "Collapse" : "Expand"}
                                >
                                    {isOpen ? "<" : ">"}
                                </span>
                            )}
                        </div>

                        {hasChildren && isOpen && (
                            <div className="mt-1">
                                <MenuList
                                    items={item.items!}
                                    level={level + 1}
                                    expanded={expanded}
                                    onToggle={onToggle}
                                    onItemSelect={onItemSelect}
                                />
                            </div>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};