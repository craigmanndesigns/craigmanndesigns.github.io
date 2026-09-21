import React, { useEffect, useState } from "react";
import clsx from "clsx";

/**
 * Builds a nested tree structure out of flat heading items based on their level.
 */
const buildTocTree = (items) => {
    const root = [];
    const stack = [];

    items.forEach((item) => {
        const node = { ...item, children: [] };

        // Find the parent node in stack that has a smaller level (e.g. H2 parent for H3 child)
        while (stack.length > 0 && stack[stack.length - 1].level >= node.level) {
            stack.pop();
        }

        if (stack.length === 0) {
            root.push(node);
        } else {
            stack[stack.length - 1].children.push(node);
        }

        stack.push(node);
    });

    return root;
};

/**
 * Recursive List Renderer component
 */
const TocList = ({ nodes, activeId }) => {
    if (!nodes || nodes.length === 0) return null;

    return (
        <ul className="list-none">
            {nodes.map((node) => {
                const isActive = activeId === node.id;

                // Check if any child node (H3) is currently active
                const hasActiveChild = node.children?.some(
                    (child) => child.id === activeId || child.children?.some((c) => c.id === activeId)
                );

                // Expand children if this heading is active or if one of its children is active
                const isExpanded = isActive || hasActiveChild;

                return (
                    <li key={node.id}>
                        <a
                            href={`#${node.id}`}
                            className={clsx(
                                "w-full inline-block leading-[130%] p-2 hover:bg-black10",
                                {
                                    "py-2 font-semibold": node.level === 2,
                                    "py-1.5 font-medium": node.level !== 2,
                                    "font-bold underline": isActive,
                                }
                            )}
                        >
                            {node.text}
                        </a>

                        {/* Collapsible container for H3 children */}
                        {node.children && node.children.length > 0 && (
                            <div
                                className={clsx(
                                    "overflow-hidden transition-all duration-300 ease-in-out",
                                    isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                )}
                            >
                                <TocList nodes={node.children} activeId={activeId} />
                            </div>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

/**
 * TableOfContents Component
 */
const TableOfContents = ({ items, title = "Table of Contents", className }) => {
    const [activeId, setActiveId] = useState("");

    useEffect(() => {
        if (!items || items.length === 0) return;

        // Track active heading position on scroll
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-10% 0px -70% 0px", // Triggers active state near top of viewport
                threshold: 0.1,
            }
        );

        items.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [items]);

    if (!items || items.length === 0) return null;

    const tree = buildTocTree(items);

    return (
        <nav className={clsx("border border-black p-2", className)}>
            <TocList nodes={tree} activeId={activeId} />
        </nav>
    );
};

export default TableOfContents;