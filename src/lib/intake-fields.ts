export type IntakeFieldKind =
  | "text"
  | "url"
  | "email"
  | "tel"
  | "number"
  | "textarea"
  | "select";

export interface IntakeFieldSchema {
  id: IntakeFieldId;
  label: string;
  kind: IntakeFieldKind;
  placeholder?: string;
  helpText?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  options?: { value: string; label: string }[];
}

export type IntakeFieldId =
  | "contactName"
  | "contactEmail"
  | "contactCompany"
  | "contactPhone"
  | "contactRole"
  | "siteUrl"
  | "domainName"
  | "orgName"
  | "industry"
  | "pageCount"
  | "brandBrief"
  | "deadline"
  | "objective"
  | "targetAudience"
  | "targetKeywords"
  | "blogTopic"
  | "blogWordcount"
  | "pagesToUpdate"
  | "changeDescription"
  | "currentRegistrar"
  | "currentHost"
  | "currentAccount"
  | "repoUrl"
  | "recordDetails"
  | "userName"
  | "userEmail"
  | "userCount"
  | "migrationSource"
  | "dataHandling"
  | "budgetMonth"
  | "campaignFocus"
  | "adAssets"
  | "platforms"
  | "postTheme"
  | "postCount"
  | "gbpUrl"
  | "pagesList"
  | "notes";

