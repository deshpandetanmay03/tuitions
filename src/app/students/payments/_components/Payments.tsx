"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
export default function Payments({ students }) {
    const router = useRouter();
    return (
        <div className="container mx-auto flex flex-col items-center justify-center min-h-screen gap-4">
            <div className="text-xl font-bold">
                Payments
            </div>
            <div className="text-sm">
                Add payment for student
            </div>
            <Formik
                initialValues={{
                    student_id: undefined,
                    amount: 0,
                }}
                validate={(values) => {
                    const errors = {};
                    if (!values.student_id) {
                        errors.student_id = "Student is required";
                    }
                    if (!values.amount) {
                        errors.amount = "Amount is required";
                    }
                    return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    values.student_id = parseInt(values.student_id);
                    const res = await fetch("/api/add_payment", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(values),
                    });
                    if (res.ok) {
                        setSubmitting(false);
                        router.push("/students");
                    } else {
                        console.log("res.json()");
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-4">
                                { students.map((studentData) => (
                                    <div className="flex gap-4" key={studentData.id}>
                                        <Field
                                            name="student_id"
                                            value={studentData.id.toString()}
                                            type="radio"
                                            options={students.map((studentData) => ({ label: studentData.name, value: studentData.id }))}
                                            placeholder="Student"
                                        />
                                        <label className="gap-4 items-center">{studentData.name}</label>
                                    </div>
                                ))}
                                <ErrorMessage className="text-sm text-red-500" name="student_id" component="div" />
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
                                Add Payment
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
