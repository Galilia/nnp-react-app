import emailjs from '@emailjs/browser';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/redesigned/Button';
import { HeaderDescription } from '@/shared/ui/redesigned/HeaderDescription';
import { Input } from '@/shared/ui/redesigned/Input';
import { Text } from '@/shared/ui/redesigned/Text';
import { Textarea } from '@/shared/ui/redesigned/Textarea';

import cls from './ContactForm.module.scss';

interface ContactFormProps {
    className?: string;
}

export const ContactForm = (props: ContactFormProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        message: '',
    });

    const [formSent, setFormSent] = useState(false);

    useEffect(() => {
        const temp = localStorage.getItem('formData');
        if (temp !== null) {
            const loadedFormData = JSON.parse(temp);

            if (loadedFormData) {
                setFormData(loadedFormData);
            }
        }
    }, []);

    useEffect(() => {
        const temp = JSON.stringify(formData);
        localStorage.setItem('formData', temp);
    }, [formData]);

    const handleInputChange = (value: string, name: string) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleTextareaChange = (value: string, name: string) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const form = useRef<HTMLFormElement>(null);

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (form.current) {
            emailjs
                .sendForm(
                    'service_bvcscqo',
                    'template_9l6mdfk',
                    form.current,
                    'Zf6D5LGWFjgS7JCeo',
                )
                .then(
                    (result) => {
                        console.log(result.text);
                    },
                    (error) => {
                        console.log(error.text);
                    },
                );
            setFormData({
                user_name: '',
                user_email: '',
                message: '',
            });
            setFormSent(true);
        }
    };

    return (
        <div className={classNames(cls.contactFormContainer, {}, [className])}>
            <form className={cls.ContactForm} ref={form} onSubmit={sendEmail}>
                <HeaderDescription header={t('form_name')} size="s" />
                <Input
                    value={formData.user_name}
                    onChange={handleInputChange}
                    className={cls.contactFormInput}
                    type="text"
                    name="user_name"
                    placeholder={t('name_placeholder')}
                    required
                />
                <HeaderDescription header={t('form_email')} size="s" />
                <Input
                    value={formData.user_email}
                    onChange={handleInputChange}
                    className={cls.contactFormInput}
                    type="email"
                    name="user_email"
                    placeholder="YourName@mail.com"
                    required
                />
                <HeaderDescription header={t('form_message')} size="s" />
                <Textarea
                    value={formData.message}
                    onChange={handleTextareaChange}
                    className={cls.contactFormArea}
                    name="message"
                    rows={7}
                    placeholder={t('form_message_placeholder')}
                    required
                />
                <Button
                    variant="filled"
                    type="submit"
                    color="link"
                    font="bold"
                    fullWidth
                    size="xl"
                    className={cls.buttonSent}
                >
                    {t('form_submit_btn')}
                </Button>
                {formSent && (
                    <Text
                        className={cls.messageSent}
                        variant="accent"
                        title={t('form_thank_you')}
                    />
                )}
            </form>
        </div>
    );
};
