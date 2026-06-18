import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/user.model.js";
import Post from "./models/post.model.js";
import Comment from "./models/comment.model.js";
import "dotenv/config";

const MONGO = process.env.MONGO;
if (!MONGO) {
  console.error("❌  MONGO env var is missing");
  process.exit(1);
}

await mongoose.connect(MONGO);
console.log("✅  MongoDB connected");

// ── Drop stale Clerk index if it exists ─────────────────────
try {
  await mongoose.connection.collection("users").dropIndex("clerkUserId_1");
  console.log("🗑️   Dropped old clerkUserId index");
} catch (_) {}

// ── Wipe existing data ──────────────────────────────────────
await Promise.all([User.deleteMany(), Post.deleteMany(), Comment.deleteMany()]);
console.log("🗑️   Existing data cleared");

// ── Users ───────────────────────────────────────────────────
const [adminUser, writer] = await User.insertMany([
  {
    username: "admin",
    email: "admin@lamalog.com",
    password: await bcrypt.hash("Admin1234!", 10),
    role: "admin",
  },
  {
    username: "techwriter",
    email: "writer@lamalog.com",
    password: await bcrypt.hash("Writer1234!", 10),
    role: "user",
  },
]);
console.log("👤  Users created");

// ── Posts ───────────────────────────────────────────────────
const posts = await Post.insertMany([
  {
    user: adminUser._id,
    title: "Getting Started with React 19",
    slug: "getting-started-with-react-19",
    category: "development",
    img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop",
    desc: "React 19 brings major improvements to performance and developer experience. Here's everything you need to know to get started.",
    content: `<h2>What's new in React 19?</h2><p>React 19 is the biggest release in years. It ships with the React Compiler (formerly React Forget), new hooks, and a fully stable Server Components API.</p><h2>The React Compiler</h2><p>The compiler automatically memoizes your components, eliminating the need for <code>useMemo</code> and <code>useCallback</code> in most cases. Your code becomes simpler and faster at the same time.</p><h2>New hooks</h2><p><strong>useOptimistic</strong> lets you update the UI instantly while an async operation is in progress, then roll back automatically if it fails. <strong>useFormStatus</strong> gives you the pending state of a parent form without prop drilling.</p><h2>Getting started</h2><p>Update your project with:</p><pre><code>npm install react@19 react-dom@19</code></pre><p>That's it — most existing code works without changes.</p>`,
    isFeatured: true,
    visit: 342,
  },
  {
    user: adminUser._id,
    title: "Modern CSS Techniques for 2025",
    slug: "modern-css-techniques-2025",
    category: "web-design",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop",
    desc: "CSS has evolved dramatically. Container queries, cascade layers, and the :has() selector change the way we write styles.",
    content: `<h2>Container Queries</h2><p>Container queries let a component adapt to the size of its container, not the viewport. This is a game changer for component-based design systems.</p><pre><code>.card { container-type: inline-size; }\n@container (min-width: 400px) {\n  .card__title { font-size: 2rem; }\n}</code></pre><h2>The :has() selector</h2><p>Often called the "parent selector", <code>:has()</code> lets you style an element based on what it contains.</p><pre><code>form:has(input:invalid) { border: 2px solid red; }</code></pre><h2>Cascade Layers</h2><p>Use <code>@layer</code> to organize your CSS and control specificity without hacks.</p><pre><code>@layer reset, base, components, utilities;</code></pre>`,
    isFeatured: true,
    visit: 289,
  },
  {
    user: writer._id,
    title: "MongoDB Atlas: A Complete Setup Guide",
    slug: "mongodb-atlas-complete-setup-guide",
    category: "databases",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop",
    desc: "Step-by-step guide to creating a free MongoDB Atlas cluster and connecting it to your Node.js application.",
    content: `<h2>Creating your cluster</h2><p>Sign up at <strong>mongodb.com/atlas</strong> and create a free M0 cluster. Choose a region close to your users for lower latency.</p><h2>Network access</h2><p>In the Security tab, add your IP address to the allowlist. For production on Render or Vercel, add <code>0.0.0.0/0</code> to allow all IPs.</p><h2>Connecting with Mongoose</h2><pre><code>import mongoose from 'mongoose';\nawait mongoose.connect(process.env.MONGO);</code></pre><p>Your connection string looks like: <code>mongodb+srv://user:pass@cluster.mongodb.net/dbname</code></p><h2>Best practices</h2><p>Always store your connection string in environment variables, never in code. Use separate databases for development and production.</p>`,
    isFeatured: true,
    visit: 198,
  },
  {
    user: adminUser._id,
    title: "Express.js 5: What Changed and Why It Matters",
    slug: "expressjs-5-what-changed",
    category: "development",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
    desc: "Express 5 is finally stable. Async error handling, improved routing, and dropped legacy support — here's the complete breakdown.",
    content: `<h2>Async error handling</h2><p>The biggest change in Express 5 is native async support. Rejected promises are now automatically passed to your error handler.</p><pre><code>// Express 5 — this just works:\napp.get('/user', async (req, res) => {\n  const user = await getUser(req.params.id);\n  res.json(user);\n});</code></pre><h2>Route path changes</h2><p>Wildcards now require names: use <code>/*path</code> instead of <code>/*</code>.</p><h2>Upgrading</h2><pre><code>npm install express@5</code></pre><p>Most Express 4 apps need minimal changes. Review your error handlers and wildcard routes first.</p>`,
    isFeatured: false,
    visit: 156,
  },
  {
    user: writer._id,
    title: "Tailwind CSS vs CSS Modules: Which Should You Choose?",
    slug: "tailwind-vs-css-modules",
    category: "web-design",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop",
    desc: "Two popular approaches to styling React apps. We compare bundle size, developer experience, and scalability.",
    content: `<h2>Tailwind CSS</h2><p>Tailwind uses utility classes directly in your JSX. No context switching, no naming things, and a tiny final CSS bundle.</p><p><strong>Pros:</strong> Fast to write, consistent spacing/colors, great with design systems.</p><p><strong>Cons:</strong> JSX can get noisy, custom designs need configuration.</p><h2>CSS Modules</h2><p>CSS Modules scope class names locally to the component. You write regular CSS and import it as an object.</p><p><strong>Pros:</strong> Familiar CSS syntax, no class name collisions.</p><p><strong>Cons:</strong> More files to manage, no built-in design tokens.</p><h2>The verdict</h2><p>Use <strong>Tailwind</strong> for UI-heavy apps where you want to move fast. Use <strong>CSS Modules</strong> if you prefer plain CSS or are migrating a legacy codebase.</p>`,
    isFeatured: false,
    visit: 203,
  },
  {
    user: adminUser._id,
    title: "PostgreSQL vs MongoDB: Choosing the Right Database",
    slug: "postgresql-vs-mongodb",
    category: "databases",
    img: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop",
    desc: "SQL or NoSQL? We break down the real differences to help you pick the right database for your next project.",
    content: `<h2>Data structure</h2><p><strong>PostgreSQL</strong> is relational — data lives in tables with strict schemas. Perfect when your data is structured and consistent.</p><p><strong>MongoDB</strong> is document-based — data lives in JSON-like documents. Great for flexible or rapidly evolving schemas.</p><h2>When to use PostgreSQL</h2><ul><li>Financial data requiring ACID transactions</li><li>Complex queries with many joins</li><li>Well-defined, stable data structure</li></ul><h2>When to use MongoDB</h2><ul><li>Content management systems</li><li>Catalogs with varying attributes</li><li>Rapid prototyping</li></ul>`,
    isFeatured: false,
    visit: 178,
  },
  {
    user: writer._id,
    title: "SEO for Developers: The Technical Checklist",
    slug: "seo-for-developers-technical-checklist",
    category: "seo",
    img: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&auto=format&fit=crop",
    desc: "A practical SEO guide for developers — meta tags, structured data, Core Web Vitals, and the tools that actually matter.",
    content: `<h2>Meta tags that matter</h2><p>Get the basics right first: a unique <code>&lt;title&gt;</code> under 60 characters and a <code>meta description</code> under 160 characters.</p><h2>Core Web Vitals</h2><p>Google uses three metrics: <strong>LCP</strong> (how fast the main content loads), <strong>INP</strong> (how fast the page responds), and <strong>CLS</strong> (how stable the layout is).</p><h2>Structured data</h2><pre><code>&lt;script type="application/ld+json"&gt;\n{\n  "@type": "Article",\n  "headline": "Your Post Title",\n  "author": { "@type": "Person", "name": "Author" }\n}\n&lt;/script&gt;</code></pre><h2>Crawlability</h2><p>Make sure your SPA generates a sitemap and all routes are accessible without JavaScript.</p>`,
    isFeatured: true,
    visit: 221,
  },
  {
    user: adminUser._id,
    title: "Building a REST API with Node.js and Express",
    slug: "building-rest-api-nodejs-express",
    category: "development",
    img: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&auto=format&fit=crop",
    desc: "A step-by-step guide to building a production-ready REST API with Node.js, Express, and MongoDB.",
    content: `<h2>Project structure</h2><p>Organize your API by feature, not by type. Group everything by domain instead of having generic <code>controllers/</code> and <code>routes/</code> folders.</p><h2>Error handling</h2><p>Centralize errors with a single middleware at the bottom of your Express app.</p><pre><code>app.use((error, req, res, next) => {\n  res.status(error.status || 500).json({\n    message: error.message || 'Something went wrong'\n  });\n});</code></pre><h2>Security basics</h2><p>Always: rate-limit your routes with <code>express-rate-limit</code>, set security headers with <code>helmet</code>, and never trust <code>req.body</code> without validation.</p>`,
    isFeatured: false,
    visit: 134,
  },
  {
    user: writer._id,
    title: "Content Marketing for Developer Tools",
    slug: "content-marketing-for-developer-tools",
    category: "marketing",
    img: "https://images.unsplash.com/photo-1432888622747-4eb9a8f5f01e?w=800&auto=format&fit=crop",
    desc: "How developer-focused companies grow through technical content — tutorials, open source, and community.",
    content: `<h2>Why content works for developer tools</h2><p>Developers research extensively before adopting a tool. A well-written tutorial that solves a real problem is worth more than any ad. It ranks on Google, gets shared on Hacker News, and builds trust.</p><h2>Types of content that convert</h2><p><strong>Tutorials</strong> — Show how to solve a real problem with your tool. Be specific.</p><p><strong>Comparisons</strong> — Developers search "X vs Y". Write honest comparisons, including your weaknesses.</p><p><strong>Changelogs</strong> — Write changelogs like blog posts. Explain the why behind changes.</p><h2>Distribution</h2><p>Publish on your own domain first for SEO, then share on Hacker News, dev.to, and Reddit.</p>`,
    isFeatured: false,
    visit: 89,
  },
  {
    user: adminUser._id,
    title: "Responsive Design Best Practices in 2025",
    slug: "responsive-design-best-practices-2025",
    category: "web-design",
    img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop",
    desc: "Mobile-first, fluid grids, and component-level responsiveness — the patterns that actually work at scale.",
    content: `<h2>Mobile-first still wins</h2><p>Start with the smallest screen and add complexity as the viewport grows. This forces you to prioritize content and results in leaner CSS.</p><pre><code>/* Mobile base */\n.card { padding: 1rem; }\n\n/* Tablet and up */\n@media (min-width: 768px) {\n  .card { padding: 2rem; }\n}</code></pre><h2>Use relative units</h2><p>Prefer <code>rem</code> for font sizes, <code>em</code> for component-relative spacing, and <code>%</code> for layout.</p><h2>Container queries over media queries</h2><p>As components become reusable across different contexts, container queries handle this naturally — a sidebar card has different space than a hero card.</p><h2>Test on real devices</h2><p>Browser DevTools emulation is not enough. Test on actual phones on slow connections.</p>`,
    isFeatured: false,
    visit: 167,
  },
]);
console.log(`📝  ${posts.length} posts created`);

// ── Comments ────────────────────────────────────────────────
await Comment.insertMany([
  { user: writer._id, post: posts[0]._id, desc: "Finally a clear explanation of the React Compiler. The automatic memoization alone is worth upgrading." },
  { user: adminUser._id, post: posts[0]._id, desc: "Great post! The useOptimistic hook is a game changer for forms." },
  { user: adminUser._id, post: posts[1]._id, desc: "Container queries are underrated. We rewrote our design system with them and never looked back." },
  { user: writer._id, post: posts[2]._id, desc: "Tip: use a separate Atlas project for staging and production. It helps a lot when you need to test migrations." },
  { user: adminUser._id, post: posts[3]._id, desc: "The async error handling was the one thing holding me back from Express 5. Great to see it's finally fixed." },
  { user: writer._id, post: posts[6]._id, desc: "Core Web Vitals are often overlooked by devs. This checklist is exactly what I needed." },
]);
console.log("💬  Comments created");

console.log("\n🎉  Seed complete!");
console.log("────────────────────────────────");
console.log("Admin  → admin@lamalog.com  / Admin1234!");
console.log("Writer → writer@lamalog.com / Writer1234!");
console.log("────────────────────────────────");

await mongoose.disconnect();
