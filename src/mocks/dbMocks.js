// src/mocks/dbMock.js
const now = new Date();

function daysAgo(n) {
  const d = new Date(now);
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

export const mockUsers = [
  {
    id: 1,
    first_name: "Sebastian",
    last_name: "Urbina",
    username: "sebastian",
    email: "sebastian@example.com",
    created_at: daysAgo(400),
    updated_at: daysAgo(10),
  },
];

export const mockLinks = [
  {
    id: 1,
    name: "go-home",
    redirect_to: "https://example.com/home",
    user_created_id: 1,
    created_at: daysAgo(60),
    updated_at: daysAgo(30),
    is_deleted: false,
    deleted_at: null,
  },
  {
    id: 2,
    name: "docs",
    redirect_to: "https://docs.example.com/intro",
    user_created_id: 1,
    created_at: daysAgo(45),
    updated_at: daysAgo(10),
    is_deleted: false,
    deleted_at: null,
  },
  {
    id: 3,
    name: "promo-2025",
    redirect_to: "https://example.com/promo",
    user_created_id: 1,
    created_at: daysAgo(12),
    updated_at: daysAgo(5),
    is_deleted: false,
    deleted_at: null,
  },
  {
    id: 4,
    name: "signup",
    redirect_to: "https://example.com/signup",
    user_created_id: 1,
    created_at: daysAgo(5),
    updated_at: daysAgo(3),
    is_deleted: false,
    deleted_at: null,
  },
  {
    id: 5,
    name: "blog-post",
    redirect_to: "https://blog.example.com/1",
    user_created_id: 1,
    created_at: daysAgo(120),
    updated_at: daysAgo(90),
    is_deleted: false,
    deleted_at: null,
  },
];

// clicks: link_id, ip_address, user_agent, created_at
export const mockClicks = [
  { id: 1, link_id: 1, ip_address: "1.2.3.4", user_agent: "ua", created_at: daysAgo(90) },
  { id: 2, link_id: 1, ip_address: "1.2.3.5", user_agent: "ua", created_at: daysAgo(60) },
  { id: 3, link_id: 2, ip_address: "1.2.3.6", user_agent: "ua", created_at: daysAgo(45) },
  { id: 4, link_id: 3, ip_address: "1.2.3.7", user_agent: "ua", created_at: daysAgo(12) },
  { id: 5, link_id: 3, ip_address: "1.2.3.8", user_agent: "ua", created_at: daysAgo(10) },
  { id: 6, link_id: 4, ip_address: "1.2.3.9", user_agent: "ua", created_at: daysAgo(4) },
  { id: 7, link_id: 1, ip_address: "1.2.3.10", user_agent: "ua", created_at: daysAgo(30) },
  { id: 8, link_id: 2, ip_address: "1.2.3.11", user_agent: "ua", created_at: daysAgo(8) },
  { id: 9, link_id: 1, ip_address: "1.2.3.12", user_agent: "ua", created_at: daysAgo(2) },
  { id: 10, link_id: 5, ip_address: "1.2.3.13", user_agent: "ua", created_at: daysAgo(200) },
];
