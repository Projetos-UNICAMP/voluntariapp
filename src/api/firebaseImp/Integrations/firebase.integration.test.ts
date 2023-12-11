import { describe, it, expect } from 'vitest';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Firebase configuration (use your test project's config)
const firebaseConfig = {
    apiKey: 'AIzaSyCe1AHOGSD0Z7TEHwZsZbLeUAXClIGN5hs',
    authDomain: 'organizador-opn.firebaseapp.com',
    projectId: 'organizador-opn',
    storageBucket: 'organizador-opn.appspot.com',
    messagingSenderId: '810093379030',
    appId: '1:810093379030:web:83ef0d67ee34518cfdb877',
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

describe('Firebase Integration Test', () => {
  it.skip('should add a document to test-event collection', async () => {
    const payload = {
      nomeDoEvento: "Evento teste",
      description: "evento realizado com fins de teste",
      local: "Unicamp",
      nomeResponsavel: "Breno",
      telefoneResponsavel: "9987-0987",
      dataInicio: "2023-01-01T00:00:00.000Z",
      dataFim: "2023-01-03T00:00:00.000Z",
      numTurnosPorDia: 2,
      dias: [
        {
          turnos: [
            {
              voluntarios: [
              ],
              title: "Turno 1",
            },
            {
              voluntarios: [
              ],
              title: "Turno 2",
            },
          ],
          data: "2023-01-01T00:00:00.000Z",
        },
        {
          turnos: [
            {
              voluntarios: [
              ],
              title: "Turno 1",
            },
            {
              voluntarios: [
              ],
              title: "Turno 2",
            },
          ],
          data: "2023-01-02T00:00:00.000Z",
        },
        {
          turnos: [
            {
              voluntarios: [
              ],
              title: "Turno 1",
            },
            {
              voluntarios: [
              ],
              title: "Turno 2",
            },
          ],
          data: "2023-01-03T00:00:00.000Z",
        },
      ],
    };

    const docRef = await addDoc(collection(db, 'test-event'), payload);
    expect(docRef).toBeDefined();
    expect(docRef.id).toBeTruthy(); // Check if a document ID was returned
  });
});
