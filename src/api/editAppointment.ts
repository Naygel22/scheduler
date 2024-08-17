import { AppointmentModel } from "@devexpress/dx-react-scheduler"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "./constants"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { showNotification } from "../components/showNotification"

type EditAppointmentPayload = { id: string, data: Partial<AppointmentModel> }

const editAppointment = async ({ id, data }: EditAppointmentPayload) => {
  const appointmentRef = doc(db, 'appointments', id);

  try {
    await updateDoc(appointmentRef, data);
    console.log(`Wydarzenie o ID ${id} zostało pomyślnie edytowane`);
    return true;
  } catch (error) {
    throw error;
  }
}

export const useEditAppointmentMutation = () => {

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: EditAppointmentPayload) => {
      return await editAppointment({ id, data })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.appointments] })
      showNotification({ message: 'Wydarzenie zostało pomyślnie zaktualizowane!', type: 'success' });
    },
    onError: (error) => {
      console.error("Coś poszło nie tak", error)
      showNotification({ message: 'Wystąpił błąd podczas aktualizacji wydarzenia', type: 'error' });
    }
  })
}
