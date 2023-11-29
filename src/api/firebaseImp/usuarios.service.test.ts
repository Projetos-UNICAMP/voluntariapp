import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc } from 'firebase/firestore';
import { Mock, afterEach, describe, expect, it, vi } from 'vitest';
import { Cargo } from '../usuarios.api';
import { usuarioService } from './usuarios.service';

// Mock Firebase Authentication and Firestore functions
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
}));

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
  collection: vi.fn(),
  doc: vi.fn(),
  setDoc: vi.fn(),
}));

describe('UsuarioService', () => {
  afterEach(() => {
    // Clear all mocks after each test
    vi.clearAllMocks();
  });

  it('should successfully register a new user', async () => {
    // Mock the createUserWithEmailAndPassword to simulate successful user creation
    (createUserWithEmailAndPassword as Mock).mockResolvedValue({
      user: { uid: 'unique-user-id' },
    });

    // Mock the setDoc function to simulate successful Firestore document creation
    (setDoc as Mock).mockResolvedValue(undefined);

    const payload = {
      email: 'test@test.com',
      senha: 'password123',
      nome: 'nome',
      telefone: 'telefone',
      cargo: Cargo.VOLUNTARIO,
    };
    const result = await usuarioService.cadastrarNovoUsuario(payload);

    expect(result).toBe(true);
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
    expect(setDoc).toHaveBeenCalled();
  });

  it('should handle errors during user registration', async () => {
    // Mock the createUserWithEmailAndPassword to simulate a failure
    (createUserWithEmailAndPassword as Mock).mockRejectedValue(
      new Error('Error')
    );

    const payload = {
      email: 'test@test.com',
      senha: 'password123',
      nome: 'nome',
      telefone: 'telefone',
      cargo: Cargo.VOLUNTARIO,
    };
    const result = await usuarioService.cadastrarNovoUsuario(payload);

    expect(result).toBe(false);
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
    // The setDoc should not be called since createUserWithEmailAndPassword fails
    expect(setDoc).not.toHaveBeenCalled();
  });
});
