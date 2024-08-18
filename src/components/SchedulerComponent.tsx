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
import CircularProgress from '@mui/material/CircularProgress';

export const SchedulerComponent = () => {
  const { data: appointmentsData, isLoading, error } = useGetAllAppointmentsQuery();

  const [currentDate, setCurrentDate] = useState<Date | string>(new Date());

  const { mutate: addAppointment } = useAddAppointmentMutation();
  const { mutate: deleteAppointment } = useDeleteAppointmentMutation();
  const { mutate: changeAppointment } = useEditAppointmentMutation();

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Error loading data</div>;

  const appointmentFormMessages = {
    detailsLabel: 'Szczegóły',
    allDayLabel: 'Cały dzień',
    titleLabel: 'Tytuł',
    commitCommand: 'Zapisz',
    moreInformationLabel: 'Więcej informacji',
    repeatLabel: 'Powtarzaj',
    notesLabel: 'Notatki',
    never: 'Nigdy',
    daily: 'Codziennie',
    weekly: 'Co tydzień',
    monthly: 'Co miesiąc',
    yearly: 'Co rok',
    repeatEveryLabel: 'Powtarzaj co',
    daysLabel: 'dzień/dni',
    endRepeatLabel: 'Koniec powtarzania',
    onLabel: 'W',
    afterLabel: 'Po',
    occurrencesLabel: 'wystąpienie/wystąpienia',
    weeksOnLabel: 'tydzień/tygodnie w:',
    monthsLabel: 'miesiąc/miesiące',
    ofEveryMonthLabel: 'w każdym miesiącu',
    theLabel: 'W',
    firstLabel: 'Pierwszy',
    secondLabel: 'Drugi',
    thirdLabel: 'Trzeci',
    fourthLabel: 'Czwarty',
    lastLabel: 'Ostatni',
    yearsLabel: 'rok/lat',
    ofLabel: 'z',
    everyLabel: 'Każdy',
  };

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
    <Paper sx={{ border: '1px solid #e0e0e0' }}>
      <Scheduler data={appointmentsData} locale="pl-PL" height={700}>
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={setCurrentDate}
        />
        <EditingState onCommitChanges={commitChanges} />

        <Toolbar />
        <DateNavigator />
        <TodayButton
          messages={{ today: "Dzisiaj" }} />
        <ViewSwitcher />

        <DayView startDayHour={9} endDayHour={19} name='Dzień' />
        <WeekView startDayHour={9} endDayHour={19} name='Tydzień' />
        <MonthView name='Miesiąc' />

        <Appointments />
        <IntegratedEditing />
        <AppointmentTooltip
          showCloseButton
          showOpenButton
        />
        <AppointmentForm messages={appointmentFormMessages} />
      </Scheduler>
    </Paper>
  );
};
