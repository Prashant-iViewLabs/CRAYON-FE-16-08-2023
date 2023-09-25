export const DRAWER_WIDTH = 240;

export const ALERT_TYPE = {
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
  SUCCESS: "success",
};

export const USER_ROLES = [
  // {
  //     "role_id": 1,
  //     "name": "superadmin",
  //     "description": "An super admin user"
  // },
  // {
  //     "role_id": 2,
  //     "name": "admin",
  //     "description": "An admin user"
  // },
  {
    role_id: 3,
    name: "candidate",
    description: "A candidate user",
  },
  {
    role_id: 4,
    name: "employer",
    description: "An employer user",
  },
  {
    role_id: 5,
    name: "recruiter",
    description: "A recruiter user",
  },
  {
    role_id: 6,
    name: "promoter",
    description: "A crayon promoter user",
  },
  // {
  //     "role_id": 7,
  //     "name": "coach",
  //     "description": "a coach user"
  // }
];

export const ERROR_MSG = "Something went wrong! Please try again later!";

export const USER_TYPES = ["candidate", "employer", "recruiter", "promoter"];

export const LOGIN_TYPE = ["login", "signup"];

export const PUBLIC_TAB_ITEMS = [
  {
    label: "jobs",
    path: "jobs",
  },
  {
    label: "talent",
    path: "talent",
  },
  {
    label: "solutions",
    path: "solutions",
  },
  {
    label: "pricing",
    path: "pricing",
  },
  {
    label: "contact",
    path: "contact",
  },
];

export const ADMIN_TAB_ITEMS = [
  {
    label: "",
    path: "",
  },
];

export const TAB_ITEMS_EMPLOYER = [
  {
    label: "my crayon",
    path: "employer/my-jobs",
  },
  {
    label: "post a job",
    path: "employer/post-a-job",
  },
  {
    label: "my jobs",
    path: "employer/my-jobs",
  },
  {
    label: "my team",
    path: "employer/my-team",
  },
  {
    label: "get coins",
    path: "employer/coins",
  },
  {
    label: "support",
    path: "employer/support",
  },
  {
    label: "logout",
    path: "*",
  },
];

export const AUTHORIZED_TAB_ITEMS_EMPLOYER = [
  {
    label: "quick links",
    path: "employer/quick_links",
  },
  {
    label: "post a job",
    path: "employer/post-a-job",
  },
  {
    label: "my jobs",
    path: "employer/my-jobs",
  },
  {
    label: "my team",
    path: "employer/my-team",
  },
  {
    label: "my alerts",
    path: "employer/my_alerts",
  },
  {
    label: "my profile",
    path: "employer/my-profile",
  },
];

export const TAB_ITEMS_CANDIDATE = [
  {
    label: "my crayon",
    path: "candidate/my-jobs",
  },
  {
    label: "my jobs",
    path: "candidate/my-jobs",
  },
  {
    label: "my CV",
    path: "candidate/my-cv",
  },
  {
    label: "my videos",
    path: "candidate/my-cam",
  },
  {
    label: "get coins",
    path: "candidate/coins",
  },
  {
    label: "support",
    path: "candidate/support",
  },
  {
    label: "logout",
    path: "*",
  },
];

export const AUTHORIZED_TAB_ITEMS_CANDIDATE = [
  {
    label: "quick links",
    path: "candidate/quick_links",
  },
  {
    label: "my jobs",
    path: "candidate/my-jobs",
  },
  {
    label: "my CV",
    path: "candidate/my-cv",
  },
  {
    label: "my cam",
    path: "candidate/my-cam",
  },
  {
    label: "my alerts",
    path: "candidate/my-alerts",
  },
  {
    label: "my profile",
    path: "candidate/my-profile",
  },
  {
    label: "coins",
    path: "candidate/coins",
  },
];

