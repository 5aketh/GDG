import { PredictionServiceClient } from "@google-cloud/aiplatform";
// import dotenv from "dotenv";

// dotenv.config();  // Load environment variables

const projectId = 'stellar-market-449618-q6';         // GCP project ID
const location = 'asia-south1';                       // Model location
const endpointId = '6869665087460737024';       // Model endpoint ID
// const keyFilename = "./service-account-key.json";     // Service account key

const client = new PredictionServiceClient();

const callModel = async () => {
  try {
    // Define the model endpoint path
    const endpoint = `projects/${projectId}/locations/${location}/endpoints/${endpointId}`;

    // Sample input for your chatbot
    const instances = [{ content: "What is the best crop for sandy soil?" }];

    const parameters = {
      temperature: 0.7,
      maxTokens: 500,
      topP: 0.9,
      topK: 40,
    };

    // Make the prediction request
    const [response] = await client.predict({
      endpoint,
      instances,
      parameters,
    });

    console.log("Response from Vertex AI Model:");
    console.log(JSON.stringify(response.predictions, null, 2));
  } catch (error) {
    console.error("Error during model call:", error.message);
  }
};

// Call the function
callModel();