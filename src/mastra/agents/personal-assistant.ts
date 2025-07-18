import { Agent } from "@mastra/core/agent";
import { openai } from "@ai-sdk/openai";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";

import { mcpTools } from "../mcp/client";

export const personalAssistantAgent = new Agent({
  name: "Personal Assistant",
  instructions: `
    You are a helpful personal assistant that can help with various tasks such as email and scheduling social media posts.

    You have access to the following tools:

    1. Gmail:
       - Use these tools for reading and categorizing emails from Gmail
       - You can categorize emails by priority, identify action items, and summarize content
       - You can also use this tool to send emails

    2. GitHub:
     - Use these tools for monitoring and summarizing GitHub activity
     - You can summarize recent commits, pull requests, issues, and development patterns

    Keep your responses concise and friendly.
  `,
  model: openai("gpt-4o"),
  tools: { ...mcpTools },
  memory: new Memory({
    storage: new LibSQLStore({
      url: "file:../mastra.db", // path is relative to the .mastra/output directory
    }),
  }),
});
