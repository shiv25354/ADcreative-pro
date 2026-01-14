
export enum AdType {
  UGC = 'UGC',
  Testimonial = 'Testimonial',
  Demo = 'Demo',
  Lifestyle = 'Lifestyle',
  Explainer = 'Explainer',
  Review = 'Review',
  BeforeAfter = 'Before/After'
}

export enum UGCStyle {
  GREEN_SCREEN = 'Green Screen React',
  PROBLEM_SOLUTION = 'Problem / Solution',
  UNBOXING = 'Unboxing & First Impression',
  AESTHETIC_VLOG = 'Aesthetic Vlog / GRWM',
  STITCH_BAIT = 'Stitch / Reply Style',
  DITL = 'Day in the Life',
  TUTORIAL = 'Educational Tutorial',
  HAUL = 'Product Haul',
  POV = 'POV / Roleplay',
  TIPS_TRICKS = 'Tips & Hidden Tricks',
  STORYTIME = 'Storytime / Life Hack'
}

export interface StoryboardScene {
  timing: string;
  visual: string;
  cameraAngle: string;
  moodLighting: string;
  text: string; // On-screen text/captions
  audio: string; // Spoken script/voiceover
  creatorInstruction?: string;
}

export interface AdStrategy {
  purpose: {
    core: string;
    goal: string;
    tone: string;
    creatorPersona?: string;
  };
  ugcStyle?: UGCStyle;
  authenticityChecklist: string[];
  storyboard: StoryboardScene[];
  imagePrompt: string;
  cta: {
    copy: string;
    linkPlacement: string;
    exampleLink: string;
  };
  tips: string[];
}

export interface UserInput {
  experience: string;
  productLink: string;
  category: string;
  adType: AdType;
  ugcStyle?: UGCStyle;
  imageFile?: string; // base64
}
