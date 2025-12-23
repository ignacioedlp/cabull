import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Img,
} from "@react-email/components";

type ConfirmAppointmentEmailProps = {
  customerName?: string;
  date: string; // "Martes 26 de diciembre"
  time: string; // "18:30"
  service: string; // "Corte + Barba"
  barber?: string; // "Nico"
  confirmUrl: string;
  expiresText?: string; // "Este link vence en 30 minutos."
};

export default function ConfirmAppointmentEmail({
  customerName,
  date,
  time,
  service,
  barber,
  confirmUrl,
  expiresText = "Este link vence en 30 minutos.",
}: ConfirmAppointmentEmailProps) {
  const previewText = `Confirmá tu turno para ${date} a las ${time}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Logo */}
          <Section style={styles.center}>
            <Img src="https://pub-fb035c0d0a0345c58fbf770201301f34.r2.dev/logo.png" alt="Cabull" width={480} height={160} />
            <Heading style={styles.h1}>Confirmá tu turno en Cabull</Heading>
          </Section>

          <Text style={styles.p}>
            Hola{customerName ? `, ${customerName}` : ""} 👋
          </Text>

          <Text style={styles.p}>
            ¡Gracias por reservar tu turno en <strong>Cabull</strong>! Para
            dejarlo confirmado, hacé click en el botón:
          </Text>

          <Section style={styles.center}>
            <Button href={confirmUrl} style={styles.button}>
              ✅ Confirmar turno
            </Button>
          </Section>

          <Section style={styles.card}>
            <Heading as="h2" style={styles.h2}>
              📅 Detalles del turno
            </Heading>

            <Text style={styles.detail}>
              <strong>Fecha:</strong> {date}
            </Text>
            <Text style={styles.detail}>
              <strong>Hora:</strong> {time}
            </Text>
            <Text style={styles.detail}>
              <strong>Servicio:</strong> {service}
            </Text>
            {barber ? (
              <Text style={styles.detail}>
                <strong>Barbero:</strong> {barber}
              </Text>
            ) : null}
          </Section>

          <Text style={{ ...styles.p, ...styles.muted }}>
            ⏱️ <strong>Importante:</strong> {expiresText} Si no confirmás el
            turno, se liberará automáticamente.
          </Text>

          <Text style={{ ...styles.p, ...styles.muted }}>
            Si no fuiste vos quien solicitó este turno, simplemente ignorá este
            email.
          </Text>

          <Hr style={styles.hr} />

          <Text style={styles.footer}>
            Gracias por elegir <strong>Cabull</strong> ✂️ <br />
            Nos vemos pronto 🙌
          </Text>

          <Text style={styles.small}>
            ¿No funciona el botón? Copiá y pegá este link:
            <br />
            <Link href={confirmUrl} style={styles.link}>
              {confirmUrl}
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const styles: Record<string, React.CSSProperties> = {
  body: {
    margin: 0,
    padding: "24px 12px",
    backgroundColor: "#f6f7fb",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
    color: "#111827",
  },
  container: {
    maxWidth: 560,
    margin: "0 auto",
    backgroundColor: "#ffffff",
    padding: 24,
    border: "1px solid #e5e7eb",
  },
  center: { textAlign: "center" },
  h1: {
    fontSize: 22,
    lineHeight: "28px",
    margin: "0 0 12px 0",
  },
  h2: {
    fontSize: 16,
    lineHeight: "22px",
    margin: "0 0 10px 0",
  },
  p: {
    fontSize: 14,
    lineHeight: "20px",
    margin: "0 0 12px 0",
  },
  button: {
    backgroundColor: "#111827",
    color: "#ffffff",
    fontSize: 14,
    fontWeight: 700,
    textDecoration: "none",
    padding: "12px 18px",
    display: "inline-block",
  },
  card: {
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    padding: 16,
    marginTop: 10,
    marginBottom: 14,
  },
  detail: {
    fontSize: 14,
    lineHeight: "20px",
    margin: "0 0 6px 0",
  },
  muted: { color: "#6b7280" },
  hr: {
    borderColor: "#e5e7eb",
    margin: "18px 0",
  },
  footer: {
    fontSize: 14,
    lineHeight: "20px",
    margin: 0,
  },
  small: {
    fontSize: 12,
    lineHeight: "18px",
    color: "#6b7280",
    margin: "16px 0 0 0",
  },
  link: {
    color: "#111827",
    wordBreak: "break-word",
    textDecoration: "underline",
  },
};
