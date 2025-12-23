import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type MagicLinkEmailProps = {
  adminName?: string;
  magicLinkUrl: string;
};

export default function MagicLinkEmail({
  adminName,
  magicLinkUrl,
}: MagicLinkEmailProps) {
  const previewText = "Tu enlace de acceso a Cabull Admin";

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Header */}
          <Section style={styles.center}>
            <Img src="https://pub-fb035c0d0a0345c58fbf770201301f34.r2.dev/logo.png" alt="Cabull" width={480} height={160} />
            <Heading style={styles.h1}>Cabull Admin</Heading>
          </Section>

          {/* Main content card */}
          <Section style={styles.card}>
            <Text style={styles.p}>
              Hola{adminName ? `, ${adminName}` : ""} 👋
            </Text>
            <Text style={styles.p}>
              Hacé click en el botón de abajo para acceder al panel de
              administración:
            </Text>

            {/* Button */}
            <Section style={styles.center}>
              <Button href={magicLinkUrl} style={styles.button}>
                🔓 Acceder al Admin
              </Button>
            </Section>

            {/* Alternative link */}
            <Text style={styles.small}>
              O copiá y pegá este enlace en tu navegador:
              <br />
              <Link href={magicLinkUrl} style={styles.link}>
                {magicLinkUrl}
              </Link>
            </Text>
          </Section>

          {/* Footer warning */}
          <Section style={styles.footerSection}>
            <Text style={styles.footerText}>
              ⚠️ Este enlace expira en 15 minutos y solo puede usarse una vez.
              <br />
              Si no solicitaste este acceso, podés ignorar este email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles: Record<string, React.CSSProperties> = {
  body: {
    fontFamily: "Arial, sans-serif",
    lineHeight: 1.6,
    color: "#333",
    margin: 0,
    padding: "20px",
    backgroundColor: "#ffffff",
  },
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: 0,
  },
  center: {
    textAlign: "center",
  },
  h1: {
    color: "#111",
    margin: "0 0 30px 0",
    fontSize: "24px",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  p: {
    margin: "0 0 15px 0",
    fontSize: "14px",
    lineHeight: "1.6",
  },
  button: {
    display: "inline-block",
    backgroundColor: "#111",
    color: "#fff",
    padding: "12px 30px",
    textDecoration: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    fontSize: "14px",
    margin: "25px 0",
  },
  small: {
    margin: "15px 0 0 0",
    fontSize: "12px",
    color: "#666",
    lineHeight: "1.6",
  },
  link: {
    color: "#111",
    wordBreak: "break-all",
    textDecoration: "underline",
  },
  footerSection: {
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #eee",
  },
  footerText: {
    fontSize: "12px",
    color: "#999",
    margin: 0,
    lineHeight: "1.6",
  },
};

