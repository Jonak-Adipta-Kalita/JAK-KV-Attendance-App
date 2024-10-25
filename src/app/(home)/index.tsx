import { Button, FlatList, Text, View } from "react-native";
import { SignedIn, useUser, useAuth } from "@clerk/clerk-expo";
import { ClassTeacherData, StudentData } from "@/@types/typings";

import classTeachersData from "@/metadata.json";
import { useMemo } from "react";

const Student = ({ studentData }: { studentData: StudentData }) => {
  return (
    <View className="box-style min-w-[95%] max-w-[95%]">
      <Text className="text-primary text-lg font-semibold truncate text-nowrap">
        {studentData.name}
      </Text>
    </View>
  );
};

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
      <View className="bg-background h-full">
        <Text className="text-primary text-2xl tracking-widest font-extrabold self-center pt-5 px-5 mb-8">
          Standard {classTeacherData.standard}({classTeacherData.section})
        </Text>
        {/* BUG: Last element isnt visible */}
        <View className="flex items-center">
          <FlatList
            data={classTeacherData.students}
            keyExtractor={(item) => item.name}
            renderItem={({ item: studentData, index }) => (
              <Student studentData={studentData} key={index} />
            )}
            contentContainerClassName="gap-y-5 bg-background flex flex-col items-center"
          />
        </View>
        <View className="mb-8" />
      </View>
    </SignedIn>
  );
};
