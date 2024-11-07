import { FlatList, Text, View } from "react-native";
import { SignedIn, useUser, useAuth } from "@clerk/clerk-expo";
import { ClassTeacherData, StudentData } from "@/@types/typings";

import classTeachersData from "@/metadata.json";
import { useMemo } from "react";

const Student = ({ studentData }: { studentData: StudentData }) => {
  const maxLength = 24;

  return (
    <View className="box-style min-w-[95%] max-w-[95%] flex flex-row justify-between p-4">
      {/* <Text className="text-primary text-lg font-semibold truncate text-nowrap">
        {studentData.rollNo} - {studentData.name}
      </Text> */}
      <Text className="text-primary font-bold truncate tracking-wide">
        {studentData.name.slice(0, maxLength)}
        {studentData.name.length > maxLength ? "..." : ""}
      </Text>
      <Text className="text-gray-300/80 font-semibold">
        Roll No: {studentData.rollNo}
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
        <View className="flex items-center py-4">
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
