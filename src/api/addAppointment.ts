import { AppointmentModel } from "@devexpress/dx-react-scheduler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { QUERY_KEYS } from "./constants";

const addAppointment = async (data: AppointmentModel) => {
  try {
    // Sprawdzenie i konwersja dat na format ISO string, jeśli są zdefiniowane
    const newEvent = {
      ...data,
      startDate: data.startDate ? new Date(data.startDate).toISOString() : undefined,
      endDate: data.endDate ? new Date(data.endDate).toISOString() : undefined,
    };
    await addDoc(collection(db, "appointments"), newEvent);
    console.log(`Wydarzenie zostało pomyślnie dodane`);
  } catch (error) {
    console.error('Błąd podczas dodawania wydarzenia:', error);
    throw error;
  }
};

export const useAddAppointmentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AppointmentModel) => {
      return await addAppointment(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.appointments] });
    },
    onError: (error) => {
      console.error("Coś poszło nie tak", error);
    }
  });
};
