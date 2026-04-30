"""Minimal Jira MCP Server using FastMCP.

Mirrors the TypeScript version in ../typescript/server.ts.
Run: python server.py
Inspect: npx @modelcontextprotocol/inspector python server.py
"""

from __future__ import annotations

import json
import os
from typing import Literal

import requests
from dotenv import load_dotenv
from mcp.server.fastmcp import FastMCP

load_dotenv()

JIRA_BASE = os.environ.get("JIRA_BASE")
JIRA_TOKEN = os.environ.get("JIRA_TOKEN")

if not JIRA_BASE or not JIRA_TOKEN:
    raise SystemExit("Missing JIRA_BASE or JIRA_TOKEN in environment")

JIRA_FIELD_SCHEMA = {
    "status": "string · workflow status name",
    "assignee": "string | null · displayName",
    "summary": "string · short title",
    "description": "string · ADF or plain text",
    "labels": "string[] · tags",
    "priority": "string · Highest|High|Medium|Low",
}

mcp = FastMCP("jira-mcp")


def _jira_get(path: str) -> dict:
    r = requests.get(
        f"{JIRA_BASE}{path}",
        headers={
            "Authorization": f"Bearer {JIRA_TOKEN}",
            "Accept": "application/json",
        },
        timeout=10,
    )
    r.raise_for_status()
    return r.json()


@mcp.tool()
def get_jira_issue(issue_id: str) -> dict:
    """按工单 ID 查询 Jira 工单详情。

    Args:
        issue_id: 工单号，形如 PROJ-1024（大写字母 + 连字符 + 数字）。

    Returns:
        含 status / assignee / summary / labels / priority 的字典。
    """
    if not issue_id or "-" not in issue_id:
        raise ValueError(f"invalid issue_id: {issue_id!r}, expect PROJ-1024 format")

    data = _jira_get(f"/rest/api/3/issue/{issue_id}")
    fields = data.get("fields", {})
    return {
        "id": issue_id,
        "status": (fields.get("status") or {}).get("name"),
        "assignee": (fields.get("assignee") or {}).get("displayName", "未分配"),
        "summary": fields.get("summary"),
        "labels": fields.get("labels", []),
        "priority": (fields.get("priority") or {}).get("name"),
    }


@mcp.tool()
def list_my_issues(
    status: Literal["todo", "in-progress", "done", "all"] = "in-progress",
) -> list[dict]:
    """列出当前用户名下的工单，按 status 过滤。

    Args:
        status: 过滤状态，默认 in-progress。
    """
    jql = (
        "assignee = currentUser()"
        if status == "all"
        else f'assignee = currentUser() AND status = "{status}"'
    )
    data = _jira_get(
        f"/rest/api/3/search?jql={requests.utils.quote(jql)}&fields=summary,status"
    )
    return [
        {
            "id": it["key"],
            "status": (it["fields"].get("status") or {}).get("name"),
            "summary": it["fields"].get("summary"),
        }
        for it in data.get("issues", [])
    ]


@mcp.resource("jira://schema")
def jira_schema() -> str:
    """返回 Jira 工单字段 schema（JSON）。"""
    return json.dumps(JIRA_FIELD_SCHEMA, indent=2, ensure_ascii=False)


@mcp.prompt()
def summarize_ticket(issue_id: str) -> str:
    """生成给经理汇报的工单简报。"""
    return (
        f"请基于工单 {issue_id} 的详情，用 3 句话总结：\n"
        f"1. 当前进展\n"
        f"2. 主要风险\n"
        f"3. 下一步动作\n"
        f"先调用 get_jira_issue 拉取详情，再生成简报。"
    )


if __name__ == "__main__":
    mcp.run()
