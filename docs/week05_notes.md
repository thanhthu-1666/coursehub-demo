CourseHub - Buoi 5

Figma Design: https://www.figma.com/design/h1eL5Yj7v0RvEYkrDck2Ak/CourseHub-Bu%E1%BB%95i-5?node-id=0-1&t=MUkbDO085mBxhAon-1

CORS: configure CORS middleware for FastAPI backend (allow http://localhost:5173, http://127.0.0.1:5173).

React setup: initialize frontend using Vite + React 18, set up components structure.

Component extraction (Bai 1): extract StudentForm.jsx for student ID input handling via props.

Filtering (Bai 2): add course code filtering buttons (ALL, INT2204, INT2205, INT2206) and keyword/availability filter logic.

Pagination & Event Log (Bai 3): update EnrollmentList.jsx with server-side pagination (skip, limit) calling GET /enrollment-events.

Merge history: merged week04-transaction-index into week05-frontend-react to leverage existing backend transaction handling, row-locking (FOR UPDATE), and event logging endpoints.

Verification (SQL):

v_section_summary correctly reflects capacity and remaining spots after POST/DELETE operations.

enrollment_events correctly logs CREATED and CANCELLED status with dataset='demo'.

Server-side pagination verified: events are fetched with limit/skip without loading full dataset into browser memory.

Verification (HTTP):

POST /enrollments -> 201 Created on success, 409 Conflict when section is full or duplicate.

DELETE /enrollments/{student_id}/{class_section_id} -> 204 No Content.

GET /enrollment-events?student_id=...&skip=0&limit=5 -> 200 OK.

Khong commit backend/.env hoac frontend/.env.local.