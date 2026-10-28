import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    geminiConfigured: Boolean(apiKey),
    timestamp: new Date().toISOString(),
  });
});

// Curated fallbacks for reliable offline execution
const CURATED_PROJECT_IDEAS: Record<string, any> = {
  'Computer Science & IT': {
    title: 'CodeSentinel: Real-Time AST & Security Vulnerability Auditor',
    problemStatement: 'Final-year student repositories often fail industry security checks and code reviews due to undetected SQL injection vectors, leaked tokens, and unoptimized complexity.',
    shortDescription: 'An automated GitHub agent that analyzes AST structures and diffs in pull requests, identifies anti-patterns, and drafts unit tests using LLM structured function calling.',
    suggestedFeatures: [
      'AST-based static code parser with OWASP Top 10 vulnerability scanner',
      'Automated pull request diff commentator using Gemini 3.8 Flash function calling',
      'Interactive test generator drafting Jest and PyTest test cases for flagged modules',
      'One-click recruiter-ready audit report exported as a verified PDF badge'
    ],
    relevanceExplanation: 'Directly demonstrates full-stack software development, systems-level compiler understanding, and production LLM orchestration required by product engineering recruiters.',
    workshopBuildPart: 'Build a live code-diff analyzer using Gemini 3.8 Flash that inspects snippet inputs and returns inline diagnostic reviews in structured JSON.',
    techStack: ['Gemini 3.8 Flash', 'TypeScript', 'Node.js / Express', 'GitHub Octokit API'],
    resumeBullets: [
      'Architected an autonomous PR code-reviewer using Gemini 3.8 Flash, reducing manual review latency by 72% across 40+ repository test cases.',
      'Implemented automated static AST inspection detecting OWASP Top 10 vulnerabilities with 91% precision and zero false security blocks.'
    ],
    difficulty: 'Intermediate',
    viabilityScore: 96,
    estimatedHours: '12-16 hours to complete MVP'
  },
  'Electronics & IoT': {
    title: 'VibraGuard AI: Micro-Vibration Anomaly Detector for Industrial Machinery',
    problemStatement: 'Factory equipment and electric motors experience catastrophic failures due to subtle bearing wear that traditional threshold sensors fail to diagnose early.',
    shortDescription: 'An IoT telemetry platform connecting ESP32 vibration and temperature sensors with Gemini 3.8 Flash to classify anomaly signatures and generate predictive maintenance work orders.',
    suggestedFeatures: [
      'Real-time edge sensor telemetry ingestion via MQTT/WebSockets',
      'Fast Fourier Transform (FFT) frequency spectrum feature extractor',
      'Gemini-powered root-cause diagnosis generating step-by-step repair guides',
      'Dashboard alerting on anomaly thresholds with MTBF (Mean Time Between Failures) projection'
    ],
    relevanceExplanation: 'Bridges physical embedded electronics and cloud AI reasoning, a prime focus for hardware, automation, and semiconductor recruiters.',
    workshopBuildPart: 'Simulate live vibration stream anomalies and route telemetry packets to Gemini for root-cause classification and severity scoring.',
    techStack: ['Gemini 3.8 Flash', 'ESP32 / Edge Telemetry', 'MQTT / WebSockets', 'React'],
    resumeBullets: [
      'Developed an IoT edge-to-cloud diagnostic pipeline bridging accelerometer telemetry with Gemini reasoning for equipment failure detection.',
      'Formulated predictive maintenance alerting that reduced simulated unplanned downtime by 38% across benchmark motor profiles.'
    ],
    difficulty: 'Intermediate',
    viabilityScore: 94,
    estimatedHours: '14-18 hours to complete MVP'
  },
  'Mechanical & Robotics': {
    title: 'KinemaSafe: Natural-Language 6-DOF Robotic Trajectory Planner',
    problemStatement: 'Programming industrial pick-and-place robots requires proprietary scripting and manual teach pendants, creating bottlenecks for flexible assembly lines.',
    shortDescription: 'A spatial motion compiler that converts conversational operator instructions into collision-checked 3D Cartesian coordinates and inverse kinematics waypoints.',
    suggestedFeatures: [
      'Natural-language command parser with bounding-box collision validation',
      'Inverse kinematics waypoint solver with 6-DOF arm simulation',
      'Interactive 3D Three.js digital twin showing arm trajectory in real time',
      'Emergency stop parser detecting boundary violations in plain English'
    ],
    relevanceExplanation: 'Directly addresses robotics automation and human-robot interaction, standing out to automotive, manufacturing, and aerospace recruiters.',
    workshopBuildPart: 'Construct a command parser translating instructions like "pick up the red bolt and place in bin B" into validated 3D coordinate trajectories.',
    techStack: ['Gemini 3.8 Flash', 'Three.js / WebGL', 'Python / Inverse Kinematics', 'FastAPI'],
    resumeBullets: [
      'Engineered a natural-language to 6-DOF robotic trajectory planner using Gemini structured tool-calling with collision boundaries.',
      'Visualized real-time kinematic paths in Three.js WebGL, allowing intuitive zero-code programming of industrial arm movements.'
    ],
    difficulty: 'Advanced',
    viabilityScore: 95,
    estimatedHours: '16-20 hours to complete MVP'
  },
  'default': {
    title: 'SkillMatrix AI: Placement Readiness & Technical Mock Interview Coach',
    problemStatement: 'Engineering students struggle to convert conceptual textbook knowledge into structured technical interview answers that pass senior engineering evaluation rubrics.',
    shortDescription: 'An interactive technical interview simulation platform that parses candidate resumes, generates tailored coding and system design prompts, and provides rubric-aligned feedback.',
    suggestedFeatures: [
      'Dynamic interview question generator based on student branch and company targets',
      'Real-time rubric evaluator scoring answers on correctness, complexity, and communication',
      'STAR-format resume enhancer providing actionable bullet-point revisions',
      'Diagnostic readiness report highlighting technical knowledge gaps'
    ],
    relevanceExplanation: 'Directly solves the primary student pain point—campus placements—with an intuitive full-stack AI implementation.',
    workshopBuildPart: 'Build a multi-turn evaluation prompt pipeline using Gemini 3.8 Flash that grades code logic and generates actionable interview feedback.',
    techStack: ['Gemini 3.8 Flash', 'React', 'Node.js / Express', 'Tailwind CSS'],
    resumeBullets: [
      'Built an AI interview simulation platform evaluating candidate responses against senior engineering rubrics with sub-800ms latency.',
      'Designed structured feedback generation utilizing Gemini 3.8 Flash JSON schemas for reliable STAR-format rubric scoring.'
    ],
    difficulty: 'Beginner-Friendly',
    viabilityScore: 93,
    estimatedHours: '10-14 hours to complete MVP'
  }
};

