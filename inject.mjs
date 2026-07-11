import fs from 'fs';

function injectDynamic(filePath, eventType) {
  let code = fs.readFileSync(filePath, 'utf8');
  
  if (!code.includes('import connectDB')) {
    code = code.replace(/export default function (\w+)\(\) \{/, 
`import connectDB from "@/lib/db";
import Event from "@/models/Event";

export const dynamic = "force-dynamic";

export default async function $1() {
  await connectDB();
  const rawEvents = await Event.find({ type: "${eventType}" }).sort({ date: -1 });
  const events = JSON.parse(JSON.stringify(rawEvents));
`);
  }

  const startMarker = '<div role="list" className="articles-sm_list hr-flex w-dyn-items">';
  const endMarker = '</section>';
  
  const startIndex = code.indexOf(startMarker);
  const contentStart = startIndex + startMarker.length;
  const endIndex = code.indexOf(endMarker, contentStart);
  
  const block = code.substring(contentStart, endIndex);
  
  const itemStart = block.indexOf('<div role="listitem"');
  if (itemStart === -1) return console.log("Not found listitem");
  
  // The structure ends with </div></div></div></div></section> 
  // Let's find the position of the </div> that closes the list container
  const listEndRegex = /<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*$/;
  const listEndMatch = block.match(listEndRegex);
  const listEnd = listEndMatch ? listEndMatch.index : block.lastIndexOf('</div>', block.lastIndexOf('</div>') - 1);
  
  const itemStr = block.substring(itemStart, listEnd);
  
  let dynamicItem = itemStr;
  dynamicItem = dynamicItem.replace(/<div role="listitem"/, '<div role="listitem" key={event._id}');
  dynamicItem = dynamicItem.replace(/href="[^"]*"/, 'href={event.link || "#"}');
  dynamicItem = dynamicItem.replace(/src="[^"]*"/, 'src={event.imageUrl || ""}');
  dynamicItem = dynamicItem.replace(/<div\s*className="text-xs text-weight-medium text-color-black-600"\s*>[\s\S]*?<\/div>/, `<div className="text-xs text-weight-medium text-color-black-600">{event.date}</div>`);
  dynamicItem = dynamicItem.replace(/<div\s*className="text-lg-2 text-weight-medium text-color-black-900"\s*>[\s\S]*?<\/div>/, `<div className="text-lg-2 text-weight-medium text-color-black-900">{event.title}</div>`);
  
  const replacement = `
    {events.map((event: any) => (
      ${dynamicItem}
    ))}
    {events.length === 0 && <div className="w-full text-center py-12 text-gray-500">No events found.</div>}
  `;
  
  code = code.substring(0, contentStart) + "\n" + replacement + "\n" + block.substring(listEnd) + code.substring(endIndex);
  
  fs.writeFileSync(filePath, code);
  console.log("Updated " + filePath);
}

injectDynamic('src/app/hackathons/page.tsx', 'hackathon');
injectDynamic('src/app/conferences/page.tsx', 'conference');
