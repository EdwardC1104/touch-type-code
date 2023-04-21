import styles from "../policy.module.css";

const PrivacyPolicy = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Privacy Policy</h1>
      <p>
        Thank you for using TouchTypeCode, a web app that helps programmers
        learn touch typing. This Privacy Policy describes how we collect, use,
        and share information about you when you use our web app.
      </p>

      <h2 className={styles.subtitle}>Information We Collect</h2>
      <p>
        When you use TouchTypeCode, we may collect the following types of
        information:
      </p>
      <ol className={styles.list}>
        <li>
          Your name and email address if you sign up for our premium
          subscription using Stripe for payments
        </li>
        <li>
          Your Google, Github, or Microsoft account information if you sign up
          for our web app using one of those SSO providers
        </li>
        <li>
          Data about your touch typing performance, including how good you are
          at touch typing each letter of the keyboard and what results you
          achieved for each lesson. This data is stored using Firebase
          Firestore.
        </li>
        <li>
          Information about your device, browser, and how you use our web app.
          This information is collected using Google Analytics.
        </li>
      </ol>

      <h2 className={styles.subtitle}>How We Use Your Information</h2>
      <p>We may use your information for the following purposes:</p>
      <ol className={styles.list}>
        <li>To provide and improve our web app</li>
        <li>
          To communicate with you, including sending you emails about our web
          app
        </li>
        <li>To analyze how our web app is used and to optimize our web app</li>
        <li>To show you personalized ads through Google Ads</li>
        <li>To process payments for our premium subscription using Stripe</li>
      </ol>

      <h2 className={styles.subtitle}>How We Share Your Information</h2>
      <p>
        We may share your information with the following types of third parties:
      </p>
      <ol className={styles.list}>
        <li>
          Service providers, such as Google and Stripe, who help us provide and
          improve our web app
        </li>
        <li>Advertisers, such as Google Ads, who show you personalized ads</li>
        <li>
          Law enforcement or government agencies, if we believe disclosure is
          necessary or appropriate to comply with the law, to protect the
          rights, property, or safety of TouchTypeCode or others, or to prevent
          fraud or illegal activity
        </li>
      </ol>

      <h2 className={styles.subtitle}>Security</h2>
      <p>
        We take reasonable measures to protect your information from
        unauthorized access or disclosure. However, no security measures are
        perfect or impenetrable, and we cannot guarantee the security of your
        information.
      </p>

      <h2 className={styles.subtitle}>Children&apos;s Privacy</h2>
      <p>
        TouchTypeCode is not intended for use by children under the age of 13,
        and we do not knowingly collect information from children under the age
        of 13.
      </p>

      <h2 className={styles.subtitle}>Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. If we make material
        changes to this Privacy Policy, we will notify you by email or by
        posting a notice on our web app prior to the effective date of the
        changes. By continuing to use our web app after the effective date of
        any changes, you agree to be bound by the updated Privacy Policy.
      </p>

      <h2 className={styles.subtitle}>Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy or our web app,
        please contact us at support@touchtypecode.com.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
