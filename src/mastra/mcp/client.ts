import { MCPClient } from "@mastra/mcp";
import path from "path";

export const mcp = new MCPClient({
  servers: {
    zapier: {
      url: new URL(process.env.ZAPIER_MCP_URL || ""),
    },
    github: {
      url: new URL(process.env.COMPOSIO_MCP_GITHUB || ""),
    },
    hackernews: {
      command: "npx",
      args: ["-y", "@devabdultech/hn-mcp-server"],
    },
    textEditor: {
      command: "pnpx",
      args: [
        `@modelcontextprotocol/server-filesystem`,
        path.join(process.cwd(), "..", "..", "notes"), // relative to output directory
      ],
    },
  },
});

export const mcpTools = await mcp.getTools();
