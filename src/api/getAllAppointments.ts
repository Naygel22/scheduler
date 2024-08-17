import { AppointmentModel } from "@devexpress/dx-react-scheduler";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./constants";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const getAllAppointments = async () => {
  const appointmentsCollection = collection(db, "appointments");
  const snapshot = await getDocs(appointmentsCollection);

  const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as AppointmentModel[];
  return data;
}

export const useGetAllAppointmentsQuery = () => useQuery({
  queryKey: [QUERY_KEYS.appointments],
  queryFn: getAllAppointments
})