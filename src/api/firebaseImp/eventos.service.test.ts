import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { eventoService } from './eventos.service';
// import { db } from '../../config/firebase';
import { addDoc, getDoc, updateDoc } from 'firebase/firestore';
import { DadosEvento } from '../eventos.api';
import { Cargo } from '../usuarios.api';

// Mock Firestore methods
vi.mock('firebase/firestore', () => ({
  addDoc: vi.fn(),
  collection: vi.fn(),
  getDoc: vi.fn(),
  doc: vi.fn(),
  getFirestore: vi.fn(),
  updateDoc: vi.fn(),
}));

describe('EventoService', () => {
  // Reset all mocks before each test
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('criarNovoEvento', () => {
    it.skip('creates a new event successfully', async () => {
      // Mock the addDoc to resolve with an object that includes an `id`
      const mockAddDoc = addDoc as Mock;
      let savedEventData: DadosEvento = {
        nomeDoEvento: '',
        description: '',
        local: '',
        nomeResponsavel: '',
        telefoneResponsavel: '',
        dias: [],
        codigoEvento: '',
        voluntarios: [],
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockAddDoc.mockImplementation((data: DadosEvento) => {
        savedEventData = data; // Save the data passed to addDoc for validation
        return Promise.resolve({ id: 'abc123' });
      });

      const payload = {
        nomeDoEvento: 'Evento teste',
        description: 'evento realizado com fins de teste',
        local: 'Unicamp',
        nomeResponsavel: 'Breno',
        telefoneResponsavel: '9987-0987',
        dataInicio: new Date('2023-01-01'),
        dataFim: new Date('2023-01-03'),
        numTurnosPorDia: 2,
      };
      const result = await eventoService.criarNovoEvento(payload);

      expect(addDoc).toHaveBeenCalled();
      expect(result).toEqual({ sucesso: true, codigoEvento: 'abc123' });

      // Validate the structure of the data sent to Firestore
      expect(savedEventData).not.toBeNull();
      expect(savedEventData?.dias).toHaveLength(3); // 3 days from Jan 1 to Jan 3

      savedEventData.dias.forEach((dia) => {
        expect(dia.turnos).toHaveLength(payload.numTurnosPorDia);
        dia.turnos.forEach((turno, turnoIndex) => {
          expect(turno.title).toBe(`Turno ${turnoIndex + 1}`);
          expect(turno.voluntarios).toEqual([]);
        });
      });
    });

    it('handles errors when creating a new event', async () => {
      // Mock the addDoc to reject with an error
      const mockAddDoc = addDoc as Mock;
      mockAddDoc.mockRejectedValue(new Error('Failed to create a new event'));

      const payload = {
        nomeDoEvento: 'Evento teste',
        description: 'evento realizado com fins de teste',
        local: 'Unicamp',
        nomeResponsavel: 'Breno',
        telefoneResponsavel: '9987-0987',
        dataInicio: new Date('2023-01-01'),
        dataFim: new Date('2023-01-03'),
        numTurnosPorDia: 2,
      };

      await expect(eventoService.criarNovoEvento(payload)).rejects.toThrow(
        'Failed to create a new event'
      );
    });
  });

  describe('adicionarVoluntarioEvento', () => {
    it('adds a volunteer to an event successfully', async () => {
      // Mock data
      const mockEvento = {
        nomeDoEvento: 'Mock Event',
        description: 'Mock Description',
        local: 'Mock Location',
        nomeResponsavel: 'Mock Responsavel',
        telefoneResponsavel: '123-456-7890',
        voluntarios: [],
        dias: [],
        codigoEvento: 'abc123',
      };

      // Set up mocks
      const mockGetDoc = getDoc as unknown as Mock;
      const mockUpdateDoc = updateDoc as unknown as Mock;

      mockGetDoc.mockImplementation(() =>
        Promise.resolve({ exists: () => true, data: () => mockEvento })
      );
      mockUpdateDoc.mockImplementation(() => Promise.resolve());

      // Volunteer to add
      const voluntario = {
        email: 'voluntario@example.com',
        nome: 'Voluntario',
        telefone: '987-654-3210',
        cargo: Cargo.VOLUNTARIO,
      };

      // Call the function
      const updatedEvento = await eventoService.adicionarVoluntarioEvento(
        voluntario,
        mockEvento
      );

      expect(mockGetDoc).toHaveBeenCalled();
      expect(mockUpdateDoc).toHaveBeenCalled();
      expect(updatedEvento.voluntarios).toContain(voluntario);
      // Additional assertions can be made here
    });
  });

  describe('adicionarVoluntarioTurno', () => {
    it.skip('adds a volunteer to a specific turno successfully', async () => {
      // Mock data
      const dataMock = new Date();
      const diaMock = {
        data: dataMock,
        turnos: [
          { title: 'Turno 1', voluntarios: [] },
          { title: 'Turno 2', voluntarios: [] },
        ],
      };

      const mockEvento = {
        codigoEvento: 'abc123',
        nomeDoEvento: 'Mock Event',
        description: 'Mock Description',
        local: 'Mock Location',
        nomeResponsavel: 'Mock Responsavel',
        telefoneResponsavel: '123-456-7890',
        voluntarios: [],
        dias: [diaMock],
      };

      // Set up mocks
      const mockGetDoc = getDoc as unknown as Mock;
      const mockUpdateDoc = updateDoc as unknown as Mock;

      mockGetDoc.mockImplementation(() =>
        Promise.resolve({ exists: () => true, data: () => mockEvento })
      );
      mockUpdateDoc.mockImplementation(() => Promise.resolve());

      // Volunteer to add
      const voluntario = {
        email: 'voluntario@example.com',
        nome: 'Voluntario',
        telefone: '987-654-3210',
        cargo: Cargo.VOLUNTARIO,
      };

      const diaEvento = diaMock;
      const turno = { title: 'Turno 1', voluntarios: [] };

      // Call the function
      const updatedEvento = await eventoService.adicionarVoluntarioTurno(
        voluntario,
        mockEvento,
        diaEvento,
        turno
      );

      expect(mockGetDoc).toHaveBeenCalled();
      expect(mockUpdateDoc).toHaveBeenCalled();
      expect(updatedEvento.dias[0].turnos[0].voluntarios).toContain(voluntario);
      // Additional assertions can be made here
    });
  });

  describe('buscarEventoPorCodigo', () => {
    it('fetches an event by code successfully', async () => {
      // Mock the getDoc to resolve with an object that mimics a Firestore document snapshot
      const mockGetDoc = getDoc as Mock;
      const mockData = {
        /* your DadosEvento data */
      };
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
      const mockDocSnap = {
        exists: () => false,
        data: vi.fn(),
      };

      mockGetDoc.mockResolvedValue(mockDocSnap);

      const codigo = 'invalid-code';

      await expect(eventoService.buscarEventoPorCodigo(codigo)).rejects.toThrow(
        `No event found with code: ${codigo}`
      );
    });
  });
});
