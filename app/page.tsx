"use client";

// Home route (/) - trilingual (EN/ZH-Hans/HE) landing page.
// Language is a client-side toggle, not a route, per AGENTS.md's fixed
// route structure (/, /about, /services, /contact) - no new routes here.

import { useEffect, useState } from "react";

type Lang = "en" | "zh" | "he";

interface Problem {
  heading: string;
  paragraph: string;
}

interface Content {
  brand: string;
  hero: {
    headline: string;
    subhead: string;
    moat: string[];
    cta: string;
  };
  problems: Problem[];
  contact: {
    heading: string;
    line: string;
    linkedin: string;
    wechat: string;
  };
}

// Language toggle always shows each language's own name, not a translation
// of the current language - the standard convention for language switchers.
const LANG_LABELS: Record<Lang, string> = {
  en: "EN",
  zh: "中文",
  he: "עברית",
};

const COPY: Record<Lang, Content> = {
  en: {
    brand: "Chaya Kong",
    hero: {
      headline: "The other side of your supply chain is a black box.",
      subhead:
        "I run the commercial interface between Chinese manufacturers and Israeli buyers — negotiation, pricing, terms, and quality management, backed by the data behind every procurement decision.",
      moat: [
        "Native Mandarin and Cantonese",
        "Hong Kong common-law legal training",
        "Fluent Hebrew",
        "Operating experience inside Israeli companies",
      ],
      cta: "Get in touch",
    },
    problems: [
      {
        heading: "Entering and serving the Israeli market",
        paragraph:
          "Israeli buyers move on relationships and speed, not RFPs. I identify the right distributors and accounts, negotiate terms in Hebrew and Mandarin, and manage the relationship on the ground so a Chinese manufacturer can sell into Israel without a local office.",
      },
      {
        heading: "Sourcing from and negotiating with China",
        paragraph:
          "I vet suppliers, negotiate pricing, MOQs, lead times, and payment terms directly in Mandarin, and manage quality on your behalf. The procurement data — landed cost, lead time variance, supplier performance — comes with it, not as an afterthought.",
      },
      {
        heading: "When it's time for a subsidiary",
        paragraph:
          "Once a Chinese manufacturer has real traction in Israel, the next step is usually a local entity — for banking, contracts, and tax residency reasons an informal setup can't cover. I structure the entity, navigate the regulatory steps, and connect you to the licensed counsel and accountants who take it from there.",
      },
    ],
    contact: {
      heading: "Get in touch",
      line: "The fastest way to reach me is LinkedIn or WeChat.",
      linkedin: "LinkedIn — linkedin.com/in/chayakong",
      wechat: "WeChat — @alexhazelkong",
    },
  },
  zh: {
    brand: "Chaya Kong",
    hero: {
      headline: "供应链的另一端,是一个黑箱。",
      subhead:
        "我在中国制造商和以色列买家之间做直接对接——谈判、定价、账期、质量管控,每一步都有数据支持,让采购决策有据可依。",
      moat: [
        "母语普通话与粤语",
        "香港普通法法律背景",
        "希伯来语流利",
        "以色列企业内部运营经验",
      ],
      cta: "联系我",
    },
    problems: [
      {
        heading: "开拓并深耕以色列市场",
        paragraph:
          "以色列买家靠关系和速度做决定,不靠招标书。我帮你找到合适的分销商和客户,用希伯来语和普通话谈条款,并在当地维护这层关系——直到业务稳定到不再需要中间人。",
      },
      {
        heading: "从中国采购与谈判",
        paragraph:
          "供应商筛选、定价、起订量、交期、账期,我直接用普通话谈,并负责质量管控。到岸成本、交期波动、供应商表现这些采购数据,是标配,不是额外服务。",
      },
      {
        heading: "何时该设立子公司",
        paragraph:
          "当中国制造商在以色列站稳脚跟,下一步通常是设立本地实体——银行开户、合同签署、税务居民身份,非正式安排解决不了这些问题。我负责结构搭建、走通监管流程,并为你对接持牌律师和会计师,后续交由他们处理。",
      },
    ],
    contact: {
      heading: "联系我",
      line: "最快联系我的方式是领英或微信。",
      linkedin: "领英 — linkedin.com/in/chayakong",
      wechat: "微信 — @alexhazelkong",
    },
  },
  he: {
    brand: "Chaya Kong",
    hero: {
      headline: "הצד השני של שרשרת האספקה שלך הוא קופסה שחורה.",
      subhead:
        "אני מהווה את הממשק העסקי בין יצרנים סיניים לקונים ישראליים - משא ומתן, תמחור, תנאי תשלום ובקרת איכות, עם הנתונים שעומדים מאחורי כל החלטת רכש.",
      moat: [
        "מנדרינית וקנטונזית ברמת שפת אם",
        "הכשרה משפטית ב-common law בהונג קונג",
        "עברית שוטפת",
        "ניסיון תפעולי בתוך חברות ישראליות",
      ],
      cta: "ליצירת קשר",
    },
    problems: [
      {
        heading: "כניסה לשוק הישראלי ופעילות בו",
        paragraph:
          "קונים ישראלים מחליטים לפי קשרים ומהירות, לא לפי מכרזים. אני מאתרת את המפיצים והלקוחות הנכונים, מנהלת משא ומתן על התנאים בעברית ובמנדרינית, ומלווה את הקשר בשטח - עד שהעסק יציב מספיק כדי לפעול בלי גורם מתווך.",
      },
      {
        heading: "רכש ומשא ומתן מול סין",
        paragraph:
          "בדיקת ספקים, תמחור, כמות מינימום להזמנה, זמני אספקה ותנאי תשלום - הכל במשא ומתן ישיר במנדרינית, כולל בקרת איכות. נתוני הרכש - עלות נחיתה, סטיות בזמני אספקה, ביצועי ספקים - חלק אינטגרלי מהעבודה, לא תוספת.",
      },
      {
        heading: "מתי מקימים חברת בת",
        paragraph:
          "כשליצרן סיני יש כבר אחיזה אמיתית בשוק הישראלי, השלב הבא הוא בדרך כלל הקמת ישות משפטית מקומית - לצורך פעילות בנקאית, חוזים ותושבות מס, דברים שהסדר לא רשמי לא פותר. אני מבנה את ההקמה, מנווטת את התהליך הרגולטורי, ומחברת אתכם לעורכי דין ורואי חשבון מוסמכים שממשיכים מכאן.",
      },
    ],
    contact: {
      heading: "ליצירת קשר",
      line: "הדרך המהירה ביותר ליצור איתי קשר היא לינקדאין או וויצ'אט.",
      // ‎ (LRM) keeps the Latin URL/handle from being reordered oddly
      // inside the surrounding right-to-left sentence.
      linkedin: "לינקדאין — ‎linkedin.com/in/chayakong",
      wechat: "וויצ'אט — ‎@alexhazelkong",
    },
  },
};

