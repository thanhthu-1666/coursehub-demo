-- Đo trước khi tạo index
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, student_id, event_type, occurred_at
FROM enrollment_events
WHERE class_section_id = 'WEB-01'
  AND event_type = 'CREATED'
  AND dataset = 'performance'
  ORDER BY occurred_at DESC;

-- Tạo chỉ mục theo nghiệp vụ thống kê lớp và thời gian
CREATE INDEX idx_enrollment_events_section_type_time
ON enrollment_events (class_section_id, event_type, dataset, occurred_at DESC);

ANALYZE enrollment_events;

-- Đo lại sau khi có index để thấy thời gian thực thi giảm xuống
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, student_id, event_type, occurred_at
FROM enrollment_events
WHERE class_section_id = 'WEB-01'
  AND event_type = 'CREATED'
  AND dataset = 'performance'
  ORDER BY occurred_at DESC;