import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: process.env.GITHUB_PAT });

const owner = process.env.GITHUB_OWNER!;
const repo = process.env.GITHUB_REPO!;

export async function uploadImageToGithub(filename: string, base64Content: string) {
  const path = `public/uploads/${filename}`;
  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    message: `Upload media: ${filename}`,
    content: base64Content,
  });
  return `/uploads/${filename}`; // Return local public path that Next.js can serve directly
}

export async function deleteImageFromGithub(filename: string) {
  const path = `public/uploads/${filename}`;
  // Need to get the file SHA first to delete it
  const { data } = await octokit.repos.getContent({
    owner,
    repo,
    path,
  });
  
  if (!Array.isArray(data) && 'sha' in data) {
    await octokit.repos.deleteFile({
      owner,
      repo,
      path,
      message: `Delete media: ${filename}`,
      sha: data.sha,
    });
  }
}

export async function listImagesFromGithub() {
  const path = 'public/uploads';
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path,
    });
    
    if (Array.isArray(data)) {
      return data
        .filter(file => file.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i))
        .map(file => `/uploads/${file.name}`);
    }
  } catch {
    return [];
  }
  return [];
}
