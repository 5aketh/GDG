// import { GoogleAuth } from "google-auth-library";
// import fs from "fs";
// import fetch from "node-fetch";

// // ✅ Load Service Account Key
// const serviceAccount = JSON.parse(fs.readFileSync("./vertex-serviceAccountKey.json", "utf-8"));

// // ✅ Vertex AI Model Config
// const projectId = "stellar-market-449618-q6";         // Your Project ID
// const region = "asia-south1";                          // Region where model is deployed
// const endpointId = "6869665087460737024";               // Your Endpoint ID
// const dedicatedDomain = "6869665087460737024.asia-south1-502436046663.prediction.vertexai.goog";  // Dedicated domain name
// const endpoint = `https://${dedicatedDomain}/v1/projects/${projectId}/locations/${region}/endpoints/${endpointId}:predict`;

// // ✅ Function to call the model
// const callModel = async (message) => {
//     try {
//         if (!message) {
//             console.error("❌ Message is required!");
//             return;
//         }

//         const auth = new GoogleAuth({
//             credentials: serviceAccount,
//             scopes: ["https://www.googleapis.com/auth/cloud-platform"],
//         });

//         const client = await auth.getClient();
//         const accessToken = await client.getAccessToken();

//         const payload = {
//             instances: [{ content: message }],    // Change to { prompt: message } if needed
//             parameters: {
//                 temperature: 0.7,
//                 maxTokens: 256,
//                 topP: 0.9,
//                 topK: 40
//             }
//         };

//         const response = await fetch(endpoint, {
//             method: "POST",
//             headers: {
//                 "Authorization": `Bearer ${accessToken.token}`,
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(payload)
//         });

//         if (!response.ok) {
//             const errorText = await response.text();
//             console.error("❌ Full Error:", errorText);
//             throw new Error(`Model error: ${response.statusText}`);
//         }

//         const data = await response.json();
//         const botResponse = data.predictions[0]?.content || "No response from model";
//         console.log("✅ Bot Response:", botResponse);

//     } catch (error) {
//         console.error("❌ Error calling model:", error.message);
//     }
// };


// // ✅ Call the model with a sample message
// const testMessage = "How can I improve crop yield for rice in Karnataka?";
// callModel(testMessage);


// import { GoogleAuth } from 'google-auth-library';
// import axios from 'axios';
// import fs from 'fs';

// const projectId = "stellar-market-449618-q6";  // Replace with your project ID
// const region = "asia-south1";                  // Replace with the correct region
// const endpointId = "6869665087460737024";      // Replace with the correct endpoint ID

// const endpoint = `https://${region}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${region}/endpoints/${endpointId}`;

// // ✅ Read the service account JSON file synchronously
// const serviceAccount = JSON.parse(fs.readFileSync('./vertex-serviceAccountKey.json', 'utf-8'));

// async function verifyEndpoint() {
//     try {
//         const auth = new GoogleAuth({
//             credentials: serviceAccount,
//             scopes: ['https://www.googleapis.com/auth/cloud-platform']
//         });

//         const client = await auth.getClient();
//         const accessToken = await client.getAccessToken();

//         const response = await axios.get(endpoint, {
//             headers: {
//                 Authorization: `Bearer ${accessToken.token}`,
//                 'Content-Type': 'application/json'
//             }
//         });

//         console.log('✅ Endpoint exists:', response.data);
//     } catch (error) {
//         console.error('❌ Error:', error.response ? error.response.data : error.message);
//     }
// }

// verifyEndpoint();


// import { GoogleAuth } from "google-auth-library";
// import fs from "fs";

// // ✅ Load the service account key
// const serviceAccount = JSON.parse(fs.readFileSync("./vertex-serviceAccountKey.json", "utf-8"));

// async function getAccessToken() {
//   try {
//     const auth = new GoogleAuth({
//       credentials: serviceAccount,
//       scopes: ["https://www.googleapis.com/auth/cloud-platform"],
//     });

//     const client = await auth.getClient();
//     const accessToken = await client.getAccessToken();

//     console.log("Access Token:", accessToken.token);
//   } catch (error) {
//     console.error("❌ Error generating access token:", error);
//   }
// }

// getAccessToken();
