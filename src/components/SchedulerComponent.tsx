import Paper from '@mui/material/Paper';
import { EditingState, IntegratedEditing, ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  DayView,
  MonthView,
  AppointmentTooltip,
  AppointmentForm,
  ViewSwitcher,
} from '@devexpress/dx-react-scheduler-material-ui';
import { useState } from 'react';
import { useGetAllAppointmentsQuery } from '../api/getAllAppointments';
import { useAddAppointmentMutation } from '../api/addAppointment';
import { useDeleteAppointmentMutation } from '../api/deleteAppointment';
import { useEditAppointmentMutation } from '../api/editAppointment';

export const SchedulerComponent = () => {
  const { data: appointmentsData, isLoading, error } = useGetAllAppointmentsQuery();
  console.log('appointmentsData', appointmentsData)

  const [currentDate, setCurrentDate] = useState<Date | string>(new Date());

  const { mutate: addAppointment } = useAddAppointmentMutation();
  const { mutate: deleteAppointment } = useDeleteAppointmentMutation();
  const { mutate: changeAppointment } = useEditAppointmentMutation();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  // Funkcja obsługująca zmiany w danych spotkań (dodawanie, edytowanie, usuwanie)
  const commitChanges = ({ added, changed, deleted }: any) => {
    if (!appointmentsData) {
      return;
    }
    if (added) {
      addAppointment(added);
    }
    if (changed) {
      const id = Object.keys(changed)[0];
      changeAppointment({ id, data: changed[id] });
    }
    if (deleted !== undefined) {
      deleteAppointment(deleted);
    }
  };

  return (
    <Paper>
      <Scheduler data={appointmentsData} locale="pl-PL">
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={setCurrentDate}
        />
        <EditingState onCommitChanges={commitChanges} />

        <Toolbar />
        <DateNavigator />
        <TodayButton messages={{ today: "Dzisiaj" }} />
        <ViewSwitcher />

        {/* Wyświetlanie widoków */}
        <DayView startDayHour={9} endDayHour={19} name='Dzień' />
        <WeekView startDayHour={9} endDayHour={19} name='Tydzień' />
        <MonthView name='Miesiąc' />

        <Appointments />
        <IntegratedEditing />
        <AppointmentTooltip
          showCloseButton
          showOpenButton
        />
        <AppointmentForm />
      </Scheduler>
    </Paper>
  );
};
