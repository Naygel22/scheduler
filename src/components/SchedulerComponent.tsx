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
} from '@devexpress/dx-react-scheduler-material-ui';


import { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { ViewSelect } from './ViewSelect';
import { useGetAllAppointmentsQuery } from '../api/getAllAppointments';
import { useAddAppointmentMutation } from '../api/addAppointment';
import { useDeleteAppointmentMutation } from '../api/deleteAppointment';
import { useEditAppointmentMutation } from '../api/editAppointment';


export const SchedulerComponent = () => {
  const { data: appointmentsData, isLoading, error } = useGetAllAppointmentsQuery();
  console.log('appointmentsData', appointmentsData)

  const [view, setView] = useState<'day' | 'week' | 'month'>('day')
  const [currentDate, setCurrentDate] = useState<Date | string>(new Date());

  const { mutate: addAppointment } = useAddAppointmentMutation()
  const { mutate: deleteAppointment } = useDeleteAppointmentMutation()
  const { mutate: changeAppointment } = useEditAppointmentMutation()

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const handleViewChange = (event: SelectChangeEvent) => {
    setView(event.target.value as 'day' | 'week' | 'month');
  };

  const handleDateChange = (date: Date | string) => {
    setCurrentDate(date);
  };

  // Funkcja obsługująca zmiany w danych spotkań (dodawanie, edytowanie, usuwanie)
  const commitChanges = ({ added, changed, deleted }: any) => {
    if (!appointmentsData) {
      return;
    }
    if (added) {
      addAppointment(added)
    }
    if (changed) {
      const id = Object.keys(changed)[0]
      changeAppointment({ id, data: changed[id] })
    }
    if (deleted !== undefined) {
      deleteAppointment(deleted)
    }
  };

  return (
    <Paper>
      <Scheduler data={appointmentsData} locale="pl-PL">
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={handleDateChange}
        />
        <EditingState onCommitChanges={commitChanges} />

        <ViewSelect view={view} onChange={handleViewChange} />

        {view === 'day' && <DayView startDayHour={9} endDayHour={19} />}
        {view === 'week' && <WeekView startDayHour={9} endDayHour={19} />}
        {view === 'month' && <MonthView />}

        <Toolbar />
        <DateNavigator />
        <TodayButton messages={{ today: "Dzisiaj" }} />

        <Appointments />
        <IntegratedEditing />
        <AppointmentTooltip
          showCloseButton
          showOpenButton
        />

        <AppointmentForm
        />
      </Scheduler>
    </Paper>
  );
};


