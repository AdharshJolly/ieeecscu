import fs from 'fs';

function htmlToJsx(html) {
  let jsx = html;
  
  // Replace class= with className=
  jsx = jsx.replace(/class=/g, 'className=');
  
  // Replace for= with htmlFor=
  jsx = jsx.replace(/for=/g, 'htmlFor=');

  // Replace srcset= with srcSet=
  jsx = jsx.replace(/srcset=/g, 'srcSet=');
  jsx = jsx.replace(/sizes=/g, 'sizes=');
  jsx = jsx.replace(/autoplay/g, 'autoPlay');
  jsx = jsx.replace(/playsinline/g, 'playsInline');
  jsx = jsx.replace(/datetime/g, 'dateTime');

  // Fix unclosed tags
  jsx = jsx.replace(/<(img|hr|br|input|meta|link)([^>]*?)(?<!\/)>/g, '<$1$2 />');
  
  // Replace style attributes
  jsx = jsx.replace(/style="([^"]*)"/g, `style={{}}`);
  
  // Replace <style> tags
  jsx = jsx.replace(/<style>([\s\S]*?)<\/style>/gi, (_, css) => {
    return `<style dangerouslySetInnerHTML={{ __html: ${JSON.stringify(css)} }} />`;
  });
  
  // Remove HTML comments
  jsx = jsx.replace(/<!--[\s\S]*?-->/g, '');

  return jsx;
}

const files = [
  { in: 'index-copy.html', out: 'src/app/page.tsx', isRoot: true },
  { in: 'hackathons.html', out: 'src/app/hackathons/page.tsx', isRoot: false },
  { in: 'conferences.html', out: 'src/app/conferences/page.tsx', isRoot: false }
];

files.forEach(f => {
  let html = fs.readFileSync(f.in, 'utf8');
  
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let bodyContent = bodyMatch ? bodyMatch[1] : html;
  
  // Remove scripts inside body
  bodyContent = bodyContent.replace(/<script[\s\S]*?<\/script>/gi, '');

  let jsxContent = htmlToJsx(bodyContent);
  
  const componentName = f.isRoot ? 'Home' : f.in.split('.')[0].charAt(0).toUpperCase() + f.in.split('.')[0].slice(1);
  
  // We'll replace the hardcoded hrefs to HTML pages with Next.js Links or leave them as <a>
  jsxContent = jsxContent.replace(/href="hackathons\.html"/g, 'href="/hackathons"');
  jsxContent = jsxContent.replace(/href="conferences\.html"/g, 'href="/conferences"');

  const code = `import Head from "next/head";

export default function ${componentName}() {
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

  const dir = f.out.substring(0, f.out.lastIndexOf('/'));
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(f.out, code);
  console.log(`Converted ${f.in} to ${f.out}`);
});
