export interface MeasurementDefinition {
  key: string;
  name: string;
  abbreviation?: string;
  isKey?: boolean;
  view: 'front' | 'back';
  category: 'torso' | 'arms' | 'legs' | 'head_neck';
  defaultCm: number;
  minCm: number;
  maxCm: number;
  description: string;
  // SVG coordinates for visual representation
  svg: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    labelX: number;
    labelY: number;
    leaderLine?: { x1: number; y1: number; x2: number; y2: number };
    isVertical?: boolean;
    colorCode?: string;
  };
}

export const FEMALE_MEASUREMENTS: MeasurementDefinition[] = [
  // FRONT VIEW
  {
    key: 'shoulder',
    name: 'Shoulder Width',
    abbreviation: 'Sh',
    view: 'front',
    category: 'torso',
    defaultCm: 38,
    minCm: 30,
    maxCm: 50,
    description: 'Distance across shoulders from bone tip to bone tip',
    svg: { x1: 125, y1: 130, x2: 175, y2: 130, labelX: 60, labelY: 125, leaderLine: { x1: 125, y1: 130, x2: 85, y2: 125 } }
  },
  {
    key: 'chest',
    name: 'Chest Width',
    abbreviation: 'C',
    isKey: true,
    view: 'front',
    category: 'torso',
    defaultCm: 84,
    minCm: 65,
    maxCm: 130,
    description: 'Upper chest circumference above the bust line',
    svg: { x1: 120, y1: 160, x2: 180, y2: 160, labelX: 45, labelY: 160, leaderLine: { x1: 120, y1: 160, x2: 70, y2: 160 } }
  },
  {
    key: 'bust',
    name: 'Bust Circumference',
    abbreviation: 'B',
    isKey: true,
    view: 'front',
    category: 'torso',
    defaultCm: 88,
    minCm: 70,
    maxCm: 140,
    description: 'Fullest part around breasts with brassiere on',
    svg: { x1: 115, y1: 188, x2: 185, y2: 188, labelX: 65, labelY: 188, leaderLine: { x1: 115, y1: 188, x2: 85, y2: 188 } }
  },
  {
    key: 'shoulder_to_waist',
    name: 'Front Shoulder to Waist',
    abbreviation: 'F.Sh-W',
    view: 'front',
    category: 'torso',
    defaultCm: 42,
    minCm: 34,
    maxCm: 55,
    description: 'From shoulder midpoint over bust peak straight to natural waistline',
    svg: { x1: 138, y1: 130, x2: 138, y2: 240, labelX: 25, labelY: 215, isVertical: true, leaderLine: { x1: 138, y1: 215, x2: 95, y2: 215 } }
  },
  {
    key: 'waist',
    name: 'Natural Waist',
    abbreviation: 'W',
    isKey: true,
    view: 'front',
    category: 'torso',
    defaultCm: 68,
    minCm: 50,
    maxCm: 130,
    description: 'Narrowest horizontal circumference of torso',
    svg: { x1: 128, y1: 240, x2: 172, y2: 240, labelX: 45, labelY: 240, leaderLine: { x1: 128, y1: 240, x2: 75, y2: 240 } }
  },
  {
    key: 'waist_to_hip',
    name: 'Waist to Hip Depth',
    abbreviation: 'W-H',
    view: 'front',
    category: 'torso',
    defaultCm: 20,
    minCm: 14,
    maxCm: 28,
    description: 'Vertical drop from natural waist to the fullest hip level',
    svg: { x1: 165, y1: 240, x2: 165, y2: 295, labelX: 40, labelY: 260, isVertical: true, leaderLine: { x1: 165, y1: 260, x2: 95, y2: 260 } }
  },
  {
    key: 'sleeve_length',
    name: 'Sleeve Length',
    abbreviation: 'Slv',
    view: 'front',
    category: 'arms',
    defaultCm: 58,
    minCm: 45,
    maxCm: 72,
    description: 'From shoulder tip along slightly bent arm to wrist bone',
    svg: { x1: 110, y1: 135, x2: 85, y2: 265, labelX: 30, labelY: 278, leaderLine: { x1: 85, y1: 265, x2: 80, y2: 275 } }
  },
  {
    key: 'hips',
    name: 'Hips (Fullest)',
    abbreviation: 'H',
    isKey: true,
    view: 'front',
    category: 'legs',
    defaultCm: 94,
    minCm: 75,
    maxCm: 150,
    description: 'Fullest horizontal circumference around buttocks/pelvis',
    svg: { x1: 115, y1: 295, x2: 185, y2: 295, labelX: 48, labelY: 295, leaderLine: { x1: 115, y1: 295, x2: 75, y2: 295 } }
  },
  {
    key: 'crotch_depth',
    name: 'Crotch / Rise Depth',
    abbreviation: 'Cr',
    view: 'front',
    category: 'legs',
    defaultCm: 26,
    minCm: 20,
    maxCm: 38,
    description: 'Horizontal level at lowest torso point between legs',
    svg: { x1: 120, y1: 320, x2: 180, y2: 320, labelX: 35, labelY: 320, leaderLine: { x1: 120, y1: 320, x2: 85, y2: 320 } }
  },
  {
    key: 'waist_to_knee',
    name: 'Waist to Knee',
    abbreviation: 'W-Kn',
    view: 'front',
    category: 'legs',
    defaultCm: 56,
    minCm: 42,
    maxCm: 70,
    description: 'Straight vertical distance from waistline to knee joint center',
    svg: { x1: 142, y1: 240, x2: 142, y2: 440, labelX: 38, labelY: 420, isVertical: true, leaderLine: { x1: 142, y1: 420, x2: 95, y2: 420 } }
  },
  {
    key: 'knee_line',
    name: 'Knee Circumference',
    abbreviation: 'Kn',
    view: 'front',
    category: 'legs',
    defaultCm: 36,
    minCm: 28,
    maxCm: 50,
    description: 'Horizontal level right at the knee joint center',
    svg: { x1: 132, y1: 440, x2: 154, y2: 440, labelX: 48, labelY: 445, leaderLine: { x1: 132, y1: 440, x2: 90, y2: 445 } }
  },
  {
    key: 'high_ankle',
    name: 'High Ankle',
    abbreviation: 'H.Ank',
    view: 'front',
    category: 'legs',
    defaultCm: 22,
    minCm: 16,
    maxCm: 32,
    description: 'Circumference just above the ankle bone',
    svg: { x1: 138, y1: 565, x2: 152, y2: 565, labelX: 45, labelY: 565, leaderLine: { x1: 138, y1: 565, x2: 90, y2: 565 } }
  },
  {
    key: 'ankle',
    name: 'Ankle Bone',
    abbreviation: 'Ank',
    view: 'front',
    category: 'legs',
    defaultCm: 21,
    minCm: 15,
    maxCm: 30,
    description: 'Circumference directly over the prominent ankle bone',
    svg: { x1: 138, y1: 580, x2: 152, y2: 580, labelX: 55, labelY: 580, leaderLine: { x1: 138, y1: 580, x2: 90, y2: 580 } }
  },

  // BACK VIEW
  {
    key: 'neck_size',
    name: 'Neck Circumference',
    abbreviation: 'Nk',
    view: 'back',
    category: 'head_neck',
    defaultCm: 35,
    minCm: 28,
    maxCm: 48,
    description: 'Base of neck circumference where collar sits',
    svg: { x1: 135, y1: 130, x2: 165, y2: 130, labelX: 230, labelY: 130, leaderLine: { x1: 165, y1: 130, x2: 215, y2: 130 } }
  },
  {
    key: 'armscye_depth',
    name: 'Armscye Depth (Armhole)',
    abbreviation: 'Arm.D',
    view: 'back',
    category: 'torso',
    defaultCm: 21,
    minCm: 16,
    maxCm: 29,
    description: 'Base of back neck down to horizontal armpit level',
    svg: { x1: 160, y1: 130, x2: 160, y2: 175, labelX: 225, labelY: 145, isVertical: true, leaderLine: { x1: 160, y1: 145, x2: 215, y2: 145 } }
  },
  {
    key: 'back_width',
    name: 'Across Back Width',
    abbreviation: 'Bk.W',
    view: 'back',
    category: 'torso',
    defaultCm: 34,
    minCm: 28,
    maxCm: 48,
    description: 'Midway down armhole across shoulder blades',
    svg: { x1: 122, y1: 160, x2: 178, y2: 160, labelX: 230, labelY: 160, leaderLine: { x1: 178, y1: 160, x2: 220, y2: 160 } }
  },
  {
    key: 'top_arm',
    name: 'Top Arm (Bicep)',
    abbreviation: 'Bic',
    view: 'back',
    category: 'arms',
    defaultCm: 27,
    minCm: 20,
    maxCm: 45,
    description: 'Fullest circumference of upper bicep',
    svg: { x1: 188, y1: 180, x2: 204, y2: 175, labelX: 235, labelY: 180, leaderLine: { x1: 204, y1: 175, x2: 225, y2: 180 } }
  },
  {
    key: 'nape_to_waist',
    name: 'Nape to Waist (CB Length)',
    abbreviation: 'CB.L',
    view: 'back',
    category: 'torso',
    defaultCm: 40,
    minCm: 32,
    maxCm: 52,
    description: 'From 7th cervical vertebra (nape bone) down to waist level',
    svg: { x1: 150, y1: 130, x2: 150, y2: 240, labelX: 235, labelY: 205, isVertical: true, leaderLine: { x1: 150, y1: 205, x2: 225, y2: 205 } }
  },
  {
    key: 'wrist',
    name: 'Wrist Circumference',
    abbreviation: 'Wr',
    view: 'back',
    category: 'arms',
    defaultCm: 16,
    minCm: 12,
    maxCm: 24,
    description: 'Around wrist bone',
    svg: { x1: 185, y1: 270, x2: 198, y2: 270, labelX: 240, labelY: 270, leaderLine: { x1: 198, y1: 270, x2: 230, y2: 270 } }
  },
  {
    key: 'body_rise',
    name: 'Body Rise / Side Seam',
    abbreviation: 'S',
    isKey: true,
    view: 'back',
    category: 'legs',
    defaultCm: 27,
    minCm: 20,
    maxCm: 38,
    description: 'Waistline down to crotch horizontal line for trousers',
    svg: { x1: 168, y1: 240, x2: 168, y2: 320, labelX: 235, labelY: 295, isVertical: true, leaderLine: { x1: 168, y1: 295, x2: 225, y2: 295 } }
  },
  {
    key: 'waist_to_floor',
    name: 'Waist to Floor (Outseam)',
    abbreviation: 'W-Fl',
    isKey: true,
    view: 'back',
    category: 'legs',
    defaultCm: 104,
    minCm: 80,
    maxCm: 130,
    description: 'Side waist down straight over leg contour to floor level',
    svg: { x1: 162, y1: 240, x2: 162, y2: 600, labelX: 235, labelY: 360, isVertical: true, leaderLine: { x1: 162, y1: 360, x2: 225, y2: 360 }, colorCode: '#2563eb' }
  }
];

export function cmToInches(cm: number): number {
  return Number((cm / 2.54).toFixed(1));
}

export function inchesToCm(inches: number): number {
  return Number((inches * 2.54).toFixed(1));
}
