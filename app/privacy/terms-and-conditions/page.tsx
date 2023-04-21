import styles from "../policy.module.css";

const TermsAndConditions = () => {
  return (
    <div>
      <h1 className={styles.title}>Terms and Conditions</h1>

      <ol>
        <li>
          <h2 className={styles.subtitle}>Introduction</h2>
          <ol className={styles.list}>
            <li>
              Welcome to TouchTypeCode, a web app that helps programmers learn
              touch typing. These Terms and Conditions govern your use of our
              web app. By using our web app, you agree to these Terms and
              Conditions. If you do not agree to these Terms and Conditions, do
              not use our web app.
            </li>
            <li>
              We may update these Terms and Conditions from time to time. By
              continuing to use our web app after we update these Terms and
              Conditions, you agree to be bound by the updated Terms and
              Conditions.
            </li>
          </ol>
        </li>
        <li>
          <h2 className={styles.subtitle}>Intellectual Property</h2>
          <ol className={styles.list}>
            <li>
              The content and materials on our web app, including but not
              limited to text, graphics, images, software, and trademarks, are
              owned by or licensed to TouchTypeCode and are protected by United
              States and international copyright and trademark laws.
            </li>
            <li>
              You may not use, copy, reproduce, modify, distribute, transmit,
              broadcast, display, sell, license, or otherwise exploit any
              content or materials on our web app without our prior written
              consent.
            </li>
          </ol>
        </li>
        <li>
          <h2 className={styles.subtitle}>User Accounts</h2>
          <ol className={styles.list}>
            <li>
              To use our web app, you must create a user account using your
              Google, Github, or Microsoft account information. We do not allow
              username/password logins.
            </li>
            <li>
              You are responsible for maintaining the confidentiality of your
              account and password, and for restricting access to your computer
              and devices. You agree to accept responsibility for all activities
              that occur under your account or password.
            </li>
            <li>
              We reserve the right to refuse service, terminate accounts, or
              remove or edit content in our sole discretion.
            </li>
          </ol>
        </li>
        <li>
          <h2 className={styles.subtitle}>Privacy</h2>
          <ol className={styles.list}>
            <li>
              Your use of our web app is subject to our Privacy Policy, which is
              incorporated by reference into these Terms and Conditions. Please
              review our Privacy Policy to understand how we collect, use, and
              share information about you.
            </li>
          </ol>
        </li>
        <li>
          <h2 className={styles.subtitle}>Payment and Refunds</h2>
          <ol className={styles.list}>
            <li>
              We offer a premium subscription to our web app for a fee, which is
              processed through Stripe. By subscribing to our premium service,
              you agree to pay the fee associated with the premium subscription.
            </li>
            <li>We do not offer refunds for our premium subscription.</li>
          </ol>
        </li>
        <li>
          <h2 className={styles.subtitle}>Termination</h2>
          <ol className={styles.list}>
            <li>
              We may terminate your access to our web app at any time, without
              prior notice or liability, for any reason whatsoever, including
              without limitation if you breach these Terms and Conditions.
            </li>
            <li>
              Upon termination, your right to use our web app will immediately
              cease.
            </li>
          </ol>
        </li>
        <li>
          <h2 className={styles.subtitle}>Changes to Terms and Conditions</h2>
          <ol className={styles.list}>
            <li>
              We may revise these Terms and Conditions at any time by updating
              this page. By using our web app after any changes to these Terms
              and Conditions, you agree to be bound by the revised Terms and
              Conditions.
            </li>
          </ol>
        </li>{" "}
        <li>
          <h2 className={styles.subtitle}>Disclaimer of Warranties</h2>
          <ol className={styles.list}>
            <li>
              Our web app is provided &quot;as is&quot; and &quot;as
              available&quot; without any representations or warranties, express
              or implied. We make no representations or warranties in relation
              to our web app or the information and materials provided on our
              web app.
            </li>
            <li>
              We do not warrant that our web app will be constantly available or
              available at all, or that the information on our web app is
              complete, true, accurate, or non-misleading.
            </li>
          </ol>
        </li>
        <li>
          <h2 className={styles.subtitle}>Limitation of Liability</h2>
          <ol className={styles.list}>
            <li>
              In no event will TouchTypeCode or its owners, directors, officers,
              employees, agents, or affiliates be liable for any direct,
              indirect, incidental, special, or consequential damages arising
              out of or in connection with your use of our web app, including
              but not limited to damages for loss of profits, goodwill, use,
              data, or other intangible losses, even if we have been advised of
              the possibility of such damages.
            </li>
          </ol>
        </li>
        <li>
          <h2 className={styles.subtitle}>Indemnification</h2>
          <ol className={styles.list}>
            <li>
              You agree to indemnify and hold TouchTypeCode and its owners,
              directors, officers, employees, agents, and affiliates harmless
              from and against any claims, actions, demands, liabilities, and
              settlements, including but not limited to reasonable legal and
              accounting fees, resulting from or alleged to result from your use
              of our web app or your breach of these Terms and Conditions.
            </li>
          </ol>
        </li>
        <li>
          <h2 className={styles.subtitle}>Governing Law and Jurisdiction</h2>
          <ol className={styles.list}>
            <li>
              These Terms and Conditions will be governed by and construed in
              accordance with the laws of the State of California, without
              regard to its conflicts of law provisions.
            </li>
            <li>
              You agree that any legal action or proceeding arising out of or in
              connection with these Terms and Conditions or your use of our web
              app will be brought exclusively in the state or federal courts
              located in San Francisco County, California.
            </li>
          </ol>
        </li>
        <li>
          <h2 className={styles.subtitle}>Entire Agreement</h2>
          <ol className={styles.list}>
            <li>
              These Terms and Conditions, together with our Privacy Policy,
              constitute the entire agreement between you and TouchTypeCode in
              relation to your use of our web app and supersede all prior
              agreements and understandings.
            </li>
          </ol>
        </li>
        <li>
          <h2 className={styles.subtitle}>Contact Information</h2>
          <ol className={styles.list}>
            <li>
              If you have any questions about these Terms and Conditions, please
              contact us at support@touchtypecode.com.
            </li>
          </ol>
        </li>
      </ol>
    </div>
  );
};

export default TermsAndConditions;
