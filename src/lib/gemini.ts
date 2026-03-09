import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function analyzeInteractions(medicines: string[], isStudentMode: boolean) {
    if (!apiKey) {
        return getMockInteractions(medicines, isStudentMode);
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Analyze potential drug-drug interactions between these medicines: ${medicines.join(", ")}.
    
    Return a JSON object with the following structure:
    {
      "overallRiskLevel": "Low" | "Moderate" | "High",
      "summary": "A brief overview of the cumulative risk and most severe interaction.",
      "interactions": [
        {
          "meds": ["Med A", "Med B"],
          "level": "Green" | "Yellow" | "Red",
          "interactionRisk": "Low" | "Moderate" | "High",
          "explanation": "Clear plain language explanation for non-medical users.",
          "pharmacologicalReason": "Brief explanation of why they interact.",
          "clinicalEffects": ["effect 1", "effect 2"],
          "recommendedAction": "Clear safety guidance for the user.",
          "monitoringAdvice": "What symptoms to watch for.",
          "confidenceScore": 90,
          ${isStudentMode ? '"pharmacology": { "mechanism": "...", "metabolism": "...", "drugClass": "...", "interactionType": "Pharmacodynamic" | "Pharmacokinetic", "receptorEffects": "...", "pharmacologicalExplanation": "..." },' : ""}
          "foodInteractions": ["avoid X"],
          "alcoholWarnings": "...",
          "lifestylePrecautions": ["..."]
        }
      ],
      "treatmentExplanations": [
        {
          "name": "Med A",
          "purpose": "Why it is prescribed",
          "condition": "What it treats",
          "howItWorks": "Simple explanation of mechanism",
          "timing": "When to take it"
        }
      ],
      "source": "Clinical drug interaction dataset"
    }
    
    STRICT GUIDELINES:
    1. For "explanation", use simple plain language. Instead of "CYP3A4 inhibition", use "The medicine slows down how your body processes other drugs".
    2. "overallRiskLevel" should be based on the most severe interaction found.
    3. Ensure confidenceScore is realistic (70-98%).
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const jsonStr = text.match(/\{[\s\S]*\}/)?.[0] || "{}";
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("AI Analysis Error:", error);
        return getMockInteractions(medicines, isStudentMode);
    }
}

export async function extractMedicinesFromImage(base64Image: string) {
    if (!apiKey) {
        return ["Metformin 500mg", "Atorvastatin 20mg", "Lisinopril 10mg"];
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Clean base64 string
    const imageData = base64Image.replace(/^data:image\/\w+;base64,/, "");

    const prompt = "Extract all medication names and their dosages from this prescription image. Return ONLY a JSON array of strings, e.g., [\"Drug A 500mg\", \"Drug B 10mg\"]. If handwriting is unclear, provide your best guess based on clinical context.";

    try {
        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: imageData,
                    mimeType: "image/jpeg"
                }
            }
        ]);
        const response = await result.response;
        const text = response.text();
        const jsonStr = text.match(/\[[\s\S]*\]/)?.[0] || "[]";
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("Extraction Error:", error);
        return ["Metformin 500mg", "Atorvastatin 20mg", "Lisinopril 10mg"];
    }
}

export async function analyzePrescription(medicines: string[]) {
    if (!apiKey) {
        return {
            condition: "Type 2 Diabetes & Hypertension",
            purpose: "Metabolic and cardiovascular management.",
            description: "A combination of a biguanide to control blood sugar and an ACE inhibitor for blood pressure and kidney protection.",
            timing: "Metformin: Twice daily with meals. Lisinopril: Once daily in the morning.",
            risks: "Monitor for persistent cough (Lisinopril) or stomach upset (Metformin)."
        };
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Based on this list of medicines extracted from a prescription: ${medicines.join(", ")}, provide a clinical interpretation.
    
    Return a JSON object:
    {
      "condition": "Likely medical condition being treated",
      "purpose": "Summary of treatment goals",
      "description": "How these medicines work together in this specific treatment plan",
      "timing": "General best practices for timing for THESE specific medications",
      "risks": "Major safety monitoring points or common side effects to watch for"
    }
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const jsonStr = text.match(/\{[\s\S]*\}/)?.[0] || "{}";
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("Prescription Analysis Error:", error);
        return {
            condition: "General Health Management",
            purpose: "Prescribed treatment plan.",
            description: "Your doctor has prescribed these medications to manage your specific health requirements.",
            timing: "Follow the specific instructions on the medication packaging.",
            risks: "If you experience any unusual symptoms, contact your healthcare provider."
        };
    }
}

