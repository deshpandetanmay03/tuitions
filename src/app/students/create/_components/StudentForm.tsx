"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function StudentForm({ classes }) {
    const router = useRouter();
    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold mb-8">Create Student</h1>
            <Formik
                initialValues={{
                    name: "",
                    class_id: undefined,
                    amount: 0,
                }}
                validate={(values) => {
                    const errors = {};
                    if (!values.name) {
                        errors.name = "Name is required";
                    }
                    if (!values.class_id) {
                        errors.class_id = "Class is required";
                    }
                    return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    toast("Creating student", { duration: 3000 });
                    values.class_id = parseInt(values.class_id);
                    const res = await fetch("/api/create_student", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(values),
                    });
                    if (res.ok) {
                        toast("Student created", { duration: 3000 });
                        setSubmitting(false);
                        router.push("/students");
                    } else {
                        toast("Error creating student", { duration: 3000 });
                        console.log("res.json()");
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="flex flex-col gap-8">
                            <div className="flex gap-4">
                                <label className="text-sm font-bold">Student name -</label>
                                <Field
                                    name="name"
                                    type="text"
                                    placeholder="Student name"
                                />
                                <ErrorMessage className="text-sm text-red-500" name="name" component="div" />
                            </div>

                            <div className="flex gap-4 max-w-[500px]">
                                {classes.map((classData) => (
                                    <div className="flex gap-4" key={classData.id}>
                                        <Field
                                            name="class_id"
                                            value={classData.id.toString()}
                                            type="radio"
                                            options={classes.map((classData) => ({ label: classData.name, value: classData.id }))}
                                            placeholder="Class"
                                        />
                                        <label className="gap-4 items-center self-center">
                                            {classData.name}
                                        </label>
                                    </div>
                                ))}
                                <ErrorMessage className="text-sm text-red-500" name="class_id" component="div" />
                            </div>

                            <div className="flex gap-4">
                                <label className="text-sm font-bold">Amount -</label>
                                <Field
                                    name="amount"
                                    type="number"
                                    placeholder="Amount"
                                />
                                <ErrorMessage className="text-sm text-red-500" name="amount" component="div" />
                            </div>

                            <button
                                type="submit"
                                className="bg-[#2e026d] text-white px-4 py-2 rounded-md"
                                disabled={isSubmitting}
                            >
                                Create
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </main>
    );}
