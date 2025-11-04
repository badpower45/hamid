import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-1fccac55/health", (c) => {
  return c.json({ status: "ok" });
});

// ========== Site Content ==========
// Get site content
app.get("/make-server-1fccac55/site-content", async (c) => {
  try {
    const content = await kv.get("site-content");
    return c.json({ success: true, content: content || getDefaultSiteContent() });
  } catch (error) {
    console.error("Error fetching site content:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update site content
app.post("/make-server-1fccac55/site-content", async (c) => {
  try {
    const body = await c.req.json();
    await kv.set("site-content", body);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error updating site content:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ========== News ==========
// Get all news
app.get("/make-server-1fccac55/news", async (c) => {
  try {
    const newsList = await kv.getByPrefix("news-");
    const sortedNews = newsList.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return c.json({ success: true, news: sortedNews });
  } catch (error) {
    console.error("Error fetching news:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Add news
app.post("/make-server-1fccac55/news", async (c) => {
  try {
    const body = await c.req.json();
    const id = `news-${Date.now()}`;
    const newsItem = { ...body, id, createdAt: new Date().toISOString() };
    await kv.set(id, newsItem);
    return c.json({ success: true, news: newsItem });
  } catch (error) {
    console.error("Error adding news:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete news
app.delete("/make-server-1fccac55/news/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(id);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting news:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ========== Videos ==========
// Get all videos
app.get("/make-server-1fccac55/videos", async (c) => {
  try {
    const videosList = await kv.getByPrefix("video-");
    const sortedVideos = videosList.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return c.json({ success: true, videos: sortedVideos });
  } catch (error) {
    console.error("Error fetching videos:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Add video
app.post("/make-server-1fccac55/videos", async (c) => {
  try {
    const body = await c.req.json();
    const id = `video-${Date.now()}`;
    const video = { ...body, id, createdAt: new Date().toISOString() };
    await kv.set(id, video);
    return c.json({ success: true, video });
  } catch (error) {
    console.error("Error adding video:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete video
app.delete("/make-server-1fccac55/videos/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(id);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting video:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ========== Articles ==========
// Get all articles
app.get("/make-server-1fccac55/articles", async (c) => {
  try {
    const articlesList = await kv.getByPrefix("article-");
    const sortedArticles = articlesList.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return c.json({ success: true, articles: sortedArticles });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Add article
app.post("/make-server-1fccac55/articles", async (c) => {
  try {
    const body = await c.req.json();
    const id = `article-${Date.now()}`;
    const article = { ...body, id, createdAt: new Date().toISOString() };
    await kv.set(id, article);
    return c.json({ success: true, article });
  } catch (error) {
    console.error("Error adding article:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete article
app.delete("/make-server-1fccac55/articles/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(id);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting article:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ========== Forms ==========
// Submit volunteer form
app.post("/make-server-1fccac55/volunteers", async (c) => {
  try {
    const body = await c.req.json();
    const id = `volunteer-${Date.now()}`;
    const volunteer = { ...body, id, timestamp: new Date().toISOString() };
    await kv.set(id, volunteer);
    return c.json({ success: true, volunteer });
  } catch (error) {
    console.error("Error submitting volunteer form:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Submit ticket form
app.post("/make-server-1fccac55/tickets", async (c) => {
  try {
    const body = await c.req.json();
    const ticketNumber = `TICKET-${Date.now().toString().slice(-6)}`;
    const id = `ticket-${Date.now()}`;
    const ticket = { 
      ...body, 
      id,
      ticketNumber,
      status: 'قيد المراجعة',
      timestamp: new Date().toISOString() 
    };
    await kv.set(id, ticket);
    return c.json({ success: true, ticket });
  } catch (error) {
    console.error("Error submitting ticket:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Submit idea form
app.post("/make-server-1fccac55/ideas", async (c) => {
  try {
    const body = await c.req.json();
    const id = `idea-${Date.now()}`;
    const idea = { ...body, id, timestamp: new Date().toISOString() };
    await kv.set(id, idea);
    return c.json({ success: true, idea });
  } catch (error) {
    console.error("Error submitting idea:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get all volunteers (for admin)
app.get("/make-server-1fccac55/volunteers", async (c) => {
  try {
    const volunteers = await kv.getByPrefix("volunteer-");
    return c.json({ success: true, volunteers });
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get all tickets (for admin)
app.get("/make-server-1fccac55/tickets", async (c) => {
  try {
    const tickets = await kv.getByPrefix("ticket-");
    return c.json({ success: true, tickets });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get all ideas (for admin)
app.get("/make-server-1fccac55/ideas", async (c) => {
  try {
    const ideas = await kv.getByPrefix("idea-");
    return c.json({ success: true, ideas });
  } catch (error) {
    console.error("Error fetching ideas:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

function getDefaultSiteContent() {
  return {
    // Hero Section
    heroVideo: "https://player.vimeo.com/video/1133168419?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0",
    heroTitle: "صوت من عندكم...\\nمستقبل ليكم.\\nحامد بندق",
    heroSubtitle: "من بورسعيد... لبورسعيد، نبني مستقبل شبابنا سوا",
    
    // Principles Section
    principlesTitle: "ليه احنا مختلفين؟",
    principlesSubtitle: "بورسعيد تستحق سياسة نظيفة ونائب تلاقيه في الشارع مش في المكتب بس",
    principlesAxis1Title: "نزاهة حقيقية",
    principlesAxis1Content: "القلوب ما تنشتريش، لكن العقول نقدر نكسبها. مفيش فلوس مشبوهة - حملتنا ببرنامج واضح وتمويل شفاف. النائب اللي بيبدأ بالفلوس هيخدم الفلوس، احنا بنبدأ بيكم وهنخدمكم.",
    principlesAxis2Title: "معاكم على طول",
    principlesAxis2Content: "مش هتلاقوني قاعد في مكتب مستني تيجوا - أنا هكون في الشارع وبينكم. منصة رقمية للمتابعة: كل شكوى بتاخد رقم والرد خلال 48 ساعة. التواصل حق مش فضل.",
    
    // Youth Agenda Section
    youthAgendaTitle: "برنامجنا للشباب",
    youthAgendaSubtitle: "مش كلام فاضي - حلول حقيقية لمشاكل حقيقية",
    housingProblem: "شباب بورسعيد محتاج بيت يعيش فيه، مش مجرد اجتماعات ووعود",
    housingSolution1: "قانون حقيقي: تخصيص إجباري لأراضي جديدة مخصصة للشباب فقط",
    housingSolution2: "رقابة فعّالة: مساءلة المسؤولين عن تأخير تسليم الوحدات",
    jobsProblem: "خريجين كتير ووظائف قليلة - والموجود مش بيليق بطموح شبابنا",
    jobsSolution1: "Port Said Tech-Port: إلزام الشركات بـ500 وظيفة نوعية سنوياً (برمجة، لوجستيات، صيانة)",
    jobsSolution2: "تدريب هادف: ربط البرامج باحتياجات السوق الحقيقية",
    
    // Biography Section
    biographyTitle: "مين هو حامد بندق؟",
    biographySubtitle: "واحد منكم... وليكم",
    biographyText1: "رائد أعمال بورسعيدي، عنده خبرة في الأعمال والمسؤولية المجتمعية. مش بس كلام - ده واحد اشتغل وبنى وساعد.",
    biographyText2: "من خلال شغله في الاستيراد والتصدير والصناعة، عايش واقع الاقتصاد البورسعيدي وفاهم تحديات الشباب في الشغل والحياة.",
    biographyText3: "الفرق معانا: مش هتيجي تقابلني في مكتب مقفول، هتلاقيني في الشارع وبينكم. التواصل مش منّة، ده حق ليكم عليّا.",
    
    // Contact Section
    contactTitle: "تعالى نتكلم",
    contactSubtitle: "حملتنا بتعتمد على طاقتكم وأفكاركم، مش على الفلوس",
    
    // Footer
    footerPhone: "+20 XXX XXX XXXX",
    footerEmail: "info@hamedbondo.eg",
    footerFacebook: "https://facebook.com/hamedbondo",
    footerWhatsapp: "https://wa.me/20XXXXXXXXXX",
  };
}

Deno.serve(app.fetch);
