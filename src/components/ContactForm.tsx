import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import React, { useState } from 'react';
import { LuMailCheck, LuMailX, LuSend } from 'react-icons/lu';
import {
    VITE_EMAILJS_PUBLIC_KEY,
    VITE_EMAILJS_SERVICE_ID,
    VITE_EMAILJS_TEMPLATE_ID,
} from '../constants/keys';

type EmailStatus = 'default' | 'loading' | 'success' | 'error';

interface FormData {
    email: string;
    message: string;
    name: string;
}

interface Errors {
    email?: string;
    message?: string;
    name?: string;
}

const ContactForm = () => {
    const [emailError, setEmailError] = useState('');
    const [emailStatus, setEmailStatus] = useState<EmailStatus>('default');
    const [formData, setFormData] = useState<FormData>({
        email: '',
        name: '',
        message: '',
    });
    const [errors, setErrors] = useState<Errors>({});

    const sendEmail = async ({ email, name, message }: FormData) => {
        try {
            setEmailStatus('loading');
            await emailjs.send(
                VITE_EMAILJS_SERVICE_ID,
                VITE_EMAILJS_TEMPLATE_ID,
                { email, name, message },
                {
                    publicKey: VITE_EMAILJS_PUBLIC_KEY,
                }
            );
            setEmailStatus('success');
            setTimeout(() => {
                setEmailStatus('default');
            }, 5000);
        } catch (err) {
            setEmailStatus('error');
            if (err instanceof EmailJSResponseStatus) {
                setEmailError(err.text);
                return;
            }
            setEmailError('Error email send, try later');
            setTimeout(() => {
                setEmailStatus('default');
            }, 5000);
        }
    };

    const validation = (values: FormData) => {
        const errors: Errors = {};
        if (values.message.length <= 30) {
            errors.message = 'Message must be min 30 symbols';
        }
        if (!values.name) {
            errors.name = 'Name must be not empty';
        }
        if (!values.email) {
            errors.email = 'must not be empty';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Not correct email';
        }
        return errors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validateErrors = validation(formData);
        setErrors(validateErrors);
        if (Object.keys(validateErrors).length === 0) {
            setFormData({
                email: '',
                message: '',
                name: '',
            });
            sendEmail(formData);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="grid gap-4 md:gap-y-8 ">
                <div className="relative">
                    <input
                        className="w-full border border-teal-500/50 px-4 py-4 focus:border-teal-500 outline-none rounded-xl transition-all"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    {errors.email && (
                        <div className="text-rose-500 text-sm absolute top-full">
                            {errors.email}
                        </div>
                    )}
                </div>
                <div className="relative">
                    <input
                        className="w-full border border-teal-500/50 px-4 py-4 focus:border-teal-500 outline-none rounded-xl transition-all"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                    />
                    {errors.name && (
                        <div className="text-rose-500 text-sm absolute top-full">
                            {errors.name}
                        </div>
                    )}
                </div>
                <div className="relative">
                    <textarea
                        className="block w-full border border-teal-500/50 px-4 py-4 min-h-52 resize-none focus:border-teal-500 outline-none rounded-xl transition-all"
                        name="message"
                        placeholder="Message"
                        value={formData.message}
                        onChange={handleChange}
                    ></textarea>
                    {errors.message && (
                        <div className="text-rose-500 text-sm absolute top-full">
                            {errors.message}
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        className="cursor-pointer flex items-center gap-2 bg-teal-500/50 px-6 py-3 w-fit hover:bg-teal-500 uppercase text-sm rounded-4xl transition-all"
                    >
                        {emailStatus === 'loading' ? (
                            'Sending...'
                        ) : (
                            <>
                                Send message <LuSend className="text-lg" />
                            </>
                        )}
                    </button>
                    {emailStatus === 'success' && (
                        <div className="border border-green-600 flex items-center gap-2 px-4 py-2 rounded-2xl text-green-500">
                            <LuMailCheck className="text-xl" />
                            Email was send
                        </div>
                    )}
                    {emailStatus === 'error' && (
                        <div className="border border-red-600 flex items-center gap-2 px-4 py-2 rounded-2xl text-red-500">
                            <LuMailX className="text-xl" />
                            {emailError}
                        </div>
                    )}
                </div>
            </form>
        </>
    );
};

export default ContactForm;
