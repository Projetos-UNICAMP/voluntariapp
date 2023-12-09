// eventService.ts
import { db } from '../../config/firebase';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import {
  PayloadNovoEvento,
  RespostaNovoEvento,
  DadosEvento,
  IEventoApi,
} from '../eventos.api';
import { handleErrorWithLogging } from '../errorHandler';

class EventoService implements IEventoApi {
  private readonly collectionName = 'Eventos';

  // Method to create a new event
  async criarNovoEvento(
    payload: PayloadNovoEvento
  ): Promise<RespostaNovoEvento> {
    try {
      // Add a new document with a generated id in the "eventos" collection
      const docRef = await addDoc(collection(db, this.collectionName), payload);
      return {
        sucesso: true,
        codigoEvento: docRef.id,
      };
    } catch (error) {
      // Handle any errors here, such as logging or throwing an application-specific error
      handleErrorWithLogging(error, 'Falha ao criar novo evento');
      throw new Error('Failed to create a new event');
    }
  }

  // Method to fetch an event by its code
  async buscarEventoPorCodigo(codigo: string): Promise<DadosEvento> {
    const docRef = doc(db, this.collectionName, codigo);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Cast the data to DadosEvento type
      return docSnap.data() as DadosEvento;
    } else {
      // Handle the case where the document does not exist
      throw new Error(`No event found with code: ${codigo}`);
    }
  }
}

// Export an instance of the service
export const eventoService = new EventoService();