// AI Project Passport Generation Endpoint
app.post('/api/passport/generate', async (req, res) => {
  const startTime = Date.now();
  const {
    studentName = 'Candidate',
    branch = 'Computer Science & IT',
    experienceLevel = 'Intermediate',
    domain = 'LLM Agents & Tool Use',
    placementTarget = 'Tier-1 Product Company',
    customIdea = '',
  } = req.body;

  try {
    if (apiKey) {
      const prompt = `You are a Senior Principal AI Architect and Engineering Career Advisor designing a standout portfolio capstone project for a final-year engineering student participating in the ProjectSpark workshop ("Build Your First AI Project in 60 Minutes").

Student Profile:
- Name: ${studentName}
- Engineering Branch / Specialization: ${branch}
- Experience Level: ${experienceLevel}
- Preferred Domain: ${domain}
- Career / Placement Goal: ${placementTarget}
- Student's Custom Idea / Problem Statement: ${customIdea || 'Focus on practical industry utility and capstone viva readiness'}

Generate a personalized, recruiter-ready AI project blueprint adhering to the following schema:
1. title: Crisp, impressive project name.
2. problemStatement: Clear 1-2 sentence real-world engineering or industry problem.
3. shortDescription: 2-3 sentence overview of the architecture and solution.
4. suggestedFeatures: Array of 4 concrete functional capabilities.
5. relevanceExplanation: 1-2 sentences explaining why this project fits the student's branch, experience, and placement goals.
6. workshopBuildPart: The exact core module the student builds live in the 60-minute workshop.
7. techStack: 4 key modern technologies/libraries.
8. resumeBullets: 2 Google XYZ / STAR format resume bullet points with quantified metrics.
9. difficulty: "Beginner-Friendly", "Intermediate", or "Advanced".
10. viabilityScore: Integer between 90 and 99.
11. estimatedHours: Estimated development time to full MVP (e.g. "12-16 hours").`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are an authoritative engineering director creating distinctive capstone project specifications for engineering graduates.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              problemStatement: { type: Type.STRING },
              shortDescription: { type: Type.STRING },
              suggestedFeatures: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              relevanceExplanation: { type: Type.STRING },
              workshopBuildPart: { type: Type.STRING },
              techStack: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              resumeBullets: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              difficulty: { type: Type.STRING },
              viabilityScore: { type: Type.INTEGER },
              estimatedHours: { type: Type.STRING }
            },
            required: [
              'title',
              'problemStatement',
              'shortDescription',
              'suggestedFeatures',
              'relevanceExplanation',
              'workshopBuildPart',
              'techStack',
              'resumeBullets',
              'difficulty',
              'viabilityScore',
              'estimatedHours'
            ]
          }
        }
      });

      const responseText = response.text;
      if (responseText) {
        const parsed = JSON.parse(responseText.trim());
        const latency = Date.now() - startTime;

        return res.json({
          success: true,
          aiPowered: true,
          model: 'gemini-3.8-flash',
          passport: {
            ...parsed,
            studentName,
            branch,
            experienceLevel,
            domain,
            placementTarget,
            generatedAt: new Date().toISOString(),
            passportId: `PSP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
            generationLatencyMs: latency,
          }
        });
      }
    }
  } catch (err: any) {
    console.warn('Gemini generation error, utilizing curated blueprint engine:', err?.message || err);
  }

  // Graceful fallback to rich curated blueprint
  const fallback = CURATED_PROJECT_IDEAS[branch] || CURATED_PROJECT_IDEAS['default'];
  const latency = Date.now() - startTime;

  return res.json({
    success: true,
    aiPowered: false,
    model: 'curated-blueprint-engine',
    passport: {
      ...fallback,
      studentName,
      branch,
      experienceLevel,
      domain,
      placementTarget,
      generatedAt: new Date().toISOString(),
      passportId: `PSP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      generationLatencyMs: latency,
      note: 'Generated via Curated Engineering Blueprint Engine with guaranteed offline availability.'
    }
  });
});

// Serve frontend in dev or production
const isProduction = process.env.NODE_ENV === 'production';

async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 ProjectSpark Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
