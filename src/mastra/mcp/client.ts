import { MCPClient } from "@mastra/mcp";

export const mcp = new MCPClient({
  servers: {
    zapier: {
      url: new URL(process.env.ZAPIER_MCP_URL || ""),
    },
    github: {
      url: new URL(process.env.COMPOSIO_MCP_GITHUB || ""),
    },
  },
});

export const mcpTools = await mcp.getTools();
