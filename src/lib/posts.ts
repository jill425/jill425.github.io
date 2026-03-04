export type Post = {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    content: string;
};

export const posts: Post[] = [
    //     {
    //         slug: "getting-started-with-react",
    //         title: "Getting Started with React",
    //         date: "2026-02-20",
    //         excerpt:
    //             "A beginner-friendly introduction to React — components, state, and props explained with examples.",
    //         tags: ["React", "Web Dev", "Frontend"],
    //         content: `## Introduction

    // React is a popular JavaScript library for building user interfaces. It enables developers to create reusable UI components.

    // ## Components

    // Components are the building blocks of any React app. A component can be a button, a form, or an entire page.

    // \`\`\`javascript
    // function Welcome(props) {
    //   return <h1>Hello, {props.name}</h1>;
    // }
    // \`\`\`

    // ## State

    // State allows React components to change their output over time in response to user actions, network responses, and anything else.

    // ## Conclusion

    // React makes building interactive UIs painless. Give it a try on your next project!
    // `,
    //     },
    //     {
    //         slug: "typescript-tips",
    //         title: "5 TypeScript Tips I Wish I Knew Earlier",
    //         date: "2026-01-15",
    //         excerpt:
    //             "Practical TypeScript patterns that make your code safer, more readable, and easier to maintain.",
    //         tags: ["TypeScript", "Tips"],
    //         content: `## 1. Use \`satisfies\` instead of type assertions

    // The \`satisfies\` operator validates a value against a type without widening it.

    // ## 2. Discriminated Unions

    // Model state machines cleanly with discriminated unions.

    // ## 3. Template Literal Types

    // Build powerful string types from string literals.

    // ## 4. \`Awaited<T>\`

    // Unwrap Promise types easily with the built-in \`Awaited\` utility.

    // ## 5. \`infer\` in Conditional Types

    // Extract types from complex generic structures with \`infer\`.
    // `,
    //     },
    //     {
    //         slug: "data-structures-review",
    //         title: "Interview Prep: Key Data Structures Explained",
    //         date: "2025-12-10",
    //         excerpt:
    //             "A concise review of arrays, linked lists, trees, graphs, and hash maps — with when to use each.",
    //         tags: ["Interview", "Algorithms", "CS"],
    //         content: `## Arrays

    // O(1) access, O(n) insert/delete. Best for indexed access patterns.

    // ## Linked Lists

    // O(n) access but O(1) insert/delete at head. Useful for queues and stacks.

    // ## Hash Maps

    // O(1) average-case for get/set. The go-to for frequency counting and caching.

    // ## Trees & Graphs

    // BSTs give O(log n) search. Use BFS/DFS for graph traversal problems.

    // ## Summary

    // Knowing when to pick which structure is half the battle in coding interviews.
    // `,
    //     },
];

export function getPostBySlug(slug: string): Post | undefined {
    return posts.find((p) => p.slug === slug);
}

export function getAllPosts(): Post[] {
    const allposts = [...posts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    if (!allposts || allposts.length === 0) {
        console.warn("警告：沒有找到任何文章，將不會生成任何靜態頁面！");
        return [];
    }
    return allposts;
}
