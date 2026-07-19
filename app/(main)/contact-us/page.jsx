"use client";
import { useForm } from "react-hook-form";

export default function ContactUsForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async data => {
    try {
      console.log("Contact form submitted:", data);
      reset();
    } catch (err) {
      console.error("Failed to submit contact form:", err);
    }
  };

  const inputClass = hasError =>
    `w-full rounded-lg border px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors  ${
      hasError
        ? "border-red-400 focus:border-red-400"
        : "border-gray-200 focus:border-primary-pink"
    }`;

  return (
    <section className="container py-10">
      <div className="w-full max-w-2xl mx-auto rounded-xl md:rounded-2xl border border-gray-100 bg-white p-4 md:p-7 shadow">
        <h2 className="text-xl font-semibold text-gray-800">Contact Us</h2>
        <hr className="mt-3 md:mt-4 mb-4 md:mb-6 border-gray-100" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:gap-y-5 sm:grid-cols-2">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="mb-1.5 block font-medium text-gray-800"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="name"
                className={inputClass(!!errors.firstName)}
                {...register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters",
                  },
                })}
              />
              {errors.firstName && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="mb-1.5 block font-medium text-gray-800"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="name"
                className={inputClass(!!errors.lastName)}
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters",
                  },
                })}
              />
              {errors.lastName && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block font-medium text-gray-800"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="email here..."
                className={inputClass(!!errors.email)}
                {...register("email", {
                  required: "Email address is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="mb-1.5 block font-medium text-gray-800"
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="here"
                className={inputClass(!!errors.subject)}
                {...register("subject", {
                  required: "Subject is required",
                })}
              />
              {errors.subject && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.subject.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="mb-1.5 block font-medium text-gray-800"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="here..."
                className={`${inputClass(!!errors.message)} resize-none`}
                {...register("message", {
                  required: "Message is required",
                  minLength: {
                    value: 10,
                    message: "Message must be at least 10 characters",
                  },
                })}
              />
              {errors.message && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.message.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-xl bg-primary-pink py-3 font-semibold cursor-pointer active:scale-95 duration-300 text-white transition-all hover:opacity-90 disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </section>
  );
}