export const MY_TEAMS_LEFT_PANEL = [
  {
    id: 1,
    name: "Team Status",
    color: "lightGreenButton300",
    title: true,
  },
  {
    id: 3,
    name: "team members",
    color: "lightGreenButton300",
  },
  {
    id: 4,
    name: "recruiters",
    color: "lightGreenButton300",
  },
  {
    id: 5,
    name: "promoters",
    color: "lightGreenButton300",
  },
  {
    id: 6,
    name: "hired talent",
    color: "lightGreenButton300",
  },
];

export const MY_TEAMS_INVITE_STATUS = [
  {
    id: "Invite Status",
    name: "Invite Status",
    color: "blueButton700",
    title: true,
  },
  {
    id: "accepted",
    name: "accepted",
    color: "blueButton700",
  },
  {
    id: "pending",
    name: "pending",
    color: "blueButton700",
  },
  {
    id: "rejected",
    name: "rejected",
    color: "blueButton700",
  },
];

export const JOBS_LEFT_INDUSTRIES_BUTTON_GROUP = [
  {
    id: 1,
    name: "all industies",
    color: "blueButton600",
    title: true,
  },
  {
    id: 2,
    name: "tech",
    color: "blueButton600",
  },
  {
    id: 3,
    name: "digital",
    color: "blueButton600",
  },
  {
    id: 4,
    name: "marketing",
    color: "blueButton600",
  },
  {
    id: 5,
    name: "sales",
    color: "blueButton600",
  },
  {
    id: 6,
    name: "finance",
    color: "blueButton600",
  },
  {
    id: 7,
    name: "insurance",
    color: "blueButton600",
  },
  {
    id: 8,
    name: "operations",
    color: "blueButton600",
  },
  {
    id: 9,
    name: "data",
    color: "blueButton600",
  },
  {
    id: 10,
    name: "real estate",
    color: "blueButton600",
  },
  {
    id: 11,
    name: "education",
    color: "blueButton600",
  },
  {
    id: 12,
    name: "media",
    color: "blueButton600",
  },
];

export const JOBS_LEFT_TYPES_BUTTON_GROUP = [
  {
    id: 1,
    name: "all types",
    color: "leftArrowButton",
    title: true,
  },
  {
    id: 2,
    name: "challengers",
    color: "leftArrowButton",
  },
  {
    id: 3,
    name: "characters",
    color: "leftArrowButton",
  },
  {
    id: 4,
    name: "contemplators",
    color: "leftArrowButton",
  },
  {
    id: 5,
    name: "collaborators",
    color: "leftArrowButton",
  },
];

export const JOBS_RIGHT_JOB_TYPES_BUTTON_GROUP = [
  {
    id: 1,
    name: "all job types",
    color: "blueButton700",
    title: true,
  },
  {
    id: 2,
    name: "freelance",
    color: "blueButton700",
  },
  {
    id: 3,
    name: "full-time",
    color: "blueButton700",
  },
  {
    id: 4,
    name: "remote",
    color: "blueButton700",
  },
  {
    id: 5,
    name: "in-office",
    color: "blueButton700",
  },
  {
    id: 6,
    name: "hybrid",
    color: "blueButton700",
  },
  {
    id: 7,
    name: "crayon recruit",
    color: "blueButton700",
  },
];

export const JOBS_RIGHT_POSTS_BUTTON_GROUP = [
  {
    id: 1,
    name: "all stages",
    color: "lightGreenButton300",
    title: true,
  },
  {
    id: 2,
    name: "review",
    color: "lightGreenButton300",
  },
  {
    id: 3,
    name: "shortlist",
    color: "lightGreenButton300",
  },
  {
    id: 4,
    name: "interview",
    color: "lightGreenButton300",
  },
  {
    id: 5,
    name: "assessment",
    color: "lightGreenButton300",
  },
  {
    id: 6,
    name: "offer",
    color: "lightGreenButton300",
  },
];

export const JOBS_RIGHT_STAGES_BUTTON_GROUP = [
  {
    id: 1,
    name: "all post",
    color: "black100",
    title: true,
  },
  {
    id: 2,
    name: "recent",
    color: "black100",
  },
  {
    id: 3,
    name: "favourites",
    color: "black100",
  },
  {
    id: 4,
    name: "applied jobs",
    color: "black100",
  },
];

