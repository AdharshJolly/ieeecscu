import fs from 'fs';

function htmlToJsx(html) {
  let jsx = html;
  jsx = jsx.replace(/class=/g, 'className=');
  jsx = jsx.replace(/for=/g, 'htmlFor=');
  jsx = jsx.replace(/srcset=/g, 'srcSet=');
  jsx = jsx.replace(/sizes=/g, 'sizes=');
  jsx = jsx.replace(/autoplay/g, 'autoPlay');
  jsx = jsx.replace(/playsinline/g, 'playsInline');
  jsx = jsx.replace(/datetime/g, 'dateTime');
  jsx = jsx.replace(/<(img|hr|br|input|meta|link)([^>]*?)(?<!\/)>/g, '<$1$2 />');
  jsx = jsx.replace(/style="([^"]*)"/g, `style={{}}`);
  jsx = jsx.replace(/<style>([\s\S]*?)<\/style>/gi, (_, css) => {
    return `<style dangerouslySetInnerHTML={{ __html: ${JSON.stringify(css)} }} />`;
  });
  jsx = jsx.replace(/<!--[\s\S]*?-->/g, '');
  return jsx;
}

const files = [
  { in: 'hackathons.html', out: 'src/app/hackathons/page.tsx', eventType: 'hackathon' },
  { in: 'conferences.html', out: 'src/app/conferences/page.tsx', eventType: 'conference' }
];

files.forEach(f => {
  let html = fs.readFileSync(f.in, 'utf8');
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let bodyContent = bodyMatch ? bodyMatch[1] : html;
  bodyContent = bodyContent.replace(/<script[\s\S]*?<\/script>/gi, '');
  
  const itemStart = bodyContent.indexOf('<div role="listitem"');
  if (itemStart !== -1) {
       const aEnd = bodyContent.indexOf('</a', itemStart);
       let itemEnd = bodyContent.indexOf('</div>', aEnd) + 6;
       // The closing tag might have spaces: </a >
       
       const itemHtml = bodyContent.substring(itemStart, itemEnd);
       
       let dynamicItem = itemHtml;
       dynamicItem = dynamicItem.replace(/<div role="listitem"/, '<div role="listitem" key={event._id}');
       dynamicItem = dynamicItem.replace(/href="[^"]*"/, 'href={event.link || "#"}');
       dynamicItem = dynamicItem.replace(/src="[^"]*"/, 'src={event.imageUrl || ""}');
       dynamicItem = dynamicItem.replace(/<div\s*class="text-xs text-weight-medium text-color-black-600"\s*>[\s\S]*?<\/div>/, `<div class="text-xs text-weight-medium text-color-black-600">{event.date}</div>`);
       dynamicItem = dynamicItem.replace(/<div\s*class="text-lg-2 text-weight-medium text-color-black-900"\s*>[\s\S]*?<\/div>/, `<div class="text-lg-2 text-weight-medium text-color-black-900">{event.title}</div>`);
       
       const replacement = `
         {events.map((event: any) => (
           ${dynamicItem}
         ))}
         {events.length === 0 && <div class="w-full text-center py-12 text-gray-500">No events found.</div>}
       `;
       
       bodyContent = bodyContent.substring(0, itemStart) + replacement + bodyContent.substring(itemEnd);
  }

  let jsxContent = htmlToJsx(bodyContent);
  jsxContent = jsxContent.replace(/href="hackathons\.html"/g, 'href="/hackathons"');
  jsxContent = jsxContent.replace(/href="conferences\.html"/g, 'href="/conferences"');
  jsxContent = jsxContent.replace(/href="index\.html"/g, 'href="/"');
  
  const componentName = f.in.split('.')[0].charAt(0).toUpperCase() + f.in.split('.')[0].slice(1);

  const code = `import Head from "next/head";
import connectDB from "@/lib/db";
import Event from "@/models/Event";

export const dynamic = "force-dynamic";

export default async function ${componentName}() {
  await connectDB();
  const rawEvents = await Event.find({ type: "${f.eventType}" }).sort({ date: -1 });
  const events = JSON.parse(JSON.stringify(rawEvents));

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: \`
        <link href="https://cdn.prod.website-files.com/686c1ba01eb6d3ba7c6d4889/css/cloud-lab-info.webflow.shared.46a38d1ae.css" rel="stylesheet" type="text/css" />
        <link href="https://cdn.prod.website-files.com/686c1ba01eb6d3ba7c6d4889/css/cloud-lab-info.webflow.shared.1f0aaca41.css" rel="stylesheet" type="text/css" />
      \`}} />
      <div className="w-full">
        ${jsxContent}
      </div>
    </>
  );
}
`;

  fs.writeFileSync(f.out, code);
  console.log(`Converted ${f.in} to ${f.out}`);
});