const LANGUAGES: Lang[] = ["en", "zh", "he"];

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("en");
  const isRTL = lang === "he";
  const t = COPY[lang];

  // Flips the whole document's direction, not just this page's markup, so
  // native browser RTL behavior (flex/grid axis, default text alignment)
  // applies consistently while Hebrew is selected.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [lang, isRTL]);

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="min-h-screen bg-white">
      <header className="border-b border-navy/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <span className="text-lg font-semibold tracking-tight text-navy">
            {t.brand}
          </span>
          <nav
            className="flex items-center gap-1 rounded-full border border-navy/20 p-1"
            aria-label="Language"
          >
            {LANGUAGES.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`rounded-full px-3 py-1 text-sm transition-colors ${
                  lang === l
                    ? "bg-navy text-white"
                    : "text-navy/60 hover:text-navy"
                }`}
              >
                {LANG_LABELS[l]}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <section className="mx-auto grid max-w-5xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
        <div>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-navy md:text-4xl">
            {t.hero.headline}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-navy/80 md:text-lg">
            {t.hero.subhead}
          </p>
          <a
            href="#contact"
            className="mt-8 inline-block rounded-md bg-navy px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-navy/90"
          >
            {t.hero.cta} {isRTL ? "←" : "→"}
          </a>
        </div>
        <div
          className={`border-t pt-8 md:border-t-0 md:pt-0 ${
            isRTL
              ? "border-navy/15 md:border-r md:pr-10"
              : "border-navy/15 md:border-l md:pl-10"
          }`}
        >
          <ul className="space-y-5">
            {t.hero.moat.map((item, i) => (
              <li
                key={item}
                className={`pb-5 text-sm text-navy/90 md:text-base ${
                  i < t.hero.moat.length - 1 ? "border-b border-navy/10" : ""
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-navy/10">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 py-16 md:grid-cols-3 md:py-20">
          {t.problems.map((p, i) => (
            <div key={p.heading}>
              <span className="text-xs font-medium tracking-widest text-navy/40">
                0{i + 1}
              </span>
              <h2 className="mt-3 text-lg font-semibold text-navy">
                {p.heading}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-navy/70">
                {p.paragraph}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="border-t border-navy/10 bg-navy text-white">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <h2 className="text-2xl font-semibold tracking-tight">
            {t.contact.heading}
          </h2>
          <p className="mt-3 text-white/80">{t.contact.line}</p>
          <div className="mt-6 flex flex-col gap-2 text-sm md:flex-row md:gap-8">
            <a
              href="https://www.linkedin.com/in/chayakong/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-white/80"
            >
              {t.contact.linkedin}
            </a>
            <span>{t.contact.wechat}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
