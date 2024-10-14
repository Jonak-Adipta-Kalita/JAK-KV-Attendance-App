import { View } from "react-native";
import { SignedIn, useUser, useAuth } from "@clerk/clerk-expo";
import { ClassTeacherData } from "@/@types/typings";

import classTeachersData from "@/metadata.json";
import { useMemo } from "react";

// VertualizedList for rendering large list!

export default () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  const classTeacherData = useMemo(() => {
    const classTeacherData: ClassTeacherData[] =
      classTeachersData.class_teachers.map((teacher) => ({
        ...teacher,
        students: teacher.students.map((student) => ({
          ...student,
          attendance: "absent",
        })),
      }));

    return classTeacherData.find((teacher) => teacher.id === user!.id)!;
  }, [user!.id, classTeachersData]);

  return (
    <SignedIn>
      <View className="bg-background h-full flex items-center"></View>
    </SignedIn>
  );
};
