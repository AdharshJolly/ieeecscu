/**
 * Fallback data fetched from https://ieeecscu.com.
 * This file is purely read-only and is ONLY used when local MongoDB has 0 records
 * or is offline, allowing local UI testing without requiring production database keys.
 * In production with a connected database, MongoDB data is always prioritized.
 */

export const FALLBACK_EVENTS = [
  {
    _id: "6a8048d3158a2d73fecc96b2",
    title: "Explore and Evolve 2025",
    type: "hackathon",
    date: "September 2 - September 15, 2025",
    description: "Join us for Explore and Evolve 2025, our flagship hackathon event bringing together over 400 developers to innovate on real-world engineering problems.",
    link: "/explore-and-evolve/index.html",
    imageUrl: "/assets/explore-and-evolve.png",
    location: "CHRIST University, Bangalore"
  },
  {
    _id: "6a8048d3158a2d73fecc96b3",
    title: "ADCIS 2025",
    type: "conference",
    date: "September 15 - 16, 2025",
    description: "Annual International Conference on Advances in Data Science & Intelligent Systems in association with global computing research leaders.",
    link: "https://scrs.in/conference/adcis2025",
    imageUrl: "/assets/adcis.png",
    location: "Central Campus Auditorium"
  },
  {
    _id: "6a8048d3158a2d73fecc96b4",
    title: "Agentic AI & LLM Systems Masterclass",
    type: "workshop",
    date: "October 10 - October 11, 2025",
    description: "An intensive hands-on deep dive architecting autonomous AI agents, tool-calling pipelines, RAG retrieval architectures, and real-world MCP integrations.",
    link: "https://ieee.org",
    imageUrl: "/assets/ai-agent.png",
    location: "Computer Labs 3 & 4, Central Campus"
  },
  {
    _id: "6a8048d3158a2d73fecc96b5",
    title: "Cloud-Native Kubernetes & DevOps Bootcamp",
    type: "workshop",
    date: "November 14 - November 15, 2025",
    description: "Hands-on industrial masterclass covering container orchestration, microservices architecture, CI/CD pipelines, and zero-downtime deployment strategies.",
    link: "https://ieee.org",
    imageUrl: "/assets/explore-and-evolve.png",
    location: "Virtual & Lab 2"
  },
  {
    _id: "6a8048d3158a2d73fecc96b6",
    title: "Frontiers in Quantum Computing & Cryptography",
    type: "technical-talk",
    date: "November 28, 2025",
    description: "Distinguished lecture featuring research leaders on quantum circuit design, post-quantum cryptography, and next-generation security algorithms.",
    link: "https://ieee.org",
    imageUrl: "/assets/adcis.png",
    location: "Main Auditorium, Block II"
  },
  {
    _id: "6a8048d3158a2d73fecc96b7",
    title: "Architecting Distributed Systems at Scale",
    type: "technical-talk",
    date: "December 5, 2025",
    description: "Keynote presentation by senior engineering architects on building fault-tolerant, high-throughput distributed microservices serving millions of requests.",
    link: "https://ieee.org",
    imageUrl: "/assets/explore-and-evolve.png",
    location: "Kengeri Campus Seminar Hall"
  }
];

export const FALLBACK_YEARS = ["2026", "2025", "2024", "2023"];

