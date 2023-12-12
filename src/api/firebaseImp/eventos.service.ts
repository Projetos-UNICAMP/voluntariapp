import { doc, getDoc, addDoc, collection, updateDoc } from 'firebase/firestore';
import {
  PayloadNovoEvento,
  RespostaNovoEvento,
  DadosEvento,
  IEventoApi,
  DiaDeEvento,
  Turno,
} from '../eventos.api';
import { eventosRoute } from './configuration';
import { handleErrorWithLogging } from '../errorHandler';
import { db } from '../../config/firebase';
import { InformacoesUsuario } from '../usuarios.api';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertDiasFromFB(dia: any) {
  const diaConvertido: DiaDeEvento = {
    ...dia,
    data: dia.data.toDate(),
  };

  return diaConvertido;
}

class EventoService implements IEventoApi {
  private readonly collectionName = eventosRoute;

  async adicionarVoluntarioTurno(
    voluntario: InformacoesUsuario,
    evento: DadosEvento,
    diaEvento: DiaDeEvento,
    turno: Turno
  ): Promise<DadosEvento> {
    const eventoRef = doc(db, this.collectionName, evento.codigoEvento);

    try {
      // Fetch the event document
      const eventoSnap = await getDoc(eventoRef);

      if (eventoSnap.exists()) {
        const eventoData = eventoSnap.data() as DadosEvento;

        const dadosEvento = {
          ...eventoData,
          codigoEvento: eventoSnap.id,
          dias: eventoData?.dias?.map(convertDiasFromFB),
        } as DadosEvento;

        // Find the diaDeEvento and turno
        const diaIndex = dadosEvento.dias.findIndex(
          (dia) => dia.data.getTime() === diaEvento.data.getTime()
        );

        const turnoIndex = dadosEvento.dias[diaIndex]?.turnos.findIndex(
          (t) => t.title === turno.title
        );

        if (diaIndex !== -1 && turnoIndex !== -1) {
          // Check if the voluntario is already in the array
          if (
            !dadosEvento.dias[diaIndex].turnos[turnoIndex].voluntarios.some(
              (v) => v.email === voluntario.email
            )
          ) {
            dadosEvento.dias[diaIndex].turnos[turnoIndex].voluntarios.push(
              voluntario
            );

            // Update the document
            await updateDoc(eventoRef, { dias: dadosEvento.dias });
          }
        } else {
          throw new Error('Invalid diaDeEvento or turno');
        }

        // Return the updated (or unchanged) event data
        return dadosEvento;
      } else {
        throw new Error('Evento not found');
      }
    } catch (error) {
      console.error('Error updating document: ', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  async criarNovoEvento(
    payload: PayloadNovoEvento
  ): Promise<RespostaNovoEvento> {
    try {
      // Generate days between dataInicio and dataFim
      const { dataInicio, dataFim, numTurnosPorDia, ...rest } = payload;

      const diasDeEvento: DiaDeEvento[] = [];
      const currentDate = new Date(dataInicio);

      while (currentDate <= dataFim) {
        // Create turnos for the day
        const turnos: Turno[] = [];

        for (let i = 1; i <= numTurnosPorDia; i++) {
          turnos.push({
            voluntarios: [],
            title: `Turno ${i}`,
          });
        }

        // Create DiaDeEvento
        diasDeEvento.push({
          turnos: turnos,
          data: new Date(currentDate),
        });

        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // Add to Firestore
      const docRef = await addDoc(collection(db, this.collectionName), {
        ...rest,
        dias: diasDeEvento,
        voluntarios: [],
      });

      return {
        sucesso: true,
        codigoEvento: docRef.id,
      };
    } catch (error) {
      handleErrorWithLogging(error, 'Falha ao criar novo evento');
      throw new Error('Failed to create a new event');
    }
  }

  async adicionarVoluntarioEvento(
    voluntario: InformacoesUsuario,
    evento: DadosEvento
  ): Promise<DadosEvento> {
    const eventoRef = doc(db, this.collectionName, evento.codigoEvento);

    try {
      // Fetch the event document
      const eventoSnap = await getDoc(eventoRef);
      if (eventoSnap.exists()) {
        const eventoData = eventoSnap.data() as DadosEvento;
        const dadosEvento = {
          ...eventoData,
          codigoEvento: eventoSnap.id,
          dias: eventoData?.dias?.map(convertDiasFromFB),
        } as DadosEvento;

        // Check if the voluntario is already in the array
        if (
          !dadosEvento.voluntarios.some((v) => v.email === voluntario.email)
        ) {
          dadosEvento.voluntarios.push(voluntario);

          // Update the document
          await updateDoc(eventoRef, { voluntarios: dadosEvento.voluntarios });
        }

        // Return the updated (or unchanged) event data
        return dadosEvento;
      } else {
        throw new Error('Evento not found');
      }
    } catch (error) {
      console.error('Error updating document: ', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  async buscarEventoPorCodigo(codigo: string): Promise<DadosEvento> {
    const docRef = doc(db, this.collectionName, codigo);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const fbData = docSnap.data();

      const dadosEvento = {
        ...fbData,
        codigoEvento: docSnap.id,
        dias: fbData?.dias?.map(convertDiasFromFB),
      } as DadosEvento;

      return dadosEvento;
    } else {
      throw new Error(`No event found with code: ${codigo}`);
    }
  }
}

export const eventoService = new EventoService();
