import React from 'react'
import { Button } from './ui/button'
import StarRating from './ui/StarRating'
import { cn } from "@/lib/utils"

export function FeedbackSection({ onSubmitSuccess }) {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        try {
            // Using 'no-cors' mode because the target API likely doesn't support CORS for localhost.
            // This means we can SEND data, but we can't read the response (it will be opaque).
            // We treat the attempt as successful (Fire & Forget).
            await fetch(form.action, {
                method: form.method,
                body: formData,
                mode: 'no-cors'
            });

            // With no-cors, we can't check response.ok (it's always false/opaque).
            // So we assume it went through and trigger the success flow.
            if (onSubmitSuccess) onSubmitSuccess();
            form.reset();

        } catch (error) {
            console.error("Submission error:", error);
            alert("Error submitting form. Please check your connection.");
        }
    };

    return (
        <section id="feedback" className="py-24 px-4 container mx-auto">
            <div className="max-w-2xl mx-auto bg-card border border-border rounded-3xl p-8 shadow-xl">
                <h2 className="text-3xl font-bold mb-2 text-center text-foreground">We value your feedback</h2>
                <p className="text-center text-muted-foreground mb-8">
                    Help us improve your experience. Let us know what you think!
                </p>

                <form
                    action="https://www.postpipe.in/api/public/submit/feedback-1"
                    method="POST"
                    className="space-y-6"
                    onSubmit={handleSubmit}
                >
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-foreground block text-center mb-4">
                            Rating
                        </label>
                        <div className="flex justify-center">
                            <StarRating />
                        </div>
                    </div>

                    <div>
                        <div className="space-y-2">
                            <label htmlFor="Name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                                Name
                            </label>
                            <input
                                type="text"
                                name="Name"
                                id="Name"
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="Email Address"
                                id="email"
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="Message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                            Enter your feedback here
                        </label>
                        <textarea
                            name="Enter your feedback here"
                            id="Message"
                            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                        />
                    </div>

                    <Button type="submit" className="w-full h-11 text-lg">
                        Submit
                    </Button>
                </form>
            </div>
        </section>
    )
}
