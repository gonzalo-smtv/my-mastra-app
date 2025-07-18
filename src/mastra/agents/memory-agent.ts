import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore, LibSQLVector } from "@mastra/libsql";
import { openai } from "@ai-sdk/openai";

// Create a basic memory instance
const memory = new Memory({
  storage: new LibSQLStore({
    url: "file:../../memory.db", // relative path from the `.mastra/output` directory
  }),
  options: {
    lastMessages: 2, // Include the last 20 messages in memory
    semanticRecall: {
      topK: 3, // Number of similar messages to retrieve
      messageRange: {
        before: 2, // Include 2 messages before each match
        after: 1, // Include 1 message after each match
      },
    },
    workingMemory: {
      enabled: true,
      template: `
        # User Profile

        ## Personal Info

        - Name:
        - Location:
        - Timezone:

        ## Preferences

        - Communication Style: [e.g., Formal, Casual]
        - Interests:
        - Favorite Topics:

        ## Session State

        - Current Topic:
        - Open Questions:
          - [Question 1]
          - [Question 2]
      `,
    },
  },
  vector: new LibSQLVector({
    connectionUrl: "file:../../vector.db",
  }),
  embedder: openai.embedding("text-embedding-3-small"),
});

// Create an agent with memory
export const memoryAgent = new Agent({
  name: "MemoryAgent",
  instructions: `
      You are a helpful assistant with advanced memory capabilities.
    You can remember previous conversations and user preferences.

    IMPORTANT: You have access to working memory to store persistent information about the user.
    When you learn something important about the user, update your working memory according to the template.

    Always refer to your working memory before asking for information the user has already provided.
    Use the information in your working memory to provide personalized responses.

    When the user shares personal information such as their name, location, or preferences,
    acknowledge it and update your working memory accordingly.
  `,
  model: openai("gpt-4o"),
  memory,
});
