"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";

const daysOfWeek = [
    { id: 1, name: 'Monday' },
    { id: 2, name: 'Tuesday' },
    { id: 3, name: 'Wednesday' },
    { id: 4, name: 'Thursday' },
    { id: 5, name: 'Friday' },
    { id: 6, name: 'Saturday' },
    { id: 7, name: 'Sunday' },
];

export function ClassForm() {
    const router = useRouter();
    return (
        <div>
            <h1 className="text-4xl font-bold mb-8">Create a New Class</h1>
            <Formik
                initialValues={{
                    name: "",
                    start_h: 0,
                    start_m: 0,
                    end_h: 0,
                    end_m: 0,
                    days: [],
                    start_date: "",
                    end_date: "",
                }}
                validate={(values) => {
                    const errors = {};
                    if (!values.name) {
                        errors.name = "Name is required";
                    }
                    if (values.days.length === 0) {
                        errors.days = "No days selected";
                    }
                    if (!values.start_date) {
                        errors.start_date = "Start date is required";
                    }
                    if (!values.end_date) {
                        errors.end_date = "End date is required";
                    }
                    return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    values.days = values.days.map((day) => parseInt(day));
                    const res = await fetch("/api/create_class", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(values),
                    });
                    if (res.ok) {
                        router.push("/classes/view");
                        setSubmitting(false);
                    } else {
                        console.log("res.json()");
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-4">
                                <label className="text-sm font-bold">Class name -</label>
                                <Field
                                    name="name"
                                    type="text"
                                    placeholder="Class name"
                                />
                                <ErrorMessage className="text-sm text-red-500" name="name" component="div" />
                            </div>

                            <div className="flex gap-4">
                                <div className="flex gap-4">
                                    <label className="text-sm font-bold">Start hour -</label>
                                    <Field
                                        name="start_h"
                                        type="number"
                                        placeholder="Start hour"
                                    />
                                    <ErrorMessage className="text-sm text-red-500" name="start_h" component="div" />
                                </div>
                            </div>


                            <div className="flex gap-4">
                                <label className="text-sm font-bold">Start minute -</label>
                                <Field
                                    name="start_m"
                                    type="number"
                                    placeholder="Start minute"
                                />
                                <ErrorMessage className="text-sm text-red-500" name="start_m" component="div" />
                            </div>


                            <div className="flex gap-4">
                                <label className="text-sm font-bold">End hour -</label>
                                <Field
                                    name="end_h"
                                    type="number"
                                    placeholder="End hour"
                                />
                                <ErrorMessage className="text-sm text-red-500" name="end_h" component="div" />
                            </div>

                            <div className="flex gap-4">
                                <label className="text-sm font-bold">End minute -</label>
                                <Field
                                    name="end_m"
                                    type="number"
                                    placeholder="End minute"
                                />
                                <ErrorMessage className="text-sm text-red-500" name="end_m" component="div" />
                            </div>

                            <div className="flex gap-4">
                                <label className="text-sm font-bold">Start date -</label>
                                <Field
                                    name="start_date"
                                    type="date"
                                    placeholder="Start date"
                                />
                                <ErrorMessage className="text-sm text-red-500" name="start_date" component="div" />
                            </div>

                            <div className="flex gap-4">
                                <label className="text-sm font-bold">End date -</label>
                                <Field
                                    name="end_date"
                                    type="date"
                                    placeholder="End date"
                                />
                                <ErrorMessage className="text-sm text-red-500" name="end_date" component="div" />
                            </div>

                            <label className="text-sm font-bold">Days -</label>

                            {daysOfWeek.map((day) => (
                                <div key={day.id} className="flex gap-4">
                                    <Field
                                        name="days"
                                        type="checkbox"
                                        value={day.id.toString()}
                                    />
                                    <label className="text-sm font-bold">{day.name}</label>
                                </div>
                            ))}

                            <ErrorMessage className="text-sm text-red-500" name="days" component="div" />
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
        </div>
    );
}
