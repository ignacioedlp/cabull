import 'dotenv/config'
import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Crear un owner (propietario del negocio)
  await prisma.adminUser.upsert({
    where: { email: 'owner@cabull.com' },
    update: {},
    create: {
      email: 'owner@cabull.com',
      role: 'OWNER',
      active: true,
      color: '#FF6B6B', // Color para el calendario
    },
  })

  // Crear un barbero
  await prisma.adminUser.upsert({
    where: { email: 'barber@cabull.com' },
    update: {},
    create: {
      email: 'barber@cabull.com',
      role: 'BARBER',
      active: true,
      color: '#4ECDC4', // Color para el calendario
    },
  })

  // Crear horarios de negocio para todos los días de la semana
  // weekday: 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
  const weekdays = [
    { weekday: 0, name: 'Domingo', startTime: '09:00', endTime: '18:00', isClosed: false },
    { weekday: 1, name: 'Lunes', startTime: '09:00', endTime: '18:00', isClosed: false },
    { weekday: 2, name: 'Martes', startTime: '09:00', endTime: '18:00', isClosed: false },
    { weekday: 3, name: 'Miércoles', startTime: '09:00', endTime: '18:00', isClosed: false },
    { weekday: 4, name: 'Jueves', startTime: '09:00', endTime: '18:00', isClosed: false },
    { weekday: 5, name: 'Viernes', startTime: '09:00', endTime: '18:00', isClosed: false },
    { weekday: 6, name: 'Sábado', startTime: '09:00', endTime: '18:00', isClosed: false },
  ]

  const businessHours = []
  for (const day of weekdays) {
    const hours = await prisma.businessHours.upsert({
      where: { weekday: day.weekday },
      update: {
        startTime: day.startTime,
        endTime: day.endTime,
        isClosed: day.isClosed,
      },
      create: {
        weekday: day.weekday,
        startTime: day.startTime,
        endTime: day.endTime,
        isClosed: day.isClosed,
      },
    })
    businessHours.push(hours)
  }

  // Crear dos servicios
  await prisma.service.upsert({
    where: { id: 'service-corte-basico' },
    update: {},
    create: {
      id: 'service-corte-basico',
      name: 'Corte Básico',
      description: 'Corte de cabello estándar',
      durationMinutes: 30,
      basePrice: 5000, // Precio en ARS
      active: true,
    },
  })

  await prisma.service.upsert({
    where: { id: 'service-corte-barba' },
    update: {},
    create: {
      id: 'service-corte-barba',
      name: 'Corte + Barba',
      description: 'Corte de cabello y arreglo de barba',
      durationMinutes: 45,
      basePrice: 7000, // Precio en ARS
      active: true,
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