export const INTAKE_FIELDS: Record<IntakeFieldId, IntakeFieldSchema> = {
  // Shared contact fields — captured in the submission dialog, not per task
  contactName: {
    id: "contactName",
    label: "Your name",
    kind: "text",
    required: true,
    maxLength: 100,
  },
  contactEmail: {
    id: "contactEmail",
    label: "Work email",
    kind: "email",
    required: true,
    maxLength: 200,
  },
  contactCompany: {
    id: "contactCompany",
    label: "Company",
    kind: "text",
    required: true,
    maxLength: 120,
  },
  contactPhone: {
    id: "contactPhone",
    label: "Phone (optional)",
    kind: "tel",
    maxLength: 40,
  },
  contactRole: {
    id: "contactRole",
    label: "Your role (optional)",
    kind: "text",
    maxLength: 120,
  },

  // Common per-task fields
  siteUrl: {
    id: "siteUrl",
    label: "Website URL",
    kind: "url",
    required: true,
    placeholder: "https://",
    maxLength: 300,
  },
  domainName: {
    id: "domainName",
    label: "Domain name",
    kind: "text",
    required: true,
    placeholder: "example.com.au",
    maxLength: 200,
  },
  orgName: {
    id: "orgName",
    label: "Business name",
    kind: "text",
    required: true,
    maxLength: 120,
  },
  industry: {
    id: "industry",
    label: "Industry / sector",
    kind: "text",
    required: true,
    maxLength: 120,
  },
  pageCount: {
    id: "pageCount",
    label: "Approx. number of pages",
    kind: "number",
    required: true,
    min: 1,
    max: 500,
  },
  brandBrief: {
    id: "brandBrief",
    label: "Brand and tone brief",
    kind: "textarea",
    required: true,
    helpText: "How you sound, who you serve, what makes you different.",
    minLength: 30,
    maxLength: 2000,
  },
  deadline: {
    id: "deadline",
    label: "Target timeline",
    kind: "text",
    placeholder: "e.g. by end of May, 6-week window",
    maxLength: 120,
  },
  objective: {
    id: "objective",
    label: "What does success look like?",
    kind: "textarea",
    required: true,
    minLength: 20,
    maxLength: 1500,
  },
  targetAudience: {
    id: "targetAudience",
    label: "Target audience",
    kind: "textarea",
    required: true,
    minLength: 10,
    maxLength: 800,
  },
  targetKeywords: {
    id: "targetKeywords",
    label: "Priority keywords (one per line)",
    kind: "textarea",
    maxLength: 1500,
  },
  blogTopic: {
    id: "blogTopic",
    label: "Blog topic or working title",
    kind: "textarea",
    required: true,
    minLength: 5,
    maxLength: 500,
  },
  blogWordcount: {
    id: "blogWordcount",
    label: "Target length",
    kind: "select",
    required: true,
    options: [
      { value: "500", label: "~500 words" },
      { value: "1000", label: "~1,000 words" },
      { value: "1500", label: "~1,500 words" },
      { value: "2000", label: "~2,000 words" },
    ],
  },
  pagesToUpdate: {
    id: "pagesToUpdate",
    label: "Pages to update",
    kind: "textarea",
    required: true,
    helpText: "Paste URLs or list the pages.",
    minLength: 3,
    maxLength: 1500,
  },
  changeDescription: {
    id: "changeDescription",
    label: "What needs to change",
    kind: "textarea",
    required: true,
    minLength: 10,
    maxLength: 2000,
  },
  currentRegistrar: {
    id: "currentRegistrar",
    label: "Current registrar",
    kind: "text",
    required: true,
    maxLength: 120,
  },
  currentHost: {
    id: "currentHost",
    label: "Current host",
    kind: "text",
    required: true,
    maxLength: 120,
  },
  currentAccount: {
    id: "currentAccount",
    label: "Existing account or manager email",
    kind: "text",
    required: true,
    maxLength: 200,
  },
  repoUrl: {
    id: "repoUrl",
    label: "Git repository URL (optional)",
    kind: "url",
    maxLength: 300,
  },
  recordDetails: {
    id: "recordDetails",
    label: "DNS records to add or change",
    kind: "textarea",
    required: true,
    helpText: "List each record as type + host + value.",
    minLength: 10,
    maxLength: 2000,
  },
  userName: {
    id: "userName",
    label: "Full name of user",
    kind: "text",
    required: true,
    maxLength: 120,
  },
  userEmail: {
    id: "userEmail",
    label: "User email to create or change",
    kind: "email",
    required: true,
    maxLength: 200,
  },
  userCount: {
    id: "userCount",
    label: "Number of mailboxes",
    kind: "number",
    required: true,
    min: 1,
    max: 1000,
  },
  migrationSource: {
    id: "migrationSource",
    label: "Migrating from",
    kind: "select",
    required: true,
    options: [
      { value: "microsoft-365", label: "Microsoft 365" },
      { value: "other-google", label: "Another Google Workspace tenant" },
      { value: "imap", label: "Generic IMAP / cPanel" },
      { value: "none", label: "Net-new — no migration" },
      { value: "other", label: "Other (describe in notes)" },
    ],
  },
  dataHandling: {
    id: "dataHandling",
    label: "What to do with this user's data",
    kind: "select",
    required: true,
    options: [
      { value: "delete", label: "Delete account and data" },
      { value: "transfer", label: "Transfer data to another user" },
      { value: "archive", label: "Archive and retain" },
    ],
  },
  budgetMonth: {
    id: "budgetMonth",
    label: "Monthly ad spend (AUD)",
    kind: "number",
    required: true,
    helpText: "Ad spend goes direct to the platform — separate to management.",
    min: 500,
    max: 500000,
  },
  campaignFocus: {
    id: "campaignFocus",
    label: "Campaign focus",
    kind: "textarea",
    required: true,
    minLength: 10,
    maxLength: 1500,
  },
  adAssets: {
    id: "adAssets",
    label: "Creative assets available",
    kind: "textarea",
    required: true,
    helpText: "Video, photos, copy — or tell us you need creative help.",
    minLength: 5,
    maxLength: 1500,
  },
  platforms: {
    id: "platforms",
    label: "Platforms",
    kind: "select",
    required: true,
    options: [
      { value: "facebook-instagram", label: "Facebook + Instagram" },
      { value: "facebook", label: "Facebook only" },
      { value: "instagram", label: "Instagram only" },
      { value: "linkedin", label: "LinkedIn only" },
      { value: "facebook-instagram-linkedin", label: "Facebook + Instagram + LinkedIn" },
    ],
  },
  postTheme: {
    id: "postTheme",
    label: "Post themes and pillars",
    kind: "textarea",
    required: true,
    minLength: 10,
    maxLength: 1500,
  },
  postCount: {
    id: "postCount",
    label: "Posts per week",
    kind: "number",
    required: true,
    min: 1,
    max: 14,
  },
  gbpUrl: {
    id: "gbpUrl",
    label: "Google Business Profile URL",
    kind: "url",
    required: true,
    maxLength: 300,
  },
  pagesList: {
    id: "pagesList",
    label: "Pages in scope",
    kind: "textarea",
    required: true,
    helpText: "Paste URLs or list page titles.",
    minLength: 5,
    maxLength: 1500,
  },
  notes: {
    id: "notes",
    label: "Anything else we should know?",
    kind: "textarea",
    maxLength: 2000,
  },
};

export const CONTACT_FIELD_IDS: IntakeFieldId[] = [
  "contactName",
  "contactEmail",
  "contactCompany",
  "contactPhone",
  "contactRole",
];