export const ADMIN_SEARCH_FILTER = [
  {
    id: 1,
    name: "quick filters",
    color: "blueButton700",
    title: true,
  },
  {
    id: 2,
    name: "permanent",
    color: "blueButton700",
  },
  {
    id: 3,
    name: "contract",
    color: "blueButton700",
  },
  {
    id: 4,
    name: "freelance",
    color: "blueButton700",
  },
  {
    id: 5,
    name: "in-office",
    color: "blueButton700",
  },
  {
    id: 6,
    name: "hybrid",
    color: "blueButton700",
  },
  {
    id: 7,
    name: "remote",
    color: "blueButton700",
  },
  {
    id: 8,
    name: "gender",
    color: "blueButton700",
  },
  {
    id: 9,
    name: "race",
    color: "blueButton700",
  },
  {
    id: 10,
    name: "recent",
    color: "blueButton700",
  },
  {
    id: 11,
    name: "active",
    color: "blueButton700",
  },
  {
    id: 12,
    name: "in-demand",
    color: "blueButton700",
  },
  {
    id: 13,
    name: "favourites",
    color: "blueButton700",
  },
  {
    id: 14,
    name: "my talent",
    color: "blueButton700",
  },
];

export const TALENT_RIGHT_JOB_TYPES_BUTTON_GROUP = [
  {
    id: 1,
    name: "all talents",
    color: "blueButton700",
    title: true,
  },
  {
    id: 2,
    name: "permanent",
    color: "blueButton700",
  },
  {
    id: 3,
    name: "contract",
    color: "blueButton700",
  },
  {
    id: 4,
    name: "freelance",
    color: "blueButton700",
  },
  {
    id: 5,
    name: "in-office",
    color: "blueButton700",
  },
  {
    id: 6,
    name: "hybrid",
    color: "blueButton700",
  },
  {
    id: 7,
    name: "remote",
    color: "blueButton700",
  },
];

export const TALENT_RIGHT_JOB_ACTIVITY_BUTTON_GROUP = [
  {
    id: 1,
    name: "all activity",
    color: "leftArrowButton",
    title: true,
  },
  {
    id: 2,
    name: "recent",
    color: "leftArrowButton",
  },
  {
    id: 3,
    name: "active",
    color: "leftArrowButton",
  },
  {
    id: 4,
    name: "in demand",
    color: "leftArrowButton",
  },
  {
    id: 5,
    name: "favourites",
    color: "leftArrowButton",
  },
  {
    id: 6,
    name: "my talent",
    color: "leftArrowButton",
  },
];

export const CARD_RIGHT_BUTTON_GROUP = [
  {
    id: 1,
    name: "adaptable",
    color: "purpleButton",
    hover: "yellowButton100",
  },
  {
    id: 2,
    name: "detailed",
    color: "purpleButton",
    hover: "yellowButton100",
  },
  {
    id: 3,
    name: "organized",
    color: "purpleButton",
    hover: "yellowButton100",
  },
  {
    id: 4,
    name: "proactive",
    color: "purpleButton",
    hover: "yellowButton100",
  },
  {
    id: 5,
    name: "thrives on stress",
    color: "purpleButton",
    hover: "yellowButton100",
  },
];

