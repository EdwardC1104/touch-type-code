"use client";

import { hasCookie, setCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const CookiePopup = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (hasCookie("cookie-consent")) setVisible(false);
    else setVisible(true);
  }, []);

  if (!visible) return null;

  const giveConsent = () => {
    setCookie("cookie-consent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
      <div className="flex bg-neutral-900 drop-shadow-lg p-6 rounded-lg items-center">
        <div className="mr-4 lg:block hidden none">
          <Image
            src="/cookie.png"
            width={64}
            height={66}
            alt="Cartoon style cookie"
          />
        </div>
        <div>
          <h2 className="font-bold text-2xl mb-2">Cookies!</h2>
          <p className="text-neutral-400 text-sm font-medium mb-3">
            We use cookies on this website to enhance your user experience and
            improve the quality of our services.
          </p>
          <div className="flex justify-end gap-3">
            <Link
              href="/privacy/policy"
              className="font-medium text-white block bg-neutral-700 hover:bg-neutral-800 focus:bg-neutral-800 py-0.5 rounded-lg text-center self-center text-sm w-32"
            >
              Privacy Policy
            </Link>
            <button
              onClick={giveConsent}
              className="font-medium text-white block bg-green-600 hover:bg-green-700 focus:bg-green-700 py-0.5 rounded-lg text-center self-center text-sm w-32"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePopup;
