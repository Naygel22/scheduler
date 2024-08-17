import { AppointmentModel } from "@devexpress/dx-react-scheduler"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "./constants"
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const deleteAppointment = async (id: AppointmentModel["id"]) => {
  if (typeof id !== 'string') {
    throw new Error('ID musi być stringiem');
  }

  try {
    await deleteDoc(doc(db, 'appointments', id));
    console.log(`Wydarzenie o ID ${id} zostało pomyślnie usunięte`);
  } catch (error) {
    console.error('Błąd podczas usuwania wydarzenia', error);
    throw error
  }
}


export const useDeleteAppointmentMutation = () => {

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: AppointmentModel["id"]) => {
      return await deleteAppointment(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.appointments] })
    },
    onError: (error) => {
      console.error("Coś poszło nie tak", error)
    }
  })
}
