'use client';

import {
  IconBrandGithubFilled,
  IconBrandGoogleFilled,
} from '@tabler/icons-react';
import React from 'react';

import { Container } from './container';
import { Button } from './elements/button';
import { Logo } from './logo';

<<<<<<< HEAD
// Objeto de traducciones
type Translations = {
  [key: string]: {
    signUp: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    signUpButton: string;
    loginWithGithub: string;
    loginWithGoogle: string;
    or: string;
  };
};

const translations: Translations = {
  en: {
    signUp: "Sign up for LaunchPad",
    emailPlaceholder: "Email Address",
    passwordPlaceholder: "Password",
    signUpButton: "Sign up",
    loginWithGithub: "Login with GitHub",
    loginWithGoogle: "Login with Google",
    or: "OR",
  },
  es: {
    signUp: "Regístrate en LaunchPad",
    emailPlaceholder: "Dirección de correo electrónico",
    passwordPlaceholder: "Contraseña",
    signUpButton: "Regístrate",
    loginWithGithub: "Iniciar sesión con GitHub",
    loginWithGoogle: "Iniciar sesión con Google",
    or: "O",
  },
};

export const Register = ({ locale }: { locale?: string }) => {
  const t = (locale) ? translations[locale] : translations["en"];

=======
export const Register = () => {
>>>>>>> upstream/main
  return (
    <Container className="h-screen max-w-lg mx-auto flex flex-col items-center justify-center">
      <Logo />
      <h1 className="text-xl md:text-4xl font-bold my-4">
<<<<<<< HEAD
        {t.signUp}
=======
        Sign up for LaunchPad
>>>>>>> upstream/main
      </h1>

      <form className="w-full my-4">
        <input
          type="email"
<<<<<<< HEAD
          placeholder={t.emailPlaceholder}
=======
          placeholder="Email Address"
>>>>>>> upstream/main
          className="h-10 pl-4 w-full mb-4 rounded-md text-sm bg-charcoal border border-neutral-800 text-white placeholder-neutral-500 outline-none focus:outline-none active:outline-none focus:ring-2 focus:ring-neutral-800"
        />
        <input
          type="password"
<<<<<<< HEAD
          placeholder={t.passwordPlaceholder}
          className="h-10 pl-4 w-full mb-4 rounded-md text-sm bg-charcoal border border-neutral-800 text-white placeholder-neutral-500 outline-none focus:outline-none active:outline-none focus:ring-2 focus:ring-neutral-800"
        />
        <Button variant="muted" type="submit" className="w-full py-3">
          <span className="text-sm">{t.signUpButton}</span>
        </Button>
      </form>

      <Divider locale={locale} />
=======
          placeholder="Password"
          className="h-10 pl-4 w-full mb-4 rounded-md text-sm bg-charcoal border border-neutral-800 text-white placeholder-neutral-500 outline-none focus:outline-none active:outline-none focus:ring-2 focus:ring-neutral-800"
        />
        <Button variant="muted" type="submit" className="w-full py-3">
          <span className="text-sm">Sign up</span>
        </Button>
      </form>

      <Divider />
>>>>>>> upstream/main

      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <button className="flex flex-1 justify-center space-x-2 items-center bg-white px-4 py-3 rounded-md text-black hover:bg-white/80 transition duration-200 shadow-[0px_1px_0px_0px_#00000040_inset]">
          <IconBrandGithubFilled className="h-4 w-4 text-black" />
<<<<<<< HEAD
          <span className="text-sm">{t.loginWithGithub}</span>
        </button>
        <button className="flex flex-1 justify-center space-x-2 items-center bg-white px-4 py-3 rounded-md text-black hover:bg-white/80 transition duration-200 shadow-[0px_1px_0px_0px_#00000040_inset]">
          <IconBrandGoogleFilled className="h-4 w-4 text-black" />
          <span className="text-sm">{t.loginWithGoogle}</span>
=======
          <span className="text-sm">Login with GitHub</span>
        </button>
        <button className="flex flex-1 justify-center space-x-2 items-center bg-white px-4 py-3 rounded-md text-black hover:bg-white/80 transition duration-200 shadow-[0px_1px_0px_0px_#00000040_inset]">
          <IconBrandGoogleFilled className="h-4 w-4 text-black" />
          <span className="text-sm">Login with Google</span>
>>>>>>> upstream/main
        </button>
      </div>
    </Container>
  );
};

<<<<<<< HEAD
const Divider = ({ locale }: { locale: string }) => {
  const t = translations[locale] || translations.en;

=======
const Divider = () => {
>>>>>>> upstream/main
  return (
    <div className="relative w-full py-8">
      <div className="w-full h-px bg-neutral-700 rounded-tr-xl rounded-tl-xl" />
      <div className="w-full h-px bg-neutral-800 rounded-br-xl rounded-bl-xl" />
      <div className="absolute inset-0 h-5 w-5 m-auto rounded-md px-3 py-0.5 text-xs bg-neutral-800 shadow-[0px_-1px_0px_0px_var(--neutral-700)] flex items-center justify-center">
<<<<<<< HEAD
        {t.or}
=======
        OR
>>>>>>> upstream/main
      </div>
    </div>
  );
};
