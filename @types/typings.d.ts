export interface TokenCache {
    getToken: (key: string) => Promise<string | undefined | null>;
    saveToken: (key: string, token: string) => Promise<void>;
    clearToken?: (key: string) => void;
}

export interface TeachersData {
    class_teachers: ClassTeacherData[];
}

export interface ClassTeacherData {
    id: string;
    standard: string;
    section: string;
    students: StudentData[];
}

export type Attendance = "present" | "absent" | "leave";

export interface StudentData {
    name: string;
    rollNo: number;
    attendance: Attendance;
}

export interface TeacherStore {
    teacher: ClassTeacherData;
    setTeacherData: (teacherData: ClassTeacherData) => void;
    updateStudentAttendance: (rollNo: number, attendance: Attendance) => void;
    getStudent: (rollNo: number) => StudentData;
    getStudents: () => StudentData[];
}

export interface SearchStore {
    search: string;
    setSearch: (search: string) => void;
}
