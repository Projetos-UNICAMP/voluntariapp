import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { eventoService } from './eventos.service';
import { db } from '../../config/firebase';
import { addDoc, collection, getDoc, doc } from 'firebase/firestore';

// Mock Firestore methods
vi.mock('firebase/firestore', () => ({
  addDoc: vi.fn(),
  collection: vi.fn(),
  getDoc: vi.fn(),
  doc: vi.fn(),
  getFirestore: vi.fn()
}));

describe('EventoService', () => {
  // Reset all mocks before each test
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('criarNovoEvento', () => {
    it('creates a new event successfully', async () => {
      // Mock the addDoc to resolve with an object that includes an `id`
      const mockAddDoc = addDoc as Mock;
      const mockResponse = { id: 'abc123' };
      mockAddDoc.mockResolvedValue(mockResponse);

      const payload = { nomeDoEvento: "Evento teste",
        description: "evento realizado com fins de teste",
        local: "Unicamp",
        nomeResponsavel: "Breno",
        telefoneResponsavel: "9987-0987"};
      const result = await eventoService.criarNovoEvento(payload);

      expect(addDoc).toHaveBeenCalled();
      expect(result).toEqual({ sucesso: true, codigoEvento: 'abc123' });
    });

    it('handles errors when creating a new event', async () => {
      // Mock the addDoc to reject with an error
      const mockAddDoc = addDoc as Mock;
      mockAddDoc.mockRejectedValue(new Error('Failed to create a new event'));

      const payload = { nomeDoEvento: "Evento teste",
      description: "evento realizado com fins de teste",
      local: "Unicamp",
      nomeResponsavel: "Breno",
      telefoneResponsavel: "9987-0987"};

      await expect(eventoService.criarNovoEvento(payload)).rejects.toThrow('Failed to create a new event');
    });
  });

  describe('buscarEventoPorCodigo', () => {
    it('fetches an event by code successfully', async () => {
      // Mock the getDoc to resolve with an object that mimics a Firestore document snapshot
      const mockGetDoc = getDoc as Mock;
      const mockDocRef = {}; // This would be whatever `doc(db, 'Eventos', 'some-code')` returns
      const mockData = { /* your DadosEvento data */ };
      const mockDocSnap = {
        exists: () => true,
        data: () => mockData,
      };

      mockGetDoc.mockResolvedValue(mockDocSnap);

      const codigo = 'some-code';
      const result = await eventoService.buscarEventoPorCodigo(codigo);

      expect(getDoc).toHaveBeenCalled();
      expect(result).toEqual(mockData);
    });

    it('throws an error when no event is found', async () => {
      // Mock the getDoc to resolve with an object that mimics a Firestore document snapshot
      const mockGetDoc = getDoc as Mock;
      const mockDocRef = {}; // This would be whatever `doc(db, 'Eventos', 'invalid-code')` returns
      const mockDocSnap = {
        exists: () => false,
        data: vi.fn(),
      };

      mockGetDoc.mockResolvedValue(mockDocSnap);

      const codigo = 'invalid-code';

      await expect(eventoService.buscarEventoPorCodigo(codigo)).rejects.toThrow(`No event found with code: ${codigo}`);
    });
  });
});
