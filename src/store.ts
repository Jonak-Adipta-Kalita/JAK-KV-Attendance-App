import { SearchStore, TeacherStore } from "@/@types/typings";
import { create } from "zustand";

export const useTeacherStore = create<TeacherStore>((set, get) => ({
    teacher: {
        id: "",
        standard: "",
        section: "",
        students: [],
    },
    setTeacherData: (teacherData) => set({ teacher: teacherData }),
    updateStudentAttendance: (rollNo, attendance) =>
        set((state) => {
            state.teacher.students.find(
                (student) => student.rollNo === rollNo
            )!.attendance = attendance;
            return state;
        }),
    getStudent: (rollNo) =>
        get().teacher.students.find((student) => student.rollNo === rollNo)!,
    getStudents: () => get().teacher.students,
}));

export const useSearchStore = create<SearchStore>((set) => ({
    search: "",
    setSearch: (search: string) => set({ search }),
}));
