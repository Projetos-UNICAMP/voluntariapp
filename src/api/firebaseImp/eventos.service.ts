import { db } from '../../config/firebase';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import {
  PayloadNovoEvento,
  RespostaNovoEvento,
  DadosEvento,
  IEventoApi,
} from '../eventos.api';

class EventoService implements IEventoApi {
  private readonly collectionName = 'Eventos';

  async criarNovoEvento(
    payload: PayloadNovoEvento
  ): Promise<RespostaNovoEvento> {
    try {
      const docRef = await addDoc(collection(db, this.collectionName), payload);
      return {
        sucesso: true,
        codigoEvento: docRef.id,
      };
    } catch (error) {
      console.error('Error adding document: ', error);
      throw new Error('Failed to create a new event');
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
