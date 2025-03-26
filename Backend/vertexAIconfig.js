import { PredictionServiceClient } from '@google-cloud/aiplatform';
import dotenv from "dotenv";

dotenv.config();

const projectId = process.env.GCP_PROJECT_ID;
const location = "asia-south1";
const endpointId = process.env.GCP_ENDPOINT_ID;
const keyFilename = "./vertex-serviceAccountKey.json";

// Initialize the Vertex AI client
const client = new PredictionServiceClient({ keyFilename });

const endpoint = `projects/${projectId}/locations/${location}/endpoints/${endpointId}`;

export { client, endpoint };
