import { useEffect, useRef, useState } from "react";
import {
  ChevronRight,
  Copy,
  Mail,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";

const navItems = [
  { label: "经历", href: "#experience" },
  { label: "项目", href: "#projects" },
  { label: "联系", href: "#contact" },
];

const personalTags = ["26岁", "ENFJ", "4年经验", "杭州", "本科"];

const workExperiences = [
  {
    period: "2023 - NOW",
    company: "泛微网络科技",
    details: ["OA办公系统", "售前部", "UI设计"],
  },
  {
    period: "2022 - 2023",
    company: "翔创科技",
    details: ["养殖金融", "研发部", "初级产品、UI设计"],
  },
];

const projects = [
  {
    id: "crm",
    title: "CRM销售管理系统",
    description:
      "围绕销售线索、客户跟进、商机推进与数据看板搭建的一套 B 端产品设计，强调高频任务效率、信息层级与跨角色协作。",
    image: assetPath("/assets/project-crm-cover.png"),
    gallery: portfolioPages("portfolio-crm", 39, 2),
    tags: ["CRM", "SaaS", "B端体验", "数据看板"],
    meta: "PC端",
  },
  {
    id: "xiangchuang",
    title: "翔创官网",
    description:
      "围绕企业品牌展示、业务介绍与线索转化进行官网体验优化，后续可补充视觉稿、页面结构与上线沉淀。",
    image: assetPath("/assets/project-xiangchuang-cover.png"),
    externalUrl: "https://innovationai.com.cn/#/",
    tags: ["官网设计", "品牌表达", "转化链路"],
    meta: "Web端",
  },
  {
    id: "rongchang",
    title: "荣昌数智贷",
    description:
      "面向金融业务场景的产品体验设计，后续可补充核心流程、风控信息层级、表单体验与关键页面截图。",
    image: assetPath("/assets/project-rongchang-cover.png?v=20260829"),
    gallery: portfolioPages("portfolio-rongchang", 7),
    tags: ["金融产品", "流程设计", "表单体验"],
    meta: "移动端",
  },
  {
    id: "dashboard",
    title: "数据大屏",
    description:
      "聚焦数据指标、驾驶舱布局与动态展示节奏，后续可补充大屏视觉、数据模块与动效说明。",
    image: assetPath("/assets/project-dashboard-cover.png"),
    gallery: portfolioPages("portfolio-dashboard", 7),
    tags: ["数据可视化", "大屏设计", "指标看板"],
    meta: "大屏端",
  },
];

const projectTabs = ["CRM", "翔创官网", "荣昌数智贷", "数据大屏"];

const heroTitle = "孟肖依的个人作品集网站";
const legacyHeroTitle = "孟肖依的个人网站";
const designStatement = "设计观-小的细节有序组合而成好的设计";
const contactValue = "13099056059";
const contactPhoneDisplay = "130 9905 6059";
const contactEmail = "443370547@qq.com";
const editableCopyStorageKey = "mengxiaoyi-portfolio-copy";

function assetPath(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}

function portfolioPages(folder, count, padLength = 0) {
  return Array.from({ length: count }, (_, index) => {
    const pageNumber = String(index + 1).padStart(padLength, "0");
    return assetPath(`/assets/${folder}/page-${pageNumber}.jpg`);
  });
}

const readEditableCopy = () => {
  if (typeof window === "undefined") return {};

  try {
    const savedCopy = JSON.parse(window.localStorage.getItem(editableCopyStorageKey) || "{}");
    if (savedCopy["hero.title"] === legacyHeroTitle) {
      savedCopy["hero.title"] = heroTitle;
      window.localStorage.setItem(editableCopyStorageKey, JSON.stringify(savedCopy));
    }
    return savedCopy;
  } catch {
    return {};
  }
};

function App() {
  const [copyNotice, setCopyNotice] = useState("");
  const [starTrails, setStarTrails] = useState([]);
  const [isTopVisible, setIsTopVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.location.hash === "" || window.location.hash === "#top";
  });
  const [isExperienceVisible, setIsExperienceVisible] = useState(false);
  const [isIntroCompact, setIsIntroCompact] = useState(false);
  const [isProjectsVisible, setIsProjectsVisible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activePortfolio, setActivePortfolio] = useState(null);
  const [editableCopy] = useState(readEditableCopy);
  const topRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const introCardRef = useRef(null);
  const introTitleRef = useRef(null);
  const introTextRef = useRef(null);
  const introRoleRef = useRef(null);
  const copyTimerRef = useRef(null);
  const starIdRef = useRef(0);
  const starFrameRef = useRef(0);
  const scrollSnapLockRef = useRef(false);

  const getCopy = (copyId, fallback) => {
    if (Object.prototype.hasOwnProperty.call(editableCopy, copyId)) {
      return editableCopy[copyId];
    }

    return fallback;
  };

  const EditableText = ({
    as: Tag = "span",
    copyId,
    children,
    className,
    elementRef,
    ...props
  }) => (
    <Tag
      {...props}
      className={className}
      ref={elementRef}
    >
      {getCopy(copyId, children)}
    </Tag>
  );

  useEffect(() => {
    const section = topRef.current;
    if (!section) return undefined;

    if (!("IntersectionObserver" in window)) {
      const updateTopVisibility = () => {
        setIsTopVisible(window.scrollY < window.innerHeight * 0.45);
      };

      updateTopVisibility();
      window.addEventListener("scroll", updateTopVisibility, { passive: true });
      return () => window.removeEventListener("scroll", updateTopVisibility);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTopVisible(entry.isIntersecting && entry.intersectionRatio > 0.45);
      },
      { threshold: [0, 0.45, 0.7] },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = experienceRef.current;
    if (!section) return undefined;

    if (!("IntersectionObserver" in window)) {
      setIsExperienceVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsExperienceVisible(entry.isIntersecting);
      },
      { threshold: 0.36 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = projectsRef.current;
    if (!section) return undefined;

    if (!("IntersectionObserver" in window)) {
      setIsProjectsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsProjectsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = contactRef.current;
    if (!section) return undefined;

    if (!("IntersectionObserver" in window)) {
      setIsContactVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsContactVisible(entry.isIntersecting);
      },
      { threshold: 0.38 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!activePortfolio) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setActivePortfolio(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activePortfolio]);

  useEffect(() => {
    const getSnapSections = () =>
      ["top", "experience", "projects", "contact"]
        .map((id) => document.getElementById(id))
        .filter(Boolean);

    const releaseLock = () => {
      window.clearTimeout(scrollSnapLockRef.current);
      scrollSnapLockRef.current = window.setTimeout(() => {
        scrollSnapLockRef.current = false;
      }, 760);
    };

    const handleWheel = (event) => {
      if (
        event.target.closest(".portfolio-viewer") ||
        window.innerWidth <= 820 ||
        event.ctrlKey ||
        Math.abs(event.deltaY) < 18
      ) {
        return;
      }

      const sections = getSnapSections();
      if (!sections.length) return;

      event.preventDefault();
      if (scrollSnapLockRef.current) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      const scrollTop = window.scrollY;
      const scrollTolerance = 24;
      const currentIndex = sections.reduce((closestIndex, section, index) => {
        const closestDistance = Math.abs(sections[closestIndex].offsetTop - scrollTop);
        const sectionDistance = Math.abs(section.offsetTop - scrollTop);

        return sectionDistance < closestDistance ? index : closestIndex;
      }, 0);
      const nextIndex =
        direction > 0
          ? sections.findIndex((section) => section.offsetTop > scrollTop + scrollTolerance)
          : sections.reduce(
              (targetIndex, section, index) =>
                section.offsetTop < scrollTop - scrollTolerance ? index : targetIndex,
              -1,
            );
      const boundedNextIndex =
        nextIndex === -1
          ? currentIndex
          : Math.max(0, Math.min(sections.length - 1, nextIndex));

      scrollSnapLockRef.current = true;
      if (boundedNextIndex === currentIndex) {
        releaseLock();
        return;
      }

      window.scrollTo({
        top: sections[boundedNextIndex].offsetTop,
        behavior: "smooth",
      });
      releaseLock();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.clearTimeout(scrollSnapLockRef.current);
    };
  }, []);

  useEffect(() => {
    const card = introCardRef.current;
    const title = introTitleRef.current;
    const introText = introTextRef.current;
    const role = introRoleRef.current;
    if (!card || !title || !introText || !role) return undefined;

    const measureIntro = () => {
      const cardStyle = window.getComputedStyle(card);
      const titleStyle = window.getComputedStyle(title);
      const paddingX =
        (parseFloat(cardStyle.paddingLeft) || 0) + (parseFloat(cardStyle.paddingRight) || 0);
      const gap = parseFloat(cardStyle.columnGap) || 0;
      const photoWidth = parseFloat(cardStyle.getPropertyValue("--intro-photo-w")) || 0;
      const textWidthWithPhoto = card.clientWidth - paddingX - gap - photoWidth;
      const lineHeight = parseFloat(titleStyle.lineHeight) || title.clientHeight;
      const titleIsWrapped = title.scrollHeight > lineHeight * 1.35;
      const textBottom = introText.getBoundingClientRect().bottom;
      const roleTop = role.getBoundingClientRect().top;
      const contentIsTouching = roleTop - textBottom < 24;

      setIsIntroCompact((previous) => {
        if (textWidthWithPhoto > 482 && !titleIsWrapped) return false;
        if (previous) return textWidthWithPhoto < 506;
        return textWidthWithPhoto < 442 || titleIsWrapped || contentIsTouching;
      });
    };

    measureIntro();

    const observer = new ResizeObserver(measureIntro);
    observer.observe(card);
    window.addEventListener("resize", measureIntro);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureIntro);
    };
  }, []);

  const moveHeroLight = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    event.currentTarget.style.setProperty("--spot-x", `${x}%`);
    event.currentTarget.style.setProperty("--spot-y", `${y}%`);
  };

  const moveTitleLight = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    event.currentTarget.style.setProperty("--title-x", `${x}%`);
    event.currentTarget.style.setProperty("--title-y", `${y}%`);
  };

  const moveGlobalTrail = (event) => {
    const now = performance.now();
    if (now - starFrameRef.current < 34) return;
    starFrameRef.current = now;

    const section = experienceRef.current;
    if (section && section.contains(event.target)) {
      const rect = section.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      section.style.setProperty("--about-x", `${(x / rect.width) * 100}%`);
      section.style.setProperty("--about-y", `${(y / rect.height) * 100}%`);
    }

    const x = event.clientX;
    const y = event.clientY;
    const id = starIdRef.current;
    const size = 4 + (id % 4);

    const star = {
      id,
      x,
      y,
      size,
      driftX: id % 2 === 0 ? -10 : 10,
      driftY: -18 - (id % 5) * 4,
    };

    starIdRef.current += 1;
    setStarTrails((items) => [...items.slice(-22), star]);
    window.setTimeout(() => {
      setStarTrails((items) => items.filter((item) => item.id !== id));
    }, 960);
  };

  const moveProjectLight = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 5;
    const rotateX = (((event.clientY - rect.top) / rect.height - 0.5) * -5);
    const panX = ((event.clientX - rect.left) / rect.width - 0.5) * -10;
    const panY = ((event.clientY - rect.top) / rect.height - 0.5) * -8;

    event.currentTarget.style.setProperty("--project-x", `${x}%`);
    event.currentTarget.style.setProperty("--project-y", `${y}%`);
    event.currentTarget.style.setProperty("--project-tilt-x", `${rotateX}deg`);
    event.currentTarget.style.setProperty("--project-tilt-y", `${rotateY}deg`);
    event.currentTarget.style.setProperty("--project-pan-x", `${panX}px`);
    event.currentTarget.style.setProperty("--project-pan-y", `${panY}px`);
  };

  const resetProjectLight = (event) => {
    event.currentTarget.style.setProperty("--project-x", "50%");
    event.currentTarget.style.setProperty("--project-y", "42%");
    event.currentTarget.style.setProperty("--project-tilt-x", "0deg");
    event.currentTarget.style.setProperty("--project-tilt-y", "0deg");
    event.currentTarget.style.setProperty("--project-pan-x", "0px");
    event.currentTarget.style.setProperty("--project-pan-y", "0px");
  };

  const jumpToSection = (event, href) => {
    event.preventDefault();
    const section = document.querySelector(href);
    if (!section) return;

    scrollSnapLockRef.current = false;
    window.history.pushState(null, "", href);
    window.scrollTo({
      top: section.offsetTop,
      behavior: "auto",
    });
  };

  const copyValue = async (value) => {
    const currentContactValue = value;

    try {
      await navigator.clipboard.writeText(currentContactValue);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = currentContactValue;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.top = "-999px";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }

    setCopyNotice("复制成功，请尽快联系哦～");
    window.clearTimeout(copyTimerRef.current);
    copyTimerRef.current = window.setTimeout(() => {
      setCopyNotice("");
    }, 2200);
  };

  const copyContact = () => copyValue(contactValue);

  const activeProject = projects[activeProjectIndex];
  const previousProjectIndex = (activeProjectIndex + projects.length - 1) % projects.length;
  const nextProjectIndex = (activeProjectIndex + 1) % projects.length;
  const previousProject = projects[previousProjectIndex];
  const nextProject = projects[nextProjectIndex];

  const changeProject = (nextIndex) => {
    setActiveProjectIndex((nextIndex + projects.length) % projects.length);
  };

  const currentDesignStatement = getCopy("hero.designStatement", designStatement);
  const ProjectHeroElement = activeProject.externalUrl ? "a" : "button";

  return (
    <main
      onPointerMove={moveGlobalTrail}
      style={{ "--about-floor-bg": `url("${assetPath("/assets/about-floor-bg.png")}")` }}
    >
      <div className="global-ambient" aria-hidden="true">
        <div className="global-aurora" />
        <div className="global-rotating-glow" />
        <div className="contact-starfield global-site-starfield">
          {Array.from({ length: 32 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>
      </div>
      <div className="star-trails global-star-trails" aria-hidden="true">
        {starTrails.map((star) => (
          <span
            key={star.id}
            style={{
              "--trail-x": `${star.x}px`,
              "--trail-y": `${star.y}px`,
              "--trail-size": `${star.size}px`,
              "--trail-dx": `${star.driftX}px`,
              "--trail-dy": `${star.driftY}px`,
            }}
          />
        ))}
      </div>
      <header className={`site-nav ${isTopVisible ? "is-top-visible" : ""}`}>
        <a className="hero-period" href="#top" aria-label="回到首页" onClick={(event) => jumpToSection(event, "#top")}>
          <EditableText copyId="hero.period">UI&UX Designer 2022-2026</EditableText>
        </a>
        <div className="nav-actions">
          <nav className="nav-links" aria-label="页面导航">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={(event) => jumpToSection(event, item.href)}>
                <EditableText copyId={`nav.${item.href}`}>{item.label}</EditableText>
              </a>
            ))}
          </nav>
          <button
            className="nav-contact"
            type="button"
            onClick={copyContact}
          >
            <Phone size={18} />
            <EditableText copyId="nav.contact">联系我</EditableText>
          </button>
        </div>
      </header>
      <div
        className={`copy-toast ${copyNotice ? "is-visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {copyNotice}
      </div>
      <section
        className="hero"
        id="top"
        ref={topRef}
        onPointerMove={moveHeroLight}
        onPointerLeave={(event) => {
          event.currentTarget.style.setProperty("--spot-x", "63%");
          event.currentTarget.style.setProperty("--spot-y", "49%");
        }}
      >
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster={assetPath("/assets/hero-poster.png")}
        >
          <source src={assetPath("/assets/hero-background.mp4")} type="video/mp4" />
        </video>
        <div className="hero-gradient" />
        <div className="hero-beam" />
        <div className="hero-noise" />
        <div className="hero-right-glow" aria-hidden="true" />
        <div className="contact-starfield hero-starfield" aria-hidden="true">
          {Array.from({ length: 32 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>

        <div className="hero-content">
          <div className="hero-statement">
            <EditableText
              as="h1"
              className="hero-title"
              copyId="hero.title"
              onPointerMove={moveTitleLight}
            >
              {heroTitle}
            </EditableText>
            <p
              className="hero-lead"
              aria-label={currentDesignStatement}
            >
              {[...currentDesignStatement].map((char, index) => (
                <span
                  aria-hidden="true"
                  key={`${char}-${index}`}
                  style={{ "--char-index": index }}
                >
                  {char}
                </span>
              ))}
            </p>
          </div>
          <div className="hero-actions">
            <a className="primary-action" href="#projects">
              <EditableText copyId="hero.primaryAction">查看精选项目</EditableText>
              <ChevronRight size={18} />
            </a>
            <a className="ghost-action" href="#experience">
              <EditableText copyId="hero.secondaryAction">了解经历</EditableText>
            </a>
          </div>
        </div>
        <EditableText as="p" className="hero-vertical" copyId="hero.backgroundText" aria-hidden="true">
          PORTFOLIO
        </EditableText>
      </section>

      <section
        ref={experienceRef}
        className={`section experience-section ${isExperienceVisible ? "is-visible" : ""}`}
        id="experience"
      >
        <div className="personal-grid-bg" aria-hidden="true" />
        <div className="experience-aurora" aria-hidden="true" />
        <div className="contact-starfield experience-starfield" aria-hidden="true">
          {Array.from({ length: 32 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>
        <div className="container personal-layout">
          <div className="personal-left">
            <article
              className={`personal-card intro-card ${isIntroCompact ? "is-compact" : ""}`}
              ref={introCardRef}
            >
              <div className="intro-copy">
                <EditableText as="h2" copyId="intro.title" elementRef={introTitleRef}>
                  HI,I'M 孟肖依
                </EditableText>
                <p ref={introTextRef}>
                  <EditableText copyId="intro.copy" className="intro-main-text">
                    4 年 B 端产品体验设计经验，有较强的逻辑思维且能保持较高的审美水平。
                    个人优势为曾负责初级产品规划，对业务目标、需求分析和产品逻辑有深入理解，
                  </EditableText>
                  <EditableText copyId="intro.copyHighlight" className="intro-copy-highlight">
                    不只是关注界面，更关注设计如何解决业务问题。
                  </EditableText>
                </p>
                <strong ref={introRoleRef}>
                  <EditableText copyId="intro.roleFull" className="role-full">
                    UI、UX设计 &amp; 初级产品
                  </EditableText>
                  <EditableText copyId="intro.roleShort" className="role-short">
                    UI设计 &amp; 初级产品
                  </EditableText>
                </strong>
              </div>
              <div className="id-photo-card">
                <img src={assetPath("/assets/profile-id-photo.png")} alt="孟肖依证件照" />
              </div>
            </article>

            <article className="personal-card facts-card">
              <EditableText as="h3" copyId="facts.title">关于我</EditableText>
              <div className="facts-list">
                {personalTags.map((tag, index) => (
                  <EditableText as="span" copyId={`facts.tag.${index}`} key={tag}>
                    {tag}
                  </EditableText>
                ))}
              </div>
            </article>
          </div>

          <article className="personal-card career-card">
            <EditableText as="h3" copyId="career.title">工作经历</EditableText>
            <div className="career-timeline">
              <div className="career-line">
                <img src={assetPath("/assets/career-glow-arrow.png")} alt="" aria-hidden="true" />
              </div>
              <div className="career-list">
                {workExperiences.map((item, itemIndex) => (
                  <div className="career-item" key={`${item.period}-${item.company}`}>
                    <EditableText as="span" copyId={`career.${itemIndex}.period`}>
                      {item.period}
                    </EditableText>
                    <EditableText as="h4" copyId={`career.${itemIndex}.company`}>
                      {item.company}
                    </EditableText>
                    <p>
                      {item.details.map((detail, index) => (
                        <span className="career-detail" key={detail}>
                          {index > 0 && <i aria-hidden="true">|</i>}
                          <EditableText
                            copyId={`career.${itemIndex}.detail.${index}`}
                            className="career-detail-text"
                          >
                            {detail}
                          </EditableText>
                        </span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      <section
        ref={projectsRef}
        className={`section projects-section ${isProjectsVisible ? "is-visible" : ""}`}
        id="projects"
      >
        <div className="project-glow-dock" aria-hidden="true" />
        <div className="contact-starfield project-starfield" aria-hidden="true">
          {Array.from({ length: 32 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>
        <div className="container project-showcase-container">
          <EditableText as="p" className="project-bg-word" copyId="projects.backgroundText">
            SELECTED WORK
          </EditableText>

          <nav className="project-tabs" aria-label="项目分类">
            {projectTabs.map((tab, tabIndex) => (
              <button
                type="button"
                className={tabIndex === activeProjectIndex ? "is-active" : ""}
                aria-pressed={tabIndex === activeProjectIndex}
                onClick={() => changeProject(tabIndex)}
                key={tab}
              >
                <EditableText as="span" copyId={`projects.tab.${tabIndex}`}>
                  {tab}
                </EditableText>
              </button>
            ))}
          </nav>

          <div className="project-showcase">
            <button
              className="showcase-arrow showcase-arrow-left"
              aria-label="上一个项目"
              onClick={() => changeProject(previousProjectIndex)}
            >
              <ChevronRight size={28} strokeWidth={2.2} />
            </button>

            <article className="project-peek project-peek-left" aria-label="上一个项目预览">
              <img src={previousProject.image} alt={`${previousProject.title}作品图片`} />
              <div>
                <EditableText as="span" copyId={`project.${previousProjectIndex}.meta`}>
                  {previousProject.meta}
                </EditableText>
                <EditableText as="strong" copyId={`project.${previousProjectIndex}.title`}>
                  {previousProject.title}
                </EditableText>
              </div>
            </article>

            <ProjectHeroElement
              className="project-hero-card"
              {...(activeProject.externalUrl
                ? {
                    href: activeProject.externalUrl,
                    target: "_blank",
                    rel: "noopener noreferrer",
                  }
                : {
                    type: "button",
                    onClick: () => setActivePortfolio(activeProject),
                  })}
              aria-label={`打开${activeProject.title}详情`}
              onPointerMove={moveProjectLight}
              onPointerLeave={resetProjectLight}
            >
              <img
                className="project-cover-image"
                key={activeProject.title}
                src={activeProject.image}
                alt={`${activeProject.title}作品封面`}
              />
            </ProjectHeroElement>

            <article className="project-peek project-peek-right" aria-label="下一个项目预览">
              <img src={nextProject.image} alt={`${nextProject.title}作品图片`} />
              <div>
                <EditableText as="span" copyId={`project.${nextProjectIndex}.meta`}>
                  {nextProject.meta}
                </EditableText>
                <EditableText as="strong" copyId={`project.${nextProjectIndex}.title`}>
                  {nextProject.title}
                </EditableText>
              </div>
            </article>

            <button
              className="showcase-arrow showcase-arrow-right"
              aria-label="下一个项目"
              onClick={() => changeProject(nextProjectIndex)}
            >
              <ChevronRight size={28} strokeWidth={2.2} />
            </button>
          </div>

          <div className="project-mobile-list" aria-label="项目作品列表">
            {projects.map((project, projectIndex) => (
              <button
                className="project-mobile-card"
                type="button"
                onClick={() => {
                  if (project.externalUrl) {
                    window.open(project.externalUrl, "_blank", "noopener,noreferrer");
                    return;
                  }
                  setActivePortfolio(project);
                }}
                key={project.title}
              >
                <img src={project.image} alt={`${project.title}作品封面`} />
                <div>
                  <EditableText as="span" copyId={`project.${projectIndex}.meta`}>
                    {project.meta}
                  </EditableText>
                  <EditableText as="strong" copyId={`project.${projectIndex}.title`}>
                    {project.title}
                  </EditableText>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={contactRef}
        className={`contact-section ${isContactVisible ? "is-visible" : ""}`}
        id="contact"
      >
        <img className="contact-bg-image" src={assetPath("/assets/contact-ending-bg.png")} alt="" aria-hidden="true" />
        <div className="contact-starfield" aria-hidden="true">
          {Array.from({ length: 32 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>
        <div className="container contact-layout">
          <div className="contact-thanks">
            <img className="contact-thanks-line" src={assetPath("/assets/contact-thanks-line.png")} alt="" aria-hidden="true" />
            <EditableText
              as="h2"
              className="hero-title contact-thanks-title"
              copyId="contact.title"
              onPointerMove={moveTitleLight}
            >
              感谢观看
            </EditableText>
          </div>
          <div className="contact-panel">
            <img className="contact-qr" src={assetPath("/assets/contact-wechat-qr.png")} alt="微信二维码" />
            <div className="contact-info">
              <div className="contact-row">
                <Phone size={18} />
                <EditableText as="span" copyId="contact.phoneLabel">电话</EditableText>
                <EditableText as="em" copyId="contact.phoneDisplay">{contactPhoneDisplay}</EditableText>
                <div className="contact-copy-wrap">
                  <button
                    type="button"
                    aria-label="复制手机号"
                    onClick={() => copyValue(contactValue)}
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>
              <div className="contact-row">
                <MessageCircle size={18} />
                <EditableText as="span" copyId="contact.wechatLabel">微信</EditableText>
                <EditableText as="em" copyId="contact.wechatDisplay">{contactPhoneDisplay}</EditableText>
                <div className="contact-copy-wrap">
                  <button
                    type="button"
                    aria-label="复制微信号"
                    onClick={() => copyValue(contactValue)}
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>
              <div className="contact-row">
                <Mail size={18} />
                <EditableText as="span" copyId="contact.emailLabel">邮箱</EditableText>
                <EditableText as="em" copyId="contact.email">{contactEmail}</EditableText>
                <div className="contact-copy-wrap">
                  <button
                    type="button"
                    aria-label="复制邮箱"
                    onClick={() => copyValue(contactEmail)}
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {activePortfolio && (
        <div
          className="portfolio-viewer"
          role="dialog"
          aria-modal="true"
          aria-label={`${activePortfolio.title}作品集预览`}
        >
          <div className="portfolio-viewer-top">
            <div>
              <span>{activePortfolio.meta}</span>
              <strong>{activePortfolio.title}</strong>
            </div>
            <button
              type="button"
              className="portfolio-viewer-close"
              onClick={() => setActivePortfolio(null)}
              aria-label="关闭作品集预览"
            >
              <X size={22} />
            </button>
          </div>
          <div className="portfolio-viewer-pages">
            {activePortfolio.gallery.map((page, index) => (
              <figure className="portfolio-viewer-page" key={page}>
                <img
                  src={page}
                  alt={`${activePortfolio.title}作品集第${index + 1}页`}
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                  draggable="false"
                  onContextMenu={(event) => event.preventDefault()}
                />
              </figure>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