export const FALLBACK_BEARERS: Record<string, any[]> = {
  "2026": [
    {
      _id: "6a815e458939ead27e4f88d8",
      name: "Dr Sandeep Kumar Poonia",
      role: "Faculty Advisor",
      year: "2026",
      order: 1,
      imageUrl: "https://res.cloudinary.com/mooawpbc/image/upload/v1794638962/ieee_cs_team/IMG_6444383BB7CA-1.jpg"
    },
    {
      _id: "6a815e458939ead27e4f88d9",
      name: "Piyush Kumar",
      role: "Student Chair",
      year: "2026",
      order: 2,
      imageUrl: "https://res.cloudinary.com/mooawpbc/image/upload/v1794638965/ieee_cs_team/Piyush-Kumar-Chair.png"
    },
    {
      _id: "6a815e458939ead27e4f88da",
      name: "Canice Robert Norenj",
      role: "Student Vice Chair",
      year: "2026",
      order: 3,
      imageUrl: "https://res.cloudinary.com/mooawpbc/image/upload/v1794638966/ieee_cs_team/c233ca4e-d120-4fdc-8bdc-9aad278af21e.jpg"
    },
    {
      _id: "6a815e458939ead27e4f88db",
      name: "Priyanshu Bist",
      role: "Secretary",
      year: "2026",
      order: 4,
      imageUrl: "https://res.cloudinary.com/mooawpbc/image/upload/v1794638968/ieee_cs_team/1753724966710.png"
    },
    {
      _id: "6a815e458939ead27e4f88dc",
      name: "Kshitiz Kumar",
      role: "Treasurer",
      year: "2026",
      order: 5,
      imageUrl: "https://res.cloudinary.com/mooawpbc/image/upload/v1794638970/ieee_cs_team/d1cab5a6-820f-4a3b-aff5-2cd3de6665ca.jpg"
    },
    {
      _id: "6a815e458939ead27e4f88dd",
      name: "Adharsh Jolly",
      role: "Webmaster",
      year: "2026",
      order: 6,
      imageUrl: "https://res.cloudinary.com/mooawpbc/image/upload/v1794638971/ieee_cs_team/Adharsh-Jolly.jpg"
    }
  ],
  "2025": [
    {
      _id: "6a815e458939ead27e4f88de",
      name: "Dr Sandeep Kumar Poonia",
      role: "Faculty Advisor",
      year: "2025",
      order: 1,
      imageUrl: "https://res.cloudinary.com/mooawpbc/image/upload/v1794638962/ieee_cs_team/IMG_6444383BB7CA-1.jpg"
    },
    {
      _id: "6a815e458939ead27e4f88df",
      name: "Pranshu Patel",
      role: "Student Chair",
      year: "2025",
      order: 2,
      imageUrl: "https://res.cloudinary.com/mooawpbc/image/upload/v1794638973/ieee_cs_team/1705949496396.jpg"
    },
    {
      _id: "6a815e458939ead27e4f88e0",
      name: "Keona Liz Croning",
      role: "Student Vice Chair",
      year: "2025",
      order: 3,
      imageUrl: "https://res.cloudinary.com/mooawpbc/image/upload/v1794638974/ieee_cs_team/keona_2-1-Keona-Liz-Croning.jpg"
    },
    {
      _id: "6a815e458939ead27e4f88e1",
      name: "Adarsh Ramani",
      role: "Secretary",
      year: "2025",
      order: 4,
      imageUrl: "https://res.cloudinary.com/mooawpbc/image/upload/v1794638975/ieee_cs_team/IMG_0982-scaled.jpg"
    },
    {
      _id: "6a815e458939ead27e4f88e2",
      name: "Labh Chandra Bothra",
      role: "Treasurer",
      year: "2025",
      order: 5,
      imageUrl: "https://res.cloudinary.com/mooawpbc/image/upload/v1794638977/ieee_cs_team/labh.jpg"
    },
    {
      _id: "6a815e458939ead27e4f88e3",
      name: "Arnav Rangwani",
      role: "Webmaster",
      year: "2025",
      order: 6,
      imageUrl: "https://res.cloudinary.com/mooawpbc/image/upload/v1794638978/ieee_cs_team/1706305319039.jpg"
    }
  ],
  "2024": [
    {
      _id: "6a815e468939ead27e4f88e4",
      name: "Dr Sandeep Kumar Poonia",
      role: "Faculty Advisor",
      year: "2024",
      order: 1,
      imageUrl: "https://res.cloudinary.com/mooawpbc/image/upload/v1794638962/ieee_cs_team/IMG_6444383BB7CA-1.jpg"
    },
    {
      _id: "6a815e468939ead27e4f88e5",
      name: "Augadh Verma",
      role: "Student Chair",
      year: "2024",
      order: 2,
      imageUrl: "https://res.cloudinary.com/mooawpbc/image/upload/v1794638979/ieee_cs_team/IMG-20240930-WA0020.jpg"
    },
    {
      _id: "6a815e468939ead27e4f88e6",
      name: "Aaron Probha",
      role: "Student Vice Chair",
      year: "2024",
      order: 3,
      imageUrl: "https://res.cloudinary.com/mooawpbc/image/upload/v1794638980/ieee_cs_team/1680442603268.jpg"
    },
    {
      _id: "6a815e468939ead27e4f88e7",
      name: "Kevin Johnson",
      role: "Secretary",
      year: "2024",
      order: 4,
      imageUrl: "https://res.cloudinary.com/mooawpbc/image/upload/v1794638983/ieee_cs_team/Kevin-Johnson-Secretary-scaled.jpg"
    },
    {
      _id: "6a815e468939ead27e4f88e8",
      name: "Pranshu Patel",
      role: "Vice Secretary",
      year: "2024",
      order: 5,
      imageUrl: "https://res.cloudinary.com/mooawpbc/image/upload/v1794638973/ieee_cs_team/1705949496396.jpg"
    },
    {
      _id: "6a815e468939ead27e4f88e9",
      name: "B Satyam Rao",
      role: "Treasurer",
      year: "2024",
      order: 6,
      imageUrl: "https://res.cloudinary.com/mooawpbc/image/upload/v1794638985/ieee_cs_team/B-Satyam-Rao-Treasurer.png"
    },
    {
      _id: "6a815e468939ead27e4f88ea",
      name: "Ashley Varghese",
      role: "Webmaster",
      year: "2024",
      order: 7,
      imageUrl: "https://res.cloudinary.com/mooawpbc/image/upload/v1794638986/ieee_cs_team/Ashley-webmaster-scaled.jpg"
    },
    {
      _id: "6a815e468939ead27e4f88eb",
      name: "Labh Chandra Bothra",
      role: "Junior Webmaster",
      year: "2024",
      order: 8,
      imageUrl: "https://res.cloudinary.com/mooawpbc/image/upload/v1794638977/ieee_cs_team/labh.jpg"
    },
    {
      _id: "6a815e468939ead27e4f88ec",
      name: "Arnav Rangwani",
      role: "Junior Webmaster",
      year: "2024",
      order: 9,
      imageUrl: "https://res.cloudinary.com/mooawpbc/image/upload/v1794638978/ieee_cs_team/1706305319039.jpg"
    }
  ],
  "2023": [
    {
      _id: "6a815e468939ead27e4f88ed",
      name: "Julian Benadit P",
      role: "Faculty Advisor",
      year: "2023",
      order: 1,
      imageUrl: "https://res.cloudinary.com/mooawpbc/image/upload/v1794638988/ieee_cs_team/97129.jpg"
    },
    {
      _id: "6a815e468939ead27e4f88ee",
      name: "Divyanshu Sachdeva",
      role: "Student Chair",
      year: "2023",
      order: 2,
      imageUrl: "https://res.cloudinary.com/mooawpbc/image/upload/v1794638989/ieee_cs_team/20221119_121117-scaled.jpg"
    },
    {
      _id: "6a815e468939ead27e4f88ef",
      name: "Sarah Rositta Bino",
      role: "Student Vice Chair",
      year: "2023",
      order: 3,
      imageUrl: "https://res.cloudinary.com/mooawpbc/image/upload/v1794638990/ieee_cs_team/IMG-20221119-WA0011.jpg"
    },
    {
      _id: "6a815e468939ead27e4f88f0",
      name: "Kevin Tom Thomas",
      role: "Secretary",
      year: "2023",
      order: 4,
      imageUrl: "https://res.cloudinary.com/mooawpbc/image/upload/v1786946629/ieee_cs_events/phal1guwjuun4xbw04dq.jpg"
    },
    {
      _id: "6a815e468939ead27e4f88f1",
      name: "Sarah Mary Antony",
      role: "Assistant Secretary",
      year: "2023",
      order: 5,
      imageUrl: "https://res.cloudinary.com/mooawpbc/image/upload/v1794638990/ieee_cs_team/IMG-20221119-WA0011.jpg"
    },
    {
      _id: "6a815e478939ead27e4f88f2",
      name: "Navya Maria Joson",
      role: "Treasurer",
      year: "2023",
      order: 6,
      imageUrl: "https://res.cloudinary.com/mooawpbc/image/upload/v1794638992/ieee_cs_team/20221119_121006-scaled.jpg"
    },
    {
      _id: "6a815e478939ead27e4f88f3",
      name: "Augadh Verma",
      role: "Assistant Treasurer",
      year: "2023",
      order: 7,
      imageUrl: "https://res.cloudinary.com/mooawpbc/image/upload/v1794638979/ieee_cs_team/IMG-20240930-WA0020.jpg"
    },
    {
      _id: "6a815e478939ead27e4f88f4",
      name: "Peter K Joseph",
      role: "Web Master",
      year: "2023",
      order: 8,
      imageUrl: "https://res.cloudinary.com/mooawpbc/image/upload/v1794638994/ieee_cs_team/IMG_7300-01-scaled.jpg"
    }
  ]
};
