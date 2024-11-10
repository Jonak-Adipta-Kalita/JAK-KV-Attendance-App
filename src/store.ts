import { TeacherStore } from "@/@types/typings";
import { create } from "zustand";

export const useTeacherStore = create<TeacherStore>((set, get) => ({
    teacher: {
        name: "",
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
