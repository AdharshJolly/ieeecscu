# IEEE CS Website Next.js Conversion Design

## 1. Architecture & Tech Stack
*   **Framework:** Next.js (App Router) for routing, server-side rendering, and API routes.
*   **Styling:** Tailwind CSS. We will reconstruct the visual layout from the current Webflow HTML/CSS into reusable React components styled with Tailwind.
*   **Database:** MongoDB with Mongoose to store dynamic event data.
*   **Authentication:** NextAuth.js (credentials based or GitHub OAuth) to secure the admin dashboard.
*   **Image Storage:** When admins upload images, the Next.js API will commit the image directly to the GitHub repository (e.g., in a `public/uploads/` directory) via the GitHub REST API. We will use the raw GitHub URL or standard path for rendering. This requires a GitHub Personal Access Token (PAT).

## 2. Core Features & Pages
*   **Public Pages:**
    *   `/` (Home): Main landing page.
    *   `/hackathons`, `/conferences`, `/workshops`, `/talks`: Dynamic pages pulling events from MongoDB.
*   **Admin Dashboard (`/admin`):**
    *   **Login Page:** Secure access route.
    *   **Events Manager:** Table view to Create, Read, Update, and Delete events. Form includes file upload for images, which triggers the GitHub API upload process.
    *   **Media Manager:** A dedicated gallery view within the dashboard that lists all images currently stored in the GitHub repository. It allows admins to select and delete images, which triggers the GitHub API to permanently remove them from the repository.

## 3. Data Flow & Models
*   **Event Model (Mongoose):**
    *   `title` (String, required)
    *   `type` (Enum: "hackathon", "conference", "workshop", "talk", required)
    *   `date` (Date, required)
    *   `description` (String, required)
    *   `imageUrl` (String) -> Will point to the GitHub path/URL.
    *   `link` (String)

## 4. Implementation Steps
1.  **Initialize Next.js:** Scaffold the Next.js app with Tailwind and MongoDB connection setup.
2.  **Componentize the UI:** Extract the navigation bar, footer, and event cards from the existing HTML and convert them to Tailwind React components.
3.  **Build Public Pages:** Create the Home, Hackathons, and Conferences pages.
4.  **Develop Admin Panel:** Set up NextAuth, build the Events Manager and Media Manager dashboard views, and connect the CRUD forms to MongoDB.
5.  **GitHub API Integration:** 
    *   Implement Next.js API route to handle multipart form data (images) and upload binary data to GitHub via `PUT /repos/{owner}/{repo}/contents/{path}`.
    *   Implement API routes to fetch the file tree from GitHub and delete files via `DELETE /repos/{owner}/{repo}/contents/{path}` for the Media Manager.
6.  **Data Hydration:** Test the admin panel by adding events, managing media, and verifying they appear correctly on the public pages.