export const TALENT_LEFT_BUTTON_GROUP = [
  {
    id: 1,
    name: "all industies",
    color: "blueButton600",
    title: true,
  },
  {
    id: 2,
    name: "tech",
    color: "blueButton600",
  },
  {
    id: 3,
    name: "digital",
    color: "blueButton600",
  },
  {
    id: 4,
    name: "marketing",
    color: "blueButton600",
  },
  {
    id: 5,
    name: "sales",
    color: "blueButton600",
  },
  {
    id: 6,
    name: "finance",
    color: "blueButton600",
  },
  {
    id: 7,
    name: "insurance",
    color: "blueButton600",
  },
  {
    id: 8,
    name: "operations",
    color: "blueButton600",
  },
  {
    id: 9,
    name: "data",
    color: "blueButton600",
  },
  {
    id: 10,
    name: "real estate",
    color: "blueButton600",
  },
  {
    id: 11,
    name: "education",
    color: "blueButton600",
  },
  {
    id: 12,
    name: "media",
    color: "blueButton600",
  },
  {
    id: 13,
    name: "all types",
    color: "purpleButton",
    title: true,
    marginTop: 2,
  },
  {
    id: 14,
    name: "challengers",
    color: "purpleButton",
  },
  {
    id: 15,
    name: "characters",
    color: "purpleButton",
  },
  {
    id: 16,
    name: "contemplators",
    color: "purpleButton",
  },
  {
    id: 17,
    name: "collaborators",
    color: "purpleButton",
  },
];

export const TALENT_RIGHT_BUTTON_GROUP = [
  {
    id: 1,
    name: "all job types",
    color: "blueButton700",
    title: true,
  },
  {
    id: 2,
    name: "freelance",
    color: "blueButton700",
  },
  {
    id: 3,
    name: "full-time",
    color: "blueButton700",
  },
  {
    id: 4,
    name: "remote",
    color: "blueButton700",
  },
  {
    id: 5,
    name: "in-office",
    color: "blueButton700",
  },
  {
    id: 6,
    name: "hybrid",
    color: "blueButton700",
  },
  {
    id: 7,
    name: "crayon recruit",
    color: "blueButton700",
  },
  {
    id: 8,
    name: "all stages",
    color: "lightGreenButton300",
    title: true,
    marginTop: 2,
  },
  {
    id: 9,
    name: "review",
    color: "lightGreenButton300",
  },
  {
    id: 10,
    name: "shortlist",
    color: "lightGreenButton300",
  },
  {
    id: 11,
    name: "interview",
    color: "lightGreenButton300",
  },
  {
    id: 12,
    name: "assessment",
    color: "lightGreenButton300",
  },
  {
    id: 13,
    name: "offer",
    color: "lightGreenButton300",
  },
  {
    id: 14,
    name: "all post",
    color: "black100",
    title: true,
    marginTop: 2,
  },
  {
    id: 15,
    name: "recent",
    color: "black100",
  },
  {
    id: 16,
    name: "favourites",
    color: "black100",
  },
  {
    id: 17,
    name: "applied jobs",
    color: "black100",
  },
];

export const EMPLOYER_MY_JOBS_LEFT = [
  {
    id: 1,
    name: "jobs",
    color: "redButton",
  },
  {
    id: 2,
    name: "settings",
    color: "redButton",
  },
];

export const EMPLOYER_JOB_POSTING_LEFT = [
  {
    id: 1,
    name: "The basics",
    color: "redButton",
  },
  {
    id: 2,
    name: "The details",
    color: "redButton",
  },
  {
    id: 3,
    name: "The culture",
    color: "redButton",
  },
];

export const EMPLOYER_JOB_POSTING_SPEC_LEFT = [
  {
    id: 1,
    name: "build a spec",
    color: "redButton",
  },
  {
    id: 2,
    name: "find a spec",
    color: "redButton",
  },
  {
    id: 3,
    name: "my spec",
    color: "redButton",
  },
];

export const TALENT_LEFT_JOB_APPLICATION_BUTTON_GROUP = [
  {
    id: 1,
    name: "all applications",
    color: "leftArrowButton",
    title: true,
  },
  {
    id: 2,
    name: "complete",
    color: "leftArrowButton",
    // title: true,
  },
  {
    id: 3,
    name: "incomplete",
    color: "leftArrowButton",
    // title: true,
  },
  {
    id: 4,
    name: "video",
    color: "leftArrowButton",
    // title: true,
  },
  {
    id: 5,
    name: "crayon cam",
    color: "leftArrowButton",
    // title: true,
  },
  {
    id: 6,
    name: "portfolio",
    color: "leftArrowButton",
    // title: true,
  },
];

