import { Agent } from "@mastra/core/agent";
import { openai } from "@ai-sdk/openai";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";

import { mcpTools } from "../mcp/client";
import path from "path";

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
    3. Hackernews:
     - Use this tool to search for stories on Hackernews
     - You can use it to get the top stories or specific stories
     - You can use it to retrieve comments for stories
    4. Filesystem:
     - You also have filesystem read/write access to a notes directory.
     - You can use that to store info for later use or organize info for the user.
     - You can use this notes directory to keep track of to-do list items for the user.
     - Notes dir: ${path.join(process.cwd(), "notes")}


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
