
import { GoogleGenAI, Type } from "@google/genai";
import { MOCK_PRODUCTS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// Create a catalog string for AI context
const productCatalogContext = MOCK_PRODUCTS.map(p => 
  `- ${p.name} (${p.category}): ${p.description} [Min Order: ${p.minOrder}]`
).join('\n');

export const getGeminiResponse = async (prompt: string, context?: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `You are the AI Sales Engineer for SGG Export (sggexport.in). 
        You help worldwide clients with export-import queries, product specs, shipping logistics, and RFQ assistance. 
        Be professional, efficient, and authoritative. 
        
        Our Catalog:
        ${productCatalogContext}

        When users ask for recommendations, suggest specific products from our catalog.
        Current context: ${context || 'General inquiry'}.`,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm currently optimizing my shipping routes. Please contact our support team directly for immediate assistance.";
  }
};

export const getChatResponseWithMedia = async (prompt: string, fileData?: { data: string, mimeType: string }) => {
  try {
    const parts: any[] = [{ text: prompt }];
    if (fileData) {
      parts.push({
        inlineData: {
          data: fileData.data,
          mimeType: fileData.mimeType
        }
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts }],
      config: {
        systemInstruction: `You are the SGG AI Sales Engineer. You are capable of analyzing trade documents (PDFs/Images) and providing product recommendations.
        
        Our Product Catalog:
        ${productCatalogContext}

        Capabilities:
        1. Document Analysis: If an image or PDF is provided, extract specs, quantities, and terms.
        2. Recommendations: Based on user needs or documents, recommend products from our catalog.
        3. Logistics: Provide advice on shipping, Incoterms, and global trade.

        Format: Provide clear, structured responses. Use bold text for product names.`,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Multimodal Chat Error:", error);
    return "I encountered an issue processing that. Please try again or upload a clearer document.";
  }
};

export const summarizeRequirements = async (requirements: string) => {
  if (!requirements || requirements.length < 20) return null;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize the following international trade requirements into a single, professional sentence that highlights the core product, quantity, and key logistics need: "${requirements}"`,
      config: {
        systemInstruction: "You are a senior trade analyst. Create ultra-concise, professional summaries for RFQs.",
      },
    });
    return response.text?.trim() || null;
  } catch (error) {
    console.error("Summarization Error:", error);
    return null;
  }
};

export const summarizeExtractedData = async (data: { specs: string; quantity: string; deliveryTerms: string }) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a single, ultra-concise professional summary sentence based on these extracted trade details:
      Product Specs: ${data.specs}
      Quantity: ${data.quantity}
      Delivery Terms: ${data.deliveryTerms}`,
      config: {
        systemInstruction: "You are an expert trade liaison. Combine technical specs, quantity, and terms into one powerful executive summary sentence.",
      },
    });
    return response.text?.trim() || null;
  } catch (error) {
    console.error("Doc Summary Error:", error);
    return null;
  }
};

export const analyzeDocument = async (fileData: string, mimeType: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          parts: [
            { inlineData: { data: fileData, mimeType } },
            { text: "Analyze this document and extract key trade information: 1) Detailed Product Specifications, 2) Precise Quantity/Volume, and 3) Shipping/Delivery Terms (Incoterms). Return the result in structured JSON format." }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            specs: { 
              type: Type.STRING,
              description: "Extracted technical specifications or product descriptions."
            },
            quantity: { 
              type: Type.STRING,
              description: "Extracted quantities, weights, or units."
            },
            deliveryTerms: { 
              type: Type.STRING,
              description: "Extracted delivery conditions, ports, or Incoterms like FOB, CIF."
            }
          },
          required: ["specs", "quantity", "deliveryTerms"]
        }
      }
    });
    
    const text = response.text;
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("Document Analysis Error:", error);
    return null;
  }
};