export const TALENT_RIGHT_JOB_INFO_BUTTON_GROUP = [
  {
    id: 1,
    name: "all talent",
    color: "blueButton700",
    title: true,
  },
  {
    id: 2,
    name: "permanent",
    color: "blueButton700",
  },
  {
    id: 3,
    name: "contract",
    color: "blueButton700",
  },
  {
    id: 4,
    name: "freelance",
    color: "blueButton700",
  },
  {
    id: 5,
    name: "in-office",
    color: "blueButton700",
  },
  {
    id: 6,
    name: "hybrid",
    color: "blueButton700",
  },
  {
    id: 7,
    name: "remote",
    color: "blueButton700",
  },
  {
    id: 8,
    name: "gender",
    color: "blueButton700",
    dropDown: true,
    // title: true,
  },
  {
    id: 9,
    name: "race",
    color: "blueButton700",
    dropDown: true,
    // title: true,
  },
  // {
  //   id: 10,
  //   name: "age",
  //   color: "blueButton700",
  //   // title: true,
  // },
  {
    id: 11,
    name: "qualification",
    color: "blueButton700",
    dropDown: true,
    // title: true,
  },
  {
    id: 12,
    name: "salary",
    color: "blueButton700",

    dropDown: true,
    // title: true,
  },
  {
    id: 13,
    name: "experience",
    color: "blueButton700",
    // title: true,
  },
];

export const JOBS_RIGHT_COMPANIES_BUTTON = [
  {
    id: 1,
    name: "all companies",
    color: "redButton300",
    title: true,
  },
  {
    id: 2,
    name: "size",
    color: "redButton300",
  },
  {
    id: 3,
    name: "type",
    color: "redButton300",
  },
];

export const EMPLOYER_MY_JOBS_RIGHT = [
  {
    id: 1,
    name: "all",
    color: "redButton",
  },
  {
    id: 2,
    name: "recruit",
    color: "brownButton",
  },
  {
    id: 3,
    name: "talent/lite",
    color: "redButton",
  },
  {
    id: 4,
    name: "review",
    color: "yellowButton100",
  },
  {
    id: 5,
    name: "shortlist",
    color: "yellowButton100",
  },
  {
    id: 6,
    name: "interview",
    color: "yellowButton100",
  },
  {
    id: 7,
    name: "assessment",
    color: "yellowButton100",
  },
  {
    id: 8,
    name: "offer",
    color: "yellowButton100",
  },
  {
    id: 9,
    name: "recent",
    color: "orangeButton",
  },
  {
    id: 10,
    name: "favourites",
    color: "brownButton",
  },
  {
    id: 11,
    name: "applied",
    color: "lightGreenButton200",
  },
];

export const CANDIDATE_MY_CV_LEFT = [
  {
    id: 1,
    name: "the basics",
    color: "redButton",
  },
  {
    id: 2,
    name: "work life",
    color: "redButton",
  },
  {
    id: 3,
    name: "study life",
    color: "redButton",
  },
];

export const CANDIDATE_MY_CV_RIGHT = [
  {
    id: 1,
    name: "create cv",
    color: "redButton",
  },
  {
    id: 2,
    name: "view my cv",
    color: "redButton",
  },
];

