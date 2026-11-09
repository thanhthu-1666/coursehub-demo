import { useState, useEffect } from "react";
import { api } from "../api.js";

export default function EnrollmentList({ rows, disabled, onCancel, studentId }) {
  // State cho phân trang nhật ký sự kiện (Bài 3)
  const [events, setEvents] = useState([]);
  const [skip, setSkip] = useState(0);
  const limit = 5; // Số bản ghi hiển thị trên mỗi trang
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [eventError, setEventError] = useState("");

  // Gọi API lấy lịch sử sự kiện có phân trang (skip, limit) khi studentId hoặc skip thay đổi
  useEffect(() => {
    if (!studentId) return;
    const controller = new AbortController();
    async function fetchEvents() {
      setLoadingEvents(true);
      setEventError("");
      try {
        const data = await api(
          `/enrollment-events?student_id=${encodeURIComponent(studentId)}&skip=${skip}&limit=${limit}`,
          { signal: controller.signal }
        );
        setEvents(data);
      } catch (err) {
        if (!controller.signal.aborted) {
          setEventError(err.message);
          setEvents([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingEvents(false);
        }
      }
    }
    fetchEvents();
    return () => controller.abort();
  }, [studentId, skip]);

  return (
    <div>
      {/* 1. Danh sách lớp đã đăng ký  */}
      {rows.length === 0 ? (
        <p>Sinh viên chưa đăng ký lớp nào.</p>
      ) : (
        <ul className="enrollments">
          {rows.map((row) => (
            <li key={row.class_section_id}>
              <div>
                <strong>{row.class_section_id}</strong>
                <span className="subtext">{row.course_name}</span>
              </div>
              <button 
                type="button" 
                className="secondary"
                disabled={disabled} 
                onClick={() => onCancel(row.class_section_id)}
              >
                Hủy đăng ký
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* 2. Màn hình lịch sử sự kiện đăng ký có phân trang (Bài 3) */}
      <div className="event-history-section" style={{ marginTop: "24px", borderTop: "1px solid #ddd", paddingTop: "16px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "8px" }}>
           Nhật ký sự kiện đăng ký (Server-side Pagination)
        </h3>

        {loadingEvents && <p className="muted">Đang tải lịch sử sự kiện...</p>}
        {eventError && <p className="error" style={{ color: "red" }}>Lỗi: {eventError}</p>}

        {!loadingEvents && !eventError && events.length === 0 && (
          <p className="muted">Chưa có sự kiện nào được ghi nhận cho sinh viên này.</p>
        )}

        {!loadingEvents && !eventError && events.length > 0 && (
          <>
            <table className="table" style={{ width: "100%", fontSize: "13px", marginBottom: "10px" }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Loại</th>
                  <th>Mã lớp</th>
                  <th>Thời gian</th>
                </tr>
              </thead>
              <tbody>
                {events.map((ev) => (
                  <tr key={ev.id}>
                    <td>{ev.id}</td>
                    <td>
                      <span className={`badge ${ev.event_type === 'CREATED' ? 'success' : 'danger'}`}>
                        {ev.event_type}
                      </span>
                    </td>
                    <td>{ev.class_section_id}</td>
                    <td>{new Date(ev.occurred_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Thanh điều hướng phân trang skip / limit */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button
                type="button"
                className="secondary"
                disabled={skip === 0 || disabled}
                onClick={() => setSkip((prev) => Math.max(0, prev - limit))}
              >
                Trang trước
              </button>
              <span className="muted">Vị trí (skip): <strong>{skip}</strong></span>
              <button
                type="button"
                className="secondary"
                disabled={events.length < limit || disabled}
                onClick={() => setSkip((prev) => prev + limit)}
              >
                Trang sau
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}