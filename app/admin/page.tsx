"use client";

import storeCourse from "data/storeCourse";
import storeLesson from "data/storeLesson";
import { Field, Form, Formik } from "formik";
import { useAuthContext } from "hooks/useAuthContext";
import { useRouter } from "next/navigation";

const Admin = () => {
  const { user, isLoading } = useAuthContext();

  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;

  if (!user || user.email !== "edwardclark1104@gmail.com") {
    router.replace("/");
  }

  const courseInitialValues = {
    name: "",
    description: "",
    image: "",
  };

  const addCourse = async (values: typeof courseInitialValues) => {
    storeCourse(values);
  };

  const lessonInitialValues = {
    uid: "",
    name: NaN,
    description: "",
    background: "",
    content: "",
    courseName: "",
  };

  const addLesson = async (values: typeof lessonInitialValues) => {
    storeLesson(values.courseName, {
      name: values.name,
      description: values.description,
      background: values.background,
      content: values.content.replaceAll("\\n", "\n").replaceAll("\\t", "\t"),
      uid: values.uid,
    });
  };

  return (
    <div>
      <h1 className="font-bold text-2xl mb-2">Add/Update Course</h1>
      <Formik initialValues={courseInitialValues} onSubmit={addCourse}>
        {({ isSubmitting }) => (
          <Form>
            <div className="flex flex-col gap-3 w-[400px]">
              <Field
                name="name"
                placeholder="name"
                className="rounded-xl border border-neutral-600 py-2 flex justify-center align-center px-3 bg-neutral-900 w-full text-neutral-400 placeholder:text-neutral-600 text-sm font-medium h-11 focus:outline-none focus:border-green-500 focus:border-1 focus:ring-green-500 focus:ring-1 transition-all"
                required
              />
              <Field
                name="description"
                placeholder="description"
                className="rounded-xl border border-neutral-600 py-2 flex justify-center align-center px-3 bg-neutral-900 w-full text-neutral-400 placeholder:text-neutral-600 text-sm font-medium h-11 focus:outline-none focus:border-green-500 focus:border-1 focus:ring-green-500 focus:ring-1 transition-all"
                required
              />
              <Field
                name="image"
                placeholder="image"
                className="rounded-xl border border-neutral-600 py-2 flex justify-center align-center px-3 bg-neutral-900 w-full text-neutral-400 placeholder:text-neutral-600 text-sm font-medium h-11 focus:outline-none focus:border-green-500 focus:border-1 focus:ring-green-500 focus:ring-1 transition-all"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="font-bold bg-green-600 hover:bg-green-700 focus:bg-green-700 rounded-xl text-center h-11 mt-2 mb-1 w-40"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <h1 className="font-bold text-2xl mb-2 mt-16">Add/Update Lesson</h1>
      <Formik initialValues={lessonInitialValues} onSubmit={addLesson}>
        {({ isSubmitting }) => (
          <Form>
            <div className="flex flex-col gap-3 w-[400px]">
              <Field
                name="uid"
                placeholder="uid (optional)"
                className="rounded-xl border border-neutral-600 py-2 flex justify-center align-center px-3 bg-neutral-900 w-full text-neutral-400 placeholder:text-neutral-600 text-sm font-medium h-11 focus:outline-none focus:border-green-500 focus:border-1 focus:ring-green-500 focus:ring-1 transition-all"
              />
              <Field
                type="number"
                name="name"
                placeholder="name"
                className="rounded-xl border border-neutral-600 py-2 flex justify-center align-center px-3 bg-neutral-900 w-full text-neutral-400 placeholder:text-neutral-600 text-sm font-medium h-11 focus:outline-none focus:border-green-500 focus:border-1 focus:ring-green-500 focus:ring-1 transition-all"
                required
              />
              <Field
                name="description"
                placeholder="description"
                className="rounded-xl border border-neutral-600 py-2 flex justify-center align-center px-3 bg-neutral-900 w-full text-neutral-400 placeholder:text-neutral-600 text-sm font-medium h-11 focus:outline-none focus:border-green-500 focus:border-1 focus:ring-green-500 focus:ring-1 transition-all"
                required
              />
              <Field
                name="background"
                placeholder="background"
                className="rounded-xl border border-neutral-600 py-2 flex justify-center align-center px-3 bg-neutral-900 w-full text-neutral-400 placeholder:text-neutral-600 text-sm font-medium h-11 focus:outline-none focus:border-green-500 focus:border-1 focus:ring-green-500 focus:ring-1 transition-all"
                required
              />
              <Field
                as="textarea"
                rows={5}
                name="content"
                placeholder="content"
                className="rounded-xl border border-neutral-600 py-2 flex justify-center align-center px-3 bg-neutral-900 w-full text-neutral-400 placeholder:text-neutral-600 text-sm font-medium h-11 focus:outline-none focus:border-green-500 focus:border-1 focus:ring-green-500 focus:ring-1 transition-all font-mono"
                required
              />
              <Field
                name="courseName"
                placeholder="courseName"
                className="rounded-xl border border-neutral-600 py-2 flex justify-center align-center px-3 bg-neutral-900 w-full text-neutral-400 placeholder:text-neutral-600 text-sm font-medium h-11 focus:outline-none focus:border-green-500 focus:border-1 focus:ring-green-500 focus:ring-1 transition-all"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="font-bold bg-green-600 hover:bg-green-700 focus:bg-green-700 rounded-xl text-center h-11 mt-2 mb-1 w-40"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Admin;