export const ADMIN_LFET_PANEL = [
  {
    id: 0,
    title: "Dashboard",
    path: "dashboard",
    subTitle: "The stats",
    icon: "CreditCardIcon",
    color: "greenButton",
    menuItems: [
      { id: 0, label: "Dashboard item1" },
      { id: 1, label: "Dashboard item2" },
    ],
  },
  {
    id: 1,
    title: "Jobs",
    path: "adminJobs",
    subTitle: "Manage your jobs",
    icon: "NotificationsActiveOutlinedIcon",
    color: "yellowButton300",
    menuItems: [
      { id: 0, label: "All Jobs", path: "all-jobs" },
      { id: 1, label: "Pending Jobs", path: "pending-jobs" },
      { id: 2, label: "Active jobs", path: "active-jobs" },
      { id: 3, label: "Paused jobs", path: "paused-jobs" },
      { id: 4, label: "Closed jobs", path: "closed-jobs" },
      // { label: 'Post a job' },
    ],
  },
  {
    id: 2,
    title: "Talent",
    path: "admin-talent",
    subTitle: "Manage your talent",
    icon: "PermIdentityIcon",
    color: "blueButton400",
    menuItems: [
      { id: 0, label: "All talent", path: "all-talent" },
      { id: 1, label: "My Talent" },
      { id: 2, label: "Applicants", path: "applicants" },
      { id: 3, label: "Followers", path: "followers" },
      { id: 4, label: "Talent pools", path: "talent-pool" },
    ],
  },
  {
    id: 3,
    title: "Search",
    path: "search",
    subTitle: "Find talent, fast",
    icon: "LanguageIcon",
    color: "pinkButton",
    menuItems: [
      { id: 0, label: "Build a search", path: "build-search" },
      { id: 1, label: "Job titles", path: "job-title-search" },
      { id: 2, label: "Skills", path: "skills-search" },
      { id: 3, label: "Tools", path: "tools-search" },
      { id: 4, label: "Qualifications", path: "qualifications-search" },
      { id: 5, label: "Institutions", path: "institution-search" },
      { id: 6, label: "Associations", path: "associations-search" },
      { id: 7, label: "Schools", path: "schools-search" },
      { id: 8, label: "Towns", path: "towns-search" },
      { id: 9, label: "Nationalities", path: "nationalities-search" },
      { id: 10, label: "Languages", path: "languages-search" },
    ],
  },
  {
    id: 4,
    title: "Crayon Chat",
    path: "chat",
    subTitle: "Who said what",
    icon: "ChatBubbleOutlineIcon",
    color: "blueButton400",
    menuItems: [{ id: 0, label: "Chat item1" }],
  },
  {
    id: 5,
    title: "Maintenance",
    path: "maintenance",
    subTitle: "The nuts and bolts",
    icon: "ShowChartIcon",
    color: "yellowButton300",
    menuItems: [
      {
        id: 0,
        label: "Job titles",
        path: "jobtitle",
        counter: "JobsTitlecounter",
      },
      { id: 1, label: "Skills", path: "skills", counter: "Skillscounter" },
      { id: 2, label: "Tools", path: "tools", counter: "Toolscounter" },
      {
        id: 3,
        label: "Qualifications",
        path: "qualifications",
        counter: "Qualificationscounter",
      },
      {
        id: 4,
        label: "Institutions",
        path: "institutions",
        counter: "Institutioncounter",
      },
      {
        id: 5,
        label: "Companies",
        path: "company",
        counter: "CompanyEmpcounter",
      },
      {
        id: 6,
        label: "Associations",
        path: "associations",
        counter: "Associationcounter",
      },
      { id: 7, label: "Schools", path: "schools", counter: "Schoolscounter" },
      { id: 8, label: "Towns", path: "towns", counter: "Townscounter" },
      {
        id: 9,
        label: "Nationalities",
        path: "nationalities",
        counter: "Nationalitycounter",
      },
      {
        id: 10,
        label: "Languages",
        path: "languages",
        counter: "Languagecounter",
      },
      {
        id: 11,
        label: "Industries",
        path: "industries",
        counter: "Industrycounter",
      },
      {
        id: 12,
        label: "Qualification types",
        path: "qualification-types",
        counter: "QualificationTypecounter",
      },
      {
        id: 13,
        label: "Currencies",
        path: "currencies",
        counter: "Currencycounter",
      },
      { id: 14, label: "Vouchers", path: "vouchers", counter: "" },
    ],
  },
];

export const BUILD_SEARCH = [
  { label: "job titles" },
  { label: "tags" },
  { label: "skills" },
  { label: "tools" },
  { label: "qualifications" },
  { label: "institutions" },
  { label: "associations" },
  { label: "schools" },
  { label: "towns" },
  { label: "nationalities" },
  { label: "languages" },
];