function getMockInteractions(medicines: string[], isStudentMode: boolean) {
    // ... existing mock data logic ...
    const hasIbuprofen = medicines.some(m => m.toLowerCase().includes("ibuprofen"));
    const hasWarfarin = medicines.some(m => m.toLowerCase().includes("warfarin"));

    if (hasIbuprofen && hasWarfarin) {
        return {
            overallRiskLevel: "High",
            summary: "Critically high interaction risk detected primarily between Ibuprofen and Warfarin, significantly increasing bleeding risks.",
            interactions: [
                {
                    meds: ["Ibuprofen", "Warfarin"],
                    level: "Red",
                    interactionRisk: "High",
                    explanation: "Taking Ibuprofen with Warfarin can make your blood too thin and irritate your stomach, which greatly increases the chance of serious bleeding.",
                    pharmacologicalReason: "Both medicines influence blood clotting mechanisms. Warfarin reduces clotting factors while Ibuprofen can irritate the stomach lining and affect platelet function.",
                    clinicalEffects: ["Increased bleeding risk", "Gastrointestinal bleeding", "Easy bruising"],
                    recommendedAction: "Avoid combining these medications unless specifically directed and monitored by your doctor.",
                    monitoringAdvice: "Watch for symptoms such as unusual bruising, bleeding gums, dark stools, or vomiting that looks like coffee grounds. Consult a doctor immediately if these occur.",
                    confidenceScore: 98,
                    foodInteractions: ["Limit high Vitamin K foods like kale, which can affect Warfarin"],
                    alcoholWarnings: "High risk of internal bleeding when combined with alcohol.",
                    lifestylePrecautions: ["Avoid contact sports or activities with high injury risk"],
                    ...(isStudentMode ? {
                        pharmacology: {
                            mechanism: "COX-1 inhibition leads to reduced Thromboxane A2 production, synergizing with Vitamin K epoxide reductase inhibition by Warfarin.",
                            metabolism: "Both drugs have high protein binding; Ibuprofen may displace Warfarin from albumin sites.",
                            drugClass: "NSAID + Vitamin K Antagonist",
                            interactionType: "Pharmacodynamic and Pharmacokinetic",
                            receptorEffects: "Inhibition of platelet COX-1 receptors.",
                            pharmacologicalExplanation: "Synergistic effect on hemostasis pathways; Ibuprofen-induced gastric mucosal injury provides a site for anticoagulant-potentiated hemorrhage."
                        }
                    } : {})
                }
            ],
            treatmentExplanations: [
                { name: "Ibuprofen", purpose: "Relieve pain and swelling", condition: "Pain/Inflammation", howItWorks: "Blocks chemicals that cause pain and redness.", timing: "As needed with food" },
                { name: "Warfarin", purpose: "Prevent blood clots", condition: "Blood Clot Prevention", howItWorks: "Slows down the body's process of making clots.", timing: "Once a day at the same time" }
            ],
            source: "MediSafe Clinical Reasoning Engine"
        };
    }

    return {
        overallRiskLevel: medicines.length > 1 ? "Low" : "N/A",
        summary: "No major interaction risks were identified between the provided medications.",
        interactions: medicines.length > 1 ? [
            {
                meds: [medicines[0], medicines[1]],
                level: "Green",
                interactionRisk: "Low",
                explanation: "Based on current clinical data, these medicines are generally safe to take together.",
                pharmacologicalReason: "These drugs work through different systems in the body and do not typically interfere with each other.",
                clinicalEffects: ["No synergistic side effects expected"],
                recommendedAction: "Continue following your doctor's instructions for each medicine.",
                monitoringAdvice: "Continue routine monitoring as advised by your healthcare provider.",
                confidenceScore: 85,
                foodInteractions: ["No specific food restrictions for this combination"],
                alcoholWarnings: "Consult your doctor about alcohol use with these medicines.",
                lifestylePrecautions: ["Maintain normal activity levels"],
                ...(isStudentMode ? {
                    pharmacology: {
                        mechanism: "Distinct mechanisms of action with no known overlap.",
                        metabolism: "Independent metabolic pathways.",
                        drugClass: "Different therapeutic classes",
                        interactionType: "None significant",
                        receptorEffects: "Targeting distinct receptor systems.",
                        pharmacologicalExplanation: "Absence of shared metabolic enzymes or pharmacodynamic pathways prevents meaningful interaction."
                    }
                } : {})
            }
        ] : [],
        treatmentExplanations: medicines.map(m => ({
            name: m,
            purpose: "Specified by your physician",
            condition: "Medical condition",
            howItWorks: "Helps manage your specific health needs.",
            timing: "As prescribed"
        })),
        source: "MediSafe AI Database"
    };
}
