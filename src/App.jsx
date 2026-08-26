import { useEffect, useRef, useState } from "react";
import {
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Layers3,
  MessageCircle,
  MousePointer2,
  PencilLine,
  Phone,
  Sparkles,
  Workflow,
} from "lucide-react";

const navItems = [
  { label: "经历", href: "#experience" },
  { label: "项目", href: "#projects" },
  { label: "优势", href: "#strengths" },
  { label: "联系", href: "#contact" },
];

const personalTags = ["26岁", "ENFJ", "4年经验", "杭州", "本科"];

const workExperiences = [
  {
    period: "2023 - NOW",
    company: "泛微网络科技",
    details: ["OA办公系统", "售前咨询部", "UI设计"],
  },
  {
    period: "2022 - 2023",
    company: "翔创科技",
    details: ["养殖金融", "研发部", "初级产品、UI设计"],
  },
  {
    period: "2022 - 2023 (实习)",
    company: "中圆智能",
    details: ["建筑消防", "产品研发部", "UI设计"],
  },
];

const projects = [
  {
    title: "CRM 客户关系管理系统",
    description:
      "围绕销售线索、客户跟进、商机推进与数据看板搭建的一套 B 端产品设计，强调高频任务效率、信息层级与跨角色协作。",
    image: "/assets/project-crm.png",
    tags: ["CRM", "SaaS", "B端体验", "数据看板"],
    meta: "核心作品 / 持续整理中",
  },
  {
    title: "企业协作与流程体验",
    description:
      "基于泛微工作经历沉淀的业务理解，覆盖组织协同、审批流、表单配置与管理后台等企业级场景。",
    image: "/assets/project-workflow.png",
    tags: ["协作系统", "流程设计", "后台体验"],
    meta: "经历沉淀 / 待补充案例",
  },
];

const strengths = [
  {
    icon: Workflow,
    title: "复杂流程拆解",
    copy: "能把业务链路、角色权限和关键状态梳理成清晰的信息架构，让复杂系统更容易被使用和交付。",
  },
  {
    icon: Layers3,
    title: "B端界面体系化",
    copy: "关注组件复用、页面密度、字段层级和状态反馈，适合 CRM、OA、协作平台等高频工作台场景。",
  },
  {
    icon: MousePointer2,
    title: "交互落地意识",
    copy: "从用户路径、异常状态到开发实现边界一起考虑，减少设计稿与真实产品之间的落差。",
  },
  {
    icon: Sparkles,
    title: "审美克制但有记忆点",
    copy: "偏好干净、精准、有秩序的视觉语言，在专业感之外保留适度的科技感与个人辨识度。",
  },
];

const designStatement = "设计观-小的细节有序组合而成好的设计";
const contactValue = "13099056059";
const editableCopyStorageKey = "mengxiaoyi-portfolio-copy";

const readEditableCopy = () => {
  if (typeof window === "undefined") return {};

  try {
    return JSON.parse(window.localStorage.getItem(editableCopyStorageKey) || "{}");
  } catch {
    return {};
  }
};

