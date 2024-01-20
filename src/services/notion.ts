import { Client } from '@notionhq/client'


export const getTimelineInfos = async () => {
    const notion = new Client({
        auth: process.env.NOTION_TOKEN,
    })

    console.log("Fetching data from Notion...");
    const database = await notion.databases.query({ database_id: process.env.DATABASE_ID! })
    const result = []

    for (const page of database.results) {
        const p = (await notion.pages.retrieve({ page_id: page.id })) as unknown as { properties: any, created_time: Date }

        result.push({
            id: page.id,
            title: p.properties.title,
            description: p.properties.description,
            doing: p.properties.doing,
            date: p.properties.created_at,
            created_time: p.created_time,
        })
    }

    console.log("Fetching data from Notion... Done");

    result.sort(function (a, b) {
        return new Date(a.date.date.start) as unknown as number - (new Date(b.date.date.start) as unknown as number);
    });

    return result
}


export function convertTextAarry(text: any[]) {
    return text.map((item: any) => {
        if (item.type === 'text') {
            return item.text.content
        }
        if (item.type === 'mention') {
            return item.mention.name
        }
        if (item.type === 'equation') {
            return item.equation.expression
        }
        if (item.type === 'image') {
            return item.image.file.url
        }
        if (item.type === 'code') {
            return item.code.text
        }
        if (item.type === 'bulleted_list_item') {
            return item.bulleted_list_item.text.content
        }
        if (item.type === 'numbered_list_item') {
            return item.numbered_list_item.text.content
        }
        if (item.type === 'to_do') {
            return item.to_do.text.content
        }
        if (item.type === 'toggle') {
            return item.toggle.text.content
        }
        if (item.type === 'column') {
            return item.column.text.content
        }
        if (item.type === 'column_list') {
            return item.column_list.text.content
        }
        if (item.type === 'divider') {
            return item.divider.text.content
        }
        if (item.type === 'callout') {
            return item.callout.text.content
        }
        if (item.type === 'quote') {
            return item.quote.text.content
        }
        if (item.type === 'collection_view') {
            return item.collection_view.text.content
        }
        if (item.type === 'embed') {
            return item.embed.text.content
        }
        if (item.type === 'video') {
            return item.video.text.content
        }
        if (item.type === 'audio') {
            return item.audio.text.content
        }
        if (item.type === 'bookmark') {
            return item.bookmark.text.content
        }
        if (item.type === 'codepen') {
            return item.codepen.text.content
        }
        return "";
    })
}
