export type Post = {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    content: string;
};

export const posts: Post[] = [
    {
        slug: "skill-creator-experience",
        title: "讓 Claude 幫我寫 Skill",
        date: "2026-05-27",
        excerpt:
            "Skill 讓 Claude 記住你的工作 SOP，不用每次重新解釋。這篇記錄我如何用 Skill Creator 工具，跟 Claude 一起從零設計一個技術文章寫作 Skill，包含遇到的問題和最後的完整解決方案。",
        tags: ["Claude", "AI", "workflow"],
        content: `## 什麼是 Skill？

Skill 是 Claude 的「可重複使用 SOP」。你把規則、格式、流程寫在一個 \`SKILL.md\` 檔案裡，之後每次跟 Claude 說觸發詞（例如「幫我寫成文章」），它就會自動照著執行。

就像訓練一個助理：第一次你仔細說清楚怎麼做，之後你只需要說「照老規矩」。不用每次都重新解釋一遍你的標準、喜好和流程。

---

## 為什麼我想做這件事？

我的部落格 \`jill425.github.io\` 用 Next.js 架設。平常我會有一些技術討論或專案心得，想把它們整理成文章發佈，但每次都要手動做一堆事：

- 想結構（要有幾個 H2？該怎麼組織？）
- 寫 SEO frontmatter（title、description、tags）
- 調整語氣和風格（要不要放代碼片段？要加比喻嗎？）
- 確認沒有廢話或邏輯跳躍
- 實際發佈到部落格

我想把**整套流程包進一個 Skill**，讓 Claude 讀完一段對話就能直接產出可發佈的文章。

---

## 怎麼開始？

**Step 1：找到 Skill Creator**

在 Claude 的介面側邊欄可以找到已安裝的 Skills 列表。其中有一個內建工具叫 Skill Creator，專門用來幫你設計新的 Skill。直接跟 Claude 說：「我要建立一個 skill，協助把整個討論串的想法落實寫成技術文章。」Skill Creator 會開始問你一連串問題。

**Step 2：回答關鍵問題**

Claude 問了目標讀者、語言偏好、長度規範、部落格框架、發佈流程等。我的回答是：工程師和技術決策者為主要讀者、繁中混搭英文技術名詞、教學文最多 5000 字、心得文 500–1000 字、使用 Next.js、發佈前必須確認才能 push。

**Step 3：讓 Claude 研究 + 起草**

Claude 先去查了熱門技術部落格的文章結構，再設計出完整骨架：四種文章類型各有對應章節模板、SEO frontmatter 規範、寫作風格指引，還有發佈前確認流程。

---

## 過程中發生什麼？

第一版文章出來了，看起來有模有樣，但讀起來感覺空洞——每個章節都在「描述接下來要說什麼」，而不是真的在講東西。

---

## 遇到什麼問題？怎麼修？

**文章為了撐結構而湊字數**

根本原因是 Skill 指令方向錯了。它告訴 Claude「要有這些章節」，卻沒有說「先找到最有價值的那個點，再決定章節」。修法是在 Skill 裡加了這條核心原則：一篇文章只講一件事，從對話中找最有價值的那個點圍繞它寫，章節要有內容才存在，不要為了結構而湊廢話。這樣 Claude 就會先挑出最值得說的部分，然後只圍繞這個重點寫，多餘的空白段落直接砍掉。

**文章太單調，缺乏畫面感**

讀者看不到「我跟 Claude 怎麼互動」、「Code 長什麼樣子」——全是文字堆砌。修法是加了「如何讓文章有畫面感」的指引：嵌入對話片段用 blockquote 呈現、截圖用預留位置標記、before/after 對比直接並排。這樣讀者能真實看到過程。

**標題邏輯不夠銳利**

原標題的思路是「描述事件」，但更吸引人的標題是「暗示成果或轉折」。改成「讓 Claude 幫我寫 Skill」就比「我用 Skill Creator 設計了一個技術文章寫作 Skill」更簡潔有力。

---

## 最後產出是什麼？

一份完整的 \`SKILL.md\` 檔案，涵蓋：

✅ 文章類型判斷系統
✅ 「有畫面感」寫作指引
✅ SEO Frontmatter 自動產出
✅ 發佈前確認機制

---

## 我從這個過程學到了什麼？

**1. 設計 Skill 就是系統思考**

你必須把「我想要什麼」拆解成「什麼規則、什麼格式、什麼例外、什麼順序」。說得不清楚，AI 做不出來。

**2. Prompt 的「方向」比「詞彙」重要**

「要有這些章節」和「先找最有價值的點，再決定章節」，詞彙量差不多，但執行結果天差地別。

**3. 例子和反面例子一樣重要**

在 Skill 裡加上 \`❌\` 和 \`✅\` 的對比，比寫 100 字說明都有效。Claude 會自動從例子學習。

**4. 確認機制值得額外設計**

「發佈前確認」這個步驟看起來簡單，但它防止了很多意外。

---

## 如果你也想試試

如果你也有重複執行的 AI 工作流，很值得用 Skill Creator 試試。關鍵是：

1. 找到重複的部分
2. 把規則明確化
3. 測試 + 迭代

一旦 Skill 成熟了，你就再也不用重新解釋自己的標準——Claude 會記住，而且每次都一致地執行。`,
    },
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