function App() {
  const [copyNotice, setCopyNotice] = useState("");
  const [starTrails, setStarTrails] = useState([]);
  const [isExperienceVisible, setIsExperienceVisible] = useState(false);
  const [isIntroCompact, setIsIntroCompact] = useState(false);
  const [isProjectsVisible, setIsProjectsVisible] = useState(false);
  const [isTextEditMode, setIsTextEditMode] = useState(false);
  const [editableCopy, setEditableCopy] = useState(readEditableCopy);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const introCardRef = useRef(null);
  const introTitleRef = useRef(null);
  const introTextRef = useRef(null);
  const introRoleRef = useRef(null);
  const copyTimerRef = useRef(null);
  const starIdRef = useRef(0);
  const starFrameRef = useRef(0);

  const getCopy = (copyId, fallback) => {
    if (Object.prototype.hasOwnProperty.call(editableCopy, copyId)) {
      return editableCopy[copyId];
    }

    return fallback;
  };

  const updateCopy = (copyId, value) => {
    setEditableCopy((previous) => {
      const nextCopy = { ...previous, [copyId]: value };
      window.localStorage.setItem(editableCopyStorageKey, JSON.stringify(nextCopy));
      return nextCopy;
    });
  };

  const blockEditableClick = (event) => {
    if (!isTextEditMode) return;
    event.preventDefault();
    event.stopPropagation();
  };

  const editableTextProps = (copyId) => ({
    contentEditable: isTextEditMode,
    suppressContentEditableWarning: true,
    spellCheck: false,
    "data-editable-text": isTextEditMode ? "true" : undefined,
    onBlur: (event) => updateCopy(copyId, event.currentTarget.innerText),
    onClick: blockEditableClick,
  });

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
      {...editableTextProps(copyId)}
      className={className}
      ref={elementRef}
    >
      {getCopy(copyId, children)}
    </Tag>
  );

  useEffect(() => {
    const section = experienceRef.current;
    if (!section) return undefined;

    if (!("IntersectionObserver" in window)) {
      setIsExperienceVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsExperienceVisible(true);
          observer.disconnect();
        }
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

  const moveExperienceTrail = (event) => {
    const now = performance.now();
    if (now - starFrameRef.current < 34) return;
    starFrameRef.current = now;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const id = starIdRef.current;
    const size = 4 + (id % 4);

    event.currentTarget.style.setProperty("--about-x", `${(x / rect.width) * 100}%`);
    event.currentTarget.style.setProperty("--about-y", `${(y / rect.height) * 100}%`);

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

  const copyContact = async () => {
    const currentContactValue = getCopy("contact.value", contactValue);

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

    setCopyNotice(`已复制手机号/微信号：${currentContactValue}`);
    window.clearTimeout(copyTimerRef.current);
    copyTimerRef.current = window.setTimeout(() => {
      setCopyNotice("");
    }, 2200);
  };

  const currentDesignStatement = getCopy("hero.designStatement", designStatement);

  return (
    <main className={isTextEditMode ? "is-copy-editing" : ""}>
      <button
        className={`copy-edit-toggle ${isTextEditMode ? "is-active" : ""}`}
        type="button"
        aria-pressed={isTextEditMode}
        onClick={() => setIsTextEditMode((isEditing) => !isEditing)}
      >
        {isTextEditMode ? <Check size={18} /> : <PencilLine size={18} />}
        <span>{isTextEditMode ? "完成编辑" : "文案编辑"}</span>
      </button>
      <section
        className="hero"
        id="top"
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
          poster="/assets/hero-poster.png"
        >
          <source src="/assets/hero-background.mp4" type="video/mp4" />
        </video>
        <div className="hero-gradient" />
        <div className="hero-beam" />
        <div className="hero-noise" />
        <div className="hero-right-glow" aria-hidden="true" />
        <header className="site-nav">
          <a className="hero-period" href="#top" aria-label="回到首页" onClick={blockEditableClick}>
            <EditableText copyId="hero.period">UI&UX Designer 2022-2026</EditableText>
          </a>
          <div className="nav-actions">
            <nav className="nav-links" aria-label="页面导航">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={blockEditableClick}>
                  <EditableText copyId={`nav.${item.href}`}>{item.label}</EditableText>
                </a>
              ))}
            </nav>
            <button
              className="nav-contact"
              type="button"
              onClick={isTextEditMode ? blockEditableClick : copyContact}
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

        <div className="hero-content">
          <div className="hero-statement">
            <EditableText
              as="h1"
              className="hero-title"
              copyId="hero.title"
              onPointerMove={moveTitleLight}
            >
              孟肖依的个人网站
            </EditableText>
            <p
              className="hero-lead"
              aria-label={currentDesignStatement}
              {...editableTextProps("hero.designStatement")}
            >
              {isTextEditMode
                ? currentDesignStatement
                : [...currentDesignStatement].map((char, index) => (
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
            <a className="primary-action" href="#projects" onClick={blockEditableClick}>
              <EditableText copyId="hero.primaryAction">查看精选项目</EditableText>
              <ChevronRight size={18} />
            </a>
            <a className="ghost-action" href="#experience" onClick={blockEditableClick}>
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
        onPointerMove={moveExperienceTrail}
      >
        <div className="personal-grid-bg" aria-hidden="true" />
        <div className="star-trails" aria-hidden="true">
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
                <img src="/assets/profile-id-photo.png" alt="孟肖依证件照" />
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
                <img src="/assets/career-glow-arrow.png" alt="" aria-hidden="true" />
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
        <div className="container">
          <div className="section-heading">
            <EditableText as="p" className="section-kicker" copyId="projects.kicker">
              Selected Work
            </EditableText>
            <EditableText as="h2" copyId="projects.title">精选项目</EditableText>
            <EditableText as="p" copyId="projects.description">
              先以 CRM 作为核心作品呈现，预留可扩展结构，后续可以继续补充真实截图、设计过程、关键页面和项目复盘。
            </EditableText>
          </div>
          <div className="project-grid">
            {projects.map((project, projectIndex) => (
              <article
                className="project-card"
                key={project.title}
                onPointerMove={moveProjectLight}
                onPointerLeave={resetProjectLight}
              >
                <div className="project-image">
                  <img src={project.image} alt={`${project.title}作品图片`} />
                </div>
                <div className="project-info">
                  <EditableText as="span" copyId={`project.${projectIndex}.meta`}>
                    {project.meta}
                  </EditableText>
                  <EditableText as="h3" copyId={`project.${projectIndex}.title`}>
                    {project.title}
                  </EditableText>
                  <EditableText as="p" copyId={`project.${projectIndex}.description`}>
                    {project.description}
                  </EditableText>
                  <div className="tag-row">
                    {project.tags.map((tag, tagIndex) => (
                      <EditableText as="span" copyId={`project.${projectIndex}.tag.${tagIndex}`} key={tag}>
                        {tag}
                      </EditableText>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section strengths-section" id="strengths">
        <div className="container">
          <div className="section-heading compact">
            <EditableText as="p" className="section-kicker" copyId="strengths.kicker">
              Strengths
            </EditableText>
            <EditableText as="h2" copyId="strengths.title">个人优势</EditableText>
          </div>
          <div className="strength-grid">
            {strengths.map(({ icon: Icon, title, copy }, strengthIndex) => (
              <article className="strength-card" key={title}>
                <div className="icon-box">
                  <Icon size={24} />
                </div>
                <EditableText as="h3" copyId={`strength.${strengthIndex}.title`}>
                  {title}
                </EditableText>
                <EditableText as="p" copyId={`strength.${strengthIndex}.copy`}>
                  {copy}
                </EditableText>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="container contact-layout">
          <div>
            <EditableText as="p" className="section-kicker" copyId="contact.kicker">
              Contact
            </EditableText>
            <EditableText as="h2" copyId="contact.title">
              期待把下一段产品体验，设计得更清楚也更有质感。
            </EditableText>
          </div>
          <div className="contact-panel">
            <button type="button" onClick={isTextEditMode ? blockEditableClick : copyContact}>
              <Phone size={20} />
              <EditableText as="em" copyId="contact.phoneLabel">手机</EditableText>
              <EditableText as="em" copyId="contact.value">{contactValue}</EditableText>
            </button>
            <button type="button" onClick={isTextEditMode ? blockEditableClick : copyContact}>
              <MessageCircle size={20} />
              <EditableText as="em" copyId="contact.wechatLabel">微信</EditableText>
              <EditableText as="em" copyId="contact.value">{contactValue}</EditableText>
            </button>
            <span>
              <BriefcaseBusiness size={20} />
              <EditableText as="em" copyId="contact.role">UI/UX Designer · CRM / B2B SaaS</EditableText>
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
