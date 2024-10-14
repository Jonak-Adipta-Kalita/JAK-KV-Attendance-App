import { ClassTeacherData, TeachersData } from "@/@types/typings";
import classTeachersData from "@/metadata.json";

export const teacherData = (classTeacherID: string): ClassTeacherData => {
  return (classTeachersData as TeachersData).class_teachers.find(
    (teacher) => teacher.id === classTeacherID
  )!;
};
