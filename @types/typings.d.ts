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

export interface StudentData {
  name: string;
  rollNo: number;
  attendance: "present" | "absent" | "leave";
}
