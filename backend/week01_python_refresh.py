students = [
    {"id": "22000001", "name": "Nguyen Minh Anh", "major": "KHDL"},
    {"id": "22000002", "name": "Tran Duc Long", "major": "KHDL"},
]
courses = [
    {
        "code": "INT2204",
        "name": "Co so du lieu Web va he thong thong tin",
        "capacity": 3,
        "enrolled": 2,
    },
    {
        "code": "INT2205",
        "name": "Khai pha du lieu",
        "capacity": 2,
        "enrolled": 2,
    },
]
enrollments = [
    {"student_id": "22000001", "course_code": "INT2204"}
]

for course in courses:
    remaining = course["capacity"] - course["enrolled"]
    print(course["code"], "- con", remaining, "cho")

def find_course(course_code):
    for course in courses:
        if course["code"] == course_code:
            return course
        return None
print(find_course("INT2204"))

def can_enroll(student_id, course_code):
    course = find_course(course_code)
    if course is None:
        return False, "Hoc phan khong ton tai"
    if course["enrolled"] >= course["capacity"]:
        return False, "Lop da du so luong"
    duplicated = any(
    item["student_id"] == student_id and item["course_code"] == course_code
    for item in enrollments
    )
    if duplicated:
        return False, "Sinh vien da dang ky hoc phan nay"
    return True, "Co the dang ky"
print(can_enroll("22000002", "INT2204"))

try:
    limit = int(input("Nhap so luong hoc phan muon hien thi: "))
    print(courses[:limit])
except ValueError:
    print("So luong phai la so nguyen")

def search_courses(keyword):
    normalized = keyword.strip().lower()
    results = []

    for course in courses:
        code = course["code"].lower()
        name = course["name"].lower()
        if normalized in code or normalized in name:
            results.append(course)
    return results
print(search_courses("web"))

def enroll_student(student_id, course_code):
    student_exists = any(s["id"] == student_id for s in students)
    if not student_exists:
        return False, "Ma sinh vien khong ton tai"

    course = find_course(course_code)
    if course is None:
        return False, "Ma hoc phan khong ton tai"

    if course["enrolled"] >= course["capacity"]:
        return False, "Lop da du so luong"

    already_enrolled = any(e["student_id"] == student_id and e["course_code"] == course_code 
    for e in enrollments
    )
    if already_enrolled:
        return False, "Sinh vien da dang ky hoc phan nay"

    enrollments.append({"student_id": student_id, "course_code": course_code})
    course["enrolled"] += 1
    return True, "Dang ky thanh cong"

# 5 Tình huống test theo bài tập 2:
print(enroll_student("22000002", "INT2204"))  # 1. Đăng ký thành công
print(enroll_student("22000001", "INT2204"))  # 2. Đăng ký trùng
print(enroll_student("22000002", "INT2205"))  # 3. Lớp đầy
print(enroll_student("22000002", "INT9999"))  # 4. Mã học phần không tồn tại
print(enroll_student("99999999", "INT2204"))  # 5. Mã sinh viên không tồn tại