export const ADMIN_ACTIVE_JOBS = [
  {
    id: "006",
    name: "Sally",
    logo: "",
    job: "Front End Developer",
    description: "Hooligan Development",
    status: {
      label: "considering",
      color: "yellowButton100",
    },
    crayonComfort: false,
    address: "Paarl, South Africa",
    salary: "R60,000pm",
    experience: "5 years",
    workType: "in-office",
    jobType: "full-time",
    date: "2 Jan 2023",
    days: "3 days",
  },
  {
    id: "005",
    name: "James",
    logo: "",
    job: "Data Scientist",
    description: "Click Learning",
    status: {
      label: "assessment",
      color: "blueButton100",
    },
    crayonComfort: false,
    address: "London, United Kingdom",
    salary: "R40,000pm",
    experience: "4 years",
    workType: "hybrid",
    jobType: "full-time",
    date: "15 Dec 2022",
    days: "22 days",
  },
  {
    id: "004",
    name: "Mike",
    logo: "",
    job: "Lead Developer",
    description: "Ozow Payments",
    status: {
      label: "interview",
      color: "purpleButton",
    },
    crayonComfort: true,
    address: "Cape Town, South Africa",
    salary: "R90,000pm",
    experience: "6 years",
    workType: "remote",
    jobType: "full-time",
    date: "25 Nov 2022",
    days: "42 days",
  },
];

export const ADMIN_TALENT_JOBS = [
  {
    id: "545",
    job: "Mickey Mouse",
    description: "Data Scientist",
    count: 25,
    date: "27 Apr 2022",
    days: "5 days",
    chips: [
      {
        label: "interview",
        color: "lightGreenButton300",
      },
      {
        label: "education",
        color: "blueButton600",
      },
      {
        label: "real estate",
        color: "blueButton600",
      },
    ],
    address: "Sandton, South Africa",
    salary: "R30,000pm",
    experience: "6 years",
    workType: "remote",
    jobType: "full-time",
  },
  {
    id: "546",
    job: "Daffy Duck",
    description: "Lead Engineer",
    count: 43,
    date: "7 May 2019",
    days: "16 days",
    chips: [
      {
        label: "interview",
        color: "purpleButton",
      },
      {
        label: "education",
        color: "brownButton",
      },
      {
        label: "real estate",
        color: "brownButton",
      },
    ],
    address: "Cape Town, South Africa",
    salary: "R30,000pm",
    experience: "6 years",
    workType: "in-office",
    jobType: "full-time",
  },
  {
    id: "547",
    job: "Bugs Bunny",
    description: "Graphic Designer",
    count: 32,
    date: "27 Apr 2022",
    days: "30 days",
    chips: [
      {
        label: "assessment",
        color: "purpleButton",
      },
      {
        label: "tech",
        color: "brownButton",
      },
      {
        label: "finance",
        color: "brownButton",
      },
    ],
    address: "London, United Kingdom",
    salary: "R30,000pm",
    experience: "6 years",
    workType: "in-office",
    jobType: "full-time",
  },
];

export const CV_STEPS = [
  "The basics",
  "work life",
  "study life",
  "Reference",
  "view cv",
];

export const POST_JOB_STEPS = ["The basics", "The details", "The culture add"];

export const WORK_TYPE = [
  {
    id: "remote",
    name: "remote",
  },
  {
    id: "work from office",
    name: "work from office",
  },
];

export const ROLE_TYPE = [
  {
    id: "freelance",
    name: "freelance",
  },
  {
    id: "full-time",
    name: "full-time",
  },
  {
    id: "remote",
    name: "remote",
  },
  {
    id: "in-office",
    name: "in-office",
  },
  {
    id: "hybrid",
    name: "hybrid",
  },
  {
    id: "crayon recruit",
    name: "crayon recruit",
  },
];

export const EMP_PROFILE_STEPS = ["My info", "Company info"];
