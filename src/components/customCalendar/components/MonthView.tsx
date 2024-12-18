import React from "react";
import { Grid, Box, Paper, Text } from "@mantine/core";
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  format,
  isSameDay,
  formatDate,
} from "date-fns";
import {
  startOfWeek as startOfCalendarWeek,
  endOfWeek as endOfCalendarWeek,
} from "date-fns";
import { es } from "date-fns/locale";
import { Appointment } from "../../../services/appointmentService";

interface MonthViewProps {
  currentDate: Date;
  isMobile: boolean;
  handleDayClick: (day: Date) => void;
  getAppointmentsForDay: (day: Date) => Appointment[];
}

const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  isMobile,
  handleDayClick,
  getAppointmentsForDay,
}) => {
  const daysOfWeek = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const startMonth = startOfMonth(currentDate);
  const endMonth = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({
    start: startOfCalendarWeek(startMonth),
    end: endOfCalendarWeek(endMonth),
  });

  return (
    <Box>
      <Paper withBorder>
        <Text
          ta="center"
          style={{
            fontSize: isMobile ? 16 : 24,
            marginBottom: "2px",
            textTransform: "uppercase",
          }}
        >
          {formatDate(currentDate, "MMMM", { locale: es })}
        </Text>
      </Paper>
      <Paper withBorder my="xs">
        <Grid>
          {daysOfWeek.map((day, index) => (
            <Grid.Col span={1.7} key={index}>
              <Text
                ta="center"
                fw={500}
                style={{ fontSize: isMobile ? 11 : 16 }}
              >
                {day}
              </Text>
            </Grid.Col>
          ))}
        </Grid>
      </Paper>
      <Grid gutter="xs">
        {daysInMonth.map((day) => (
          <Grid.Col span={1.7} key={day.toISOString()}>
            <Paper
              shadow="sm"
              radius="md"
              p="xs"
              withBorder
              onClick={() => handleDayClick(day)}
              style={{
                cursor: "pointer",
                position: "relative",
                height: "100%",
                backgroundColor: isSameDay(day, currentDate)
                  ? "#f0f8ff"
                  : "white",
                borderColor: isSameDay(day, currentDate)
                  ? "#007bff"
                  : undefined,
                borderWidth: isSameDay(day, currentDate) ? 2 : 1,
              }}
            >
              <Text size={isMobile ? "xs" : "sm"} c="dimmed" mb="xs" ta="center" fw={800}>
                {format(day, "d", { locale: es })}
              </Text>
              {getAppointmentsForDay(day).length > 0 && (
                <Text
                  ta="center"
                  c="dimmed"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    fontSize: isMobile ? 10 : 12,
                  }}
                >
                  {getAppointmentsForDay(day).length} citas
                </Text>
              )}
            </Paper>
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
};

export default MonthView;
