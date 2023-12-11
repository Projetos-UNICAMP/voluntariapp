import { doc, getDoc, addDoc, collection, updateDoc  } from 'firebase/firestore';
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

class EventoService implements IEventoApi {
  private readonly collectionName = eventosRoute;
  
  async adicionarVoluntarioTurno(voluntario: InformacoesUsuario, evento: DadosEvento, diaEvento: DiaDeEvento, turno: Turno): Promise<DadosEvento> {
    const eventoRef = doc(db, 'test-event', evento.codigoEvento);
  
    try {
      // Fetch the event document
      const eventoSnap = await getDoc(eventoRef);
      if (eventoSnap.exists()) {
        const eventoData = eventoSnap.data() as DadosEvento;
  
        // Find the diaDeEvento and turno
        const diaIndex = eventoData.dias.findIndex(dia => dia.data === diaEvento.data);
        const turnoIndex = eventoData.dias[diaIndex]?.turnos.findIndex(t => t.title === turno.title);
  
        if (diaIndex !== -1 && turnoIndex !== -1) {
          // Check if the voluntario is already in the array
          if (!eventoData.dias[diaIndex].turnos[turnoIndex].voluntarios.some(v => v.email === voluntario.email)) {
            eventoData.dias[diaIndex].turnos[turnoIndex].voluntarios.push(voluntario);
            
            // Update the document
            await updateDoc(eventoRef, { dias: eventoData.dias });
          }
        } else {
          throw new Error('Invalid diaDeEvento or turno');
        }
  
        // Return the updated (or unchanged) event data
        return eventoData;
      } else {
        throw new Error('Evento not found');
      }
    } catch (error) {
      console.error('Error updating document: ', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  async criarNovoEvento(payload: PayloadNovoEvento): Promise<RespostaNovoEvento> {
    try {
      // Generate days between dataInicio and dataFim
      const diasDeEvento: DiaDeEvento[] = [];
      const currentDate = new Date(payload.dataInicio);
  
      while (currentDate <= payload.dataFim) {
        // Create turnos for the day
        const turnos: Turno[] = [];
  
        for (let i = 1; i <= payload.numTurnosPorDia; i++) {
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
        ...payload,
        dias: diasDeEvento,
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

  async adicionarVoluntarioEvento(voluntario: InformacoesUsuario, evento: DadosEvento): Promise<DadosEvento> {
    const eventoRef = doc(db, 'test-event', evento.codigoEvento);
  
    try {
      // Fetch the event document
      const eventoSnap = await getDoc(eventoRef);
      if (eventoSnap.exists()) {
        const eventoData = eventoSnap.data() as DadosEvento;
  
        // Check if the voluntario is already in the array
        if (!eventoData.voluntarios.some(v => v.email === voluntario.email)) {
          eventoData.voluntarios.push(voluntario);
          
          // Update the document
          await updateDoc(eventoRef, { voluntarios: eventoData.voluntarios });
        }
  
        // Return the updated (or unchanged) event data
        return eventoData;
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
      return docSnap.data() as DadosEvento;
    } else {
      throw new Error(`No event found with code: ${codigo}`);
    }
  }
}

export const eventoService = new EventoService();
