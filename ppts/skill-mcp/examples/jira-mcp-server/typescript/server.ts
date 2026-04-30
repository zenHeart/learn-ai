import 'dotenv/config'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'

const JIRA_BASE = process.env.JIRA_BASE
const JIRA_TOKEN = process.env.JIRA_TOKEN

if (!JIRA_BASE || !JIRA_TOKEN) {
  console.error('Missing JIRA_BASE or JIRA_TOKEN in environment')
  process.exit(1)
}

const JIRA_FIELD_SCHEMA = {
  status: 'string · workflow status name',
  assignee: 'string | null · displayName',
  summary: 'string · short title',
  description: 'string · ADF or plain text',
  labels: 'string[] · tags',
  priority: 'string · Highest|High|Medium|Low',
} as const

async function jiraGet(path: string): Promise<unknown> {
  const r = await fetch(`${JIRA_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${JIRA_TOKEN}`,
      Accept: 'application/json',
    },
    signal: AbortSignal.timeout(10_000),
  })
  if (!r.ok) {
    throw new Error(`Jira ${r.status}: ${await r.text()}`)
  }
  return r.json()
}

const server = new McpServer({ name: 'jira-mcp', version: '1.0.0' })

server.tool(
  'get_jira_issue',
  '按工单 ID 查询 Jira 工单详情，返回 status / assignee / summary / labels。当用户提到 PROJ-1234 这类工单号或要求"查工单状态"时调用。',
  {
    issueId: z
      .string()
      .regex(/^[A-Z]+-\d+$/, '形如 PROJ-1024')
      .describe('工单 ID，例如 PROJ-1024'),
  },
  async ({ issueId }) => {
    try {
      const data = (await jiraGet(`/rest/api/3/issue/${issueId}`)) as any
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                id: issueId,
                status: data.fields.status?.name,
                assignee: data.fields.assignee?.displayName ?? '未分配',
                summary: data.fields.summary,
                labels: data.fields.labels ?? [],
                priority: data.fields.priority?.name,
              },
              null,
              2,
            ),
          },
        ],
      }
    } catch (e: any) {
      return {
        content: [{ type: 'text', text: `查询失败: ${e.message}` }],
        isError: true,
      }
    }
  },
)

server.tool(
  'list_my_issues',
  '列出当前用户名下的工单，可按 status 过滤。当用户问"我现在有几个 ticket"或"我手上的工单"时调用。',
  {
    status: z
      .enum(['todo', 'in-progress', 'done', 'all'])
      .default('in-progress')
      .describe('过滤状态，默认 in-progress'),
  },
  async ({ status }) => {
    const jql =
      status === 'all'
        ? 'assignee = currentUser()'
        : `assignee = currentUser() AND status = "${status}"`
    try {
      const data = (await jiraGet(
        `/rest/api/3/search?jql=${encodeURIComponent(jql)}&fields=summary,status`,
      )) as any
      const issues = (data.issues || []).map((it: any) => ({
        id: it.key,
        status: it.fields.status?.name,
        summary: it.fields.summary,
      }))
      return { content: [{ type: 'text', text: JSON.stringify(issues, null, 2) }] }
    } catch (e: any) {
      return {
        content: [{ type: 'text', text: `查询失败: ${e.message}` }],
        isError: true,
      }
    }
  },
)

server.resource('jira-schema', 'jira://schema', async () => ({
  contents: [
    {
      uri: 'jira://schema',
      mimeType: 'application/json',
      text: JSON.stringify(JIRA_FIELD_SCHEMA, null, 2),
    },
  ],
}))

await server.connect(new StdioServerTransport())
