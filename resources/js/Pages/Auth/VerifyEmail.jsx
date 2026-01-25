import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="py-12 flex flex-col justify-center items-center">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-primary">
                            Verify Email
                        </h1>
                        <p className="text-text-muted mt-2">
                            Please verify your email address
                        </p>
                    </div>

                    <div className="bg-surface p-8 rounded-lg shadow-lg border border-gray-700">
                        <div className="mb-4 text-sm text-text">
                            Thanks for signing up! Before getting started, could
                            you verify your email address by clicking on the
                            link we just emailed to you? If you didn't receive
                            the email, we will gladly send you another.
                        </div>

                        {status === "verification-link-sent" && (
                            <div className="mb-4 text-sm font-medium text-success">
                                A new verification link has been sent to the
                                email address you provided during registration.
                            </div>
                        )}

                        <form onSubmit={submit}>
                            <div className="mt-6 flex items-center justify-between">
                                <PrimaryButton disabled={processing}>
                                    Resend Verification Email
                                </PrimaryButton>

                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="rounded-md text-sm text-primary underline hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                >
                                    Log Out
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
