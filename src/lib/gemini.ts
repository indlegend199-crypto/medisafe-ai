import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * Resolves a medication name to an RxCUI using the NLM RxNorm API.
 */
async function getRxCUI(name: string): Promise<string | null> {
    try {
        const response = await fetch(`https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${encodeURIComponent(name)}`);
        const data = await response.json();
        return data.idGroup?.rxnormId?.[0] || null;
    } catch (error) {
        console.error(`RxCUI lookup failed for ${name}:`, error);
        return null;
    }
}

/**
 * Fetches real-world interaction data from NLM RxNav.
 */
async function fetchRxNavInteractions(rxcuis: string[]): Promise<any[]> {
    if (rxcuis.length < 2) return [];
    try {
        const rxcuiString = rxcuis.join("+");
        const response = await fetch(`https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${rxcuiString}`);
        const data = await response.json();

        const interactions: any[] = [];
        const fullInteractionGroups = data.fullInteractionTypeGroup;

        if (fullInteractionGroups) {
            fullInteractionGroups.forEach((group: any) => {
                group.fullInteractionType.forEach((type: any) => {
                    type.interactionPair.forEach((pair: any) => {
                        interactions.push({
                            meds: pair.interactionConcept.map((c: any) => c.minConceptItem.name),
                            description: pair.description,
                            severity: pair.severity || "N/A"
                        });
                    });
                });
            });
        }
        return interactions;
    } catch (error) {
        console.error("RxNav Interaction fetch failed:", error);
        return [];
    }
}

export async function analyzeInteractions(medicines: string[], isStudentMode: boolean) {
    // 1. Get real data from RxNav
    const rxcuis = await Promise.all(medicines.map(m => getRxCUI(m)));
    const validRxcuis = rxcuis.filter(id => id !== null) as string[];
    const realInteractions = await fetchRxNavInteractions(validRxcuis);

    // 2. Use Gemini to structure and explain the results (or fallback to Gemini's internal knowledge)
    if (!apiKey) {
        return getMockInteractions(medicines, isStudentMode, realInteractions);
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Analyze drug interactions for these medicines: ${medicines.join(", ")}.
    
    EXPERIMENTAL DATA FROM RXNAV API:
    ${JSON.stringify(realInteractions)}
    
    If the RxNAV data above is empty, use your internal pharmacological knowledge to identify interactions.
    
    Return a strictly formatted JSON object:
    {
      "overallRiskLevel": "Low" | "Moderate" | "High",
      "summary": "Clinical overview of risk.",
      "interactions": [
        {
          "meds": ["Med A", "Med B"],
          "level": "Green" | "Yellow" | "Red",
          "interactionRisk": "Low" | "Moderate" | "High",
          "explanation": "Plain language for users.",
          "pharmacologicalReason": "Scientific reason.",
          "clinicalEffects": ["symptom 1", "..."],
          "recommendedAction": "Action for user.",
          "monitoringAdvice": "What to watch for.",
          "confidenceScore": 95,
          ${isStudentMode ? '"pharmacology": { "mechanism": "...", "metabolism": "...", "drugClass": "...", "interactionType": "...", "receptorEffects": "..." },' : ""}
          "foodInteractions": ["..."],
          "alcoholWarnings": "..."
        }
      ],
      "treatmentExplanations": [
        { "name": "...", "purpose": "...", "condition": "...", "howItWorks": "...", "timing": "..." }
      ],
      "source": "NIH RxNav + Clinical AI"
    }

    STRICT:
    - Use "Red" for "High" risk, "Yellow" for "Moderate", "Green" for "Low".
    - If 0 interactions found, return "overallRiskLevel": "Low" and empty interactions array.
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const jsonStr = text.match(/\{[\s\S]*\}/)?.[0] || "{}";
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("AI Analysis Error:", error);
        return getMockInteractions(medicines, isStudentMode, realInteractions);
    }
}

export async function extractMedicinesFromImage(base64Image: string) {
    if (!apiKey) {
        return ["Metformin 500mg", "Atorvastatin 20mg", "Lisinopril 10mg"];
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const imageData = base64Image.replace(/^data:image\/\w+;base64,/, "");

    const prompt = "Extract medication names and dosages. Return as JSON array of strings.";

    try {
        const result = await model.generateContent([
            prompt,
            { inlineData: { data: imageData, mimeType: "image/jpeg" } }
        ]);
        const response = await result.response;
        const text = response.text();
        const jsonStr = text.match(/\[[\s\S]*\]/)?.[0] || "[]";
        return JSON.parse(jsonStr);
    } catch (error) {
        return ["Error decoding image"];
    }
}

export async function analyzePrescription(medicinesStr: string) {
    if (!apiKey) {
        return {
            condition: "General Health Protocol",
            purpose: "Treatment of metabolic and inflammatory signals.",
            description: "A combination of therapies identified by Vision AI.",
            timing: "Standard clinical dosing applies.",
            risks: ["Consult doctor for specifics."]
        };
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Interpret these medicines: ${medicinesStr}. Return JSON: {condition, purpose, description, timing, risks: []}`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const jsonStr = text.match(/\{[\s\S]*\}/)?.[0] || "{}";
        return JSON.parse(jsonStr);
    } catch (error) {
        return { condition: "Unknown", purpose: "Error in analysis", description: "", timing: "", risks: [] };
    }
}

function getMockInteractions(medicines: string[], isStudentMode: boolean, realInteractions: any[]) {
    // If we have real interactions from NIH but no API key, we can still show them simply!
    if (realInteractions.length > 0) {
        return {
            overallRiskLevel: "Calculated",
            summary: "Interactions identified via NIH RxNav Database.",
            interactions: realInteractions.map(ri => ({
                meds: ri.meds,
                level: ri.severity === "high" ? "Red" : "Yellow",
                explanation: ri.description,
                recommendedAction: "Consult with a pharmacist immediately.",
                confidenceScore: 100
            })),
            source: "NIH RxNav API (Bypassing AI)"
        };
    }

    // Default mock
    return {
        overallRiskLevel: "Low",
        summary: "No interactions detected in offline mode.",
        interactions: [],
        source: "MediSafe Offline Database"
    };
}
